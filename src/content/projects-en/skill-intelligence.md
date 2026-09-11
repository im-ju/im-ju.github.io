> A workforce-risk analysis pipeline that uses AI to extract and match every employee's skills from internal
> documents, and traces "what stops if this person leaves" through a skills ontology.
> I completed the PoC and delivered **the Go/No-Go decision pack for leadership**.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Planning · methodology design · implementation · self-audit · leadership reporting (solo) |
| **Period** | 2026-04 to 2026-07 (PoC phase 2 complete) |
| **Status** | Phase 2 complete · **conditional Go recommendation, awaiting the leadership decision** |
| **Scope** | All 77 employees / 20 teams · 29 internal documents (team missions, JDs, OKRs) |
| **Stack** | TypeScript(strict) · PostgreSQL · Drizzle ORM · Claude Code CLI · Vitest |
| **Size** | 3,200 lines of source · 10 CLI commands · 45 commits · 12 analysis documents |
| **Data** | **Currently all synthetic (anonymisation complete)** — a real-data pilot is for leadership to approve |

---

## 2. Background — what was the problem

When workforce risk comes up, what the organisation actually holds is **job grade, tenure and team**. But what we want to know is something else.

> If this person quits tomorrow, **what stops?**

Answering that requires "who can do what" to exist as data. It was written down nowhere, and asking every employee to list their own skills **collapses at the start, because of response rates and inconsistent standards.**

Meanwhile, the organisation already had documents: team missions, JDs, OKRs. Nobody had written down their own skills, but **what each team is responsible for was written down.**

---

## 3. What I built

**A CLI pipeline that descends from "existing documents → skills → people → risk".** Nothing new has to be written.

```
import-csv  →  extract  →  match  →  import-results  →  risk  →  dashboard
 load HR       extract     match       load into DB     compute    report
 roster        skills      people to                    attrition
               from docs   skills                       risk
                                    ↑
                        verify-sheet / member-verify-sheet
                        import-verifications  (feeds human confirmation back in)
```

| Stage | What it does |
|---|---|
| **Extract** | Pulls skills and **relations between skills** out of 29 team missions, JDs and OKRs |
| **Match** | Links person ↔ skill at proficiency 1 to 4 |
| **Risk** | Computes attrition risk from rare-skill ownership plus **knock-on impact** |
| **Verify** | The person and their team lead confirm what the AI produced, and that goes back in |

### What makes it different — I treated skills as a graph, not a list

I assigned `prerequisite` · `specialization` · `complementary` · `enables` relations between skills. That lets risk be stated like this.

> Simple analysis: "Only 1 person holds skill A."
> Ontology analysis: "A goes missing → the review work A enabled stops → the regulatory reporting that depended on it becomes impossible."

By tracing relations up to 3 hops, it produced **2 to 3 times the decision-relevant information of the simple analysis**.

---

## 4. Architecture

```
  [29 internal docs]        [HR system CSV]
  team missions/JD/OKR       member roster
       │                        │
       ▼                        ▼
  ┌─────────────────────────────────┐
  │  CLI pipeline (TypeScript)      │
  │                                 │
  │  extract ──► LLM Runner ────────┼──► Claude Code CLI
  │  match   ──► (local CLI call)   │    (no HTTP API — deliberate)
  └──────────────┬──────────────────┘
                 │
                 ▼
        ┌──────────────────┐        ┌────────────────────┐
        │  PostgreSQL      │◄───────┤  verification loop │
        │  members         │        │  issue verify-sheet│
        │  skills          │        │  → person/lead     │
        │  skill_relations │        │    confirms        │
        │  member_skills   │        │  → import back in  │
        │  risk_snapshots  │        └────────────────────┘
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │  risk computation│  rare skills + ontology chains
        │  + snapshot save │  ← the key to reproducibility
        └────────┬─────────┘
                 ▼
         HTML report · leadership decision pack
```

**Two things are deliberate in the design.**

- **The LLM is called through a local CLI, not an HTTP API.** This pipeline handles employee information, so I never built a path that pushes that data out through an external API key in the first place.
- **Risk results are stored as 1 snapshot row per member.** The reason is in §5.

---

## 5. The most valuable part of this project — I demolished my own results

I issued the PoC report in 2026-04. In 2026-07 **I audited that report and issued a corrected version.**

### What was wrong

The figures in the report **did not reproduce from the stored state of the database.**

| Item | First reported (2026-04) | After correction (2026-07) |
|---|---|---|
| Skill catalogue | 560 | **494** (near-duplicates merged) |
| Single-holder skills | 101 | **83** (18 false singles removed) |
| Risk distribution | C14 · H11 · M23 · L29 | **C12 · H19 · M6 · L40** |

There were three causes.

1. **An unnormalised skill catalogue.** What was effectively the same skill existed several times under different names, so "rare skills held by only 1 person" was **inflated beyond the truth.** The input to the risk computation was contaminated.
2. **Non-reproducible figures.** The report's numbers were the output of one particular run, and as the database drifted afterwards the same numbers could no longer be produced.
3. **Uncalibrated thresholds.** Unverified AI extraction results rode the chain analysis all the way up to Critical.

### What I fixed

- I introduced **a skill normalisation pass** — read-only detection first, then an apply tool (with a rollback-capable dry-run) — and merged the near-duplicates.
- I changed it to store **1 reproducible risk snapshot row per member**. The report's figures now come back out of the stored state unchanged.
- I put **verification status on the face of every output**, and **capped unverified chains at High so they cannot rise to Critical**. The risk grade now distinguishes what the AI extracted from what a human confirmed.
- I built a per-person verification loop (`member-verify-sheet` → confirm → `import-verifications`), but made **dry-run the default**.

### Why this matters

This project is not "AI analysed HR data". It is **a record of auditing, on my own initiative, whether AI analysis reproduces and whether it was verified — before it reaches a leadership decision — and correcting the wrong numbers with my own hands.**

> Without the correction, leadership would have made workforce decisions on the basis of **101 inflated rare skills and a risk distribution that does not reproduce**.

---

## 6. What I recommended to leadership

"**Conditional Go.**" Not a full rollout: I asked them to approve **a real-data pilot limited to 2 or 3 teams** whose skill definitions are clear.

The logic goes like this.

- The technical pipeline, the methodology and the security governance are **ready.**
- Exactly one unknown is left — **extraction accuracy on real data.** The current data is entirely synthetic, so that figure cannot be produced.
- And that measurement **cannot go ahead without leadership approval.**

So I narrowed the request from "please adopt this" to "**please let me measure the accuracy.**" The decision to scale comes at the next checkpoint, after seeing that result.

> Instead of dressing up the unverified as verified to win approval, **I wrote down what I still don't know as not known, and asked for the authority to find it out.**

---

## 7. Results in numbers

| Item | Figure |
|---|---|
| Coverage | 77 people / 20 teams (100%) |
| Input documents | 29 — **all existing documents, 0 newly written** |
| Skill catalogue | 494 (after normalisation) · 642 relations |
| Skill matches | 2,096 · about 27 per person on average |
| Pipeline runtime | about 3 hours excluding document collection (repeat runs automated) |
| Metrics corrected by the self-audit | 3 (skill count · single-holder skill count · risk distribution) |
| Documents produced | PoC report · audit · methodology review · threshold calibration · Go/No-Go pack |

> Analysis figures such as the risk distribution are **all based on synthetic data**. Both this document and the original report state that on their first page.

---

