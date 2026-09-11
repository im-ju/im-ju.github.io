> An attendance-data analysis tool that finds long-absence patterns in access-control
> terminal logs, but **spends most of its design on filtering out false positives**.
> Used for the 3-month analysis covering 2026-01 to 03.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Analysis design · implementation · review of results (solo) |
| **Period** | 2026-03 (retrospective analysis of 3 months) |
| **Stack** | Python 3 · pandas · numpy · openpyxl |
| **Size** | Analysis script about 250 lines + monthly consolidation script |
| **Input** | Raw access terminal logs (employee number · timestamp · terminal ID) |
| **Output** | Anomalous-absence detail + per-person summary (monthly / consolidated) |

---

## 2. Background — what was the problem

The attendance system records **clock-in and clock-out**. It does not record what happened in between.

The access-control terminals, on the other hand, record **every passage**. In other words, the trace of someone leaving during working hours and coming back exists only here. The request was to use this data to find out the real state of "long absences from desk".

The problem was that counting this data as it stands makes **almost all of it false positives**.

- Records of stepping just outside the door and coming straight back in
- Short movements such as a cigarette break or picking up a delivery
- And decisively — **cases that look like someone went outside but where they were in fact still inside the building**

And this analysis carried a different kind of risk. The output is **a list that names specific individuals**. A single false positive is not a statistical error but **unfounded suspicion directed at one person**.

> So the design goal of this tool was not "find as many as possible" but "**do not point at the wrong person**".

---

## 3. What I built

A script that takes the raw logs, extracts **anomalous absence sessions**, and exports them as two sheets: a detail list and a per-person summary.

```
Raw logs (all passage records)
        │
        ▼
 ① Narrow the scope ── limited to the 2 main access terminals · after 16:00
        │
        ▼
 ② Build sessions ── pair exit → entry, scanned sequentially per person and per day
        │         ├─ re-entry within 5 minutes = noise → discard both records
        │         └─ also record the final exit time of that day after the return
        ▼
 ③ Anomaly determination ── keep only absences over 60 minutes
        │
        ▼
 ④ Remove false positives ── exclude if there is activity on another terminal
        │                     between the exit and the entry
        │                     (= evidence that the person was inside the building)
        ▼
 ⑤ Consistency check ── detail count == summary total, fail immediately on mismatch
        │
        ▼
   Detail list + per-person summary (Excel, 2 sheets)
```

---

## 4. The core of the design is stage 4 — removing false positives

Up to the anomaly determination (stage 3) it is simple. **Stage 4, which tears down what has just been determined**, is the substance of this tool.

Looking only at the two main-entrance terminals it looks like the person "went out", but there are several other terminals inside the company. **If a passage record on another terminal exists in the time window between the exit record and the entry record, it means that person was inside the building at that time.** It is counter-evidence that the determination made from the main-entrance records alone was wrong.

So for a session already determined to be "anomalous", I look up that same person's activity on other terminals in that time window in reverse, and **if evidence turns up, I take it off the list.**

This filter is a stage that negates the determination it made itself, and for that reason I made it **always print the number of removals to the execution log**. Because the reliability indicator of this analysis is not how many cases it caught but **how many cases it cancelled**.

---

## 5. Why I exposed the determination criteria as constants

I gathered four thresholds as constants at the top of the code.

| Constant | Value | Meaning |
|---|---|---|
| Analysis start time | 16:00 | Only records after this time are considered |
| Noise threshold | 5 min | Re-entry within this is not counted as an absence |
| Anomaly threshold | 60 min | Must be exceeded to be treated as anomalous |
| Internal-activity filter | on | Exclude if there is intermediate terminal activity |

These numbers are **operating policy, not technically optimal values**. "From how many minutes do we treat it as an absence" is not something the data decides but something the company decides.

So rather than scattering them through the code I collected them in one place and gave them names, and made every run **print the criteria applied on the first line of the console**. The answer has to be there before the person reading the results asks "on what basis was this extracted".

---

## 6. Technical decisions

**① I handled session pairing as a sequential scan per person and per day**
In access logs one person goes out and comes back several times a day. When an exit is met, the nearest entry after it is found, and once a pair is established the scan resumes from that point. A noise pair has **both records discarded** and the scan resumes after them — because mis-pairing the entry of a noise pair with a different exit would manufacture an absence that never happened.

**② I recorded the final exit time after the return alongside it**
"Left at this time, came back at that time" alone makes judgement difficult. Only with when they left for the day after returning does the character of that absence become visible. It is a column I added **for a person to look at during review**, not for the determination.

**③ I enforced consistency between detail and summary with an assert**
If the total count in the summary sheet differs from the number of detail rows, it fails immediately. A report whose two sheets have quietly drifted apart is worse than a wrong report — because you cannot tell which side is right.

**④ Input files are detected automatically, but it asks when ambiguous**
It recognises files automatically by naming convention, and if there are several candidates it shows the list and lets you choose. If there are none, it stops execution. When you repeat the same task every month, **quietly running on the wrong file** is the most common failure.

---

## 7. Results in numbers

| Item | Figure |
|---|---|
| Analysis period | 2026-01 ~ 03 (3 months) |
| Final anomalous absences | 39 |
| People involved | 20 (deduplicated) |
| Deliverables | 3 monthly reports + 1 consolidated 3-month report |
| Filter stages | 2 stages (noise pairs + internal-activity counter-evidence) |

> Information on individual subjects is not included in this document. The original output is internal material for HR purposes.

---

## 8. Limitations of this tool — written into the documentation alongside it

- Access logs **carry no intent.** The fact that someone was away from their desk for 60 minutes or more, and whether that is a problem, are separate things. This tool **only narrows down what to check; it does not judge.**
- Movements that do not pass a terminal (entering alongside someone else, for instance) are simply not in the data to begin with. That is, **omissions exist structurally**, and this list is not a complete list.
- So I named the output not "a list of violators" but "**cases that need checking**".

---

