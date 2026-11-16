# DEMO GUIDE: Renewal Reconciliation Workbench (private)

App: https://claude.ai/artifact/9x17zJCNdvGjRJeXQhyJ9k · The app is the presentation.

## Setup (before you speak)
- **Tab 1:** app on **Demo client · Saved run**. Click nothing.
- **Tab 2:** app with `#blind`, live runs already loaded (scorecard showing). Don't reload it; the run history clears.

---

## Executive summary (30 seconds, say it before clicking)
> "You told me the bottleneck is upstream: building one trustworthy set of renewal facts from five sources that disagree, and that wrong data reaching a carrier is worse than a slight delay. So I built a reconciliation workbench. AI extracts facts with exact quotes from the messy documents. Fixed rules decide whether each fact is safe to settle. The advisor handles conflicts, material changes and missing items, and nothing goes to market until those are resolved."

---

## Two-minute click path (Tab 1, then Tab 2)

**1 · 0:00 · Point at the top bar** (16 fields · Needs you 6 · Ready to market · blocked)
> "Sixteen renewal facts. Rules settled ten with evidence. Six need the advisor, and marketing is blocked until they're done."

**2 · 0:15 · Click "Fort Wayne · payroll"** → point at the five green checks
> "The CFO emailed a correction to the exposure file. It passes all five checks: authorized sender, same field and period, names the location, newer than the file, nothing contradicts it. So it safely replaces the file's number."

**3 · 0:35 · Click "Indianapolis · employees"** → point at the red Authority check
> "Here a shared mailbox says headcount is 70. It's newer, but it fails Authority, so it's a conflict for the advisor, not an update. Being the most recent is never enough on its own."

→ Pick **64 · Exposure file**, type "Confirmed with Elena", click **Resolve**.

⏸ **Pause, ask the interviewer:** "Is that where your team would draw the authority line: CFO yes, shared mailbox no?"

**4 · 1:00 · Click "Workers compensation losses"** → point at **Ready to market · blocked**
> "These loss runs are 185 days old, past the freshness limit I assumed for the prototype. There's no override: it clears only when a current document arrives, and the client request is already drafted."

**5 · 1:20 · Switch to Tab 2** → point at the scorecard
> "I tested this on a blind client with eight traps, with the answer key locked before any run. Across live runs: zero wrong automatic resolutions, and all seven items that need a person went to the advisor, identical every run. This is synthetic data, so it's development evidence, not production proof."

**6 · 1:40 · Stay on Tab 2** (click "Dayton · payroll" if asked to show it)
> "The first runs found one flaw: a harmless email line sent a safe field to review. That's the safe direction, but it wastes advisor time. I made one narrow fix, replayed every test, and re-ran live: sixteen of sixteen."

---

## Close (30 seconds)
> "So: AI reads, rules decide, the advisor judges, and a hard gate keeps unresolved data away from carriers. Every rule shows where it comes from, and my thresholds are labeled as prototype defaults, not insurance rules. There's a kill switch that stops all automatic settling. The next step is real renewals, labeled by advisors before they see the tool's output, run in shadow so nothing reaches a carrier."

---

## The three hardest follow-ups
1. **"Why use AI if the rules make it safe?"**
   Rules can't read an email or a loss run; AI turns messy documents into quoted facts, and rules make acting on those facts safe. Each does the job it's good at.
2. **"Why trust this if the results are synthetic?"**
   You shouldn't yet for production: synthetic tests show the design fails safe, and the shadow run on advisor-labeled real renewals is what earns trust.
3. **"What if source-of-truth or materiality rules differ by client, carrier or line?"**
   They will, which is why rules are configuration, not code: each one is labeled with its source, and real values would come from the client, the carrier, the advisor or the system of record.

## One-line answers
- **Why AI?** The sources are unstructured (policies, loss runs, emails), and reading them is the manual work today.
- **Why not full automation?** The costly failure is a confident wrong number reaching a carrier, so judgment calls stay with the advisor.
- **What failed?** One safe field was sent for an unneeded review; I fixed it narrowly and re-verified. Earlier, the scorecard display miscounted advisor decisions; fixed too.
- **What next?** Shadow on real renewals with advisor labels, then a one-team pilot measuring reconciliation time and late corrections.
- **How would you validate in production?** Same bar as the blind test: zero wrong automatic resolutions and every material item routed, checked against advisor labels plus a standing sample of settled fields.
- **Why not A/B test first?** An A/B test would put unvalidated output in front of real carriers; shadow gets the same evidence with zero carrier risk.
- **What would make you stop it?** Any wrong automatic resolution reaching a submission, or a spike in validation problems or advisor overrides: the kill switch sends every field to the advisor.

## Evidence (exact numbers; all synthetic = development evidence)
- Blind client: 16 fields, 8 traps, answer key frozen before any run.
- 6 live runs: 3 fresh on the fixed version, plus the 3 earlier outputs re-scored with the fix. All 6: 0 wrong automatic resolutions · 7/7 routed to advisor · 16/16 statuses · 9/9 settled fields with right value and source · identical across runs · 0 validation problems.
- Before the fix, the first 3 runs scored 15/16 (the one over-review).
- Forcing the AI's confidence high or low changes nothing. 17 broken-AI-output cases all safe. 23/23 UI checks.

## Don't overclaim
- The 25%, 50%, 120-day and $50,000 thresholds are **my prototype defaults**. Say "the limit I assumed", never "the insurance rule".
- Which source wins per field came from the interviewer; say "your rule".
- One synthetic client, written by the same AI that built the rules. Documents are text, not PDFs. Carrier forms are out of scope.
