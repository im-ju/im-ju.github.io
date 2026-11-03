## Results

The monthly meal-allowance check, which used to take one to two days, now takes minutes. The results feed directly into actual payroll deductions.

- **One to two days → minutes.** About 30 minutes even including the exceptions.
- **Run every month without a miss.** Not a single month skipped since March 2026.
- **3 rules, 8+ exceptions.** The eligibility rules for lunch, dinner and weekends, and the exceptions where nothing should be deducted, all taken from the regulation.

## The problem

The meal allowance is paid first and checked afterwards. At the start of each month, lunch points are loaded for every employee at once, and whether each person was entitled to spend them is checked separately at the end of the month. There are three things to check:

- **Lunch**: not covered on days of annual leave, business trips, off-site work or remote work. The check is whether enough balance is left unspent for those days.
- **Dinner**: only on days the person worked past 22:00.
- **Weekends and holidays**: only on days the person worked 4 (or 8) hours or more.

Making these calls meant matching meal-card usage against attendance records by eye, person by person and day by day. It was thousands of records a month and took a full day, sometimes two. Worse, mistakes did not show. A missed case simply went uncaught, and a wrong one only came to light if the person concerned objected.

## What I did

**I turned the regulation into rules.** I converted the eligibility requirements in the benefits regulation and the expense regulation into rules, clause by clause. Feed in two Excel files, meal-card usage and attendance records, and the rules compare them person by person and day by day and produce an Excel report.

**It writes the reason for each deduction, not just the amount.** With only a number, the person handling it has to dig up the grounds again, and the automation stops halfway. So for each person it automatically writes a sentence stating which days were deducted, why, and how the amount was calculated. That sentence can be shown to the person as it is, and the deduction made.

**Nothing is deducted twice.** Last month's deduction flows into this month's balance. Checked as it is, the same reason would be deducted twice. So the check works from the balance with last month's deduction added back. Records of leftover points expiring at month-end and leaver settlement records are also left out of the balance calculation. Left in, they would make everyone's balance look like zero, and the check would be meaningless.

**It absorbs data whose format changes every month.** Employee numbers in the attendance records switched from month to month between `1.0`, `1` and `001`. When the format differs, the same person is treated as two different people, and no error appears; you just get believable results. So the very first step puts every employee number into one format before any matching.

**It warns when the results look odd.** In June 2026, the wording of the top-up reason changed, so people who had received a full month's points were classed as not having received them and dropped out of the check. Since then, if the share of people who received a full month's points falls below half, it warns that "the format may have changed again".

**When the regulation changes, you choose instead of editing the program.** In July 2026, dinner and weekend meals switched to paying with a personal card and claiming the cost afterwards. Instead of changing the program every time the regulation changes, you choose which version of the regulation to apply when you run it. Re-checking a past month runs on that month's regulation.

**I bundled the monthly routine too.** Remembering and entering the exceptions that change every month (remote-work exceptions, shift workers, cases the coordinator already cleared) was itself where mistakes happened. I made a single command in an AI tool (Claude Code) that asks for the exceptions first, finds the files, runs the check and summarises the results; if anything needs a person's review, it asks again and re-runs.

## What I chose not to do

**I did not let undecidable cases pass as zero.** The most dangerous failure was not an error but a deduction of zero. Someone with no attendance records at all has no days that can be counted for deduction, so they come out at zero, and zero looks normal. These cases are collected in a separate review list and handed to a person.

**I did not keep only the people who were caught.** Decisions not to deduct are recorded too, such as paying someone who was off-site but had an office attendance record over lunch, or paying a shift worker despite partial leave. If anyone later asks "why wasn't this person caught?", there is an answer.

**I did not drop upcoming leavers early.** The attendance records already show the leaving date of people who leave next month. Dropping them on sight would wave through a whole month of normal work without any check. If the leaving date falls after the month being checked, the person stays in.

**I did not decide borderline cases against the employee.** On days with a morning half-day off, the actual arrival time is also checked. But the attendance system does not record arrivals that overlap with leave hours, so arriving at 11:59 is recorded as 12:00, when the leave ends. A 12:00 record alone cannot show whether the person arrived on time, so I decided that exactly 12:00 is paid and deductions start from 12:01.
