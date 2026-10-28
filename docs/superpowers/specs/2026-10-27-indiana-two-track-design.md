# The Next Chapter Project V3: Indiana two-track money tools

Date: 2026-10-27. Status: approved in conversation (structure and tools), owner gave full permission to proceed.

## Purpose

Reshape the site so young people in Indiana foster care, group homes, or adopted from care can
budget, understand the money that is theirs, and find the programs they qualify for.
Two audiences with different money realities:

- **Still in care (14 to 17):** allowance or personal-needs money, a first job, gifts, program
  rewards. Usually cannot open a bank account alone. Needs to track small amounts, save toward a
  goal, and be ready with documents and an account before 18.
- **On my own (18 to 23):** job pay, Collaborative Care support, ETV, 21st Century Scholars,
  Opportunity Passport. Needs a first-month budget with move-in costs, a map of benefits they are
  owed, and a sense of how matched savings change a goal.

Success looks like: a visitor can pick a track, use three tools without typing anything personal,
and leave with a concrete next step and an official link.

## Constraints kept from V2

- Static site, no accounts, no server, no analytics. Nothing persists beyond the browser session
  (sessionStorage for the track choice and checklist only).
- Everything renders without JavaScript; JS only adds interactivity.
- Dollar figures from programs are stated as "up to" with the official source linked, never as
  promises. Every program result says "likely" and points to a human to confirm.
- Netlify drag-and-drop deploy of the folder still works; GitHub main now auto-deploys too.

## Structure (approved)

Single page, `index.html`. Order:

1. Hero: new headline and subhead for Indiana foster and adopted youth, privacy line kept.
2. **Pick your track:** two cards, "I'm still in care (14 to 17)" and "I'm on my own now (18 to 23)".
   Picking scrolls to the track and marks it active; remembered in sessionStorage. Both tracks are
   always rendered.
3. Track A section `#in-care`: three tools.
4. Track B section `#on-my-own`: three tools.
5. Lessons (unchanged, quizzes kept).
6. `#indiana-programs`: program cards with official links, replaces the generic links block
   (CFPB and FDIC links kept inside it).
7. About, Feedback (copy lightly updated), footer.

Nav: Still in care, On my own, Lessons, Indiana programs.

## Tools (approved)

### A1. Where my money comes from
Inputs (monthly, $): allowance or personal-needs money, job pay, gifts and other, program rewards.
Output: total, and a three-way split (spend now, save for a goal, keep for emergencies) chosen with
three percentage presets (50/30/20 default, 70/20/10, 40/40/20) rendered as a stacked bar with
dollar amounts. Side notes: ask your case manager what allowance you receive; if Social Security
benefits are paid for you, ask who the representative payee is and whether any is saved for you;
Foster Success pays for finishing its online financial modules.

### A2. Ready-by-18 checklist
Twelve items, each with a one-line why and who to ask. Progress count, print button, clear button.
Session-only. Items: state ID or license; Social Security card; birth certificate; bank account in
your name; this year's credit report (free yearly for foster youth 14 and up); Medicaid card and
knowing it can continue to 26; school transcript; copy of your transition plan; two trusted adults
with phone numbers; an email address you control; 21st Century Scholars enrollment status; ETV
awareness if college or training is the plan.

### A3. First bank account guide
Static guide with a tiny fee calculator (monthly fee x 12 = yearly cost, plus a comparison of two
accounts). Content: most banks need an adult joint owner until 18 and who that can be; what to
bring; five questions to ask; what changes at 18.

### B4. First-month budget
Existing budget calculator kept, plus: a preset selector (Collaborative Care with part-time job;
full-time job; student with ETV) that fills example numbers, and a one-time move-in block
(deposit, first month's rent, basics, utility setup) with "cash needed to move in". Note that rent
and deposit are Opportunity Passport matchable assets.

### B5. Benefits finder
Three tap questions: age band (18 to 20, 21 to 22, 23 to 25); on your 18th birthday were you in
Indiana foster care (yes / no, adopted or guardianship after 16 / no, left earlier); in school or
training (yes / planning to / no). Pure rules produce a list of likely programs with one line and a
link. Rules:

- Collaborative Care: age 18 to 20 and in care at 18 (re-entry possible before 20).
- Voluntary Services: age 18 to 22 and (in care at 18 or adopted/guardianship after 16).
- ETV: age under 26 and (in care at 18 or adopted/guardianship after 16) and school yes/planning.
- 21st Century Scholars: age 18 to 20 and school yes/planning (any foster history).
- Opportunity Passport: age 18 to 25, any foster history (needs one day in care at 14 or later).
- Credit Build and online financial modules: everyone.
- Medicaid to 26: in care at 18.
- Yearly credit report: age 18 to 20 and in care at 18.
- Car insurance help (Insuring Foster Youth Trust Fund): in care at 18, age 18 to 20.
Always appended: "Confirm with your Independent Living Specialist, Older Youth Case Manager, or
Foster Success."

### B6. Savings-match calculator
Existing savings calculator plus goal presets (first apartment deposit and rent, used car, laptop
and books) and a toggle "Opportunity Passport match". With match on: match equals min(saved
toward goal, 3,500 minus match already used) and months-to-goal is recomputed where each month of
saving counts double until the cap is reached. Shows months with and without match and the
eligibility fine print (18 to 25, bank account, some income, finish modules and the class).

## Indiana programs section
Cards: Older Youth Services (ILP from 16), Collaborative Care, Voluntary Services, ETV, 21st
Century Scholars, Opportunity Passport, Credit Build and online modules, credit reports, Medicaid
to 26, car insurance trust fund, Youth Bill of Rights. Each: what it gives, who runs it, official
link. Plus "who to contact": olderyouthquestions@dcs.in.gov, 1-800-800-5556 (DCS), Foster Success.

Sources (verified 2026-10-27): in.gov/dcs/older-youth-initiatives, DCS Collaborative Care fact
sheet PDF, in.gov/dcs credit-reporting page, fostersuccess.org ETV and Opportunity Passport pages,
learnmoreindiana.org FAQ.

## Code layout
- `index.html`: markup, CSS, DOM wiring.
- `assets/logic.js`: pure functions (money split, budget totals, move-in total, benefits rules,
  match calculator). Loads as a classic script in the browser and as a CommonJS module in Node.
- `tests/logic.test.js`: node:test unit tests for the pure functions. Run with `node --test`.

## Testing
Unit tests for logic; manual browser check of each tool at desktop and 375px width, console clean;
HTML validity spot check; live deploy check after push.
