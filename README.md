# Tiger 5 Scorecard

Golf scoring for you and your friends: Tiger 5 mistake tracking, a World Handicap System index, friend requests, and a shared feed of posted rounds. It runs on GitHub Pages, installs to a phone's home screen, and keeps scoring when you lose signal on the course.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and its styles |
| `app.js` | All app logic: scoring, handicap math, friends, sync |
| `config.js` | Your Supabase project URL and anon key |
| `supabase/schema.sql` | Database tables and security rules; run once in Supabase |
| `manifest.webmanifest`, `sw.js`, `icons/` | Make it installable and usable offline |

## One-time setup

### 1. Create the Supabase project
1. Sign up at [supabase.com](https://supabase.com) (free) and create a new project.
2. Open **SQL Editor → New query**, paste the whole of `supabase/schema.sql`, and click **Run**.
3. Open **Project Settings → API**. Copy the **Project URL** and the **anon public** key into `config.js`.

### 2. Set up sign-in
Players sign in with an email and password. The app never sends email, which avoids Supabase's built-in sender (limited to a couple of emails an hour).

1. **Authentication → Sign In / Providers → Email**: make sure Email is enabled and turn **off** **Confirm email**. Save.
2. **Authentication → URL Configuration**: set **Site URL** to `https://aleccouric-code.github.io/tiger5/`.

**Forgotten passwords:** there's no self-service reset yet. In **Authentication → Users**, delete that player's account so they can sign up again with the same email. Their rounds and friendships are deleted with it, so only do this for someone who hasn't posted much. A proper reset flow needs custom SMTP (for example Resend) under **Authentication → Emails → SMTP Settings**.

### 3. Publish
Commit everything to the `tiger5` repo and push. GitHub Pages serves `index.html` at https://aleccouric-code.github.io/tiger5/.

Whenever you change app files later, bump `VERSION` at the top of `sw.js` so installed phones pick up the update.

## Trips and side bets
Run `supabase/trips.sql` once in the SQL Editor (after `schema.sql`) to turn on the Trips tab.

A trip has dates and players (anyone on the trip can add their friends). Any player can add bets: fewest putts, lowest gross or net, fewest Tiger 5 misses, most birdies, fewest 3-putts, best single round, or a custom bet where you tap the winner. Built-in bets update automatically from finished rounds posted within the trip's dates, either as a trip total or as an average per 18 holes.

Each player puts the stake into each bet's pot and the winners split it. **Settle up** shows each player's net and the fewest payments to square everyone up. The app only keeps track; it never moves money.

Trip-mates who aren't friends can see each other's names and the rounds they posted during the trip, nothing else.

## Inviting friends
On **Friends → Find friends**, search by part of a name (3+ letters), a full email address, or a 6-letter friend code, then tap **Add**. Searches never show anyone's email.

Friends who haven't joined yet: **Friends → Share invite link**. Opening the link and signing up prompts them to add you. You see each other's rounds once the request is accepted.

On a trip, anyone on it can add their own friends; only the organizer can remove other players.

## Installing on a phone
- **iPhone:** open the link in Safari, tap **Share → Add to Home Screen**.
- **Android:** open the link in Chrome, tap **⋮ → Install app** (or **Add to Home screen**).

## Privacy
The database's row level security only lets a player read their own rounds and the rounds of accepted friends. There's no public player list: signed-in players can find others only by searching part of a name (at most 10 results), a full email, or a friend code, and searches return names only, never emails.

## Handicap notes
Score differentials follow the World Handicap System: adjusted gross score (net double bogey per hole, or par + 5 before you have an index), course rating and slope, and the best-of-last-20 table. Nine-hole rounds are converted to 18-hole differentials using the WHS expected score. Playing conditions (PCC) and the soft and hard caps aren't applied, so the index is a close estimate rather than an official one.

## Later: app stores
The same code can be wrapped with [Capacitor](https://capacitorjs.com) to make iOS and Android apps. That needs an Apple Developer account ($99/year, plus a Mac to build) and a Google Play developer account ($25 once).
