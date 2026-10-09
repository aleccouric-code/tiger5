# Sandie

Golf scoring for you and your friends: Tiger 5 mistake tracking, a World Handicap System index, friend requests, and a shared feed of posted rounds. It runs on GitHub Pages, installs to a phone's home screen, and keeps scoring when you lose signal on the course.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and its styles |
| `app.js` | All app logic: scoring, handicap math, friends, sync |
| `config.js` | Your Supabase project URL and anon key |
| `supabase/schema.sql` | Database tables and security rules; run once in Supabase |
| `supabase/trips.sql`, `supabase/expenses.sql`, `supabase/board.sql` | Trips and side bets; trip receipts; the Betting Board (run in that order after schema.sql) |
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

Each player puts the stake into each bet's pot and the winners split it. **Settle up** (at the bottom of the Bets section) shows each player's net and the fewest payments to square everyone up. The app only keeps track; it never moves money.

Trip-mates who aren't friends can see each other's names and the rounds they posted during the trip, nothing else.

### Receipts
`supabase/expenses.sql` adds trip expenses and a private `receipts` storage bucket (already applied to the live database).

On a trip, anyone can add a receipt: what it was for, the total, who paid, who it's split between (everyone by default), and an optional photo or PDF. Photos are shrunk to 1600px JPEGs before upload. Only people on that trip can see its receipts. The person who added a receipt, the person who paid, or the organizer can delete it.

The Trips page splits **Current trips** and **Completed trips**. A trip is completed after its last day, or when the organizer taps **End trip** (which pulls the last day in to today so later rounds stop counting; **Reopen** undoes it).

A trip page has four buttons: **Bets**, **Receipts**, **Rounds** and **Players**. Bets and receipts settle up separately: **Bets** ends with a bets-only settle-up, and **Receipts** has its own settle-up (what each person paid minus their share). Each lists the fewest payments that square that ledger.

## Profiles and photos
Tap any player's name or avatar (feed cards, round pages, comments, trip players) to open their profile; friends' profiles show their index, rating, averages and rounds. On the **Me** tab you can add, change or remove a profile photo. Photos are cropped to a 400px square and stored in the public `avatars` bucket under each player's own folder (only they can change it); the app only displays photos from that bucket.

## Feed, likes, comments and attests
Each posted round shows as a card with Score, Putts, Tiger 5 and Differential circles (green = good, gold = so-so, red = rough), its trophy or poo rating, and 🍺 / 💨 Rips totals. Friends can **Like** a round, **Comment** on it, and **Attest** it to vouch for the score (you can't attest your own). `supabase/social.sql` holds these tables (already applied to the live database); only people who can see a round can see or add to its likes, comments and attests.

## Betting Board
`supabase/board.sql` turns on the **Board** tab (already applied to the live database).

Post a bet for later ("Jon breaks 80 at Whiskey Creek") with 2–6 options (Yes/No by default, or player names), a stake per player, and an optional settle-by date. Your friends see it and pick an option while it's open. The poster can lock picks, mark the winning option, undo a result, or call the bet off.

Each person chooses how much to put on their pick (the poster's amount is only a suggestion). When a bet is settled, everyone who picked a losing option pays what they bet, split among those who picked the winner in proportion to how much each winner bet. **Your board balance** totals what each person owes you or you owe them across all settled bets. Tracking only; the app never moves money.

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

## Courses
The course picker is a search box with state buttons (VA, MD, NC, SC) and an All / Public / Private filter. Each state's full list lives in `courses/<STATE>.json` and only downloads when you open that state. Besides the original Northern Virginia courses, `courses.js` adds 20 Myrtle Beach (SC) courses and 20 more Virginia courses. That data comes from [OpenGolfAPI](https://opengolfapi.org) (© OpenStreetMap contributors, ODbL 1.0) and was checked before use: 18 holes, handicaps 1–18 used once each, par 68–73, and tee ratings in order of length. Tees whose rating didn't fit their length were dropped, and hole yardages that didn't match the card total are hidden (the card's rating and slope are still used). Courses not in the list can be played as **Other course**, with photos of the scorecard front and back.

## Group rounds, Leaderboard, Venmo
- **Group rounds:** pick up to 3 friends under **Playing With** when starting a round, then score everyone on each hole. Friends' rounds post to their cards marked "Scored by", and they (or you) can delete them.
- **Leaderboard** tab: you and your friends ranked across 13 categories, filterable to This Year or the Last 30 Days.
- **Venmo:** add your Venmo username on the Me tab. Only friends can see it, and it shows as a Venmo link next to what people owe you.
- `supabase/group.sql` adds `rounds.entered_by` / `rounds.scorecards`, the friends-only `profile_private` table and the private `scorecards` bucket (already applied to the live database).

### Bulk course lists
`courses/VA.json`, `MD.json` and `NC.json` hold every public-access course OpenGolfAPI lists for those states (public, semi-private, resort and municipal) that passes the same checks, plus private courses added by hand (Farmington Country Club, South/North). 9-hole courses, par-3 and executive layouts are left out for now because the app assumes 18 holes. The scripts that built them are in `.claude/bulk/` (not published).
