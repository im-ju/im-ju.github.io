## Results

Writing reminder emails the day before interviews has shrunk to "check the draft and press send".

- **Five steps → one.** Checking the calendar, working out the interview type, choosing the template, writing and sending used to be done by hand every day. Now it is just checking the draft and sending it.
- **3 interview types.** Phone screening, role interview and culture-fit interview each have their own template.
- **Runs automatically every morning.** In use since April 2026.

## The problem

When an interview is booked, the candidate gets an email the day before with the location, the time, what to bring and who to contact. The content is fixed, but each interview type has its own template, and there can be several interviews in one day.

It was not hard, but it could never be missed. A missed email hurts the candidate experience right away. And a person checking the calendar every day tends to fail on exactly the busiest day.

## What I did

**I had it prepare drafts every morning.** I wrote a small program that runs inside Google's work tools (Google Apps Script). Every morning it reads the next day's events in the shared calendar, uses each title to tell whether it is an interview and of what type, finds the candidate's name and email in the event description, and creates a Gmail draft from the right template. When it is done, it sends a summary email saying how many drafts it made.

**It shows the events it could not read.** If it cannot find the candidate's name or email in the description, it does not just skip the event; it lists it as a warning, with the reason, in the morning summary. If it simply skipped, the summary would say "3 drafts created" and nobody would know there were actually 4 interviews. A missing case looks like success, so it has to be visible. On days with warnings, the summary's subject line gets "needs checking", so a normal morning and a problem morning look different in the inbox.

**The same draft is never created twice.** Sometimes the program runs twice, or the same event appears twice in the calendar. Before creating a draft, it checks whether a draft with the same subject and recipient already exists, and if so, it does not create another.

**It can preview without touching the real mailbox.** When changing a template or adding words for spotting interview types, there is a separate way to run it that shows what would be created without actually creating any drafts.

**It keeps working when the person in charge changes.** So that nothing needs reconfiguring when the recruiting coordinator changes or more people join, I did three things:

- It finds the calendar by name, not by an ID that differs from account to account. Anyone whose account subscribes to that calendar can run it. If it cannot find the calendar, it stops with the message "the account running this must have access to the shared calendar". It does not quietly finish with zero drafts.
- The summary email goes not to a fixed address but to whoever is running the program, because the drafts are created in that person's mailbox too.
- The list of words used to spot interview types is kept in one place. When the spelling varies, for example with spacing or English words, you add a line to the list instead of changing the code.

## What I chose not to do

**I did not have it send emails automatically.** This is the most important decision in the project. Technically, sending is easier, and stopping at drafts looks less automated, because a person still has to open the mailbox every day. I stopped at drafts for three reasons:

- The recipients are applicants outside the company. Unlike an internal alert, a wrong email cannot be taken back.
- The calendar is filled in by hand. There are always events whose time changed, that were cancelled, or whose description is incomplete.
- When the input is not 100% reliable and the result cannot be undone, the final human check must not be removed.

What I automated is the writing; what I left to a person is the decision to send. Almost all of the repetitive burden was in the writing, so it captures most of the benefit without taking on the risk.
