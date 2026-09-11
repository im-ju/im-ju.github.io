> I took an Asset Management Regulation untouched for more than 2 years, pulled it apart through three lenses — legal, tax and information security — and rewrote it in full,
> **then used the standard newly defined in that regulation** to select the obsolete assets actually due for replacement.
> A project where writing a regulation and judging with data became one thing.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Analysis of the current regulation · drafting the revision · document generation automation · replacement-candidate analysis (solo) |
| **Period** | 2026-03 |
| **Deliverables** | Revised regulation body · revision history document · 3 annexes · replacement-candidate recommendation report |
| **Stack** | Python · python-docx (document generation) · Excel asset register analysis |
| **Scale of the rewrite** | **15 items** of priority [High] applied · 3 new clauses · 1 new annex |
| **Approval** | CEO |

---

## 2. Background — what was the problem

The regulation in force was the 2023-11 revision. In the meantime the company had grown, assets had multiplied, and above all **situations the regulation did not cover kept coming up in day-to-day practice**.

Concretely, these were the gaps.

- **When a leaver returned equipment**, the regulation said nothing about whether the data had been wiped or account permissions revoked. In practice we were doing it, but **there was no clause to point to.**
- **When an asset was lost or damaged**, how much was to be compensated and by what method was vague, and deducting it unilaterally from pay **could have been a legal problem.**
- **There was no standard for "obsolete equipment."** Every replacement request was judged individually.
- The regulation covered "rental assets" and "intangible assets (SW licences, SaaS)", but there were no rental assets in reality and intangible assets belonged to information security. **The regulation did not match what was actually being managed.**

---

## 3. How I approached it — I split it into three lenses

Instead of reading the regulation end to end looking for "things to fix", I **swept it separately through three lenses of different character** and sorted what came out by priority.

| Lens | What I looked at | Representative outcome |
|---|---|---|
| **Legal / tax** | Wage deduction under the Labor Standards Act · useful life under the Corporate Tax Act · tax treatment on disposal | Wrote in the principle that wages cannot be deducted unilaterally, added a useful-life table, set out the tax procedure on disposal |
| **Information security** | Data handling on leaving, return and disposal · endpoint security settings | Duty to erase data completely, duty to encrypt disks, automatic screen lock, procedure for revoking account permissions |
| **Regulation structure / practice** | Missing definitions · gaps in procedure · mismatch between forms and clauses | New definitions of asset register, available stock, obsolescence and return confirmation form; issuance/recovery procedures broken into steps |

I split it this way because **one person reading it once only sees the problems in the lens they are used to**. A practitioner sees gaps in procedure, legal sees where liability lands, security sees the data. Reading it three times over produced 15 items at three different levels.

Of those, I applied the 15 [High] items in this rewrite and **left the rest in the document as "to review in the next revision" items.** That avoided the rewrite itself being delayed by trying to fix everything at once.

---

## 4. What I changed — the essentials

### New definitions (what made the regulation able to speak)

| Term | Definition | Why it was needed |
|---|---|---|
| **Asset register** | The electronic document recording and managing the status of held assets | So a clause can point at where "shall be recorded" actually lands |
| **Available stock** | Assets that have been wiped and inspected after recovery and are **ready to be issued again** | To separate recovered items from issuable items |
| **Obsolescence** | **4 years elapsed** from the purchase date (basis in the Enforcement Rules of the Corporate Tax Act stated explicitly) | To move replacement decisions from individual discretion to a standard |
| **Asset Return Confirmation Form** | A form covering the returned items, the reason, and **confirmation of data erasure** | The basis for the leaver return procedure |

### New clauses

- **Article 11-2 [Loss and Theft]** — a situation entirely absent from the previous regulation
- **Article 12 [Data Security]** — expanded the 1 existing "data backup" paragraph into security as a whole. It now covers the duty to erase, disk encryption (specified per operating system), and even the automatic screen lock interval
- **Article 19-2 [Measures for Breach of the Regulation]** — without measures for a breach, a regulation is a recommendation, not a regulation

### I broke procedures into steps

Issuance was one line: "an acceptance confirmation form shall be obtained." I set it out as 4 steps — **issuance request → stock check → acceptance confirmation form completed (physical condition recorded) → recorded in the asset register** — and stated the principle that for new joiners issuance is completed **by the start date**.

Recovery likewise got clauses for the **return deadline (by the last working day)** and **3 security measures (data erasure / revocation of system access / recorded in the return confirmation form)**.

### I closed the legal risk explicitly

I changed the compensation standard so that it **varies by degree of fault in tiers**, and wrote in the principle that **it cannot be deducted unilaterally from wages or severance pay and can only be claimed through a separate compensation agreement**. This is a clause that chose legal soundness over practical convenience.

### I aligned the forms (annexes) with the clauses

If you only fix the clauses, the paper people use on the ground stays the same and nothing changes. I added asset classification checkboxes and a **condition-on-acceptance field** to the acceptance confirmation form, and **a data-erasure confirmation field and an account-revocation confirmation field (including a security officer's signature)** to the return confirmation form. The **Asset Classification and Useful Life Table** was created from scratch.

---

## 5. I generated the documents with code

I produced the revised regulation body and the revision history document **with scripts rather than editing the Word files directly**.

```
  Regulation body defined (code)      Revision log defined (code)
        │                                   │
        ▼                                   ▼
  generate_docx.py                  generate_history_docx.py
        │  ├ Article/paragraph/item hierarchy style functions
        │  ├ table border and shading helpers
        │  └ cover, document history, body, annex assembly
        ▼                                   ▼
   revised regulation .docx           revision history .docx
```

**Why I did it this way.**

- A regulation document has an **Article → paragraph → item** hierarchy, and the indentation and numbering scheme has to stay consistent at every level. Edit it by hand and it will drift, and finding where it drifted costs more than the edit.
- A rewrite does not finish in one pass. Review comments come back and **you regenerate it several times.** Fixing it by hand each time creates new inconsistencies each time.
- For each clause I **left the reason for the change alongside it as a code comment.** The rationale for the revision sits next to the deliverable rather than in someone's memory outside the document.

The result is that the revised text and the revision history are **two deliverables from the same source**, so they cannot contradict each other.

---

## 6. I used the regulation to make a real decision — selecting replacement candidates

I applied the **obsolescence (4 years from the purchase date)** standard defined in the rewrite to the asset register and selected the obsolete laptops due for replacement.

**Selection criteria** (reflecting the brief from leadership)

| Item | Criterion |
|---|---|
| Job family | Senior engineering roles first |
| Asset age | 2~3 years or more |
| Spec | Memory 16GB or less |
| Excluded | Disused assets · people already replaced |

**I submitted it in Tiers.** Instead of putting everything in a single ranked list, I layered it into top priority and next priority, so that **whatever the budget turned out to be, you could cut from the top down.** I recommended 17 people in total, and showed asset age and **the individual's own period of use** separately — because the same 4-year-old machine is a different thing when one person has used it from the start and when it was handed over partway through.

As a by-product I found **cases where a replacement had been completed but the old machine had never been returned**, and reported those as well. It surfaced from checking against the asset register, and gaps exactly like that were why I put the return procedure into clauses in §4.

---

## 7. The shape of this project — regulation and data came full circle

```
   A problem recurring in day-to-day practice
            │
            ▼
   Analysis through 3 lenses (legal/tax / security / structure and practice)
            │
            ▼
   Regulation rewrite ── standards like "obsolescence = 4 years" fixed as definitions
            │
            ▼
   That standard applied to the asset register ── 17 replacement candidates selected
            │
            ▼
   A new problem found while applying it (unreturned assets)
            │
            └──► on to the next revision
```

> What makes this project real is that **I did not stop at the regulation as a document but used it to make an actual decision**.
> Without a standard every decision becomes case-by-case judgement, and without making a decision you cannot tell whether the standard matches reality.

---

