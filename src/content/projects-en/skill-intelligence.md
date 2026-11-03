## Results

Without a new survey, using only documents that already existed, I mapped "who can do what" and produced an attrition-risk report and a decision paper for leadership. All figures on this page are based on synthetic data.

- **29 existing documents, 0 new ones written.** Only team missions, job descriptions and team goals (OKRs) were used.
- **494 skills and 642 links between them.** Skills are organised not as a list but as a connected map.
- **"Skills only one person has": 101 → 83.** I re-audited my own report and corrected an inflated number.

## The problem

When a company talks about people risk, all it has is grade, tenure and team. What it really wants to know is something else: if this person quit tomorrow, what would stop?

Answering that needs data on "who can do what", and it was written down nowhere. Asking every employee to list their own skills falls apart from the start, because response rates and standards vary too much.

Meanwhile, the company already had team missions, job descriptions and team goal documents. They were not people writing about their own skills, but they did say what each team is responsible for.

## What I did

**I pulled skills out of existing documents and linked them to people.** Using AI, I extracted skills from 29 documents and linked each person to the skills they have, and at what level (on a four-level scale). Then I calculated attrition risk from who holds the rare skills and the knock-on effects if that person left. Re-running the whole process from scratch takes about three hours, not counting collecting the documents.

**I recorded the relationships between skills too.** Each skill carries links such as "needs this first", "goes deeper than", "complements" and "makes this possible". That means risk can be described like this:

- A simple analysis: "Only one person has skill A."
- An analysis that follows the links: "If A is gone, the review work done with A stops, and the regulatory reporting that relies on that review cannot be done either."

By following the links up to three steps, it produced two to three times more information useful for decisions than a simple analysis.

**People check what the AI extracted.** The skills the AI pulled out are exported to a sheet for each person and their team lead to check, and their answers are fed back in. To avoid applying anything by mistake, the default is to show what would change before anything is applied.

**Three months later, I took my own report apart.** This is the most important part of the project. I issued the report in April 2026, and in July I re-audited it myself and issued a corrected version, because the report's numbers could not be reproduced from the stored data.

| Item | April report | July correction |
|---|---|---|
| Number of skills | 560 | 494 |
| Skills only one person has | 101 | 83 |
| Breakdown by risk level | Could not be recalculated | Recalculated from stored data |

There were three causes:

- Several skills were effectively the same skill under different names. That inflated the count of "skills only one person has". The raw material for the risk calculation was contaminated from the start.
- The report's numbers came from a single run at one point in time. As the data changed bit by bit afterwards, the same numbers could no longer be produced.
- AI guesses that nobody had checked were carried along the knock-on analysis all the way up to the highest risk level.

So I fixed it like this:

- I found and merged skills that were the same under different names. A first step only finds them, so they can be checked, and the merge itself can be undone.
- Each person's risk result is now stored as it was at that moment. The report's numbers now come straight back out of the stored data.
- Whether a person has checked a result is now shown at the very front, and knock-on effects nobody has checked can no longer push anyone to the top risk level; they stop one level below.

Without the correction, leadership would have made people decisions based on an inflated 101 "skills only one person has" and a risk breakdown that could not be recalculated.

**I asked leadership not to "adopt" but to "measure".** My recommendation was a conditional go: not a full rollout, but approval for a pilot on real data from two or three teams whose skills are clearly defined. The analysis method and security controls were ready, but how accurately the AI extracts skills from real data cannot be known from synthetic data, and that measurement cannot happen without leadership's approval. I proposed deciding on any expansion after seeing those results.

## What I chose not to do

**I did not survey every employee.** Instead of self-reporting with uneven response rates and standards, I started from documents that already existed.

**I did not dress up what I didn't know as known.** Instead of seeking approval on unverified results, I wrote down what was still unknown (accuracy on real data) and asked for permission to find it out.

**I did not hide that the data was synthetic.** Both this page and the original report state up front that the figures are based on synthetic data.
