## My role

I am the product owner (PO). I decide what gets built and run it myself, from wireframes to build.

For the parts an HR person cannot decide alone, I asked other teams to work with me:

- **Development team**: advice on system structure and database setup, and code review
- **Security team**: sign-in, permissions and security settings
- **Infrastructure team**: where the server lives, and how door-access records feed attendance

What we decide after hearing each team is written down, so the reason behind each choice can be checked later.

## Goal

A company-wide test by the end of 2026. For now, every flow can be demoed on fake data, with no real employee data.

## What it covers

- **People and org chart**: member records, joining, leaving and leave of absence, personnel orders, reorganisations
- **Attendance**: clocking in and out, registering field work, remote work and business trips, weekly hours, correction requests
- **Leave**: requests and approvals, annual-leave balances, leave promotion, compensatory leave
- **Reviews and recruiting**: review cycles, job postings and interview evaluations
- **Approval policy and permissions**: approval lines per request type, permission groups

On PC everything runs in the browser; on phones an installable web app covers the frequent tasks: clocking in and out, requests and approvals.

## Principles

- **Company rules are settings.** Leave grants, work types and leave types live in one file with their sources, so the app behaves the company's way rather than a vendor's default.
- **Permissions are decided in one place on the server.** Hiding a button on screen is a convenience; the server decides what is allowed.
- **Everything is fake until real data comes in.** Every name, email and number is made up for the demo.
