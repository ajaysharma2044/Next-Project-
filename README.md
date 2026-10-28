# The Next Chapter Project — Version 3

A static, privacy-first money-skills site for young people in Indiana foster care, group homes, or
adopted from care. Open `index.html` locally to preview, or serve the folder with any static server.

## What's in V3
- **Two tracks on one page.** "I'm still in care (14 to 17)" and "I'm on my own now (18 to 23)". Both
  tracks always render; picking one highlights it and is remembered for the browser session only.
- **Still in care:** where-my-money-comes-from planner with spend/save/keep split, ready-by-18
  checklist (12 items with who to ask, printable), first bank account guide with a fee check.
- **On my own:** first-month budget with Collaborative Care / job / student presets and one-time
  move-in costs, a three-tap benefits finder for Indiana programs, and a savings-match calculator that
  models the Opportunity Passport $1-for-$1 match (lifetime cap $3,500).
- **Indiana programs** section with official links: Older Youth Services, Collaborative Care,
  Voluntary Services, ETV, 21st Century Scholars, Opportunity Passport, Foster Success modules and
  Credit Build, yearly credit reports, Medicaid to 26, car insurance help, the Youth Bill of Rights.
- The three lessons and their quizzes from V2 are unchanged.

## Files
- `index.html` — markup, styles, and DOM wiring.
- `assets/logic.js` — pure calculation logic (money split, budget, move-in total, benefits rules,
  match plan). Works in the browser and in Node.
- `tests/logic.test.js` — unit tests. Run with `node --test tests/logic.test.js` (Node 18+).
- `docs/superpowers/specs/` — the design spec for V3.

## Deploying
The GitHub repository is connected to Netlify: every push to `main` deploys automatically to
https://the-next-chapter-project-657.netlify.app. Manual drag-and-drop of this folder in the Netlify
Deploys tab still works if you prefer.

## Privacy and accuracy
No account, database, tracking, or analytics. All inputs, quiz answers, and finder answers are
handled locally in the browser; the track choice and checklist use session storage only. Program
details were checked against Indiana DCS, Foster Success Indiana, and Learn More Indiana pages on
2026-10-27 and are general educational information, not individualized financial or legal advice.
Dollar amounts are program maximums, not promises. Review content with a qualified educator or
Independent Living Specialist before running youth pilots.
