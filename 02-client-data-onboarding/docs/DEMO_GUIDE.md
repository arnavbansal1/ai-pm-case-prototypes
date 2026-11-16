# DEMO GUIDE: Client Data Onboarding (private)

App: https://claude.ai/artifact/4VC8WRrvpZnpfUVB3NDRxA
Opener slides: https://claude.ai/artifact/5bRE5Pw2drUr38ZiSTG6T3 (press ▶ to present)

## Before you present (2 min of setup)
- **Tab 1:** the app on the sample file. Don't click anything yet.
- **Tab 2:** the same app with `#blind` at the end of the address. Click **Run mapping with Claude** 3 times (about 35s each) so the run history shows 3 runs. Keep this tab open, because the history clears on reload.
- **Tab 3:** the opener slides, ready to present.

---

## 0. Opener slides (60 seconds, then switch to Tab 1)

Keep it short. The slides frame the problem; the app is the proof.

| Slide | Say (one line) |
|---|---|
| 1 Cover | "Clients send messy spreadsheets. The costly errors are mappings that look valid but are wrong. So AI proposes, and only what's provably safe auto-applies." |
| 2 Summary | "Blind file, three live runs: zero wrong mappings auto-applied, all seven risky columns sent to review. Testing also caught four problems in my own prototype, all fixed." |
| 3 How it works | "AI proposes a field and conversion. Its output is validated, then rules check the actual values and set the tier. The analyst approves anything uncertain." |
| 4 Product | Skip, or one line: "Here's the payroll example. Let me show it live." |
| 5 Evidence | Only if asked before the demo. Otherwise Tab 2 covers it in Step 5. |
| 6 Demo | "Three things to watch: payroll, the clean preview, and the blind run history." → **switch to Tab 1** |

**If short on time:** slides 1 → 3 → 6 (30 seconds), then the app.

---

## Two-minute click path

**1. Tab 1: click "use saved sample"**
> "Here's a real-looking client file, 16 columns. Claude has proposed a mapping for each one." *(The 'look valid but wrong' line was on slide 1; don't repeat it.)*

**2. Point at the chips: 12 Auto · 3 Review · 1 Unknown**
> "Only mappings with strong evidence auto-apply. Everything ambiguous or invalid waits for the analyst."

**3. Hardest example: click the "Payroll" card**
> "The AI confidently said this is annual payroll. The rule checked the values: about $4,650 per employee per year, which is implausibly low for annual payroll given the context, so the rule routes it to Review rather than auto-applying, with a suggested fix: multiply by 12."

→ Click **Approve with fix**.

⏸ **Ask the interviewer:** "Is that the kind of silent error that hurts you downstream today?"

**4. Click the "Clean preview" tab**
> "Here's what flows downstream: payroll is now annual, ZIPs got their leading zeros back, and the missing year built shows as a visible gap instead of slipping through."

**5. Tab 2 (blind file): point at the scorecard and run history**
> "Then I tested it blind: a new file with six traps, answer key locked before any run. Across 3 independent runs: zero wrong mappings auto-applied, all 7 risky columns sent to review, 14 of 15 columns identical every time."

**6. Scroll to the "Class Code" card**
> "This was the one gap the blind test found: code 0005 is a farm code at a warehouse. At first only the AI's caution caught it. I added a class-code rule, so now it's caught even when the AI is fully confident."

**7. Header: click "eval & learnings"**
> "The key learning: AI proposes, rules decide what's safe. Testing caught four real problems in the prototype; each was fixed and re-verified. The next question is whether this holds on real analyst-labeled client files and materially reduces time to an approved dataset."

---

## The eval story (if asked to go deeper)
- **Method:** answer key written and frozen with checksums before any run; the model never sees it. Exact answers, so code-graded, not AI-judged.
- **Result:** 0 wrong auto-applied, 7/7 must-review routed, 15/15 correct, 0 extras, 14/15 consistent across 3 runs.
- **Worst-case test:** forced every AI confidence to "high". Still 0 wrong auto-applied, so safety doesn't depend on the model being cautious.

## What failed, and what we fixed
| What failed | Fix |
|---|---|
| A live run crashed on unexpected AI output | Validate every AI output first; a bad column goes to Review, the rest still works |
| A cross-check passed silently when it couldn't run | Checks that can't run now fail safe |
| Cached responses would have faked consistency | Caching off; every run is a real call |
| Class code 0005 was caught only by AI caution | Approved code list + business-type fit, independent of the AI |

## "What would you do next?"
> **Validate on real data.** 10–20 real client files with analyst-approved mappings as the answer key, 3 runs each. Measure wrong auto-applies (target 0), how much goes to review, and time to an approved dataset. If it holds, pilot with two analysts reviewing in parallel with their normal process.

## If asked about limits
- One synthetic blind file, written by the same AI that wrote the key.
- Small sample class-code list; spreadsheets only for now (PDFs next).
- Decisions aren't saved yet; the client follow-up draft was cut from V1.
