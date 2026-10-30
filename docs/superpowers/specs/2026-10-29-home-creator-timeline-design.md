# Hey Kakaa Home creator timeline

**Status:** Approved (2026-10-29)

## Purpose

Add a short creator story to the Home page using dated milestones from the two apps' in-app “What's New” sections. This is a creator portfolio, so the timeline summarizes the work rather than listing features or showing install buttons. The Apps page remains the place for product details.

## Proposed copy

**Heading:** A little timeline of what I've been making

**August 2026 — Make the numbers clearer**  
I refined SyncSpend's monthly view and simplified its scope so the essentials were easier to see.

**September 2026 — Make room for the day**  
SyncTasks reached its first release, bringing Today, Upcoming, and Lists together in one place.

**October 2026 — Keep refining**  
SyncSpend grew with more ways to organize spending, clearer analytics, and safer backups.

**Late October 2026 — Make progress visible**  
The latest SyncTasks updates made completed work easier to see and revisit.

## Presentation

- Keep the source repository's Geist fonts, Tailwind utilities, white/gray surfaces, blue accent, rounded cards, and spacing.
- Place four compact cards along a blue vertical rail on desktop and mobile. On narrow screens, keep every card on one side of the rail for easy reading.
- Give each milestone a small date label, a bold title, and one sentence. Avoid app screenshots, feature grids, and Play buttons in this Home section.
- Respect reduced-motion preferences; animation is optional and not needed for the first version.

## Evidence

- `D:\appylab\sync-spend\lib\shared\models\release_notes.dart`: August 14 v3.1.0 and October 11 v3.3.0 notes.
- `D:\appylab\sync-task\lib\features\settings\screens\settings_screen.dart`: September 8 v1.0.0, October 17 v1.1.0, and October 21 v2.0.0 notes.

The dates describe the apps' release notes. The copy does not claim when the creator first started, why they began, or when the Play Store published each version.
