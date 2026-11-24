## My role

I am the product owner (PO). I decide what gets built and run it myself, from wireframes to build.

For the parts an HR person cannot decide alone, I asked other teams to work with me. Before going to them, I looked up the relevant statutes and case law, wrote them up, and brought that to each team.

- **Development team**: advice on system structure and database setup, and code review
- **Security team**: sign-in, permissions and security settings
- **Infrastructure team**: where the server lives, and how door-access records feed attendance

What we decide after hearing each team is written down, so the reason behind each choice can be checked later.

## Goal

A company-wide test by the end of 2026. The screens for every feature below are designed, and for now every flow can be demoed on fake data, with no real employee data.

## What it covers

- **People and org chart**: member records with change history, joining and leaving checklists, leave of absence, personnel orders, certificates, reorganisations
- **Attendance**: clocking in and out, registering field work, remote work and business trips, weekly hours, team view, correction requests and approvals, monthly closing
- **Leave**: requests and approvals, annual-leave balances, leave promotion, compensatory leave
- **Reviews and recruiting**: review cycles and their progress, job postings, candidate stages, interview evaluations
- **Approval policy and permissions**: approval lines per request type, requests opened straight from a notification with comments and mentions, permission groups
- **Statistics and audit log**: headcount and attendance statistics, Excel export, and an audit log of who viewed or changed what, and when

On PC everything runs in the browser; on phones an installable web app covers the frequent tasks: clocking in and out, requests and approvals.

## Principles

- **Company rules are settings.** Leave grants, work types and leave types live in one file with their sources, so the app behaves the company's way rather than a vendor's default.
- **Permissions are decided in one place on the server.** Hiding a button on screen is a convenience; the server decides what is allowed.
- **Everything is fake until real data comes in.** Every name, email and number is made up for the demo.

## What I learned

With AI getting better, I can now build a fair amount of what I picture myself, by describing it to an AI that writes the code ("vibe coding"). But taking it to a level the whole company can rely on needed help from several departments. Being able to build something is not the same as being able to run it, and I reminded myself not to get overconfident.
