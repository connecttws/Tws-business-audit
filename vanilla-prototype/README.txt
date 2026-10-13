TWS LOCAL BUSINESS AUDIT — RESPONSIVE HTML UI DEMO

Files:
- admin.html          Admin dashboard and interactive question builder
- field-auditor.html  Mobile-first field auditor flow
- customer-report.html Customer-facing read-only sample report
- styles.css         Shared responsive styling
- app.js             Admin builder interactions and dummy data
- field.js           Auditor workflow and sample scoring interactions
- report.js          Customer report rendering and share-summary copy

HOW TO RUN
1. Extract the ZIP.
2. Open admin.html, field-auditor.html, or customer-report.html in a modern browser.
3. For best results, use a simple local static server (for example VS Code Live Server) so browser share and navigation behavior are consistent.

NOTES
- This is a frontend-only prototype using dummy data. It does not connect to a database or save real audits.
- Admin edits operate in browser memory; refreshing resets the demo.
- Customer report uses sample data and is not connected to the audit completed in the field demo.
- Score rules and sample content are illustrative. Validate the final business scoring policy before production.
- External Google Fonts require internet; system fallbacks are included.
