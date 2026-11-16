# DEMO GUIDE (private)

App: https://claude.ai/artifact/252BLQ9BsecsRDSejPBJrG
Opener slides: https://claude.ai/artifact/6R8xKeocFM5kst1E6nYTbt (press ▶ to present)

---

## 0. Opener slides (60 seconds, then switch to the app)

Keep it short. The slides frame the problem; the app is the proof.

| Slide | Say (one line) |
|---|---|
| 1 Cover | "Advisors don't struggle with the insurance decision. They struggle to *find* every requirement. So this finds them, shows the proof, and the advisor decides." |
| 2 Summary | "The bar here is completeness and proof, not a clever chat. Two contracts tested, one blind: 6 of 6 and 11 of 11, and the blind test found two bugs we fixed." |
| 3 How it works | "AI reads and quotes. Every quote is checked word for word. Rules, not the AI, set the status, and the advisor makes the final call." |
| 4 Product | Skip, or one line: "Findings on the left, proof on the right. Let me show you live." |
| 5 Evidence | Only if asked before the demo. Otherwise the app's eval panel covers it in Step 7. |
| 6 Demo | "Three things to watch: the hidden requirement, the 'Needs review' instead of a guess, and the advisor's override." → **switch to the app** |

**If short on time:** slides 1 → 3 → 6 (30 seconds), then the app.
**Short on time?** Click **use saved sample** instead of waiting ~60s.

---

## 1. Click path (2 min)

**Step 1: app open, nothing run yet**
> "Here's the contract and the client's coverage. Nothing run yet." *(The 'advisors struggle to find' line was on slide 1; don't repeat it.)*

**Step 2: click "Run extraction with Claude"** (talk while it loads)
> "Claude searches the full contract and produces a cited checklist of insurance requirements. Then simple rules compare it to the client's coverage."

**Step 3: point at the orange banner**
> "The contract mentions another document we don't have. So the tool warns us the review might be incomplete."

⏸ **Ask the interviewer:** "How do advisors handle a missing document like this today?"

**Step 4: click the "Additional insured" card** (red, Gap)
> "This was hidden in the indemnity section, not the insurance section. One click shows the exact sentence in the contract."

**Step 5: click the "General liability" card** (orange, Needs review)
> "The client is short on this limit. Their umbrella policy might cover it, but we can't confirm that. So the tool says 'Needs review' instead of guessing."

⏸ **Ask:** "Would advisors want 'Needs review' here, or would it feel like noise?"

**Step 6: click Accept on Additional insured. Then on General liability click Escalate → type "Confirm umbrella response with carrier." → Escalate.**
> "This gap is clear-cut, so I accept the suggested next step: request the endorsement. General liability needs a carrier answer, so I escalate it with a note. If an advisor has evidence the system doesn't, say a policy page, they can override with a reason."

**Step 7: click "eval & learnings"** (top bar)
> "We tested whether it finds everything. First contract: 6 out of 6. Then a harder contract with the answers locked in advance: 11 out of 11."

**Step 8: point at "Failures" and "Fixes"**
> "That harder test found two bugs in our own rules. We fixed both and re-tested. These are two synthetic contracts, so I'd validate next on advisor-labeled real contracts."

⏸ **Ask:** "What would it take for you to trust this in a pilot?"

*Optional:* switch to Contract B → Run (~30s) → show that the two conflicting general liability clauses now appear as one card.

---

## 2. Three product decisions to emphasize
1. **Find everything, not chat.** A full checklist, so the advisor doesn't reread 30 pages.
2. **Always show the proof.** Every card shows the exact contract sentence. No proof = never "Met".
3. **Advisor decides.** AI does the searching and comparing. The human makes the call.

## 3. Three AI lessons to emphasize
1. **AI confidence can't be trusted alone.** It said "high" on everything in one contract and "medium" on the hard parts in the other.
2. **Locked-answer tests catch real bugs.** They found two problems a normal demo would have missed.
3. **We tested the worst case.** We forced the AI to be overconfident, and the safety checks still held.

---

## 4. If asked: "What would you do next?"
**Short answer:** Test it on real contracts.
- 10–20 real contracts (names removed), with answers written by advisors
- Run each 3 times to see if results stay consistent
- Measure two things: does it catch every important requirement, and does it save advisors time?
- If yes, run a pilot with 2 advisors checking its work

## 5. If asked: "What did AI get wrong?"
**Short answer:** One small mistake, and one bigger lesson.
- **Small mistake:** it listed a "recommended, not required" sentence as a requirement
- **Bigger lesson:** its confidence wasn't reliable
- The tough test showed our rules had two gaps that the AI's confidence happened to cover
- We fixed both, so safety no longer depends on the AI

## 6. If asked: "Why not fully automate it?"
**Short answer:** Missing a requirement costs much more than taking an extra look.
- Many requirements depend on exact wording, which needs human judgment
- The tool's job is to save the hours spent searching and comparing
- The advisor's judgment is the safety net

---

## Other limits (only if asked)
- Only tested on 2 practice contracts written by AI, one run each
- Contract text is pasted in; it doesn't read PDFs yet
