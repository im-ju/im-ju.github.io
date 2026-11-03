## Results

As the HR and general-affairs person, I built my team's repetitive work into a web app myself, and it has been running for all staff since March 2026.

- **Running without interruption since March 2026.** There have been no outages.
- **2 internal apps → 1, with 6 features.** Work that lived in a calendar, a separate web app, Google Sheets and Excel moved into one place.
- **All 978 automated tests pass.** These are checks in which the program verifies on its own that each feature works.

The data moved over includes a member list of about 90 people, 337 partner restaurants and 66 training-allowance spending records. I have not measured how many people actually use it or how often, though. About 90 is the size of the list the Hub manages, not the number of people who use it every day.

## The problem

HR and general-affairs work was spread across four places:

- To see meeting-room bookings, someone had to scan the Google Calendar by eye.
- Team draws for company events such as blind lunches needed a separate web app.
- The training allowance ran on Google Sheets, and two numbers in the sheet disagreed with each other.
- The member list, the org chart and the partner-restaurant list were passed around as Excel files.

They had two things in common. People redid the same work by hand every month, and when something was wrong, nobody noticed.

## What I did

**I merged six jobs into one web app.** Sign in once with your company Google account and you can use all of them.

- **Meeting rooms**: rooms in use now, today's schedule, usage statistics and suggestions for a free room. Replaces scanning the calendar by eye.
- **Event team draws**: splits up people from the same team or who met recently, and respects "together" and "apart" requests. Replaces the separate web app.
- **Member directory**: the full staff list and org chart. Replaces the Excel files going around.
- **Partner restaurants**: search 337 meal-card partner restaurants by type, area or distance from the office.
- **Training allowance**: your own limit, remaining balance and spending history, plus company-wide spending for admins. Replaces the Google Sheet.
- **Birthdays and work anniversaries**: posts this month's birthdays and work anniversaries to Slack every morning. Replaces people having to remember.

**I tied sign-in to the company account.** If you do not know who came in, you cannot control access or check anything later. There are only two access levels, regular staff and admin, and every feature checks access on its own, so adding a new screen cannot skip the check.

**I left notifications to Slack, not a dashboard.** Nobody keeps a dashboard open all day. The web app keeps the records and does the managing; delivery goes through the channel people already watch. Automatic alerts can fail without anyone noticing, so I guarded against three things: the same alert is never sent twice, a skipped day is caught up on the next run, and the date the last alert went out is shown separately, so that if the alerts themselves stop, it shows.

**AI wrote the code; I made the decisions and did the checking.** Most of the code was written by an AI tool (Claude Code), and I do not hide that. My part was deciding what to build and what not to build, setting the training-allowance limit rules by checking them clause by clause against the company regulation, deciding the data structure and access levels, and deciding when to release a change to the live service or roll it back. I also designed how the AI's output gets checked. Every change goes through two AI reviews (design and security) kept separate from the AI that wrote it, and every time these reviews caught problems of medium severity or higher.

Once, the two reviews reached opposite conclusions, and I settled it by running an experiment myself. The question was whether an operation that replaces a whole set of data at once is guaranteed to be "all or nothing". Tested one at a time, it happened to pass; the problem only showed up when several operations ran at the same time. Left as it was, the old data could have been deleted without the new data going in, leaving the live service with zero records.

**I made "what checks that statement?" a rule.** I noticed the same kind of mistake six times in one day. For example:

- The on-screen message said "we will send it again on the next working day", but the next working day's run did not actually pick up the missed day.
- A change was reported as "checked by eye on the preview screen", but that preview was running code 2,426 lines behind the live service.
- A document said "locations collected for all 337 restaurants", but a count found 334.

In each case, something nothing could actually check was stated as fact, and it went unnoticed for a long time. So now, whenever I write an on-screen message, a number in a document or a promise, I decide at the same time what will check it, and if nothing can, I word it more cautiously. The rule paid off. Because the alert time had not been confirmed, I had already changed the message from "09:00" to "in the morning". Later it turned out that a limit of the service plan made sending at an exact time impossible. There was nothing to fix.

**I kept testing separate from the real data.** So that testing on my own computer never touches the live service's data, I set up a separate test copy and a separate test sign-in. If it is accidentally connected to the real data, the test server refuses to start at all.

## What I chose not to do

**I left out a map feature I had already finished.** I completed a partner-restaurant map, but using it would have meant registering the company domain in an outside service's admin console. I judged that the convenience of a map was not worth that burden and left it out. Sorting by "closest to the office" needed no such registration, so most of what was needed came without the map.

**I did not split it into a complex structure.** When merging the two apps, I considered splitting them into several pieces run separately, but merged them into one app instead. Both apps were already built with the same technology, so the only genuinely hard part was merging the sign-in. At the scale of an internal tool, a complex structure only adds maintenance burden.

**I did not add more access levels.** There was a proposal for five roles, but the only distinction actually needed was regular staff and admin.

**I did not put unconfirmed promises on screen.** As with "09:00 → in the morning" above, times or numbers I had not confirmed could be kept were worded cautiously or left out.
