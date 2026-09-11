> I replaced the monthly visual check for meal-allowance misuse, which took one person a day or two,
> with a verification engine that encodes the internal regulations clause by clause plus an interactive execution command.
> Running continuously for 5 months since 2026-03.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Regulation interpretation · verification rule design · implementation · monthly operation (solo) |
| **Period** | 2026-03 – live (5 months) |
| **Status** | Run on a monthly schedule · results are executed as actual payroll deductions |
| **Scope** | All employees · 3 usage types per month (lunch, dinner, weekend/holiday) |
| **Stack** | Python 3 · pandas · openpyxl · Claude Code slash command |
| **Size** | Verification engine 876 lines · 1 execution command · output report of 8 sheets |
| **Basis** | Benefits Operating Regulation · Expense Regulation · the meal-card service user guide |

---

## 2. Background — what was the problem

The meal allowance works on a **pay first, verify later** basis. At the start of each month lunch points are topped up for every employee at once, and whether they were actually entitled to spend that money is checked afterwards.

There were three things to check.

- **Lunch** — days taken as annual leave, a business trip, off-site work or remote work are not eligible. I count how many such days there were, and check whether the remaining balance is at least that amount.
- **Dinner** — usable only on days worked past 22:00.
- **Weekend/holiday** — usable only on days with 4 hours (or 8 hours) or more of work.

The problem was that this determination could only be made by **a person visually matching data from two systems**. Usage records exported from the meal-card service (식권대장) and work records exported from the attendance system were reconciled person by person, date by date. All employees × working days × 3 types comes to several thousand determinations a month, and it **took a full day, or two.**

And this work failed quietly. Missing a case simply meant it was never caught, and a wrong catch only surfaced if the person concerned raised an objection.

---

## 3. What I built

**A verification engine (Python), plus one interactive command to run it safely each month.**

### Engine — `verify_meal_allowance.py`

It takes the two Excel files — meal allowance usage and work records — determines outcomes with rules transcribed directly from the regulation clauses, and produces a report of 8 sheets.

| Sheet | What it holds |
|---|---|
| Final summary — deduction targets | Lunch, dinner and weekend deduction amounts per person + **the deduction reason sentence** |
| Lunch verification results | Top-up type · excluded days · minimum remaining amount · actual balance · deduction amount |
| Lunch excluded days detail | Every case of which day was excluded and why |
| Exception handling records | The basis for decisions **not** to deduct |
| Half-day leave without lunch (reference) | Borderline cases |
| Dinner / weekend-holiday verification results | Case-by-case determinations |
| Separate review targets | **Cases the machine cannot determine, handed to a person** |

### Command — `/verify-meal [month]`

The engine has to take the exceptions that change every month as arguments (remote-work exemptions, shift workers, manually approved cases). Remembering and typing those arguments each month is itself a point of failure. So **the command asks first, finds the files, runs, summarises the results, and if any separate review targets come up, asks again and re-runs.**

> The target of the automation was not just the calculation but **the entire execution procedure repeated every month.**

---

## 4. Architecture

```
  [meal-card service]        [attendance system]
  per-user meal allowance    daily attendance report
       │ xlsx                         │ xlsx
       └──────────────┬───────────────┘
                      ▼
         ┌─────────────────────────┐
         │  Normalisation layer    │  unify employee-number format · flag leavers
         │  load_data()            │  fill missing numbers · identify same-name people
         └────────────┬────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   verify_lunch  verify_dinner  verify_weekend
   (excluded-day (22:00         (4h/8h
    count +      cutoff)        cutoff)
    + balance check)
        │             │             │
        └─────────────┼─────────────┘
                      ▼
         ┌─────────────────────────┐
         │  Aggregate · reasons    │  auto-write deduction reason sentences
         │  + guardrail alert      │  detect abnormal full-top-up ratio
         └────────────┬────────────┘
                      ▼
            8-sheet Excel report
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
 deduction execution   separate review → person
```

- The 3 determination routines are independent of each other but **share the normalisation layer**. If employee-number formats do not line up, all three determinations collapse quietly at the same time, so I concentrated normalisation at a single entry point.
- The final branch is the core of this design. What the machine determined and **what it could not determine and handed to a person** are output separately.

---

## 5. The real difficulty was not the calculation

Transcribing the regulation into code was not hard in itself. What made it hold up for 5 months was the following four things.

### ① The input data changes shape every month

The employee-number format in the attendance report differed from month to month. In 2026-05 it was `1.0` with a decimal point, in 06 the integer `1`, in 07 the string `'001'` padded with a leading 0. The meal allowance records stayed in decimal format throughout.

Comparing the raw values gives `'001' != 1`, so **every employee-number join fails.** Yet a failed join raises no error. Name mapping, mid-month joiner inclusion and discretionary-work determination are all disabled at once, and a plausible-looking report comes out.

→ I placed **a standardisation function at a single point before the join**, stripping decimal points and leading 0s from numeric employee numbers while keeping letter-prefixed ones in their original form.

### ② A failed determination disguises itself as "0 won"

The most dangerous failure was not an error but **a deduction amount of 0 won.**

- A person with no record at all in the attendance system → excluded days cannot be counted → deduction 0 → looks normal
- The top-up reason format changes so it is not recognised as a "full top-up" → drops out of the verification scope → deduction 0

The second actually happened in 2026-06. The top-up reason notation changed from the `근무일 N일` family to the format `21일 - 2일 = 19일 x 12,000원`, and the detection regex missed it, so many people were misclassified as partial top-ups.

→ I blocked it in two layers. **(a)** People with no work records are not passed through quietly at a deduction of 0 but promoted to `별도확인대상`. **(b)** If the full top-up ratio falls below 50%, it explicitly warns of "the possibility that the top-up reason format has changed again". A device to make a quiet 0 loud.

### ③ The policy changes mid-course

In 2026-07 the dinner and weekend meal allowance switched to **pay by personal card and claim**. In the same month `간주근로제` (deemed working-hours system) was renamed `재량근로시간제` (discretionary working-hours system), and during the transition both names coexisted in the data.

→ I absorbed the policy change as **a flag** rather than a code change (`--card-only-dinner-weekend`), because re-verifying a past month has to fall back to the regulation as it stood then. Work-type determination was left open to match both names.

### ④ Borderlines are set in the employee's favour

For half-day leave ending in the morning, I also look at the actual clock-in time that day. But because the attendance system **does not allow work overlapping leave hours**, a clock-in punched at 11:59 is recorded as pulled forward to 12:00 sharp, the leave end time.

That is, a `12:00` entry cannot distinguish "punched at 11:59" from "genuinely punched at 12:00".

→ **12:00 sharp is paid** (in the employee's favour), **12:01 and later is deducted**. The snap only pulls times forward, so an entry of 12:01 or later is a confirmed late arrival. I acknowledged the range that cannot be determined, and made an explicit choice about whose side to take within it.

---

## 6. Technical decisions

**① I made the output the "deduction reason sentence", not the deduction amount**
It automatically generates sentences in the form `연차(종일) 2일, 연차(반차) | 3일×12,000-0=36,000`. A deduction is only executable if it can be explained to the person concerned. A report of numbers alone means someone has to go back and find the basis again, so the benefit of the automation is cut off halfway.

**② I kept the exception records separately, as "reasons for not deducting"**
The output of a verification usually holds only what was caught. Here I keep **the decisions not to deduct** on a separate sheet — cases paid despite off-site work because there was an office work record during the lunch hour, cases where a shift worker's partial leave was paid, and so on. When someone later asks "why was this person not caught", there has to be an answer.

**③ I restore the previous month's executed amounts to prevent double deduction**
The previous month's verification result is reflected in the current month's data as a `식대 차감`, lowering the balance. Verifying again in that state deducts twice for the same reason. I determine against a balance with the previous month's deduction reversed, but excluded offsetting deductions within the current month (deduction ↔ re-payment) from the restoration, since their net effect is 0.

**④ I removed month-end expiry and leaver settlement rows from the balance basis**
At month end the balance expires to 0, and for leavers a reset row comes in. Using the last row as the balance as-is makes everyone 0 won and renders the verification meaningless. I take the balance **immediately before** expiry or reset as the basis.

**⑤ I do not exclude upcoming leavers prematurely**
The attendance report arrives with the leaving date already filled in for people leaving the following month. Excluding them as-is means **a whole month of usage records from a normally employed month drops out unverified.** If the leaving date is after the last day of the verification month, they stay in scope.

---

## 7. Results in numbers

| Item | Figure |
|---|---|
| Continuous operation | 5 months (2026-03 – 07) |
| Time required per month | a day or two → **minutes** (around 30 minutes including exception checks) |
| Monthly average subject to deduction | 23 people |
| Report output | 8 sheets per month · every determination basis included |
| Verification rules | 3 types (lunch, dinner, weekend) · 8 or more exception rules |
| Handling of undeterminable cases | Separated out as separate review targets — 0 quiet pass-throughs |

> Monthly deduction headcount and amount figures are internal, so this document carries only a summary. For external submission I recommend removing this item or obtaining company confirmation.

---
