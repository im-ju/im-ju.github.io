## Where it stands

An in-house HR system under development. No real employee data has gone in yet: it is a prototype that shows every flow working end to end on a fake company. Whether and when it goes into real use has not been decided.

## What it covers

- **People and org chart**: member records, joining, leaving and leave of absence, personnel orders, reorganisations.
- **Attendance**: clocking in and out, registering field work, remote work and business trips, weekly hours, correction requests.
- **Leave**: requests and approvals, annual-leave balances, leave promotion, compensatory leave.
- **Reviews and recruiting**: review cycles, job postings and interview evaluations.
- **Approval policy and permissions**: approval lines per request type, permission groups.

On PC everything runs in the browser; on phones an installable web app (PWA) covers the frequent tasks: clocking in and out, requests and approvals.

## Principles

- **Company rules are settings.** Leave grants, work types and leave types live in one file with their sources, so the app behaves the company's way rather than a vendor's default.
- **Permissions are decided in one place on the server.** Hiding a button on screen is a convenience; the server decides what is allowed.
- **Everything is fake until real data comes in.** Every name, email and number is made up for the demo.
