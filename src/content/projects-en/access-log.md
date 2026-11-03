## Results

From three months of door access logs, I produced a list of "cases that need checking": times when someone appears to have been away from their desk for a long stretch during the workday.

- **Three months analysed.** I went back over the records for January to March 2026.
- **Four reports.** Three monthly reports and one combined report for the three months.
- **Two filtering stages.** First I removed quick in-and-out records, then I removed cases with evidence that the person was still inside the building.

## The problem

The attendance system records only clock-in and clock-out. It keeps nothing about what happens in between. The doors, on the other hand, log every time someone passes through. So the only trace of someone stepping out during the workday and coming back is in the access logs. I was asked to use these logs to find out how often long absences really happened.

But counted as they were, almost every hit in the access logs was a false one:

- someone stepping just outside the door and coming straight back in
- short trips, such as picking up a delivery
- and, most importantly, people who looked as if they had gone out but were actually still inside the building

On top of that, the output of this analysis is a list that points at specific people. One false hit is not a statistical error; it is an unfounded suspicion about one person. So I set the goal not as "find as many as possible" but as "never point at the wrong person".

## What I did

**I removed quick in-and-out records first.** For each person and each day, I paired every "out" with the next "in" and treated the pair as one absence. If someone came back within 5 minutes, it did not count as an absence, and I discarded both records. Discarding only one side would leave a stray "in" that could be paired with a different "out", creating an absence that never happened. After that, I kept only absences longer than 60 minutes.

**If there was evidence the person was still inside, I took the case off the list.** This is the heart of the analysis. Going by the main entrance alone, someone may look as if they left, but some doors inside the building also keep records. If the same person passed another door inside the building between the time they went out and the time they came back, they were inside the building at that time. For every case already judged to be an absence, I searched for such a record and removed the case if one turned up. Every run also had to show how many cases it removed. Whether this analysis can be trusted depends less on how many cases it catches than on how many it cancels on its own.

**I kept the rules in one place and showed them every time.** "Back within 5 minutes is not an absence", "only absences over 60 minutes need checking", "remove the case if there is a record from inside the building". These are not values the data decides; they are operating rules the company decides. So instead of scattering them through the program, I gathered them in one place with clear names, and every run prints the rules it applied before anything else. The answer to "on what basis was this list made?" should be there before anyone has to ask.

**I left the reviewer what they need to judge.** When someone left and when they came back is not enough to tell what kind of absence it was. So I also recorded when the person left for the day after coming back. It plays no part in the decision; it is there for the person reviewing the list.

**If the reports disagree, the program stops.** The output comes as two sheets: a case-by-case detail sheet and a per-person summary. If the summary total does not match the number of cases in the detail sheet, the program stops immediately. A report whose two sheets quietly disagree is worse than a plainly wrong one, because nobody can tell which sheet is right. The monthly input file is found automatically too, but if there are several candidates it asks which one to use, and if there are none it stops. Quietly running on the wrong file is the most common failure in repeated work.

## What I chose not to do

**I did not call the output a "list of violators".** Access logs carry no reasons. Being away for more than 60 minutes is one thing; whether that is a problem is another. This tool only narrows down what to check and does not judge, so I titled the output "cases that need checking".

**I did not claim the list was complete.** Movements that leave no access record are simply not in the data. Some cases will always be missing by design, and I wrote that limit down alongside the results.

**I did not loosen the rules to catch more.** Looser rules would catch more cases, but they would also put the wrong people on the list. When a case was unclear, I chose not to flag it.
