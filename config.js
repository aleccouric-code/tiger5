// Supabase connection. Find both values in Supabase: Project Settings → API.
// The publishable key is meant to be public; the database's row level security
// (supabase/schema.sql) is what keeps each player's data safe.
window.TIGER5_CONFIG = {
  supabaseUrl: 'https://afzzyrfmlhfjqdpntuuv.supabase.co',
  supabaseAnonKey: 'sb_publishable_ByQa7tusncWkKMFTVR5SBg_XOWybLSM',
  // Public half of the push-notification key (the private half stays in Supabase Vault).
  vapidPublicKey: 'BB8sbar3fhYYmto3Z_50W_MetU4r9hVShSqqvX5ats3c-2NZx9NbRFGI52ez-Nny6HmBOJu_PhJRPHxjMYAAzyY'
};
