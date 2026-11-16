HOW_HTML = """
<p><b>Three layers.</b> 1) <b>Claude reads only the unstructured sources</b> (prior-year policy, loss runs, client emails) and returns observations with exact quotes. It never picks a winner. 2) <b>Code parses the structured sources</b> (internal account data, the exposure spreadsheet). 3) <b>Rules decide</b>: which source wins for each field, what changed, what is material, what is missing. The advisor resolves everything the rules can't settle safely.</p>
<p><b>What Claude passes to the rules (the hand-off contract).</b> For every statement: <i>document</i>, <i>field</i>, <i>location</i> (or whole account), <i>value as written</i>, <i>period</i> (annual, monthly, unstated, point in time), <i>explicit</i> (definite value vs. vague or future), an <i>exact quote</i>, and a <i>confidence</i>. For loss runs: line, valuation date and each claim (date, status, incurred, quote). The rules use every signal except confidence, which is shown but never changes a status. Claude passes no statuses, no winners and no totals. Each field card shows the exact signals it received.</p>
<p><b>Source of truth is per field.</b> Internal account data wins for policy metadata. The latest exposure file wins for current exposures. A client email can supersede the file only when all five hold: the sender is an authorized contact, the field is the same field in the same unit and period, the scope is clear (a location value must name the location), it is newer than the file with nothing later touching the field, and no other evidence disagrees. Recency alone never decides.</p>
<p><b>Materiality (prototype defaults, not universal insurance rules; see the register below).</b> A rating basis (payroll for GL and WC, power units for auto) moving 25% or more is material; so is growth where at least half comes from a new location; every new location is material. Fields that aren't a rating basis (revenue, headcount here) are minor changes. Loss runs must be valued within 120 days of renewal; a new open claim or any new claim of $50,000 or more is material.</p>
<p><b>Backstops that can only route a field to the advisor, never settle it:</b> every quote verified word for word; a keyword scan of newer emails for any field the AI didn't extract; totals must equal their locations, and a total can't be final while a location is open; loss-run claim counts checked against the document; malformed AI output flagged, never converted. The model's confidence is ignored.</p>
<p><b>Kill switch.</b> Claude only recommends evidence and a person sends the submission, but the rules do settle fields automatically, and settled facts flow into what carriers see. So there is a <b>Pause auto-settle</b> control: one click and nothing is settled automatically; every field needs an advisor. It also <b>stops itself</b> when a run has no usable AI output or 3 or more validation problems. Every decision is logged in the per-field trace, and undo restores the last state. The model never has to notice that it should stop.</p>
<p><b>The gate.</b> Ready to market stays blocked while any conflict, material change or missing item is unresolved. A missing document can only be cleared by adding the document.</p>
<div id="learnings"><p><b>What we learned.</b> <span class="note">Filled in after the blind test.</span></p></div>
"""

PROD_HTML = """
<p class="note">How this prototype becomes a production system. Every gate below reuses something this build already does: the frozen answer key, the scorecard, the run trace.</p>
<div class="lab">AI SDLC · stages and the gate to leave each one</div>
<div class="stages">
<div class="stage done"><b>1 Frame</b>Bottleneck, PASS IF, autonomy split</div>
<div class="stage done"><b>2 Evals first</b>Answer key frozen before any model run</div>
<div class="stage done"><b>3 Build</b>AI reads; rules decide</div>
<div class="stage done"><b>4 Offline eval</b>Blind set, 3 live runs, forced-high, adversarial</div>
<div class="stage"><b>5 Shadow</b>Real renewals, nothing reaches carriers</div>
<div class="stage"><b>6 Pilot</b>One team, feature-flagged</div>
<div class="stage"><b>7 Scale</b>More teams and lines</div>
<div class="stage"><b>8 Monitor and learn</b>Every miss becomes a regression case</div>
</div>
<div class="pgrid">
<div class="pcard"><h4>Architecture review (ARB)</h4><ul>
<li><b>Flow:</b> email and document connectors → extraction service (Claude, versioned prompt) → validation layer → rules engine (versioned config: source authority, thresholds) → advisor workbench → submission package API → carrier forms later.</li>
<li><b>System of record:</b> the agency management system stays authoritative; read-only in the MVP, write-back only after the pilot.</li>
<li><b>Data:</b> client-confidential and personal data; model provider with zero data retention and no training on our data; encryption in transit and at rest; access limited to the account team.</li>
<li><b>Model risk:</b> the model can't settle a field alone; quotes verified; fail-safe defaults; confidence ignored; kill switch routes everything to the advisor.</li>
<li><b>Audit:</b> the per-field trace (source values → rule → advisor → final) is stored as the audit log for E&amp;O review.</li>
<li><b>Asks for the board:</b> vendor and data-classification approval, retention policy, integration access.</li></ul></div>
<div class="pcard"><h4>CI/CD pipeline and DevOps</h4><ul>
<li><b>Every pull request:</b> rule unit tests, adversarial AI-output tests, browser end-to-end tests, and a replay of saved model outputs against every frozen answer key (fast, deterministic, no model calls).</li>
<li><b>Any prompt, model or rules change:</b> live eval on the blind sets, 3 uncached runs. Deploy is blocked unless wrong automatic resolutions = 0 and must-review routing = 100%.</li>
<li><b>Versioned together:</b> prompt, model ID, rules config and answer keys (sha256). Every run records which versions produced it.</li>
<li><b>Release:</b> feature flag per team, staged rollout, one-click rollback to the previous prompt and rules.</li>
<li><b>Observability:</b> dashboards for auto-settle rate, advisor override rate, validation problems, latency and cost per renewal; alert when overrides spike.</li></ul></div>
<div class="pcard"><h4>QA testing</h4><ul>
<li><b>Rules:</b> unit fixtures for every rule and threshold edge (24.9% vs 25%, day 120 vs 121).</li>
<li><b>Golden sets:</b> one per trap category (scope, recency, authority, units, totals, materiality, missing documents), frozen before runs.</li>
<li><b>Adversarial:</b> fake quotes, wrong document IDs, mis-scoped emails, dropped observations, malformed numbers.</li>
<li><b>End to end:</b> the gate can't be bypassed; Missing can't be overridden; undo restores state.</li>
<li><b>UAT:</b> 2–3 advisors on real renewals, then a standing QA sample of auto-settled fields in production.</li></ul></div>
<div class="pcard"><h4>Change approval (CAB)</h4><ul>
<li><b>Standard change</b> (pre-approved): copy, layout, adding a synonym to a backstop list.</li>
<li><b>Normal change</b> (CAB review): new prompt or model, new rule, threshold change, new source type. Evidence pack generated by CI: eval diff vs every frozen key, consistency, examples of changed decisions, rollback plan.</li>
<li><b>Emergency change:</b> kill switch that turns off automatic settling (everything to the advisor), then a retro.</li>
<li><b>Approvers:</b> product, engineering, compliance / E&amp;O, account-management lead. Post-implementation review after two weeks.</li></ul></div>
</div>
<div class="lab">Go / no-go gates</div>
<table class="gates"><tr><th>Move</th><th>Pass if</th><th>Measured on</th></tr>
<tr><td>Offline → shadow</td><td>0 wrong automatic resolutions, 100% must-review routing, forced-high replay unchanged, gate unbypassable</td><td>Frozen blind sets (this build)</td></tr>
<tr><td>Shadow → pilot</td><td>Same safety bar on real renewals; advisors agree with the fields the rules settled</td><td>[N] real renewals labeled by advisors before they see the tool's output</td></tr>
<tr><td>Pilot → scale</td><td>Zero unresolved material discrepancies reaching carriers; reconciliation time and late corrections down by the target agreed with the team</td><td>Pilot team vs. its own baseline</td></tr></table>
"""
