## Results

I settled the new structure and tested the migration method in a rehearsal, without changing the original once. Applying it for real is waiting for approval.

- **46 pages that would have been deleted → 0.** I found and stopped the problem while planning the migration.
- **1 of 4 mock-ups chosen.** The structure was picked after five interviews narrowed down the requirements.
- **0 changes to the original.** From design to rehearsal, the original was only ever read.

## The problem

The company handbook is the first document a new hire opens, and the front door everyone uses to look up rules, systems and how the office works. It is the most-read document in the company.

The content had piled up, but the structure had not kept pace. 46 pages were listed flat under 8 sections, so finding anything meant scanning through all of them.

But building a new one was not the end of it either. The document was already in daily use. Each of the 46 pages has its own address and is linked from all over the company, so if the addresses changed, every one of those links would break. If the pages moved in the left sidebar, the paths people had grown used to would disappear too.

## What I did

**I narrowed the requirements first, then chose from four mock-ups side by side.** Before building any structure, I ran five interviews with a fixed set of questions to pin down the requirements. Then I made four mock-ups of different kinds: a left-menu layout, a three-column layout with widgets on top, a three-column layout with toggles, and a shortcuts-first layout. A document structure is hard to compare from a description; you have to see the real thing. So instead of building one and revising it, I put four side by side and chose. The one confirmed was the three-column layout: rule cards on the left, eight expandable lists in the middle, widgets on the right. Improvements that came up after the choice (swapping a widget, showing whether a rule is up to date, a path for new hires) were applied equally to all four mock-ups to keep the comparison fair.

**Matching the original against the mock-up item by item, I found a trap.** Before moving anything, I compared the original and the mock-up section by section. The count matched exactly at 47 items, but one kind of item was different. The 46 entries in the original's body were not links pointing at pages elsewhere; they were the places where those pages actually lived. Taking them out of the body would not break a link; it would delete the page. The mock-up, by contrast, used links throughout. Had I pasted the mock-up onto the original as it was, 46 pages would have vanished at once. Had I only counted the items, I would have missed the difference.

**I took only the new layout and kept the original's pages.** From the mock-up I took only the arrangement (the three columns, the expandable lists, the widgets), and inside the lists I put the original's real pages back as they were. That way the handbook's address, the addresses of its 46 child pages and their place in the left sidebar all stay the same. Moving the child pages somewhere else first was another option, but it would push the sidebar one level deeper and would be hard to undo if the move failed, so I kept it as the fallback.

**I set up deletions to fail outright.** Notion's editing feature has an option that forbids deleting content. With it switched on, any edit that would delete even one child page is rejected with an error. I used this option as a safety check: if an edit succeeded, none of the 47 items had been deleted. Instead of counting what was left afterwards, I made it impossible for a wrong edit to succeed in the first place.

**I prepared three ways to roll back.** Restoring from Notion's page history (which recovers both content and addresses), a copy made just before running, and a text copy saved on my computer. The first looks like enough on its own, but how long page history is kept depends on the Notion plan, so I added that to the checklist. If you have not checked that your most trusted recovery method actually works, it is not a recovery plan; it is a hope.

**I redesigned the rehearsal to be small.** At first I planned to rehearse on a full copy of the original. But putting the original's pages into a copy moves the original's child pages over to the copy. The rehearsal itself would have damaged the original. So I dropped that plan and built a small rehearsal with a few dummy pages to check just one thing: "do real pages survive intact inside the three-column layout and the expandable lists?" It passed. Once the question fits in one sentence, a much smaller and safer experiment can answer it.

**I avoided losses that look like success by getting the order right.** Three problems would not fail with an error; they would look successful while leaving the result empty. Editing in a certain way silently drops images, attachments not yet placed on a page disappear after a while, and the source address of an attachment expires after 5 minutes. So images go in all at once with no partial edits afterwards, attachments are created just before applying, and the procedure says nothing else may happen between fetching and uploading.

**I split the checks into two kinds.** Anything a program can count (46 pages in the right sections, 1 database, 2 links, page icons) is compared automatically. Anything that needs eyes (the three-column layout, the widgets, opening and closing the eight lists) is checked separately.

## What I chose not to do

**I did not record anything as checked that I had not checked.** How it looks on a phone and contrast in dark mode have not been checked yet, so they are marked "not checked".

**I did not rehearse on the original.** Once I knew a rehearsal could damage the original, I left it alone and tested only on dummy pages.

**I did not apply it without approval.** The rehearsal passed, but everyone uses this document every day, so the real change happens only after approval.
