Publish Changelog Policy
========================

Purpose:
- Keep one text file per publish iteration.
- Capture all changes included in the published commit.

File naming:
- YYYY-MM-DD_<short-commit>.txt

How to create a log file:
1. Publish commit to main.
2. Run:
   powershell -ExecutionPolicy Bypass -File scripts/create-publish-log.ps1 -Commit <commit-sha>
3. Commit and push the generated file in publish-changelog/.

Notes:
- Each log includes commit metadata, changed file list, and full git diff.
- This ensures every single change in that iteration is recorded.
