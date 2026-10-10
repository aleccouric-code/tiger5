// Sends queued push notifications (private.push_queue) to every phone a player has
// registered, skipping categories they've switched off.
//
// Database triggers call this after queueing something. It takes no input, so calling it
// can only ever deliver notifications that are already queued.
//
// The VAPID key pair (which proves to Apple/Google that pushes come from Sandie) is created
// on first run and kept in Supabase Vault. The private half never leaves Supabase.
import postgres from "npm:postgres@3.4.5";
import webpush from "npm:web-push@3.6.7";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 2, prepare: false });

const b64u = (b: Uint8Array) =>
  btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));

async function vapid(): Promise<{ pub: string; priv: string }> {
  const read = () =>
    sql`select name, decrypted_secret from vault.decrypted_secrets where name in ('vapid_public', 'vapid_private')`;
  let rows = await read();
  if (rows.length < 2) {
    const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
    const jwk = await crypto.subtle.exportKey("jwk", kp.privateKey);
    const pub = b64u(new Uint8Array([4, ...unb64u(jwk.x!), ...unb64u(jwk.y!)]));
    try {
      await sql`select vault.create_secret(${jwk.d!}, 'vapid_private'), vault.create_secret(${pub}, 'vapid_public')`;
    } catch (_) { /* another run created them first */ }
    rows = await read();
  }
  const get = (n: string) => rows.find((r) => r.name === n)!.decrypted_secret as string;
  return { pub: get("vapid_public"), priv: get("vapid_private") };
}

Deno.serve(async () => {
  const k = await vapid();
  webpush.setVapidDetails("https://sandie.app", k.pub, k.priv);
  let sent = 0, gone = 0, failed = 0;
  for (;;) {
    const jobs = await sql`
      delete from private.push_queue
      where id in (select id from private.push_queue order by id limit 100 for update skip locked)
      returning *`;
    if (!jobs.length) break;
    for (const j of jobs) {
      if (Date.now() - new Date(j.created_at).getTime() > 24 * 3600e3) continue; // stale
      const subs = await sql`
        select s.endpoint, s.p256dh, s.auth
        from public.push_subscriptions s
        left join public.push_prefs p on p.user_id = s.user_id
        where s.user_id = any(${"{" + (j.users as string[]).join(",") + "}"}::uuid[])
          and not (${j.kind}::text = any(coalesce(p.off, '{}')))`;
      const payload = JSON.stringify({ title: j.title, body: j.body, url: j.url, tag: j.tag });
      await Promise.all(subs.map(async (s) => {
        try {
          await webpush.sendNotification(
            { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
            payload,
            { TTL: 24 * 3600, urgency: "normal" },
          );
          sent++;
        } catch (e) {
          const code = (e as { statusCode?: number }).statusCode;
          if (code === 404 || code === 410) {
            // The phone unsubscribed or the app was removed.
            await sql`delete from public.push_subscriptions where endpoint = ${s.endpoint}`;
            gone++;
          } else {
            failed++;
            console.error("push failed", code, (e as Error).message);
          }
        }
      }));
    }
  }
  return Response.json({ sent, gone, failed, key: k.pub });
});
