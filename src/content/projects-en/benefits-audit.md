> An audit tool that finds **numbers that disagree with each other** in a training allowance scheme run on Google Sheets.
> It never modifies the data; it only finds problems and writes them to a separate tab.
> This diagnosis later became the basis for migrating into an internal web app.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Regulation interpretation · check-rule design · implementation (solo) |
| **Period** | 2026-06 |
| **Stack** | Google Apps Script · Spreadsheet API |
| **Size** | 306 lines · 8 checks · 3 severity levels |
| **Nature** | **READ-ONLY** — does not modify a single cell of the source data |
| **Basis** | Benefits Operating Regulation article 7 · expense regulation |
| **Follow-up** | The problems confirmed here became the basis for the decision to migrate into an internal web app |

---

## 2. Background — what was the problem

The training allowance has a **monthly limit and an annual limit** per person, a fixed set of eligible categories, and payments made before the end of the probation period are not eligible. In other words, it is **a fairly tightly specified scheme**.

But it was being run on Google Sheets. Inside the spreadsheet were three tables of different kinds.

- **Member DB** — name, hire date, probation end date, department, annual limit
- **Spend records** — payment date, name, category, amount, approval status
- **Team limits table** — team name, limit

The three tables were **linked by nothing but the name and team-name strings**. And it was a document people edited by hand every day.

So the following could happen quietly.

- **If two people share a name**, there is no way to tell whose the "Hong Gil-dong" in the spend records is. Two people's spending is added up against one person.
- **If a department name differs from the team limits table by even one character**, that person drops out of the team roll-up entirely.
- **If a payment date is entered in a format not recognised as a date**, it disappears from the monthly roll-up.
- And in all of these cases **the spreadsheet says nothing.** The totals still show a plausible-looking number.

In practice, two numbers inside the spreadsheet had been left disagreeing with each other. The problem was not "it is wrong" but "**nobody can tell whether it is wrong**".

---

## 3. What I built

Opening the spreadsheet adds a **custom menu**, and pressing "Run integrity audit" there stacks the check results in a dedicated tab.

```
  Google Sheets (edited by people daily)
   ├ Member DB
   ├ Spend records
   └ Team limits table
          │
          │  ← reads only
          ▼
   ┌────────────────────────────────────┐
   │  Auto-detect table position        │  found by header signature
   │  locateTable_()                    │  (works even if the sheet structure changes)
   └─────────────────┬──────────────────┘
                     ▼
   ┌────────────────────────────────────┐
   │  Run the 8 checks                  │
   │  structure · matching · regulation │
   └─────────────────┬──────────────────┘
                     ▼
   🔍 Integrity_Audit tab ── severity · area · row number · description
```

### Checks

| Severity | Item | What is at risk |
|:---:|---|---|
| 🔴 | Shared names exist | Name matching does not hold → **a unique ID is needed** |
| 🔴 | Spend entries referring to a shared name | Impossible to determine whose spending it is |
| 🔴 | Monthly limit exceeded | Spending in breach of the regulation |
| 🔴 | Annual limit exceeded | The per-person annual limit applies first |
| 🟠 | Missing department / team name mismatch | **Silently dropped from the team roll-up** |
| 🟠 | Unknown category | Outside the 5 categories the regulation covers |
| 🟠 | Payment date not recognised as a date | Disappears from the monthly roll-up |
| 🟠 | Payment before the end of the probation period | Excluded under the regulation — needs a check for exceptional approval |
| 🟡 | Disbursement date not recognised | No effect on the roll-up, but hard to trace |

Each item records **which row it was found in** and **why it is a problem**, as a sentence. Not "2 shared names" but "**this name is shared, so matching spend records by name alone can mix up the amounts used**". The person reading the audit result has to be able to act on it straight away.

---

## 4. Three things I paid attention to in the design

### ① It never modifies the data

This tool **does not modify a single cell of the source data.** Findings are written only to a dedicated report tab. I stated that in the comment at the top of the file.

The reason is simple. **This spreadsheet is not mine.** It is an operational document that several people edit every day, and the moment a script that changes values automatically is attached to it, nobody can trust the spreadsheet any more. Creating "values nobody knows who changed" is worse than the current problem (broken integrity).

I did not mix the diagnosis tool with a correction tool. **Finding and fixing are different jobs, and the judgement about fixing is a person's.**

### ② It does not pin down the table position

If you hard-code the table positions in the sheet as coordinates, the moment somebody inserts a single row the script reads the wrong data. And it **produces a result with no error**.

So it **finds the tables by header signature.** If `성명·입사일·부서` are all in one row, that is the member DB; if `결제일·성명·카테고리` are there, that is the spend records. It scans part of the top of the sheet to find them automatically, and **if it cannot find them, it records that fact itself as a 🔴 finding.**

Columns are likewise found by partial match on the header name rather than by order. It holds up even if someone moves a column or changes a name slightly. **Code that reads a document people edit has to stand on the premise that the document changes.**

### ③ I attached the regulatory basis to the code

The limit amounts, the eligible categories and the probation-period exclusion principle are all **values that come from the regulation**. So I wrote the basis clauses (Benefits article 7 / expense regulation) at the top of the file and separated the limits and categories out as **named constants**.

If the regulation changes there is one place to fix, and **why that number is what it is** sits inside the code.

---

## 5. What this tool actually did — it became the basis for the migration

What the audit result showed was not individual errors but a **structural limit**.

- The shared-name problem **cannot in principle be solved in a spreadsheet.** It needs a unique ID, and that is a database's job, not a spreadsheet's.
- Team-name string mismatches are the same in nature. They will keep happening in **a store with no referential integrity**.
- Date format problems likewise recur in free-entry cells.

So the tool told us "how many entries are wrong right now" and at the same time proved "**this approach will keep being wrong**".

> So the next step was not to manage the spreadsheet better, but **to move training allowance management into an internal web app**.
> The features covering personal limits, remaining balance and usage history, plus the company-wide spend rate, were later implemented in the internal consolidation platform (HR/GA Hub).

**I diagnosed before fixing, and the diagnosis became the basis for the migration decision.**

---

