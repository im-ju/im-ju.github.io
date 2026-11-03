## Results

The sheet went from a state where nobody could tell whether it was right to one where a list shows which row is wrong and why. That diagnosis then became the case for moving the training allowance into the internal web app (HR/GA Hub).

- **8 checks based on the regulation.** It looks for people with the same name, limits exceeded, team-name mismatches, date errors and more.
- **3 levels of severity.** Fix now, breaks the totals, or only makes tracking harder.
- **0 cells changed in the source.** The tool only reads the sheet and writes its results to a separate tab.

## The problem

The training allowance is a benefit with fairly detailed rules. Each person has a monthly and a yearly limit, only certain items are covered, and anything paid for before the probation period ends is not covered.

Yet it was run on Google Sheets. The sheet held three tables (the member list, the spending records and a table of limits by team), and they were linked only by the text of names and team names. On top of that, several people edited it by hand every day. So things like this could happen without anyone noticing:

- If two people share a name, nobody can tell which one a spending record belongs to, so both people's spending is added up under one person.
- If a department name differs by a single character from the team-limit table, that person drops out of the team totals entirely.
- If a payment date is entered in a format the sheet does not read as a date, it disappears from the monthly totals.

In every one of these cases the sheet says nothing, and the totals still look believable. In fact, two numbers in the sheet already disagreed with each other. The real problem was not that it was wrong, but that nobody could tell whether it was wrong.

## What I did

**I added a "Run audit" menu to the sheet.** I wrote a small program that runs inside Google's work tools (Google Apps Script). When you open the sheet, a menu appears, and pressing it writes the check results to a dedicated tab.

**I turned the regulation into checks.** The limits, the covered items and the probation rule all come from the benefits regulation and the expense regulation. The checks are grouped into three levels of severity:

- **Fix now**: a name shared by two people, or spending recorded under that name (there is no way to settle whose spending it is); spending over the monthly or yearly limit.
- **Breaks the totals**: a missing department or a team name that does not match the limit table, a category outside the covered items, a payment date that cannot be read as a date, a payment made during probation (needs checking for an approved exception).
- **Only makes tracking harder**: a payout date that cannot be read as a date.

When the regulation changes, there is one place to update, and each number is written down with the clause it comes from.

**I wrote each finding as a sentence someone can act on.** Every item states which row it is and why it is a problem. Not "2 people with the same name", but "this name is shared by two people, so matching spending records by name alone may mix up their spending". Whoever reads the results should know at once what to do.

**I made it find the right table even when the sheet changes shape.** If a table's position is fixed as "starting at row such-and-such", the moment someone inserts a row the tool reads the wrong data and still returns results without any warning. So it finds tables by their header rows: a row with name, start date and department is the member list; a row with payment date, name and category is the spending records. Columns are also found by their headers rather than their order, so it copes when someone moves a column or slightly renames it. If it cannot find a table, it reports that as the most serious problem.

**I connected the diagnosis to the next decision.** What the audit showed was less a set of individual errors than the limits of the structure. Telling apart two people with the same name requires a unique ID for each person, and the sheet had no such thing. Team-name mismatches and date-format problems also keep coming back in cells where anyone can type anything. The tool showed not only "how many rows are wrong now" but also "this way of working will keep being wrong". So the next step was not to manage the sheet better but to move to the web app. Personal limits, remaining balances, spending history and company-wide spending later went into the HR/GA Hub.

## What I chose not to do

**I did not change a single cell of the source data.** This sheet is not mine; it is an operational document that many people use every day. The moment a program starts fixing values automatically, there are values nobody knows who changed, and nobody can trust the sheet any more. That is worse than the current problem of numbers not adding up. I kept finding and fixing separate, and a person decides on the fixes.

**I did not make the sheet more elaborate.** Instead of adding more checks or bolting input restrictions onto the sheet, I used the diagnosis as the basis for changing how the allowance is managed.
