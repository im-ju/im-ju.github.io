> Redesigning the company handbook page that every member opens daily, I found in advance
> **a destructive change that would have wiped out 46 child pages had it been applied as drafted**,
> and verified the fix with a rehearsal that never once touched the original.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Requirements definition · information architecture design · mock-up production · migration strategy (solo) |
| **Period** | 2026-08 |
| **Status** | Phase 0–1 complete (rehearsal passed) · **Phase 2 awaiting approval to apply** |
| **Scope** | The company handbook — 8 sections · 46 child pages · 1 database · 2 inline links |
| **Method** | 5 rounds of structured interviews → 4 mock-ups → improvements folded in → final choice |
| **State of the original** | **Confirmed undamaged** — the original was never modified at any point in the process |

---

## 2. Background — what was the problem

The company handbook is the first document a new joiner opens, and the gateway existing members come through when they need to find a regulation, a system, or how to use the office. It is, in other words, **the most frequently read document in the company**.

The content had piled up, but the structure had not kept pace. 46 pages sat in a flat list under 8 sections, so **finding what you needed meant skimming all of it**.

The problem was not "we can just build it again". This page was **already running**.

- Each of the 46 child pages **has its own URL, and is linked from all over the company.** If the URLs change, every one of those links breaks.
- If the sidebar hierarchy changes, the paths people have got used to disappear.
- And decisively — in this tool, **a page reference and the actual page are different things**.

---

## 3. The trap I found — what I took for a reference was the actual page

The 46 items in the body of the original page **were not links pointing at pages that live somewhere else.** They were **the location where those pages exist**.

So removing an item from the body does not break a link — **it deletes the page.**

But the new mock-ups were built entirely **as references (mentions)**. That is natural when you are making a mock-up — to show the structure without touching the original, a reference is the only option.

> **Had the mock-up been transplanted onto the original as it stood, 46 pages would have evaporated at once.**

I found this at the **strategy stage**, not just before applying. Comparing the original and the mock-up section by section, 1:1, the item count matched exactly at 47, but **one item's type differed** (the original held the actual database, the mock-up a reference). Counting alone and moving on would have missed it.

---

## 4. The solution — take only the shell, keep the original contents

```
  Mock-up C (new layout)               Original (46 actual blocks)
   ├ 3-column structure                 ├ actual pages × 46
   ├ 8 toggle accordions                ├ actual database × 1
   └ widgets · cards                    └ inline links × 2
        │                                    │
        │  extract layout only               │  keep the actual pages as they are
        └──────────────┬─────────────────────┘
                       ▼
              Replace the original page in place
              ├ original URL kept
              ├ 46 child URLs kept
              └ no change to the sidebar hierarchy
```

I took only the **layout** from the mock-up (the 3-column structure, the toggles, the widget placement), and for the items inside the toggles I chose to **put the original's actual blocks straight back in**.

The alternative was to move the 46 child pages elsewhere first and then rewrite the body as references, but I kept that as the second choice because **the sidebar hierarchy would gain a level and the cost of recovery if the move failed would be high**.

---

## 5. Safeguards — how to handle an irreversible operation

### ① I used the no-delete option as a validator

The edit operation has a "disallow content deletion" option. Turn it on and **any operation that would delete even one child page or database is rejected as an error**.

I read it not as a safeguard but as **an automatic validator**.

> **The operation succeeded = not one of the 47 was deleted.**

Instead of counting afterwards how many were left, I made it so that **a wrong operation cannot succeed in the first place**.

### ② I prepared three layers of rollback

| Layer | Means | What it restores |
|:---:|---|---|
| 1 | Platform page history | Contents + URLs, all of it (1st choice) |
| 2 | Duplicate backup taken immediately before the run | Contents (child URLs are newly created) |
| 3 | Local markdown snapshot | Text |

Layer 1 looks sufficient on its own, but I left it as a check item that **history retention differs by plan**. If you never test the premise of the rollback you trust most, you do not have a rollback plan, you have a hope.

### ③ The rehearsal itself nearly destroyed the original

I **scrapped** the plan to rehearse on a whole duplicate of the original.

The reason: put an actual-page tag referring to the original into the duplicate, and **the original's child pages move into the duplicate**. The rehearsal breaks the original.

Instead I built **a mini rehearsal made of a few dummy pages** and judged **a single structural proposition**: do actual blocks survive inside multi-column layouts and toggles? It passed.

> Sometimes the act you meant to verify with is itself the hazard. **Narrow what you need to confirm down to a proposition, and a much smaller, safer experiment can answer it.**

### ④ I avoided the tool's silent losses through ordering

- A particular editing method **silently deletes image blocks** → images go in as part of a single full-replacement operation, and partial edits afterwards are forbidden.
- An attachment uploaded but never attached to a page **expires and disappears** → attachment creation moved out of the preparation stage to **immediately before applying**.
- The source URL for an attachment **expires in 5 minutes** → the procedure states that no other work goes between fetching and uploading.

None of the three were the kind that **raises an error when it fails**; they were the kind that **looks as if it succeeded while the result is empty**.

---

## 6. I split verification into two kinds

| Automatic verification (exhaustive comparison) | Visual verification (cannot be automated) |
|---|---|
| 46 actual pages — down to the count per section | 3-column layout rendering |
| 1 database present | 2 widgets loading |
| 2 inline links (including view parameters) | 8 toggles opening and closing |
| Page icons kept | Mobile display · dark mode contrast |

And among the visual items I **marked mobile display and dark mode contrast as "unverified"**. So that something unchecked is not left looking as though it had been checked.

---

## 7. Process — I narrowed the requirements first

Before building the structure I pinned down the requirements through **5 rounds of structured interviews** (narrowing residual ambiguity to 17%). Then I made **4 mock-ups with genuinely different characters**.

| Mock-up | Structure |
|---|---|
| A | Left sidebar + 2-column body |
| B | Top widget bar + even 3 columns |
| **C (chosen)** | 3 columns — left: visual elements and regulation cards / centre: 8 toggle accordions / right: widgets |
| D | Quick access first — hero + 4 columns |

I put **four side by side and chose between them** rather than building one and fixing it, because information architecture is hard to compare through description and **you have to see the real thing to judge it**. After the choice, the improvements (widget replacement · regulation freshness indicator · new-joiner path) were applied to all 4 mock-ups so that the comparison conditions stayed equal.

---
