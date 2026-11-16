/* ============ 1. SOURCE DOCUMENT (the "messy" input, as text) ============ */
const CONTRACT_A = {
  label: "<b>Master Services Agreement</b> \u00b7 Meridian Health Partners \u2194 <b>Brightline Facility Services</b> (our client)",
  title: "Master Services Agreement",
  parties: "Meridian Health Partners, LLC (“Company”) and Brightline Facility Services, Inc. (“Vendor”)",
  pages: [
    { page: 1, sections: [
      { heading: "1. Scope of Services", insurance: false, paras: [
        { ref: "1.1", text: "Vendor shall provide facility maintenance, environmental services, and building systems monitoring at the Company locations listed in Exhibit A (the “Services”)." },
        { ref: "1.2", text: "Vendor shall perform the Services in a professional and workmanlike manner consistent with industry standards and all applicable laws." } ] },
      { heading: "2. Term", insurance: false, paras: [
        { ref: "2.1", text: "This Agreement begins on January 1, 2027 and continues for an initial term of three (3) years, unless terminated earlier under Section 14." } ] } ] },
    { page: 2, sections: [
      { heading: "5. Fees and Payment", insurance: false, paras: [
        { ref: "5.1", text: "Company shall pay undisputed invoices within forty-five (45) days of receipt. Vendor shall submit invoices monthly in arrears." } ] },
      { heading: "8. Indemnification", insurance: false, paras: [
        { ref: "8.1", text: "Vendor shall defend, indemnify, and hold harmless Company and its affiliates, officers, and employees from and against all claims, losses, and expenses arising out of Vendor’s performance of the Services or breach of this Agreement." },
        { ref: "8.2", text: "Vendor’s indemnification obligations survive termination or expiration of this Agreement." },
        { ref: "8.3", text: "In support of the obligations in this Section 8, Vendor shall cause Company and its affiliates to be named as additional insureds under Vendor’s commercial general liability policy for both ongoing operations and completed operations." } ] } ] },
    { page: 3, sections: [
      { heading: "11. Insurance", insurance: true, paras: [
        { ref: "11.1", text: "Vendor shall procure and maintain, at its own expense and for the duration of this Agreement, the insurance described in this Section 11 with insurers rated A- VII or better by A.M. Best." },
        { ref: "11.2(a)", text: "Commercial General Liability insurance with limits of not less than $2,000,000 each occurrence and $4,000,000 general aggregate." },
        { ref: "11.2(b)", text: "Business Automobile Liability insurance covering owned, hired, and non-owned vehicles with a combined single limit of not less than $1,000,000." },
        { ref: "11.2(c)", text: "Workers’ Compensation insurance as required by statute and Employer’s Liability insurance with limits of not less than $1,000,000 each accident." },
        { ref: "11.2(d)", text: "Professional Liability insurance covering errors and omissions in the performance of the Services with limits of not less than $3,000,000 per claim." },
        { ref: "11.3", text: "Vendor may satisfy the limits required in this Section 11 through any combination of primary and excess or umbrella policies, provided the excess or umbrella policies follow the form of the underlying coverage." } ] } ] },
    { page: 4, sections: [
      { heading: "11. Insurance (continued)", insurance: true, paras: [
        { ref: "11.4", text: "All insurance required of Vendor shall be primary and non-contributory with respect to any insurance or self-insurance maintained by Company." },
        { ref: "11.5", text: "Vendor waives, and shall cause its insurers to waive, all rights of subrogation against Company under the commercial general liability and workers’ compensation policies required by this Agreement." },
        { ref: "11.6", text: "Vendor shall deliver certificates of insurance evidencing the required coverage before beginning the Services and upon each renewal." },
        { ref: "11.7", text: "Vendor shall also maintain any additional insurance required of subcontractors under the Prime Agreement between Company and Lakeshore County Health System, the applicable terms of which are incorporated herein by reference." } ] },
      { heading: "12. Confidentiality", insurance: false, paras: [
        { ref: "12.1", text: "Each party shall protect the other party’s Confidential Information using at least reasonable care." } ] } ] },
    { page: 5, sections: [
      { heading: "Exhibit B — Data Security Requirements", insurance: false, paras: [
        { ref: "B.1", text: "Vendor will access Company’s building management systems, which may contain protected health information." },
        { ref: "B.2", text: "Vendor shall notify Company of any Security Incident within seventy-two (72) hours of discovery." },
        { ref: "B.3", text: "Vendor shall maintain Cyber Liability insurance, including network security and privacy liability, with limits of not less than $2,000,000 per claim, for as long as Vendor has access to Company systems." } ] } ] }
  ]
};

/* Contract B: blind-test contract (frozen; checksum bf63f6b4...). Only its text is sent to extraction. */
const CONTRACT_B = {"title": "Subcontract Agreement", "parties": "Atlas Construction Group, Inc. (“Contractor”) and Brightline Facility Services, Inc. (“Subcontractor”) — St. Brendan Medical Center East Tower Project", "pages": [{"page": 1, "sections": [{"heading": "1. Contract Documents", "insurance": false, "paras": [{"ref": "1.1", "text": "This Subcontract Agreement is entered into between Contractor and Subcontractor for mechanical and building systems work on the St. Brendan Medical Center East Tower Project (the “Project”), owned by St. Brendan Health, Inc. (“Owner”)."}, {"ref": "1.2", "text": "The Subcontract Documents consist of this Agreement and Exhibits A (Scope of Work), B (Schedule), C (Pricing), and D (Owner Site Requirements), each of which is attached and made part of this Agreement."}, {"ref": "1.3", "text": "If this Agreement and an Exhibit impose different requirements on the same subject, Subcontractor shall comply with the more stringent requirement."}]}, {"heading": "2. Scope of Work", "insurance": false, "paras": [{"ref": "2.1", "text": "Subcontractor shall furnish all labor, materials, equipment, and supervision required to install, test, and commission the HVAC and building automation systems described in Exhibit A."}, {"ref": "2.2", "text": "Subcontractor shall coordinate its work with other trades and shall attend weekly coordination meetings scheduled by Contractor."}]}]}, {"page": 2, "sections": [{"heading": "3. Schedule", "insurance": false, "paras": [{"ref": "3.1", "text": "Subcontractor shall begin work on the date stated in Contractor’s notice to proceed and shall achieve substantial completion of its work in accordance with Exhibit B."}, {"ref": "3.2", "text": "Time is of the essence. Subcontractor shall notify Contractor in writing within five (5) days of any event it believes will delay its work."}]}, {"heading": "4. Payment", "insurance": false, "paras": [{"ref": "4.1", "text": "Contractor shall pay Subcontractor the amounts set out in Exhibit C, less retainage of ten percent (10%), within ten (10) days after Contractor receives payment from Owner for Subcontractor’s work."}, {"ref": "4.2", "text": "Each payment application shall include conditional lien waivers from Subcontractor and its suppliers."}]}, {"heading": "5. Changes", "insurance": false, "paras": [{"ref": "5.1", "text": "Contractor may order changes to the work by written change order. Subcontractor shall not proceed with any change without a signed change order or written directive."}]}]}, {"page": 3, "sections": [{"heading": "6. Subcontractor’s Tools and Equipment", "insurance": false, "paras": [{"ref": "6.1", "text": "Subcontractor is solely responsible for its tools, equipment, and materials stored at the Project site until they are incorporated into the work."}, {"ref": "6.2", "text": "Contractor recommends, but does not require, that Subcontractor carry an inland marine or equipment floater policy covering its tools and equipment while at the Project site."}]}, {"heading": "7. Safety", "insurance": false, "paras": [{"ref": "7.1", "text": "Subcontractor shall comply with Contractor’s site safety program and all applicable OSHA regulations, and shall designate a competent person on site at all times."}]}, {"heading": "8. Warranty", "insurance": false, "paras": [{"ref": "8.1", "text": "Subcontractor warrants its work against defects in materials and workmanship for one (1) year after substantial completion of the Project."}]}]}, {"page": 4, "sections": [{"heading": "9. Indemnification", "insurance": false, "paras": [{"ref": "9.1", "text": "To the fullest extent permitted by law, Subcontractor shall defend, indemnify, and hold harmless Contractor and Owner from claims for bodily injury, property damage, and related expenses arising out of the performance of Subcontractor’s work."}, {"ref": "9.2", "text": "Subcontractor’s obligations under this Section 9 are not limited by the amount or type of insurance Subcontractor carries."}]}, {"heading": "10. Risk of Loss", "insurance": false, "paras": [{"ref": "10.1", "text": "Subcontractor bears the risk of loss to its work until final acceptance by Owner."}, {"ref": "10.2", "text": "Subcontractor shall promptly repair any damage to the work of other trades caused by Subcontractor or its lower-tier subcontractors."}, {"ref": "10.3", "text": "Subcontractor waives all rights of recovery against Contractor and Owner to the extent of any loss covered by its commercial general liability, business automobile, and workers’ compensation insurance, and shall obtain endorsements from its insurers waiving subrogation in favor of Contractor and Owner on each of those policies."}]}, {"heading": "11. Dispute Resolution", "insurance": false, "paras": [{"ref": "11.1", "text": "The parties shall attempt in good faith to resolve any dispute through negotiation between senior executives before commencing litigation."}]}]}, {"page": 5, "sections": [{"heading": "12. Insurance", "insurance": true, "paras": [{"ref": "12.1", "text": "Before starting work, Subcontractor shall obtain and thereafter maintain the following insurance with insurers authorized to do business in the state where the Project is located."}, {"ref": "12.2(a)", "text": "Commercial general liability insurance with limits of not less than $1,000,000 each occurrence and $2,000,000 general aggregate."}, {"ref": "12.2(b)", "text": "Business automobile liability insurance with a combined single limit of not less than $1,000,000 per accident."}, {"ref": "12.2(c)", "text": "Workers’ compensation insurance as required by law and employer’s liability insurance with limits of not less than $1,000,000 each accident."}, {"ref": "12.2(d)", "text": "Contractor’s pollution liability insurance with limits of not less than $2,000,000 per occurrence, covering pollution conditions arising from Subcontractor’s work."}, {"ref": "12.3", "text": "The limits required in this Section 12 may be satisfied by any combination of primary and umbrella or excess liability insurance."}]}]}, {"page": 6, "sections": [{"heading": "12. Insurance (continued)", "insurance": true, "paras": [{"ref": "12.4", "text": "Contractor, Owner, and their respective officers and employees shall be included as additional insureds under Subcontractor’s commercial general liability policy with respect to liability arising out of Subcontractor’s work."}, {"ref": "12.5", "text": "Subcontractor’s insurance shall be primary and non-contributory with respect to any insurance maintained by Contractor or Owner."}, {"ref": "12.6", "text": "Subcontractor shall furnish certificates of insurance and copies of the required endorsements to Contractor before starting work."}, {"ref": "12.7", "text": "Subcontractor shall give Contractor at least thirty (30) days’ prior written notice of cancellation, non-renewal, or material reduction of any required coverage."}, {"ref": "12.8", "text": "Subcontractor shall also comply with all insurance and enrollment requirements of the Owner Controlled Insurance Program Manual issued by Owner, which is incorporated into this Agreement by reference."}]}, {"heading": "13. Termination", "insurance": false, "paras": [{"ref": "13.1", "text": "Contractor may terminate this Agreement for cause if Subcontractor fails to cure a material default within seven (7) days after written notice."}]}]}, {"page": 7, "sections": [{"heading": "Exhibit D — Owner Site Requirements", "insurance": false, "paras": [{"ref": "D.1", "text": "All trade contractor personnel shall obtain an Owner-issued site badge and complete hospital infection control training before entering occupied areas."}, {"ref": "D.2", "text": "All trade contractors shall carry commercial general liability insurance with limits of not less than $2,000,000 per occurrence and $4,000,000 general aggregate."}, {"ref": "D.3", "text": "Work in occupied patient areas shall be scheduled through Owner’s facilities department at least forty-eight (48) hours in advance."}]}]}], "label": "<b>Subcontract Agreement</b> · Atlas Construction ↔ <b>Brightline Facility Services</b> (our client) · blind test"};
const ACTIVE = location.hash === "#contract-b" ? "b" : "a";
const CONTRACT = ACTIVE === "b" ? CONTRACT_B : CONTRACT_A;

/* ============ 2. CURRENT COVERAGE (clean structured data) ============ */
const COVERAGE = {
  insured: "Brightline Facility Services, Inc.",
  lines: {
    cgl:          { name: "Commercial General Liability", per_occurrence: 1000000, aggregate: 2000000 },
    auto:         { name: "Business Auto", csl: 1000000 },
    wc:           { name: "Workers' Comp / Employer's Liability", el_each_accident: 1000000 },
    professional: { name: "Professional Liability (E&O)", per_claim: 2000000 },
    umbrella:     { name: "Umbrella", per_occurrence: 5000000, aggregate: 5000000, sits_over: ["cgl", "auto", "wc"], follows_form: null }
    // no cyber policy
  },
  endorsements: {
    additional_insured: { present: true, form: "CG 20 10 blanket AI", scope: ["ongoing"] },
    primary_noncontributory: null,  // not recorded in our data
    waiver_of_subrogation: { present: true, form: "Blanket, where required by written contract", lines: ["cgl", "auto", "wc"] }
  }
};

/* ============ 3. AI EXTRACTION ============ */
/* 3a. Saved sample output (offline fallback only; the live path is runClaudeExtraction below) */
const SAMPLE_EXTRACTION = {
  requirements: [
    { id: "gl", category: "General liability limit", title: "General liability limits", type: "limit", line: "cgl",
      plain: "Vendor must carry commercial general liability of at least $2M per occurrence and $4M aggregate.",
      required: { per_occurrence: 2000000, aggregate: 4000000 },
      quote: "Commercial General Liability insurance with limits of not less than $2,000,000 each occurrence and $4,000,000 general aggregate.",
      ref: "11.2(a)", confidence: "high" },
    { id: "ai", category: "Additional insured", title: "Additional insured: ongoing and completed operations", type: "additional_insured",
      plain: "Company and its affiliates must be additional insureds on Vendor’s CGL for both ongoing and completed operations.",
      required: { scope: ["ongoing", "completed"] },
      quote: "Vendor shall cause Company and its affiliates to be named as additional insureds under Vendor’s commercial general liability policy for both ongoing operations and completed operations.",
      ref: "8.3", confidence: "high" },
    { id: "pnc", category: "Primary and non-contributory", title: "Primary and non-contributory", type: "primary_noncontributory",
      plain: "Vendor’s required insurance must respond before, and not share with, Company’s own insurance.",
      required: {},
      quote: "All insurance required of Vendor shall be primary and non-contributory with respect to any insurance or self-insurance maintained by Company.",
      ref: "11.4", confidence: "high" },
    { id: "wos", category: "Waiver of subrogation", title: "Waiver of subrogation", type: "waiver_of_subrogation",
      plain: "Vendor’s insurers must waive subrogation against Company on the CGL and workers’ comp policies.",
      required: { lines: ["cgl", "wc"] },
      quote: "Vendor waives, and shall cause its insurers to waive, all rights of subrogation against Company under the commercial general liability and workers’ compensation policies required by this Agreement.",
      ref: "11.5", confidence: "high" },
    { id: "pl", category: "Professional / cyber", title: "Professional liability limit", type: "limit", line: "professional",
      plain: "Vendor must carry professional liability (E&O) of at least $3M per claim.",
      required: { per_claim: 3000000 },
      quote: "Professional Liability insurance covering errors and omissions in the performance of the Services with limits of not less than $3,000,000 per claim.",
      ref: "11.2(d)", confidence: "high" },
    { id: "cyber", category: "Professional / cyber", title: "Cyber liability coverage", type: "limit", line: "cyber", lineName: "Cyber Liability",
      plain: "Vendor must carry cyber liability (network security and privacy) of at least $2M per claim while it has system access.",
      required: { per_claim: 2000000 },
      quote: "Vendor shall maintain Cyber Liability insurance, including network security and privacy liability, with limits of not less than $2,000,000 per claim, for as long as Vendor has access to Company systems.",
      ref: "B.3", confidence: "high" }
  ],
  contract_terms: {
    excess_allowed: { allowed: true, condition: "follow_form", ref: "11.3" }
  },
  external_references: [
    { id: "ext-prime", document: "Prime Agreement (Company ↔ Lakeshore County Health System)", available: false,
      quote: "Vendor shall also maintain any additional insurance required of subcontractors under the Prime Agreement between Company and Lakeshore County Health System, the applicable terms of which are incorporated herein by reference.",
      ref: "11.7" }
  ],
  out_of_scope: [
    { id: "oos-auto", title: "Business auto liability ($1M CSL)", ref: "11.2(b)",
      quote: "Business Automobile Liability insurance covering owned, hired, and non-owned vehicles with a combined single limit of not less than $1,000,000." },
    { id: "oos-wc", title: "Workers’ comp / employer’s liability ($1M)", ref: "11.2(c)",
      quote: "Workers’ Compensation insurance as required by statute and Employer’s Liability insurance with limits of not less than $1,000,000 each accident." }
  ]
};

/* 3b. Live extraction: Claude reads the full contract and returns the same schema */
function contractAsText() {
  let t = `${CONTRACT.title}\n${CONTRACT.parties}\n`;
  CONTRACT.pages.forEach(pg => {
    t += `\n[Page ${pg.page}]\n`;
    pg.sections.forEach(sec => {
      t += `## ${sec.heading}\n`;
      sec.paras.forEach(p => { t += `[${p.ref}] ${p.text}\n`; });
    });
  });
  return t;
}

function extractionPrompt() {
  return `You are extracting contractual insurance requirements from a contract for a commercial insurance risk advisor. Read the ENTIRE contract below. Requirements can appear outside the insurance section (indemnification, exhibits, schedules).

The party required to carry insurance is our client, Brightline Facility Services, Inc. ("Vendor").

Return ONLY a JSON object (no prose, no code fences) with exactly this shape:
{"requirements":[{"id":"","category":"","title":"","type":"","line":"","lineName":"","plain":"","required":{},"quote":"","ref":"","confidence":""}],
 "contract_terms":{"excess_allowed":{"allowed":true,"condition":"follow_form","ref":""}},
 "external_references":[{"id":"","document":"","available":false,"quote":"","ref":""}],
 "out_of_scope":[{"id":"","title":"","ref":"","quote":""}]}

Requirement types IN SCOPE (put these in "requirements"):
- "limit": a required coverage line with minimum limits. "line" is one of "cgl" (commercial general liability), "professional" (professional liability / E&O), "cyber" (cyber / network security and privacy liability). "required" uses only the keys the contract states among per_occurrence, aggregate, per_claim, as numbers in dollars. "lineName" is the coverage's human name.
- "additional_insured": "required" = {"scope":[...]} using "ongoing" and/or "completed", only what the text states.
- "primary_noncontributory": "required" = {}.
- "waiver_of_subrogation": "required" = {"lines":[...]} using "cgl","auto","wc","professional","umbrella" for the policies the text names.
Omit "line"/"lineName" for non-limit types. Every OTHER insurance-related requirement (auto, workers' comp / employer's liability, insurer ratings, certificates, notice, etc.) goes in "out_of_scope". Do not drop it.

Rules:
- "quote": copy the supporting text VERBATIM, character for character, as one contiguous substring of a single paragraph. Prefer the full sentence. Never paraphrase or join paragraphs.
- "ref": the paragraph label exactly as shown in square brackets, e.g. "11.2(a)" or "B.3" (no section sign).
- "id": short unique lowercase slug. "category" and "title": short human labels. "plain": one plain-English sentence of what Vendor must do.
- Never invent a requirement, value, or document that a quote does not support.
- Preserve ambiguity: if wording is unclear, conditional, or open to more than one reading, set "confidence" to "medium" or "low" and say why in "plain". Use "high" only when the requirement and its values are explicit.
- "external_references": every document incorporated by reference or relied on for insurance requirements that is NOT included in the text below ("available": false).
- "contract_terms.excess_allowed": whether umbrella/excess policies may satisfy the limits and on what condition ("follow_form", "none" or "other"); set it to null if the contract is silent.

CONTRACT:
<contract>
${contractAsText()}</contract>`;
}

function parseJson(text) {
  const s = text.indexOf("{"), e = text.lastIndexOf("}");
  if (s < 0 || e < s) throw new Error("No JSON object in Claude's answer");
  return JSON.parse(text.slice(s, e + 1));
}

async function runClaudeExtraction(onProgress) {
  const sample = await claude.use("sample");
  if (!sample) throw new Error("Claude isn't available in this view (open the page on claude.ai).");
  const res = await sample(extractionPrompt(), { modelTier: "complex", onText: ({ text }) => onProgress && onProgress(text.length) });
  if (res.truncated) throw new Error("Claude's answer was cut off.");
  return parseJson(res.text);
}

/* 3c. Answer key for the eval. Written from the contract before any live run; do not edit to make the eval pass. */
const EXPECTED = {
  requirements: [
    { key: "GL limit",                   type: "limit", line: "cgl",          ref: "11.2(a)", values: { per_occurrence: 2000000, aggregate: 4000000 } },
    { key: "Additional insured",         type: "additional_insured",          ref: "8.3",     values: { scope: ["ongoing", "completed"] } },
    { key: "Primary & non-contributory", type: "primary_noncontributory",     ref: "11.4",    values: {} },
    { key: "Waiver of subrogation",      type: "waiver_of_subrogation",       ref: "11.5",    values: { lines: ["cgl", "wc"] } },
    { key: "Professional liability",     type: "limit", line: "professional", ref: "11.2(d)", values: { per_claim: 3000000 } },
    { key: "Cyber liability",            type: "limit", line: "cyber",        ref: "B.3",     values: { per_claim: 2000000 } }
  ],
  external: [{ key: "Prime Agreement", ref: "11.7" }],
  out_of_scope: [{ key: "Business auto", ref: "11.2(b)" }, { key: "Workers' comp / EL", ref: "11.2(c)" }]
};

/* ============ 4. COMPARISON ENGINE (deterministic rules; ambiguity -> Needs review) ============ */
const OUTCOMES = {
  satisfied:  "Existing coverage satisfies",
  endorsement:"Request endorsement",
  coverage:   "Different / additional coverage",
  pushback:   "Push back on requirement",
  verify:     "Verify before deciding"
};
const STATUS_LABEL = { gap: "Gap", review: "Needs review", met: "Met" };
const STATUS_ORDER = { gap: 0, review: 1, met: 2 };
const LIMIT_LABEL = { per_occurrence: "per occurrence", aggregate: "aggregate", per_claim: "per claim" };
const UMBRELLA_KEY = { per_occurrence: "per_occurrence", aggregate: "aggregate", per_claim: "per_occurrence" };

const money = n => n >= 1e6 ? "$" + (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + "M" : "$" + n.toLocaleString();
const limitsText = obj => Object.keys(obj).filter(k => LIMIT_LABEL[k]).map(k => money(obj[k]) + " " + LIMIT_LABEL[k]).join(" / ");

function evaluate(req, cov, terms) {
  const r = rules[req.type](req, cov, terms);
  // Guardrail: never claim Met on weak evidence.
  if (r.status === "met" && req.confidence !== "high") {
    return { ...r, status: "review", method: "judgment", reason: "Extraction confidence is low, so this is not marked Met. " + r.reason, outcome: "verify", next: "Confirm the requirement wording in the contract." };
  }
  return r;
}

const rules = {
  limit(req, cov, terms) {
    const line = cov.lines[req.line];
    const name = line ? line.name : (req.lineName || req.line);
    const requiredText = limitsText(req.required);
    if (!line) {
      return { status: "gap", method: "rule", required: requiredText, current: "Not carried",
        reason: `No ${name} policy in the client’s current program.`,
        outcome: "coverage", next: `Obtain ${name} coverage at ${requiredText}, or push back if the exposure doesn’t justify it.` };
    }
    const short = Object.keys(req.required).filter(k => (line[k] || 0) < req.required[k]);
    const umb = cov.lines.umbrella;
    const sitsOver = umb && umb.sits_over.includes(req.line);
    const current = limitsText(line) + (sitsOver ? ` + ${umb.name} ${money(umb.per_occurrence)}` : "");
    if (short.length === 0) {
      return { status: "met", method: "rule", required: requiredText, current,
        reason: "Primary limits meet or exceed every required limit.", outcome: "satisfied", next: "No action needed." };
    }
    const shortText = short.map(k => `${money(line[k])} vs. ${money(req.required[k])} ${LIMIT_LABEL[k]}`).join("; ");
    const excess = terms.excess_allowed;
    const stackWorks = sitsOver && excess && excess.allowed &&
      short.every(k => (line[k] || 0) + (umb[UMBRELLA_KEY[k]] || 0) >= req.required[k]);
    if (stackWorks) {
      if (umb.follows_form === true) {
        return { status: "met", method: "rule", required: requiredText, current,
          reason: `Primary is short (${shortText}), but the umbrella closes it and §${excess.ref} allows follow-form excess.`,
          outcome: "satisfied", next: "No action needed." };
      }
      if (excess.condition !== "follow_form") {
        return { status: "review", method: "judgment", required: requiredText, current,
          reason: `Primary is short (${shortText}). \u00a7${excess.ref} permits umbrella or excess coverage to satisfy the limits, but our coverage data doesn\u2019t establish whether the umbrella actually provides the coverage needed to meet this requirement, so Needs review is appropriate.`,
          outcome: "verify", next: "Confirm with the carrier that the umbrella responds over CGL for this requirement. If it doesn\u2019t, increase CGL limits." };
      }
      return { status: "review", method: "judgment", required: requiredText, current,
        reason: `Primary is short (${shortText}). The umbrella would close the gap, and §${excess.ref} allows excess that follows form, but our coverage data doesn’t confirm the umbrella follows form.`,
        outcome: "verify", next: "Check the umbrella policy for follow-form language over CGL. If it doesn’t follow form, increase CGL limits." };
    }
    return { status: "gap", method: "rule", required: requiredText, current,
      reason: `Limit is short: ${shortText}.` + (umb && !sitsOver ? ` The umbrella doesn’t sit over ${name}.` : ""),
      outcome: "coverage", next: `Increase ${name} to ${requiredText}, or negotiate the requirement down.` };
  },
  additional_insured(req, cov) {
    const e = cov.endorsements.additional_insured;
    const requiredText = "AI for " + (Array.isArray(req.required.scope) ? req.required.scope : []).join(" + ") + " operations";
    if (!e || !e.present) {
      return { status: "gap", method: "rule", required: requiredText, current: "No additional insured endorsement",
        reason: "The client has no additional insured endorsement.", outcome: "endorsement", next: "Request a blanket additional insured endorsement from the carrier." };
    }
    const current = `${e.form} (${e.scope.join(", ")} operations)`;
    // Safeguard (independent of model confidence): an unspecified/ambiguous scope is never "nothing missing".
    const reqScope = Array.isArray(req.required.scope) ? req.required.scope.filter(s => s === "ongoing" || s === "completed") : [];
    if (reqScope.length === 0) {
      const coversEveryReading = ["ongoing", "completed"].every(s => e.scope.includes(s));
      if (coversEveryReading) {
        return { status: "met", method: "rule", required: "AI (contract doesn’t specify ongoing vs. completed operations)", current,
          reason: "The contract doesn’t specify the scope, but the endorsement covers both ongoing and completed operations, so it satisfies any reading.", outcome: "satisfied", next: "No action needed." };
      }
      return { status: "review", method: "judgment", required: "AI (contract doesn’t specify ongoing vs. completed operations)", current,
        reason: `The contract requires additional insured status but doesn’t say whether it covers ongoing operations, completed operations, or both. The current endorsement covers ${e.scope.join(", ")} operations only, so it can’t be confirmed as satisfying the requirement.`,
        outcome: "verify", next: "Confirm the intended scope with the counterparty, or request a completed-operations AI endorsement (e.g., CG 20 37) to cover either reading." };
    }
    const missing = reqScope.filter(s => !e.scope.includes(s));
    if (missing.length) {
      return { status: "gap", method: "rule", required: requiredText, current,
        reason: `The current AI endorsement covers ${e.scope.join(", ")} operations only; the contract also requires ${missing.join(", ")} operations.`,
        outcome: "endorsement", next: `Request a ${missing.join("/")}-operations AI endorsement (e.g., CG 20 37) from the carrier.` };
    }
    return { status: "met", method: "rule", required: requiredText, current,
      reason: "Endorsement scope covers every required operation type.", outcome: "satisfied", next: "No action needed." };
  },
  primary_noncontributory(req, cov) {
    const v = cov.endorsements.primary_noncontributory;
    const requiredText = "Primary and non-contributory wording";
    if (v === true) return { status: "met", method: "rule", required: requiredText, current: "P&NC endorsement on file", reason: "P&NC wording is recorded on the policy.", outcome: "satisfied", next: "No action needed." };
    if (v === false) return { status: "gap", method: "rule", required: requiredText, current: "No P&NC endorsement", reason: "The policy is recorded as not primary and non-contributory.", outcome: "endorsement", next: "Request a primary and non-contributory endorsement from the carrier." };
    return { status: "review", method: "judgment", required: requiredText, current: "Not recorded in coverage data",
      reason: "Our coverage data doesn’t say whether the policy has P&NC wording, so this can’t be confirmed and isn’t marked Met.",
      outcome: "verify", next: "Check the CGL endorsement schedule for P&NC language. Request the endorsement if it’s missing." };
  },
  waiver_of_subrogation(req, cov) {
    const e = cov.endorsements.waiver_of_subrogation;
    const names = l => req.required.lines.length ? l.map(x => (cov.lines[x] ? cov.lines[x].name : x)).join(", ") : "";
    const requiredText = "Waiver on " + names(req.required.lines);
    if (!e || !e.present) {
      return { status: "gap", method: "rule", required: requiredText, current: "No waiver endorsement", reason: "No waiver of subrogation endorsement on file.", outcome: "endorsement", next: "Request a blanket waiver of subrogation endorsement." };
    }
    const missing = req.required.lines.filter(l => !e.lines.includes(l));
    const current = `${e.form} (on ${e.lines.map(x => cov.lines[x] ? cov.lines[x].name : x).join(", ")})`;
    if (missing.length) {
      return { status: "gap", method: "rule", required: requiredText, current, reason: `The waiver doesn’t apply to ${names(missing)}.`, outcome: "endorsement", next: `Request a waiver endorsement on ${names(missing)}.` };
    }
    return { status: "met", method: "rule", required: requiredText, current,
      reason: "The blanket waiver applies when a written contract requires it, and it covers every required policy.", outcome: "satisfied", next: "No action needed." };
  }
};

/* ============ 5. GROUNDING: locate every quote in the source ============ */
const PARAS = [];
CONTRACT.pages.forEach(pg => pg.sections.forEach(sec => sec.paras.forEach(p => PARAS.push({ ...p, page: pg.page, section: sec.heading, insurance: sec.insurance }))));
// Typographic-quote-tolerant search (1:1 character mapping), returns the exact contract substring.
const norm = s => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/\s/g, " ");
function locate(quote) {
  const q = norm(String(quote || "").trim());
  if (q.length < 12) return null;
  for (const p of PARAS) { const i = norm(p.text).indexOf(q); if (i >= 0) return { ...p, exact: p.text.slice(i, i + q.length) }; }
  return null;
}

let EXTRACTION = null, FINDINGS = [], EXT = [], OOS = [], EVAL = null, SOURCE = null;

/* Same-requirement grouping: clauses with the same type (+ coverage line) become ONE requirement.
   Precedence comes from the contract text itself (deterministic), never from the model. */
const PRECEDENCE_RE = /\b(more|most) stringent\b|\bstricter\b|\bhigher (limits?|requirements?) (shall )?(govern|control|prevail)/i;
function findPrecedence() { const p = PARAS.find(x => PRECEDENCE_RE.test(x.text)); return p ? { ref: p.ref, page: p.page, text: p.text } : null; }
const CONF_RANK = { high: 2, medium: 1, low: 0 };
const minConfidence = list => list.reduce((m, c) => (CONF_RANK[c] ?? 0) < (CONF_RANK[m] ?? 0) ? c : m, "high");
function stricterOf(type, reqs) {
  if (type === "limit") { const out = {}; reqs.forEach(r => Object.keys(r).forEach(k => { if (typeof r[k] === "number") out[k] = Math.max(out[k] || 0, r[k]); })); return out; }
  if (type === "additional_insured") { const lists = reqs.map(r => Array.isArray(r.scope) ? r.scope : []); return { scope: lists.some(l => l.length === 0) ? [] : [...new Set(lists.flat())] }; }
  if (type === "waiver_of_subrogation") return { lines: [...new Set(reqs.flatMap(r => Array.isArray(r.lines) ? r.lines : []))] };
  return {};
}
function mergeGroup(group) {
  if (group.length === 1) return group[0];
  const sources = group.map(r => { const loc = locate(r.quote); return { ref: loc ? loc.ref : r.ref, page: loc ? loc.page : null, quote: loc ? loc.exact : r.quote, verified: !!loc, required: r.required }; });
  const conflict = !group.every(r => JSON.stringify(r.required) === JSON.stringify(group[0].required));
  const precedence = conflict ? findPrecedence() : null;
  const effective = stricterOf(group[0].type, group.map(r => r.required));
  const governing = group.find(r => JSON.stringify(r.required) === JSON.stringify(effective)) || group[0];
  const ordered = [governing, ...group.filter(r => r !== governing)];
  return { ...governing, id: governing.id, required: effective, confidence: minConfidence(group.map(r => r.confidence)),
    title: governing.type === "limit" ? `${governing.lineName || governing.category || governing.line} limits` : governing.title,
    sources: ordered.map(r => sources[group.indexOf(r)]), conflict, precedence };
}


function build(extraction, source) {
  EXTRACTION = extraction; SOURCE = source;
  const terms = extraction.contract_terms || {};
  const seen = {};
  const uid = (id, i) => { let k = String(id || "item" + i).replace(/[^a-z0-9_-]/gi, "-"); while (seen[k]) k += "-x"; seen[k] = 1; return k; };
  const reqs = (extraction.requirements || []).map((r, i) => ({ ...r, id: uid(r.id, i), required: r.required || {} }));
  const unsupported = reqs.filter(r => !rules[r.type]);   // unknown type: never silently dropped
  const groups = {}, order = [];
  reqs.filter(r => rules[r.type]).forEach(r => { const k = r.type + "|" + (r.line || ""); if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(r); });
  FINDINGS = order.map(k => mergeGroup(groups[k])).map(req => {
    const loc = locate(req.quote);
    let res;
    try { res = evaluate(req, COVERAGE, terms); }
    catch (err) { res = { status: "review", method: "judgment", required: JSON.stringify(req.required), current: "—", reason: "Couldn’t evaluate this requirement automatically.", outcome: "verify", next: "Review manually." }; }
    if (!loc) res = { ...res, status: "review", method: "judgment", reason: "The source quote couldn’t be found in the contract, so this can’t be trusted. " + res.reason, outcome: "verify", next: "Locate the requirement in the contract manually." };
    if (req.sources && req.sources.some(x => !x.verified)) res = { ...res, status: "review", method: "judgment", reason: "One of the source clauses couldn’t be found in the contract. " + res.reason, outcome: "verify", next: "Locate every source clause in the contract manually." };
    if (req.conflict && !req.precedence) {
      res = { ...res, status: "review", method: "judgment",
        reason: `${req.sources.length} clauses set different requirements and the contract has no precedence rule, so it’s unclear which governs. Strictest reading: ${res.required}. ` + res.reason,
        outcome: "verify", next: "Confirm with the counterparty which clause governs before deciding." };
    } else if (req.conflict) {
      res = { ...res, reason: `§${req.precedence.ref} makes the stricter clause govern, so the effective requirement is ${res.required}. ` + res.reason };
    }
    return { ...req, quote: loc ? loc.exact : req.quote, ...res, loc, extracted: req.required };
  }).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
  EXT = (extraction.external_references || []).filter(x => !x.available).map((x, i) => { const loc = locate(x.quote); return { ...x, id: uid("ext-" + (x.id || i), i), quote: loc ? loc.exact : x.quote, loc }; });
  OOS = [...(extraction.out_of_scope || []), ...unsupported.map(r => ({ id: r.id, title: r.title, ref: r.ref, quote: r.quote }))]
    .map((x, i) => { const loc = locate(x.quote); return { ...x, id: uid("oos-" + (x.id || i), i), quote: loc ? loc.exact : x.quote, loc }; });
  EVAL = runEval();
  window.__EVAL = EVAL; window.__EXTRACTION = extraction;
  Object.keys(decisions).forEach(k => delete decisions[k]);
  Object.keys(openForm).forEach(k => delete openForm[k]);
  selectedId = null;
  render();
}

/* Eval: extracted vs. answer key. FOUND = matched by type (+ line); grounding and values checked separately. */
function subset(expected, actual) {
  return Object.keys(expected).every(k => Array.isArray(expected[k])
    ? Array.isArray(actual[k]) && expected[k].every(v => actual[k].includes(v)) && actual[k].length === expected[k].length
    : actual[k] === expected[k]);
}
function runEval() {
  const used = new Set();
  const rows = EXPECTED.requirements.map(e => {
    const f = FINDINGS.find(x => !used.has(x.id) && x.type === e.type && (!e.line || x.line === e.line));
    if (!f) return { key: e.key, found: false };
    used.add(f.id);
    return { key: e.key, found: true, id: f.id, refOk: !!f.loc && f.loc.ref === e.ref, gotRef: f.loc ? f.loc.ref : f.ref,
      quoteVerified: !!f.loc, valuesOk: subset(e.values, f.extracted || {}), status: f.status, confidence: f.confidence };
  });
  const extra = FINDINGS.filter(f => !used.has(f.id)).map(f => ({ id: f.id, title: f.title, type: f.type, line: f.line, ref: f.loc ? f.loc.ref : f.ref }));
  const ext = EXPECTED.external.map(e => ({ key: e.key, found: EXT.some(x => x.loc && x.loc.ref === e.ref) }));
  const oos = EXPECTED.out_of_scope.map(e => ({ key: e.key, found: OOS.some(x => x.loc && x.loc.ref === e.ref) }));
  const n = rows.filter(r => r.found);
  return { rows, extra, ext, oos,
    summary: { found: n.length, expected: rows.length, missed: rows.length - n.length, extra: extra.length,
      quotesVerified: n.filter(r => r.quoteVerified).length, refsOk: n.filter(r => r.refOk).length, valuesOk: n.filter(r => r.valuesOk).length,
      externalFound: ext.filter(x => x.found).length, externalExpected: ext.length,
      oosFound: oos.filter(x => x.found).length, oosExpected: oos.length } };
}

/* ============ 6. ADVISOR DECISIONS (state) ============ */
const decisions = {};   // id -> {type, status?, outcome?, note}
const openForm = {};    // id -> 'override' | 'escalate'
let selectedId = null;

const effStatus = f => (decisions[f.id] && decisions[f.id].type === "overridden") ? decisions[f.id].status : f.status;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const refLabel = loc => loc ? `${/^[A-Z]\./.test(loc.ref) ? "Exhibit B, §" : "§"}${loc.ref} · p.${loc.page}` : "source not found";

/* ============ 7. RENDER ============ */
function renderHeader() {
  const counts = { gap: 0, review: 0, met: 0 };
  FINDINGS.forEach(f => counts[effStatus(f)]++);
  document.getElementById("chips").innerHTML =
    `<span class="chip p-gap">${counts.gap} Gap</span><span class="chip p-review">${counts.review} Needs review</span><span class="chip p-met">${counts.met} Met</span>`;
  const done = FINDINGS.filter(f => decisions[f.id]).length;
  document.getElementById("progress-text").textContent = `Reviewed ${done} of ${FINDINGS.length}`;
  document.getElementById("progress-bar").style.width = (FINDINGS.length ? 100 * done / FINDINGS.length : 0) + "%";
}

function renderEval() {
  const slot = document.getElementById("eval-slot");
  const raw = EXTRACTION ? `<details class="eval"><summary>Raw extraction output (JSON)</summary><pre id="raw-json" style="white-space:pre-wrap;font-size:11px;max-height:300px;overflow:auto">${esc(JSON.stringify(EXTRACTION, null, 1))}</pre></details>` : "";
  if (ACTIVE === "b") { slot.innerHTML = EXTRACTION ? `<div class="eval">Blind test: scored outside the app against the frozen answer key (never shown to the extraction prompt).</div>` + raw : ""; return; }
  if (!EVAL) { slot.innerHTML = raw; return; }
  const s = EVAL.summary, c = (a, b) => `<span class="${a === b ? "ok" : "bad"}">${a}/${b}</span>`;
  const yn = v => v ? "✓" : "✗";
  const tile = (label, val, good) => `<div class="tile"><div class="tl">${label}</div><div class="tv ${good ? "ok" : "bad"}">${val}</div></div>`;
  const card = `<div class="scorecard"><div class="sc-title">Extraction eval \u00b7 ${SOURCE === "claude" ? "live Claude run" : "saved sample"} vs. answer key</div><div class="tiles">
    ${tile("Recall", s.found + "/" + s.expected, s.found === s.expected)}${tile("Missed", s.missed, !s.missed)}${tile("Extras", s.extra, !s.extra)}
    ${tile("Quotes verified", s.quotesVerified + "/" + s.found, s.quotesVerified === s.found)}${tile("External refs", s.externalFound + "/" + s.externalExpected, s.externalFound === s.externalExpected)}
    <div class="tile caveat"><div class="tl">Key caveat</div><div class="tv">n=1 synthetic contract</div></div></div></div>`;
  slot.innerHTML = card + `<details class="eval"><summary>Detailed results: extraction eval vs. answer key (${SOURCE === "claude" ? "live Claude run" : "saved sample"}): found ${s.found}/${s.expected} · missed ${s.missed} · extra ${s.extra}</summary>
    <div class="nums"><span>Requirements found ${c(s.found, s.expected)}</span><span>Quotes verified in contract ${c(s.quotesVerified, s.found)}</span><span>Section refs correct ${c(s.refsOk, s.found)}</span><span>Values correct ${c(s.valuesOk, s.found)}</span><span>External refs flagged ${c(s.externalFound, s.externalExpected)}</span><span>Out-of-scope items kept ${c(s.oosFound, s.oosExpected)}</span><span>Extra <span class="${s.extra ? "bad" : "ok"}">${s.extra}</span></span></div>
    <table><tr><th>Expected</th><th>Found</th><th>Quote verified</th><th>Ref</th><th>Values</th><th>Confidence</th><th>Status</th></tr>
    ${EVAL.rows.map(r => `<tr><td>${esc(r.key)}</td><td>${r.found ? "FOUND" : "<b class=bad>MISSED</b>"}</td><td>${r.found ? yn(r.quoteVerified) : ""}</td><td>${r.found ? yn(r.refOk) + " " + esc(r.gotRef || "") : ""}</td><td>${r.found ? yn(r.valuesOk) : ""}</td><td>${r.found ? esc(r.confidence || "—") : ""}</td><td>${r.found ? STATUS_LABEL[r.status] : ""}</td></tr>`).join("")}
    ${EVAL.extra.map(x => `<tr><td colspan="7"><b class=bad>EXTRA</b> ${esc(x.title || x.id)} (${esc(x.type)}${x.line ? " / " + esc(x.line) : ""}, ${esc(x.ref || "no ref")})</td></tr>`).join("")}
    </table></details>` + raw;
}

function renderBanner() {
  document.getElementById("banner-slot").innerHTML = EXT.map(x => `
    <div class="banner" data-select="${x.id}" id="banner-${x.id}">
      <h3>⚠ Potentially incomplete review</h3>
      <p>This contract incorporates the <b>${esc(x.document)}</b>, which wasn’t provided. It may contain insurance requirements this review couldn’t check.</p>
      <blockquote>“${esc(x.quote)}”</blockquote>
      <span class="ref-link">${refLabel(x.loc)} → view in contract</span>
    </div>`).join("");
}

function decisionHtml(f) {
  const d = decisions[f.id];
  if (!d) return "";
  const undo = `<button class="link" data-act="undo" data-id="${f.id}">Undo</button>`;
  if (d.type === "accepted") return `<div class="decision d-accepted"><span class="who">✓ Accepted</span><span class="note">${esc(OUTCOMES[f.outcome])}</span><span class="spacer"></span>${undo}</div>`;
  if (d.type === "overridden") return `<div class="decision d-overridden"><span class="who">✎ Overridden</span><span class="note">${esc(STATUS_LABEL[f.status])} → <b>${esc(STATUS_LABEL[d.status])}</b> · ${esc(OUTCOMES[d.outcome])}${d.note ? " · “" + esc(d.note) + "”" : ""}</span><span class="spacer"></span>${undo}</div>`;
  return `<div class="decision d-escalated"><span class="who">⚑ Escalated</span><span class="note">${d.note ? "“" + esc(d.note) + "”" : "Flagged for senior review"}</span><span class="spacer"></span>${undo}</div>`;
}

function formHtml(f) {
  const mode = openForm[f.id];
  if (!mode) return "";
  if (mode === "override") {
    const st = Object.keys(STATUS_LABEL).map(s => `<option value="${s}" ${s === f.status ? "selected" : ""}>${STATUS_LABEL[s]}</option>`).join("");
    const oc = Object.keys(OUTCOMES).map(o => `<option value="${o}" ${o === f.outcome ? "selected" : ""}>${OUTCOMES[o]}</option>`).join("");
    return `<div class="form" data-stop="1">
      <div class="row"><label>Status<select id="ov-status-${f.id}">${st}</select></label><label>Next step<select id="ov-outcome-${f.id}">${oc}</select></label></div>
      <label>Note (why you’re overriding)<textarea id="ov-note-${f.id}" placeholder="e.g., Confirmed follow-form language on umbrella dec page"></textarea></label>
      <div class="actions" style="margin-top:0"><button class="primary" data-act="save-override" data-id="${f.id}">Save override</button><button data-act="cancel" data-id="${f.id}">Cancel</button></div></div>`;
  }
  return `<div class="form" data-stop="1">
    <label>What needs escalation?<textarea id="es-note-${f.id}" placeholder="e.g., Need carrier confirmation on completed-ops availability"></textarea></label>
    <div class="actions" style="margin-top:0"><button class="primary" data-act="save-escalate" data-id="${f.id}">Escalate</button><button data-act="cancel" data-id="${f.id}">Cancel</button></div></div>`;
}

function cardHtml(f) {
  const d = decisions[f.id];
  const s = effStatus(f);
  const overridden = d && d.type === "overridden";
  const outside = f.loc && !f.loc.insurance;
  const pills = overridden
    ? `<span class="pill p-${f.status} struck" title="Original assessment">${STATUS_LABEL[f.status]}</span><span class="pill p-${s}">${STATUS_LABEL[s]}</span>`
    : `<span class="pill p-${s}">${STATUS_LABEL[s]}</span>`;
  const actions = d || openForm[f.id] ? "" : `<div class="actions" data-stop="1">
      <button class="primary" data-act="accept" data-id="${f.id}">Accept</button>
      <button data-act="override" data-id="${f.id}">Override</button>
      <button data-act="escalate" data-id="${f.id}">Escalate</button></div>`;
  return `<article class="card s-${s} ${d ? "decided" : ""} ${selectedId === f.id ? "selected" : ""}" data-select="${f.id}" id="card-${f.id}">
    <div class="card-head">${pills}<h2>${esc(f.title)}</h2>${outside ? `<span class="tag outside">Found outside insurance section: ${esc(f.loc.section)}</span>` : ""}${f.sources && f.sources.length > 1 ? `<span class="tag ${f.conflict && !f.precedence ? "" : "outside"}">${f.sources.length} clauses${f.conflict ? (f.precedence ? " \u00b7 conflict resolved by \u00a7" + esc(f.precedence.ref) : " \u00b7 conflict unresolved") : ""}</span>` : ""}<span class="ref-link">${f.sources && f.sources.length > 1 ? f.sources.map(x => "\u00a7" + esc(x.ref)).join(" + ") : refLabel(f.loc)}</span></div>
    <p class="plain">${esc(f.plain)}</p>
    <div class="cols">
      <div class="col"><div class="col-title">Source facts</div><dl>
        ${f.sources && f.sources.length > 1
          ? f.sources.map((x, i) => `<dt>Contract says \u00b7 \u00a7${esc(x.ref)}${i === 0 && f.conflict && f.precedence ? " (governs)" : ""}</dt><dd><blockquote>\u201c${esc(x.quote)}\u201d</blockquote></dd>`).join("") +
            (f.conflict ? `<dt>${f.precedence ? "Conflict resolved by contract" : "Unresolved conflict"}</dt><dd>${f.precedence ? `\u00a7${esc(f.precedence.ref)}: \u201c${esc(f.precedence.text)}\u201d` : "No precedence rule found in the contract."}</dd>` : "")
          : `<dt>Contract says</dt><dd><blockquote>“${esc(f.quote)}”</blockquote></dd>`}
        <dt>Current coverage (from our data)</dt><dd>${esc(f.current)}</dd></dl></div>
      <div class="col"><div class="col-title">Assessment <span class="method ${f.method === "rule" ? "m-rule" : "m-judgment"}">${f.method === "rule" ? "Rule check" : "Needs judgment"}</span></div><dl>
        <dt>Required</dt><dd>${esc(f.required)}</dd>
        <dt>Why</dt><dd>${esc(f.reason)}</dd>
        <dt>Suggested next step · ${esc(OUTCOMES[f.outcome])}</dt><dd>${esc(f.next)}</dd></dl></div>
    </div>
    ${actions}${formHtml(f)}${decisionHtml(f)}
  </article>`;
}

function renderCards() {
  document.getElementById("cards").innerHTML = EXTRACTION ? (FINDINGS.length ? FINDINGS.map(cardHtml).join("") : `<div class="empty">Claude found no in-scope insurance requirements.</div>`)
    : `<div class="empty">Click <b>Run extraction with Claude</b> to have Claude read the full contract and pull out its insurance requirements.</div>`;
  document.getElementById("oos").innerHTML = OOS.length ? `<div class="pane-title">Also found · not checked by this prototype (${OOS.length})</div>` +
    OOS.map(o => `<div class="oos-item ${selectedId === o.id ? "selected" : ""}" data-select="${o.id}" id="oos-${o.id}"><span>${esc(o.title)}</span><span class="spacer"></span><span class="ref-link">${refLabel(o.loc)}</span></div>`).join("") : "";
}

function renderContract() {
  const marks = [
    ...FINDINGS.flatMap(f => (f.sources && f.sources.length > 1 ? f.sources.map((x, i) => ({ id: f.id, quote: x.quote, kind: "req", n: i })) : [{ id: f.id, quote: f.quote, kind: "req" }])),
    ...EXT.map(x => ({ id: x.id, quote: x.quote, kind: "ext" })),
    ...OOS.map(o => ({ id: o.id, quote: o.quote, kind: "oos" }))
  ];
  let html = `<h2>${esc(CONTRACT.title)}</h2><div class="parties">${esc(CONTRACT.parties)}</div>`;
  CONTRACT.pages.forEach(pg => {
    html += `<div class="page-break">Page ${pg.page}</div>`;
    pg.sections.forEach(sec => {
      html += `<h3>${esc(sec.heading)}</h3>`;
      sec.paras.forEach(p => {
        const hits = marks.map(m => ({ ...m, at: p.text.indexOf(m.quote) })).filter(m => m.at >= 0).sort((a, b) => a.at - b.at);
        let out = "", pos = 0;
        hits.forEach(h => {
          if (h.at < pos) return;
          out += esc(p.text.slice(pos, h.at)) + `<mark class="k-${h.kind} ${selectedId === h.id ? "active" : ""}" data-select="${h.id}" id="mark-${h.id}${h.n ? "-" + h.n : ""}">${esc(h.quote)}</mark>`;
          pos = h.at + h.quote.length;
        });
        out += esc(p.text.slice(pos));
        html += `<p><span class="pref">${esc(p.ref)}</span>${out}</p>`;
      });
    });
  });
  document.getElementById("contract").innerHTML = html;
}

function render() { renderHeader(); renderBanner(); renderEval(); renderCards(); renderContract(); }

/* ============ 8. INTERACTION ============ */
function select(id, fromContract) {
  selectedId = id;
  render();
  const mark = document.getElementById("mark-" + id);
  if (mark && !fromContract) mark.scrollIntoView({ behavior: "smooth", block: "center" });
  if (fromContract) {
    const target = document.getElementById("card-" + id) || document.getElementById("oos-" + id) || document.getElementById("banner-" + id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("click", e => {
  const btn = e.target.closest("button[data-act]");
  if (btn) {
    const id = btn.dataset.id, act = btn.dataset.act;
    if (act === "accept") { decisions[id] = { type: "accepted" }; }
    else if (act === "override" || act === "escalate") { openForm[id] = act; }
    else if (act === "cancel") { delete openForm[id]; }
    else if (act === "undo") { delete decisions[id]; }
    else if (act === "save-override") {
      decisions[id] = { type: "overridden", status: document.getElementById("ov-status-" + id).value,
        outcome: document.getElementById("ov-outcome-" + id).value, note: document.getElementById("ov-note-" + id).value.trim() };
      delete openForm[id];
    } else if (act === "save-escalate") {
      decisions[id] = { type: "escalated", note: document.getElementById("es-note-" + id).value.trim() };
      delete openForm[id];
    }
    selectedId = id;
    render();
    return;
  }
  if (e.target.closest("[data-stop]")) return;
  const sel = e.target.closest("[data-select]");
  if (sel) select(sel.dataset.select, !!e.target.closest("#contract"));
});

const runBtn = document.getElementById("run-btn"), runStatus = document.getElementById("run-status");
function setStatus(msg, err) { runStatus.textContent = msg; runStatus.className = err ? "err" : ""; }
runBtn.addEventListener("click", async () => {
  runBtn.disabled = true; const t0 = Date.now();
  setStatus("Claude is reading the full contract…");
  try {
    const out = await runClaudeExtraction(n => setStatus(`Claude is reading the full contract… (${n.toLocaleString()} chars)`));
    build(out, "claude");
    setStatus(`Extracted by Claude in ${Math.round((Date.now() - t0) / 1000)}s`);
  } catch (err) {
    setStatus("Extraction failed: " + (err && err.message ? err.message : err) + " Try again, or use the saved sample.", true);
  } finally { runBtn.disabled = false; runBtn.textContent = "Re-run extraction"; }
});
document.getElementById("sample-btn").addEventListener("click", () => { build(SAMPLE_EXTRACTION, "sample"); setStatus("Showing saved sample output"); });

document.getElementById("doc-label").innerHTML = CONTRACT.label;
document.getElementById("learnings-link").addEventListener("click", e => { e.preventDefault(); const d = document.getElementById("learnings"); d.open = !d.open; if (d.open) d.scrollIntoView({ behavior: "smooth", block: "start" }); });
const sw = document.getElementById("switch-link");
sw.textContent = ACTIVE === "b" ? "switch to Contract A" : "switch to Contract B (blind test)";
sw.href = ACTIVE === "b" ? "#contract-a" : "#contract-b";
window.addEventListener("hashchange", () => { if (/^#contract-[ab]$/.test(location.hash)) location.reload(); });
if (ACTIVE === "b") document.getElementById("sample-btn").style.display = "none";
render();
// Test hook: ?sample in the URL hash loads the saved sample (used by the offline browser test).
if (location.hash === "#sample") { build(SAMPLE_EXTRACTION, "sample"); setStatus("Showing saved sample output"); }
