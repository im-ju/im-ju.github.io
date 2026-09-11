> A tool that reads the calendar and automatically prepares the reminder email that goes to the candidate the day before an interview — **as far as the draft**.
> It does not automate sending. That is the most important decision in this project.

---

## 1. At a glance

| | |
|---|---|
| **Role** | Design · implementation · operations (solo) |
| **Period** | 2026-04 – live |
| **Stack** | Google Apps Script · Calendar API · Gmail API · clasp |
| **Size** | 6 source files · 11 commits · integration test suite included |
| **Execution** | 1 time-based trigger each morning · a separate dry-run mode |
| **Coverage** | 3 interview types (phone screening · role interview · culture-fit interview) |

---

## 2. Background — what was the problem

Once an interview is scheduled, a reminder email goes to the candidate the day before. It carries the location, the time, what to bring, and the coordinator's contact details.

The content itself is standardised. But **the template differs by interview type**, several can be scheduled on the same day, and above all **forgetting one directly damages the candidate's experience.**

So this was the kind of task that is "not hard, but must never be missed". Having a person check the calendar every day and handle it by hand **fails on exactly the days that are busy.**

---

## 3. What I built

One set of Apps Script that runs automatically each morning.

```
  Daily morning trigger
        │
        ▼
 ① Fetch tomorrow's events ─ every next-day event in the shared calendar
        │
        ▼
 ② Identify interviews ──── detect the 3 types by title keyword
        │                   (skipped if none match)
        ▼
 ③ Parse candidate details ─ extract name · email from the event description
        │                   ├─ success → on to ④
        │                   └─ failure → into the warning list (not passed over silently)
        ▼
 ④ Duplicate check ─────── skip if a draft with the same subject + recipient exists
        │
        ▼
 ⑤ Create the draft ────── substitute variables into the type's template → Gmail draft
        │                   ※ it does not send
        ▼
 ⑥ Notify the operator ─── send a summary of drafts created + warnings to the running account
```

---

## 4. The most important decision — it does not send

The tool **does not send the email automatically; it goes only as far as the draft.**

Technically, sending would have been easier. With a draft, a person still has to open their mailbox every day, so on the face of it the automation looks less complete. I chose the draft anyway, for these reasons.

- The recipient of this email is **a candidate outside the company**. Unlike an internal notification, **once it goes out wrong it cannot be recalled.**
- Calendar events depend on fields a person fills in by hand. Events whose time has changed, events that were cancelled, events with an incomplete description **exist as a normal matter of course.**
- In other words, this is **a structure where the inputs are not 100% reliable but the output is irreversible.** In that combination, the final human check must not be removed.

> What I automated is "**the writing**"; what I did not automate is "**the judgement to send**".
> Almost all of the burden of the repetitive work sat at the front end, so I took most of the benefit without keeping the risk.

---

## 5. What I did so that failures are not silent

### Parse failures are part of the result

If the candidate's name or email cannot be found in the event description, that case is not simply skipped. **It goes into a warning list with the reason attached, and is carried in the morning summary email.**

If it were only skipped, the result would read "3 drafts created", and nobody would know there had in fact been 4 interviews. **Because an omission looks like a success**, it has to show up in the output.

I also made the subject of the notification email change with the situation — if there are 0 drafts and only warnings, `확인 필요` ("needs review") goes into the subject. A morning where nothing happened and a morning where something is wrong have to be distinguishable in the inbox.

### It tolerates being run more than once

The trigger can fire twice, and the same schedule sometimes lands in the calendar twice. Before creating a draft, it **checks whether a draft with the same subject and recipient already exists**, and if so does not create one. That structurally prevents the same reminder being prepared twice for the same candidate.

### I kept a separate dry-run

I put the path that **only returns what would be created**, without creating any drafts, in its own function. When changing a template or adding a keyword, I see the result first without touching the real mailbox.

---

## 6. How I made it usable by several coordinators

This script had to keep working as the recruiting owner changed or more of them were added.

**① It finds the calendar by name, not by ID**
Calendar IDs differ per account, so hard-coding an ID means it will not work from another coordinator's account. Looking it up by name means the same code runs **from any account subscribed to that calendar**. If it cannot be found, it fails explicitly with the message that the running account must have access to this shared calendar — it does not quietly return 0 results.

**② It resolves the notification recipient at run time**
The summary email goes not to a fixed address but to **the account that is running the script**. The drafts are created in the running account's mailbox, so the notification has to reach the same person. Nothing needs reconfiguring when the owner changes.

**③ I pulled the interview-type keywords out into configuration**
Type detection is title-keyword matching, and the keyword list lives in one configuration file. Variant spellings (with or without a space, the English form) sit in the array alongside, so when a new spelling appears I add a line to the list rather than to the code.

---

## 7. Results in numbers

| Item | Figure |
|---|---|
| Interview types supported | 3 types · a dedicated template per type |
| What a person did daily | check the calendar → identify the type → pick the template → write → send |
| What remains after automation | **review the draft, then click send** |
| Omission prevention | parse failures promoted to warnings and included in the summary email |
| Risk of duplicate sending | structurally blocked by the draft duplicate check |
| Multiple operators | supported by calendar lookup by name and notification based on the running account |

---

