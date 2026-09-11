> An internal consolidation platform that an HR & General Affairs practitioner built and runs as a production web app for their own team's repetitive work.
> Implementation by AI pair programming (Claude Code); design, verification and decisions my own.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Planning · design · implementation · deployment · operations (solo) |
| **Period** | 2026-03 – live (about 5 months) |
| **Status** | Production live · rolled out company-wide |
| **Scope managed** | Around 90 members (as of 2026-03) |
| **Stack** | Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · NextAuth v5 · Drizzle ORM · Postgres (Neon) · Vercel |
| **Size** | 203 source files, 36,904 lines · 13 screens · 28 APIs · 5 DB tables · 9 migrations |
| **Quality** | **978** automated tests (42 files, all passing) · 166 commits · 37 merged PRs |

> ⚠️ **Actual user counts and usage frequency were not measured.** The headcount above is the size of the member roster the Hub manages, not the number of active users. Team counts shift with personnel changes and reorganisations, so I always state them with an as-of date.

---

## 2. Background — what was the problem

HR and general affairs work was **scattered across 4 different places**.

- Meeting room bookings had to be scanned by eye in Google Calendar.
- Grouping for internal events (blind lunches, chimaek parties) ran in a **separate web app**, authenticated by **a single shared password**, so there was no way to tell who did what.
- The training allowance ran on **Google Sheets**, and two numbers inside the spreadsheet had been left disagreeing with each other.
- The member roster, org chart and partner restaurant list circulated as Excel files.

What they had in common was that **a person redid the same work by hand every month**, and that **when it was wrong, it was silent**.

---

## 3. What I built

A **single web app** entered with one login (company Google account). 6 features are live.

| Feature | What it does | What it replaced |
|---|---|---|
| **Meeting room dashboard** | Booking status, today's schedule, usage statistics, free-slot suggestions | Scanning Calendar by eye |
| **Event random pick** | Grouping for blind lunches and chimaek parties, with constraints, history and badges | A separate app opened with a shared password |
| **Member directory** | Full staff roster plus pan/zoom org chart, admin roster CRUD | Excel files passed around |
| **Partner restaurants (식권대장)** | Search 337 partner restaurants by category, area and **distance from the office** | An Excel list |
| **Training allowance** | Personal limit, remaining balance and usage history, plus a company-wide spend admin dashboard and CSV | Google Sheets |
| **Tenure and birthdays** | This month's birthdays and work anniversaries, plus **an automatic Slack notification every morning** | People remembering |

**One design principle:** the portal records and manages; the channel delivers. Nobody leaves a dashboard open, so Slack carries the notifications.

---

## 4. Architecture

```
Member browser ──HTTPS──> [Vercel]                       [External]
                          DSRV HR/GA Hub  ──OAUTH─────>  Google OAuth
                          (Next.js · 6 features)
                                │ FETCH
                                ▼
                          API Routes ────CALENDAR─────>  Google Calendar
                          (28 handlers ·                 (room bookings)
                           requireRole())
                                │ SQL
                                ▼
    Neon Postgres <──READ/WRITE── birthday cron ──HOLIDAYS──> public data portal
    (drizzle + raw)              (1× per day)   ──WEBHOOK───> Slack channel
```

- A structure where the **human path** and the **machine path** share the same DB.
- The cron has no login session → it gets public holidays from the **public data portal's special-day API**, not from Google Calendar. (Because Calendar calls are tied to the logged-in user's OAuth token.)
- Detailed diagrams: `architecture.html` / `architecture.png`

---

## 5. How I built it — AI pair programming

**Claude Code wrote most of the code. I do not hide that. The real difficulty of this project lay elsewhere.**

| What I did | What the AI did |
|---|---|
| Deciding what to build, and what **not** to build | Writing code |
| Fixing the calculation logic by checking internal regulations clause by clause | Writing tests |
| Deciding the architecture, data model and permission boundaries | Refactoring |
| **Designing the system that verifies the AI's output** | Drafting documentation |
| Judgement calls on prod migrations, deployment and rollback | |

### The verification system — the most valuable part of this project

**Every feature goes up as a PR and gets 2 independent reviews (design and security) in sessions separated from the implementation.** In this repository, review **caught a MEDIUM-or-worse defect every single time.**

Things that were actually caught:

- **I measured and adjudicated 1 BLOCKER on which the two reviews flatly contradicted each other.** `db.transaction()` was not atomic in this app — the shared DB handle is a driver Proxy, so the ORM cannot take a dedicated connection. Under sequential execution it **passes by luck**; it only breaks once concurrent queries are mixed in. Left alone, a full data replacement could have committed only the delete and left production at 0 rows.
- **A security review just before merge caught a repository exposure incident.** The code repository was unintentionally PUBLIC, and a working branch was exposing infrastructure identifiers. The review stopped main from being contaminated, and re-scanning every branch and switching to PRIVATE were closed out the same day.

### The biggest lesson — "nobody checks the premises"

I noticed **the same shape of mistake 6 times in one day** and turned it into a rule.

| What | What it claimed | The unchecked premise |
|---|---|---|
| On-screen banner | "The next working day will retry" | Does the cron actually pick up that date → **it did not** |
| Deployment discipline | "I checked it by eye on preview" | Is preview the same code as prod → **it was 2,426 lines behind** |
| A figure in documentation | "Coordinates collected, 337/337" | Did anyone count → **actually 334** |

All of them **asserted as true something they could not verify themselves**, and all of them stayed quiet for a long time.

> **Rule:** when creating a claim, a promise, a discipline, a record or a figure, **decide at the same time what checks its premise.** If it cannot be checked, weaken the claim.

The rule paid for itself. With the exact cron send time unverified, I had already weakened the wording from "09:00" to "morning"; it later turned out that sending on the hour was impossible because of a plan limitation — **there was no code to fix.**

**AI-written code is wrong in plausible ways. So the habit of asking "what checks this?" mattered more than coding ability.**

---

## 6. Technical decisions

**① I rejected a monorepo and micro-frontends when merging the two apps**
The two apps were effectively on the same stack, so consolidation was "moving files", not "a rewrite", and the only real work was unifying authentication. I chose a single Next.js app plus route groups. A distributed architecture is pure overhead for an internal tool used by a few dozen people.

**② I scrapped the shared password and standardised on Google SSO**
If you do not know who logged in, neither auditing nor permissions are possible. I kept only 2 roles, member/admin (5 roles would have been over-design). Permission checks live in **`requireRole()` in each route**, not in a middleware path prefix — trust middleware alone and every newly added route is defenceless.

**③ I reverted a finished feature instead of merging it**
I built the partner restaurant map view completely and then dropped it. It only works if the company domain is registered in an external console, and I judged that the map's usefulness did not outweigh that burden. **Distance sorting is unaffected by that constraint, because the server preloads coordinates into the DB** — splitting the requirement up got me 90% of the value with no burden.

**④ I designed on the premise that "notification failures are silent"**
A cron is not retried when it fails, the same run can arrive twice, and a delivery can be dropped. So: ① idempotency (enforced with a DB unique constraint), ② catch-up (tracking from the last covered date), and ③ **2 axes of failure visibility** — looking only at the failure count goes quietly to 0 when the cron itself is dead, so I look at the freshness of the last covered date alongside it.

**⑤ I closed off local development writing directly to the production DB**
I isolated it with a copy-on-write clone branch of the DB, a development-only OAuth client, and a **startup guard** (the dev server refuses to boot if it detects a prod endpoint). I did not use a local Postgres because branching on the driver creates "it worked locally" and reduces the value of regression checks.

---

## 7. Results in numbers

| Item | Figure |
|---|---|
| Time in production | 5 months · no unplanned downtime |
| Internal apps consolidated | 2 → 1 |
| Live features | 6 |
| Manually managed assets migrated | 88 members on the roster · 337 partner restaurants · 66 training allowance spend records |
| Automated tests | 978 (all passing) |
| Merged PRs | 37 (every one passed independent review) |
| Production incidents | 0 |

> **Boxes worth filling (numbers I cannot produce myself):** hours saved per month, user counts and frequency, and the HR & General Affairs team's own perception. With those three attached, this document would be far stronger.

---

