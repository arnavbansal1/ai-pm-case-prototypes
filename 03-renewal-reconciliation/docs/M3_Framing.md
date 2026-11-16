# Mock 3 — Framing (Renewal reconciliation)

1. Current workflow: last year's policies (PDF) + internal account data + this year's exposure spreadsheet + loss runs (carrier PDFs) + client emails → account manager rebuilds the client picture by hand in a spreadsheet → chases the client for gaps → fills in each carrier's forms → markets.
2. Real bottleneck: building one trustworthy set of renewal facts from 5 sources that disagree, and deciding which differences matter. Mistakes made here get copied to every carrier.
3. Approaches:
   - A. Auto-fill carrier forms: easy demo, wrong layer; spreads bad data faster.
   - B. Chat over the documents: flexible; can't prove completeness, no per-field source rule, no audit trail.
   - C. Renewal reconciliation workbench: AI pulls each field from each source with an exact quote; rules decide which source wins per field and apply materiality thresholds; conflicts and material changes go to the advisor side by side; only resolved facts can go into a submission.
4. Recommendation: C. It goes after the bottleneck and enforces "nothing unresolved reaches a carrier."
5. MVP (one client, 5 sources):
   - Field-by-field table, last year vs this year, with a quote from each source.
   - Statuses: Confirmed / Minor change / Material change / Conflict / Missing.
   - A rule per field on which source wins. An email wins only if it's from the client and newer than the file; otherwise it's a Conflict.
   - The advisor resolves each conflict by picking a source and adding a note.
   - "Ready to market" gate and a clean export; carrier forms are stubbed.
   - A per-field record: what each source said, what the rules decided, what the advisor did.
6. Biggest assumption: the source rules + thresholds settle most differences on their own, leaving a short high-signal queue.
7. Who does what:
   - Automate: pull out fields with quotes, check every quote word for word, compute year-over-year changes, apply the source rules and thresholds, flag missing items.
   - Suggest: why a change matters for strategy; draft follow-up questions for the client.
   - Human: material conflicts, judgment calls on materiality, final sign-off, anything sent to the client or a carrier.
8. Metrics:
   - Primary: advisor minutes from receiving the sources to a submission ready to market.
   - Guardrails: no export while a material discrepancy is unresolved (hard block); zero wrong automatic resolutions on a blind test, also with confidence forced high.
   - Secondary: fewer last-minute corrections and client follow-ups.
9. Facts vs assumptions:
   - Facts (from the interviewer): bottleneck upstream; source rules are per field; emails can override; materiality is part thresholds, part judgment; wrong data is worse than delay; success definition as given.
   - Assumptions: sources are digital; thresholds are adjustable (e.g. ±10% exposure, a new location or state, a large loss); carrier forms come after the MVP.
