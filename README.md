4MyIPTV Service Website Change Control Rules

This document defines the standing rules for all future edits to the 4MyIPTV Service website and related files. The goal is to prevent drift, repeated mistakes, unnecessary redesigns, broken assets, and rework.

These rules apply to all public pages, internal pages, assets, and packaged update files unless the user explicitly approves an exception.

1. Project Baseline Rule

The current uploaded files are the locked baseline for the project.

Required behavior
Preserve the existing layout, formatting, structure, spacing system, fonts, button styling, and visual style by default.
Do not redesign pages unless the user explicitly approves a redesign.
Do not replace the current design language with a new one.
Do not simplify, modernize, or restyle pages unless specifically approved.
Default assumption

If a change request is small, the update must remain small.

2. Scope Lock Rule

Only the exact approved items may be changed.

Required behavior
If the request is to change a logo, only change the logo.
If the request is to change CTA wording, only change CTA wording.
Do not make adjacent improvements unless separately approved.
Do not use one request as permission to clean up other parts of the page.
Examples
“Make the logo smaller” does not mean change spacing, buttons, or headings unless approved.
“Update wording” does not mean reorganize layout.
“Fix spacing” does not mean redesign the top section.
3. Approval Before Edit Rule

Before any changes are made, clearly state what will change and what will not change.

Required format

Use this structure before editing:

Proposed change
item 1
item 2
Will not change
item 1
item 2
item 3

Do not proceed until the user approves the exact change set.

4. Minimal Change Rule

Every update must be the smallest safe change required to achieve the approved outcome.

Required behavior
Make the narrowest possible adjustment.
Avoid broad edits when a small edit will solve the problem.
When fixing an error, correct only that error.
Prohibited behavior
No “while I was there” edits
No extra cleanup
No silent improvements
No redesign through correction
5. Visual Continuity Rule

All changes must match the existing site system and appear native to the current build.

Preserve
page structure
spacing rhythm
card style
button style
typography
color palette
overall page feel
Required outcome

A new update must look like a continuation of the current site, not a separate template or redesign.

6. Screenshot Authority Rule

When the user provides a screenshot to show a problem, the screenshot becomes the primary correction reference.

Required behavior
Match the visible issue shown in the screenshot.
Do not make generalized assumptions.
Correct what is visibly wrong.
Use the screenshot to guide spacing, alignment, visibility, and redundancy fixes.
Example

If the screenshot shows too much space under a logo, fix the visible gap. Do not guess at broader layout changes.

7. No Assumption Rule

Do not treat general wording as permission for broad interpretation.

Phrases that do not authorize redesign
clean it up
improve it
make it better
tighten it
fix it
update it
Default behavior

When a request could be interpreted multiple ways, choose the smallest safe interpretation unless the user clearly approves more.

8. Full File Replacement Rule

All production changes must be delivered as full file replacements or a complete replacement package.

Required behavior
Provide full HTML file replacements
Provide full ZIP packages when multiple files are involved
Keep output copy-paste ready and deployment ready
Do not provide
partial snippets for production use
isolated fragments that require manual merging
mixed instructions that create ambiguity
9. One Approved Change Set Per Package Rule

Each delivered ZIP or package must contain one clear approved change set only.

Required behavior
Package only the approved updates
Exclude experiments, earlier versions, or unrelated edits
Keep each delivery clean and traceable
Goal

Prevent confusion caused by:

wrong ZIP uploads
mixed file versions
overwritten approved work
inconsistent deployments
10. Asset Handling Rule

Asset usage must be handled in the lowest-risk way possible.

Required behavior
Verify exact asset name, file extension, and location
Confirm the page path matches the deployed asset path
Use the simplest reliable method when an image is required
If an asset path may cause deployment failure, use a safer method when appropriate
Special caution

Do not assume image references will work unless verified.

Examples of asset risks
wrong filename
wrong folder
case mismatch
missing deployed image
dead space inside the source image
11. Redundancy Rule

Do not duplicate branding or wording unless the user explicitly wants repetition.

Required behavior
If the logo already contains the brand name, do not repeat the brand name immediately below it unless approved
Avoid redundant headings and repeated text near the same visual element
Keep the visual hierarchy clean
12. Public vs Internal Page Rule

Public/shared pages and internal/admin pages must remain strictly separated.

Public/shared pages

These pages must remain customer-safe and public-safe:

index.html
sell-sheet.html
request-service.html
success.html
checkout.html
support.html
online-support.html
device-setup.html
downloader-portal.html
Internal/admin pages

These pages may contain operational tools and internal workflow content:

admin-dashboard.html
admin-orders.html
admin-resource-center.html
admin-apk-library.html
admin-update-checker.html
admin-checkout-link-generator.html
admin-customers.html
calls-dashboard.html
Required behavior
Never expose admin tools on public pages
Never add internal navigation to customer-facing pages
Keep shared pages public-safe at all times
13. Logo and Branding Rule

The approved 4MyIPTV Service logo direction must be treated as a controlled asset.

Required behavior
Use the approved logo only
Do not redesign the logo unless explicitly requested
Do not add duplicate brand text below the logo unless approved
Keep logo changes limited to placement, size, spacing, or file handling only when approved
14. Versioning Rule

Every HTML page must display a version number at the bottom.

Standard format

Use one consistent format across all pages:

Version: YYYY.MM.DD.R

Example:
Version: 2026.04.02.1

Required behavior
Every page must carry a version line
When a page changes, its version should be updated
If a page is not changed, do not change its version unnecessarily unless the sitewide standard requires it
15. Change Log Rule

Every delivery must include a short change log.

Required contents
files changed
exact approved changes made
what was intentionally left unchanged
Example
Change log

Files changed:

index.html
sell-sheet.html

Changes made:

added logo above top heading
updated CTA wording

Left unchanged:

layout
buttons
colors
fonts
all other page sections
16. QA Checklist Rule

No update should be considered complete until it passes a fixed QA review.

Required QA checklist

Before delivering any update, verify:

correct file or files were edited
no unapproved files were modified
all images load correctly
all links still work
no duplicate headings remain unless approved
logo or image size matches the approved direction
spacing matches the approved direction
mobile layout still works
version footer appears where required
package contains only the correct latest files
no old files or accidental duplicates are included
17. Naming Rule for Deliverables

All packages must use clear and traceable names.

Required behavior

Use names that identify:

project
change type
version sequence
Good examples
4myiptv_logo_cta_update_v1.zip
4myiptv_logo_spacing_fix_v2.zip
4myiptv_version_footer_update_v1.zip
Avoid
vague names
reused names
baseline names that can be confused with final update packages
18. Correction Pass Rule

When something is wrong, the correction pass must solve only that issue.

Required behavior
Do not add new enhancements during a correction
Do not reinterpret approved scope during a correction
Fix the visible problem directly
Goal

Corrections should reduce risk, not create a new round of changes.

19. Communication Rule

All future edit work should be described clearly and directly.

Required behavior

State:

what is wrong
what will be changed
what will not be changed
what file or files are affected
Avoid
vague promises
broad assumptions
untracked changes
claiming success without verifying the visible result
20. Default Collaboration Standard

The default standard for this project is:

small controlled changes
no drift
no redesign without approval
full replacement files only
screenshot-based corrections when available
one clean package per approved change set
version tracking on all pages
continuity over creativity unless a redesign is explicitly requested
Final Operating Principle

When in doubt, preserve the current build and make the smallest possible approved change.

The objective is not to create more changes.
The objective is to create the correct change once.
