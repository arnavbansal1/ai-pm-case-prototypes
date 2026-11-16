/* ============ 1. SOURCE: client file (the messy input) ============ */
const FILES = {
  sample: {
    name: "northgate_locations_payroll.csv", client: "Northgate Supply Co.", businessType: "wholesale_distribution",
    csv: `Loc #,Site Address,City,ST,Postal,Bldg Value,Contents,TIV,Yr Blt,Const,Sq Ft,Sprinklered,Class,Emp,Payroll,Region Mgr
1,1200 Commerce St,Dallas,TX,75201,"$2,400,000","$600,000","$3,000,000",1998,NC,42000,Y,8810,12,"$61,500",J. Ortiz
2,455 Industrial Pkwy,Oklahoma City,OK,73102,"$1,150,000","$850,000","$2,000,000",2005,MNC,38000,Y,7380,9,"$40,200",J. Ortiz
3,88 Harbor Rd,Boston,MA,2134,"$3,200,000","$400,000","$3,600,000",1962,JM,25000,N,8292,6,"$27,900",K. Lee
4,19 Elm Ave,Hartford,CT,6103,"$900,000","$250,000","$1,150,000",,Frame,9000,N,8810,4,"$21,000",K. Lee
5,700 Rail Yard Dr,Memphis,TN,38103,"$1,800,000","$1,100,000","$2,700,000",1987,NC,51000,Y,7380,15,"$66,000",M. Patel
6,3301 Gulf Fwy,Houston,TX,77003,"$2,050,000","$700,000","$2,750,000",2012,Steel,46000,Y,8292,11,"$48,400",J. Ortiz
7,52 Market St,Denver,CO,80202-1544,"$1,300,000","$300,000","$1,600,000",2001,MNC,18000,Y,8810,5,"$26,250",M. Patel
8,1450 Peachtree Rd,Atlanta,GA,30309,"$2,600,000","$900,000","$3,500,000",2019,NC,40000,Y,7380,14,"$63,700",M. Patel`
  },
  blind: { name: "coastline_sites.csv", client: "Coastline Distribution (blind test)", businessType: "wholesale_distribution", csv: "Site ID,Street,City,State,Zip,Building,Contents,Value,Year Built,Construction,Class Code,Headcount,FTE,Annual Payroll,Payroll Total\n101,2200 Navigation Blvd,TX,Houston,77003,\"$2,100,000\",\"$500,000\",\"$2,600,000\",1995,NC,8292,12,11.5,\"$52,000\",\"$624,000\"\n102,410 Tchoupitoulas St,LA,New Orleans,70130,\"$1,400,000\",\"$600,000\",\"$2,000,000\",1978,JM,8292,9,8.0,\"$37,500\",\"$450,000\"\n103,1601 N Ashley Dr,FL,Tampa,33602,\"$3,000,000\",\"$1,000,000\",\"$4,000,000\",2010,MNC,7380,15,15.0,\"$66,250\",\"$795,000\"\n104,220 E Bay St,FL,Jacksonville,32202,\"$950,000\",\"$350,000\",\"$1,300,000\",1988,Frame,8292,6,5.5,\"$24,500\",\"$294,000\"\n105,75 Piedmont Ave NE,GA,Atlanta,30303,\"$2,700,000\",\"$800,000\",\"$3,500,000\",2016,NC,0005,14,13.0,\"$61,600\",\"$739,200\"\n106,40 Calhoun St,SC,Charleston,29401,\"$1,150,000\",\"$450,000\",\"$1,600,000\",1961,JM,8292,7,7.0,\"$28,700\",\"$344,400\"\n107,300 S Tryon St,NC,Charlotte,28202,\"$2,250,000\",\"$750,000\",\"$3,000,000\",2004,FR,7380,11,10.0,\"$47,300\",\"$567,600\"\n108,150 W Main St,VA,Norfolk,23510,\"$1,800,000\",\"$700,000\",\"$2,500,000\",1999,MNC,8292,10,9.5,\"$43,000\",\"$516,000\"" }
};

function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/* ============ 2. INTERNAL SCHEMA (system of record) ============ */
const US_STATES = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(" ");
const CONSTRUCTION = ["Frame", "Joisted Masonry", "Non-Combustible", "Masonry Non-Combustible", "Fire Resistive"];
const SCHEMA = {
  location_id:         { label: "Location ID", type: "int", required: true, unique: true, syn: ["loc #", "loc", "location", "location id", "loc no", "site id", "site #"] },
  street_address:      { label: "Street address", type: "text", required: true, syn: ["address", "site address", "street", "street address", "location address"] },
  city:                { label: "City", type: "text", required: true, syn: ["city", "town"] },
  state:               { label: "State", type: "state", required: true, syn: ["st", "state", "state code"] },
  zip:                 { label: "ZIP code", type: "zip", required: true, syn: ["zip", "zip code", "postal", "postal code", "zipcode"] },
  building_value:      { label: "Building value", type: "currency", required: true, syn: ["bldg value", "building value", "building", "bldg"] },
  contents_value:      { label: "Contents value", type: "currency", required: false, syn: ["contents", "contents value", "bpp", "business personal property"] },
  total_insured_value: { label: "Total insured value", type: "currency", required: false, syn: ["tiv", "total insured value", "total value"] },
  year_built:          { label: "Year built", type: "year", required: true, syn: ["yr blt", "year built", "yr built", "built"] },
  construction_type:   { label: "Construction type", type: "enum", values: CONSTRUCTION, required: true, syn: ["const", "construction", "construction type", "const type"] },
  square_footage:      { label: "Square footage", type: "int", required: false, syn: ["sq ft", "sqft", "square feet", "area", "square footage"] },
  sprinklered:         { label: "Sprinklered", type: "bool", required: false, syn: ["sprinklered", "sprinklers", "sprinkler"] },
  wc_class_code:       { label: "WC class code", type: "class4", required: true, syn: ["class", "class code", "wc class", "wc code"] },
  employee_count:      { label: "Employee count", type: "int", required: true, syn: ["emp", "employees", "headcount", "emp count", "# employees"] },
  annual_payroll:      { label: "Annual payroll", type: "currency", required: true, lookalike: true, syn: ["payroll", "annual payroll", "remuneration"] }
};

/* Approved WC class-code reference set (prototype sample). Codes are strings: leading zeros are significant.
   "fits" lists the business types each code is compatible with ("*" = any business). */
const CLASS_CODES = {
  "8810": { desc: "Clerical office employees", fits: ["*"] },
  "8742": { desc: "Outside salespersons", fits: ["*"] },
  "7380": { desc: "Drivers, chauffeurs and helpers", fits: ["wholesale_distribution", "trucking"] },
  "8292": { desc: "Warehouse, general merchandise", fits: ["wholesale_distribution"] },
  "8018": { desc: "Store: wholesale", fits: ["wholesale_distribution"] },
  "5183": { desc: "Plumbing", fits: ["contractor"] },
  "0005": { desc: "Nursery employees (farm)", fits: ["agriculture"] }
};
const BUSINESS_LABEL = { wholesale_distribution: "wholesale distribution", trucking: "trucking", contractor: "contractor", agriculture: "agriculture" };

/* Past approved mappings: examples, NOT ground truth (they disagree with each other). */
const PAST = [
  { client: "Client A", header: "Payroll", field: "annual_payroll", conversion: "none" },
  { client: "Client B", header: "Payroll", field: "annual_payroll", conversion: "monthly ×12" },
  { client: "Client C", header: "Const", field: "construction_type", conversion: "code map" },
  { client: "Client D", header: "Postal", field: "zip", conversion: "5-digit ZIP" },
  { client: "Client E", header: "TIV", field: "total_insured_value", conversion: "none" },
  { client: "Client F", header: "Value", field: "building_value", conversion: "none" },
  { client: "Client G", header: "Value", field: "total_insured_value", conversion: "none" }
];

/* ============ 3. AI MAPPING PROPOSALS ============ */
/* 3a. Saved sample (offline fallback). Note: Payroll is proposed confidently as annual — the rules must catch it. */
const SAMPLE_MAPPING = { mappings: [
  { column: "Loc #", field: "location_id", transform: { type: "none" }, confidence: "high", header_evidence: "'Loc #' is a common abbreviation for location number.", value_evidence: "Sequential integers 1–8." },
  { column: "Site Address", field: "street_address", transform: { type: "none" }, confidence: "high", header_evidence: "Header names an address.", value_evidence: "Street number + street name." },
  { column: "City", field: "city", transform: { type: "none" }, confidence: "high", header_evidence: "Exact match.", value_evidence: "US city names." },
  { column: "ST", field: "state", transform: { type: "none" }, confidence: "high", header_evidence: "'ST' is the standard state abbreviation.", value_evidence: "Two-letter codes." },
  { column: "Postal", field: "zip", transform: { type: "zip5" }, confidence: "high", header_evidence: "'Postal' = postal code.", value_evidence: "Mostly 5 digits; some lost a leading zero, one is ZIP+4." },
  { column: "Bldg Value", field: "building_value", transform: { type: "none" }, confidence: "high", header_evidence: "'Bldg' = building.", value_evidence: "Dollar amounts in the millions." },
  { column: "Contents", field: "contents_value", transform: { type: "none" }, confidence: "high", header_evidence: "Contents = business personal property.", value_evidence: "Dollar amounts smaller than building values." },
  { column: "TIV", field: "total_insured_value", transform: { type: "none" }, confidence: "high", header_evidence: "TIV = total insured value.", value_evidence: "Dollar amounts roughly equal to building + contents." },
  { column: "Yr Blt", field: "year_built", transform: { type: "none" }, confidence: "high", header_evidence: "'Yr Blt' = year built.", value_evidence: "Four-digit years; one blank." },
  { column: "Const", field: "construction_type", transform: { type: "code_map", map: { "Frame": "Frame", "F": "Frame", "JM": "Joisted Masonry", "NC": "Non-Combustible", "MNC": "Masonry Non-Combustible", "FR": "Fire Resistive" } }, confidence: "high", header_evidence: "'Const' = construction.", value_evidence: "ISO construction codes (NC, MNC, JM, Frame)." },
  { column: "Sq Ft", field: "square_footage", transform: { type: "none" }, confidence: "high", header_evidence: "Square feet.", value_evidence: "Integers 9,000–51,000." },
  { column: "Sprinklered", field: "sprinklered", transform: { type: "none" }, confidence: "high", header_evidence: "Exact match.", value_evidence: "Y/N." },
  { column: "Class", field: "wc_class_code", transform: { type: "none" }, confidence: "high", header_evidence: "'Class' next to payroll and employees suggests a WC class code.", value_evidence: "Four-digit codes (8810, 7380, 8292)." },
  { column: "Emp", field: "employee_count", transform: { type: "none" }, confidence: "high", header_evidence: "'Emp' = employees.", value_evidence: "Small integers." },
  { column: "Payroll", field: "annual_payroll", transform: { type: "none" }, confidence: "high", header_evidence: "'Payroll' matches annual payroll.", value_evidence: "Dollar amounts." },
  { column: "Region Mgr", field: null, transform: { type: "none" }, confidence: "high", header_evidence: "Internal contact name.", value_evidence: "Person names; no matching schema field." }
] };

/* 3b. Live mapping: Claude reads headers + sample rows + schema + past examples and returns the same shape. */
function mappingPrompt(file) {
  const rows = parseCSV(file.csv), head = rows[0], body = rows.slice(1, 7);
  const schemaText = Object.entries(SCHEMA).map(([k, f]) => `- ${k}: ${f.label} (${f.type}${f.values ? ": " + f.values.join(" | ") : ""}${f.required ? ", required" : ""})`).join("\n");
  const pastText = PAST.map(p => `- ${p.client}: "${p.header}" -> ${p.field} (${p.conversion})`).join("\n");
  return `<client_file name="${file.name}">
${[head, ...body].map(r => r.join(" | ")).join("\n")}
</client_file>

<internal_schema>
${schemaText}
</internal_schema>

<past_approved_mappings note="examples only; they are inconsistent and are NOT ground truth">
${pastText}
</past_approved_mappings>

You are helping an insurance onboarding analyst map a client's spreadsheet into the internal schema above.

For EVERY column in the client file, propose the internal field it maps to (or null if none fits) and any conversion needed.

Return ONLY a JSON object (no prose, no code fences) with exactly this shape:
{"mappings":[{"column":"","field":null,"transform":{"type":"none"},"confidence":"high","header_evidence":"","value_evidence":""}]}

Rules:
- "column": copy the header exactly as written.
- "field": one of the schema keys above, or null.
- "transform.type": "none", "zip5" (normalize to 5-digit ZIP), "code_map" (add "map": {source value: schema value}), or "multiply" (add "factor", e.g. 12 for monthly-to-annual).
- Base the mapping on BOTH the header and the actual values. If they disagree (e.g., a header says annual but values look monthly), say so in "value_evidence" and set confidence below "high".
- Never force a mapping: if no schema field fits, use null.
- Preserve ambiguity rather than guessing. Use "high" only when header and values clearly agree.

Missing-information policy: judge from the sample rows given; don't invent context.
Quality bar: evidence must cite the actual header text and actual values.`;
}

async function runClaudeMapping(file, onProgress) {
  const sample = await claude.use("sample");
  if (!sample) throw new Error("Claude isn't available in this view (open the page on claude.ai).");
  const res = await sample(mappingPrompt(file), { modelTier: "complex", cache: false, onText: ({ text }) => onProgress && onProgress(text.length) });
  if (res.truncated) throw new Error("Claude's answer was cut off.");
  window.__LAST_RAW = res.text;
  const s = res.text.indexOf("{"), e = res.text.lastIndexOf("}");
  if (s < 0) throw new Error("No JSON in Claude's answer.");
  try { return JSON.parse(res.text.slice(s, e + 1)); } catch (err) { throw new Error("Claude's answer wasn't valid JSON."); }
}

/* 3c. Answer key for the sample file (written before any live run). */
const EXPECTED = {
  sample: {
    "Loc #": { field: "location_id", transform: "none" }, "Site Address": { field: "street_address", transform: "none" },
    "City": { field: "city", transform: "none" }, "ST": { field: "state", transform: "none" },
    "Postal": { field: "zip", transform: "zip5" }, "Bldg Value": { field: "building_value", transform: "none" },
    "Contents": { field: "contents_value", transform: "none" }, "TIV": { field: "total_insured_value", transform: "none", mustReview: true },
    "Yr Blt": { field: "year_built", transform: "none" }, "Const": { field: "construction_type", transform: "code_map", mustReview: true },
    "Sq Ft": { field: "square_footage", transform: "none" }, "Sprinklered": { field: "sprinklered", transform: "none" },
    "Class": { field: "wc_class_code", transform: "none" }, "Emp": { field: "employee_count", transform: "none" },
    "Payroll": { field: "annual_payroll", transform: "multiply:12", mustReview: true }, "Region Mgr": { field: null, transform: "none" }
  }
};

/* 3d. Blind answer key: frozen before any run (sha256 f8b6441f…). Scorer only; never sent to the model. */
EXPECTED.blind = {"Site ID": {"accept": [["location_id", "none"]], "mustReview": false, "trap": null}, "Street": {"accept": [["street_address", "none"]], "mustReview": false, "trap": null}, "City": {"accept": [["state", "none"]], "mustReview": true, "trap": "T4"}, "State": {"accept": [["city", "none"]], "mustReview": true, "trap": "T4"}, "Zip": {"accept": [["zip", "none"], ["zip", "zip5"]], "mustReview": false, "trap": null}, "Building": {"accept": [["building_value", "none"]], "mustReview": false, "trap": null}, "Contents": {"accept": [["contents_value", "none"]], "mustReview": false, "trap": null}, "Value": {"accept": [["total_insured_value", "none"]], "mustReview": true, "trap": "T1"}, "Year Built": {"accept": [["year_built", "none"]], "mustReview": false, "trap": null}, "Construction": {"accept": [["construction_type", "code_map"]], "mustReview": false, "trap": null}, "Class Code": {"accept": [["wc_class_code", "none"]], "mustReview": true, "trap": "T5"}, "Headcount": {"accept": [["employee_count", "none"]], "mustReview": false, "trap": null}, "FTE": {"accept": [[null, "none"]], "mustReview": true, "trap": "T3"}, "Annual Payroll": {"accept": [["annual_payroll", "multiply:12"], [null, "none"]], "mustReview": true, "trap": "T2+T6"}, "Payroll Total": {"accept": [["annual_payroll", "none"]], "mustReview": true, "trap": "T6"}};

/* ============ 4. RULE ENGINE: conversions, checks, tiers (deterministic) ============ */
const norm = s => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
const money = v => { const t = String(v ?? "").replace(/[$,\s]/g, ""); return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : null; };
const fmtMoney = n => n == null ? "" : "$" + Math.round(n).toLocaleString();
const SAFE_TRANSFORMS = ["none", "zip5"];

function applyTransform(raw, transform, fieldKey) {
  let v = String(raw ?? "").trim();
  if (v === "") return { value: null, issue: null };
  const t = (transform && transform.type) || "none";
  if (t === "zip5") { if (!/^\d{3,5}(-\d{4})?$/.test(v)) return { value: v, issue: `can't safely normalize ZIP '${v}'` }; v = v.split("-")[0].padStart(5, "0"); }
  if (t === "code_map") { const m = transform.map || {}; if (!Object.prototype.hasOwnProperty.call(m, v)) return { value: v, issue: `'${v}' isn't in the code map` }; v = String(m[v]); }
  const f = SCHEMA[fieldKey]; if (!f) return { value: v, issue: null };
  if (f.type === "currency") { const n = money(v); if (n == null) return { value: v, issue: "not a dollar amount" }; return { value: t === "multiply" ? n * (transform.factor || 1) : n, issue: null }; }
  if (f.type === "int" || f.type === "year") { const t2 = String(v).replace(/,/g, ""); return /^\d+$/.test(t2) ? { value: Number(t2), issue: null } : { value: v, issue: "not a whole number" }; }
  if (f.type === "bool") { const u = v.toUpperCase(); return ["Y", "YES", "TRUE"].includes(u) ? { value: true, issue: null } : ["N", "NO", "FALSE"].includes(u) ? { value: false, issue: null } : { value: v, issue: "not yes/no" }; }
  return { value: v, issue: null };
}

function validateCell(fieldKey, value) {
  const f = SCHEMA[fieldKey]; if (!f) return null;
  if (value == null) return f.required ? "missing (required)" : null;
  if (f.type === "state" && !US_STATES.includes(String(value).toUpperCase())) return "not a US state code";
  if (f.type === "zip" && !/^\d{5}$/.test(String(value))) return "not a 5-digit ZIP";
  if (f.type === "year" && (value < 1800 || value > 2026)) return "year out of range";
  if (f.type === "class4" && !/^\d{4}$/.test(String(value))) return "not a 4-digit class code";
  if (f.type === "text" && !String(value).trim()) return f.required ? "missing (required)" : null;
  if (f.type === "enum" && !f.values.includes(value)) return "not a valid construction class";
  if (f.type === "currency" && (typeof value !== "number" || value < 0)) return "invalid amount";
  if (f.type === "int" && (typeof value !== "number" || value < 0)) return "invalid number";
  return null;
}

/* Context-aware plausibility checks: do the VALUES actually fit the field? */
function columnChecks(colName, fieldKey, transform, ctx) {
  const checks = [];
  const vals = ctx.values(colName).map(r => applyTransform(r, transform, fieldKey));
  const issues = vals.map((v, i) => v.issue ? `row ${i + 1}: ${v.issue}` : null).filter(Boolean);
  checks.push({ name: "Values convert cleanly", pass: issues.length === 0, detail: issues.slice(0, 2).join("; ") });
  const bad = vals.map((v, i) => { const e = v.issue ? null : validateCell(fieldKey, v.value); return e && !e.startsWith("missing") ? `row ${i + 1}: ${e}` : null; }).filter(Boolean);
  checks.push({ name: "Values pass schema rules", pass: bad.length === 0, detail: bad.slice(0, 2).join("; ") });
  if (transform && transform.type !== "none") {
    const raws = ctx.values(colName);
    const changed = vals.map((v, i) => (!v.issue && v.value != null && String(v.value) !== String(raws[i]).trim() && !(SCHEMA[fieldKey].type === "currency" && money(raws[i]) === v.value)) ? `row ${i + 1}: ${raws[i]} → ${SCHEMA[fieldKey].type === "currency" ? fmtMoney(v.value) : v.value}` : null).filter(Boolean);
    checks.push({ name: `Conversion changes ${changed.length} of ${vals.length} values`, pass: true, info: true, detail: changed.slice(0, 3).join("; ") + (changed.length > 3 ? "; …" : "") });
  }
  const missing = vals.filter(v => v.value == null).length;
  if (missing) checks.push({ name: "No blanks", pass: !SCHEMA[fieldKey].required, warn: true, detail: `${missing} blank value${missing > 1 ? "s" : ""}${SCHEMA[fieldKey].required ? " (required field — visible gap)" : ""}` });
  if (SCHEMA[fieldKey].unique) { const s = vals.map(v => v.value); checks.push({ name: "Values are unique", pass: new Set(s).size === s.length, detail: "" }); }
  if (fieldKey === "annual_payroll") {
    const empCol = ctx.columnFor("employee_count");
    if (empCol) {
      const emps = ctx.values(empCol).map(x => parseInt(x, 10));
      const per = vals.map((v, i) => (typeof v.value === "number" && emps[i] > 0) ? v.value / emps[i] : null).filter(x => x != null);
      const low = per.filter(x => x < 15000).length, high = per.filter(x => x > 500000).length;
      const med = per.slice().sort((a, b) => a - b)[Math.floor(per.length / 2)] || 0;
      checks.push({ name: "Payroll per employee is plausible ($15k–$500k/yr)", pass: low === 0 && high === 0, detail: `median ${fmtMoney(med)} per employee per year${low ? `; ${low} of ${per.length} rows below $15k` : ""}`, key: "payroll_per_emp", median: med });
    } else checks.push({ name: "Payroll per employee is plausible", pass: false, detail: "can't check: no employee count column mapped" });
  }
  if (fieldKey === "wc_class_code") {
    const biz = FILE && FILE.businessType;
    const probs = vals.map((v, i) => {
      if (v.issue || v.value == null) return null;
      const code = String(v.value);                      // exact string: no numeric coercion, leading zeros kept
      const ref = CLASS_CODES[code];
      if (!ref) return `row ${i + 1}: ${code} isn't in the approved reference set`;
      if (biz && !ref.fits.includes("*") && !ref.fits.includes(biz)) return `row ${i + 1}: ${code} (${ref.desc}) doesn't fit a ${BUSINESS_LABEL[biz] || biz} client`;
      return null;
    }).filter(Boolean);
    checks.push({ name: `Class codes are approved and fit the business${biz ? " (" + (BUSINESS_LABEL[biz] || biz) + ")" : ""}`, pass: probs.length === 0, detail: probs.join("; "), key: "class_ref" });
  }
  if (fieldKey === "total_insured_value") {
    const b = ctx.columnFor("building_value"), c = ctx.columnFor("contents_value");
    if (b && c) {
      const bv = ctx.values(b).map(money), cv = ctx.values(c).map(money);
      const mism = vals.map((v, i) => (typeof v.value === "number" && bv[i] != null && cv[i] != null && Math.abs(v.value - (bv[i] + cv[i])) > 0.01 * v.value) ? `row ${i + 1}: TIV ${fmtMoney(v.value)} ≠ building + contents ${fmtMoney(bv[i] + cv[i])}` : null).filter(Boolean);
      checks.push({ name: "TIV = building + contents", pass: mism.length === 0, detail: mism.join("; ") });
    } else checks.push({ name: "TIV = building + contents", pass: false, detail: "can't check: building and contents columns aren't both mapped" });
  }
  return checks;
}

function suggestFix(colName, fieldKey, transform, checks, ctx) {
  const p = checks.find(c => c.key === "payroll_per_emp" && !c.pass);
  if (p) {
    const alt = { type: "multiply", factor: 12 };
    const altChecks = columnChecks(colName, fieldKey, alt, ctx);
    if (altChecks.every(c => c.pass || c.warn)) return { label: "Values look monthly: convert ×12 to annual", transform: alt };
  }
  return null;
}

function tierFor(m, ctx, all) {
  const reasons = [];
  if (!m.field || !SCHEMA[m.field]) return { provenance: { field: "AI found no match", conversion: "None", tier: "Rule engine" }, tier: "unknown", reasons: [m.field ? `'${m.field}' isn't in the internal schema` : "No internal field fits this column"], checks: [], suggestion: null };
  const f = SCHEMA[m.field], t = m.transform || { type: "none" };
  const checks = columnChecks(m.column, m.field, t, ctx);
  const headerStrong = f.syn.includes(norm(m.column));
  const past = PAST.filter(p => norm(p.header) === norm(m.column));
  const pastConflict = new Set(past.map(p => p.field + "|" + p.conversion)).size > 1;
  const dup = all.filter(x => x.field === m.field).length > 1;
  if (checks.some(c => !c.pass && !c.warn)) reasons.push("A value check failed");
  if (!headerStrong) reasons.push("Header isn't a known name for this field");
  if (!SAFE_TRANSFORMS.includes(t.type)) reasons.push("Conversion changes meaning, not just format");
  if (pastConflict) reasons.push("Past mappings for this header disagree");
  if (dup) reasons.push("Another column maps to the same field");
  if (m.confidence !== "high") reasons.push("AI wasn't confident");
  if (f.lookalike && !checks.some(c => c.key === "payroll_per_emp" && c.pass)) reasons.push("Look-alike field needs a positive value check");
  const tier = reasons.length ? "review" : "auto";
  const provenance = { field: headerStrong ? "AI inference + rule (known header name)" : "AI inference only", conversion: t.type === "none" ? "None needed" : "AI inference", tier: "Rule engine" };
  return { provenance, tier, reasons: tier === "auto" ? ["Known header, every value check passed, format-only conversion, no conflicts"] : reasons, checks, suggestion: tier === "review" ? suggestFix(m.column, m.field, t, checks, ctx) : null };
}

/* ============ 5. STATE ============ */
const RUNLOG = []; const RUNS = {}; const logRun = (event, detail) => RUNLOG.unshift({ t: new Date().toLocaleTimeString(), event, detail: detail || "" });
let FILE = FILES.sample, FILE_KEY = "sample", ROWS = [], HEAD = [], MAPPING = null, COLS = [], SOURCE = null, EVAL = null;
const decisions = {}; let openForm = null, selected = null, tab = "source";
const TIER_ORDER = { unknown: 0, review: 1, auto: 2 }, TIER_LABEL = { auto: "Auto", review: "Review", unknown: "Unknown" };

function makeCtx(mappings) {
  return {
    values: col => { const i = HEAD.indexOf(col); return ROWS.map(r => r[i] ?? ""); },
    columnFor: field => { const eff = mappings.find(m => m.field === field); return eff ? eff.column : null; }
  };
}

function loadFile(key) {
  FILE_KEY = key; FILE = FILES[key];
  const rows = parseCSV(FILE.csv).filter(r => r.length > 1); HEAD = rows[0]; ROWS = rows.slice(1);
}

/* Validate AI output before use: never trust shape or types. Problems become per-column review reasons, not crashes. */
const ALLOWED_T = ["none", "zip5", "code_map", "multiply"];
const asText = x => typeof x === "boolean" ? (x ? "Y" : "N") : x == null ? "" : String(x);
function normalizeMapping(raw) {
  const out = [], seen = new Set();
  const list = raw && Array.isArray(raw.mappings) ? raw.mappings : [];
  for (const m of list) {
    if (!m || typeof m !== "object") continue;
    const column = asText(m.column).trim();
    if (!column || seen.has(column)) continue;
    seen.add(column);
    const problems = [];
    let field = m.field == null || m.field === "" ? null : asText(m.field).trim();
    let t = m.transform && typeof m.transform === "object" ? { ...m.transform } : { type: "none" };
    t.type = asText(t.type || "none").trim().toLowerCase();
    if (!ALLOWED_T.includes(t.type)) { problems.push(`Unsupported conversion '${t.type}'`); t = { type: "none" }; }
    if (t.type === "multiply") { const f = Number(t.factor); if (!isFinite(f) || f <= 0) { problems.push("Conversion factor isn't a positive number"); t = { type: "none" }; } else t.factor = f; }
    if (t.type === "code_map") {
      if (!t.map || typeof t.map !== "object" || Array.isArray(t.map)) { problems.push("Code map is missing"); t = { type: "none" }; }
      else { const clean = {}; Object.entries(t.map).forEach(([k, v]) => { clean[asText(k).trim()] = asText(v).trim(); }); t.map = clean; }
    }
    const confidence = ["high", "medium", "low"].includes(asText(m.confidence).toLowerCase()) ? asText(m.confidence).toLowerCase() : "low";
    out.push({ column, field, transform: t, confidence, header_evidence: asText(m.header_evidence), value_evidence: asText(m.value_evidence), problems });
  }
  const notInFile = out.filter(m => !HEAD.includes(m.column)).map(m => m.column);
  const missingCols = HEAD.filter(h => !out.some(m => m.column === h));
  const probs = out.filter(m => m.problems.length).map(m => `${m.column}: ${m.problems.join(", ")}`);
  logRun("Validated AI output", `${out.length} mappings · ${probs.length} with problems${probs.length ? " (" + probs.join("; ") + ")" : ""}${missingCols.length ? " · AI skipped: " + missingCols.join(", ") : ""}${notInFile.length ? " · ignored (not in file): " + notInFile.join(", ") : ""}`);
  return { mappings: out };
}

function build(mapping, source) {
  MAPPING = mapping; SOURCE = source;
  const clean = normalizeMapping(mapping);
  const byCol = {}; clean.mappings.forEach(m => { if (HEAD.includes(m.column)) byCol[m.column] = m; });
  const all = HEAD.map(h => byCol[h] || { column: h, field: null, transform: { type: "none" }, confidence: "low", header_evidence: "AI returned no mapping for this column.", value_evidence: "" });
  const ctx = makeCtx(all);
  const safeTier = m => {
    try {
      const r = tierFor(m, ctx, all);
      if (m.problems && m.problems.length && r.tier === "auto") return { ...r, tier: "review", reasons: m.problems, suggestion: null };
      return m.problems && m.problems.length ? { ...r, reasons: [...m.problems, ...r.reasons] } : r;
    } catch (err) {
      return { tier: "review", reasons: ["Couldn't evaluate this column automatically: " + (err && err.message ? err.message : err)], checks: [], suggestion: null };
    }
  };
  COLS = all.map((m, i) => ({ ...m, idx: HEAD.indexOf(m.column), letter: String.fromCharCode(65 + HEAD.indexOf(m.column)), past: PAST.filter(p => norm(p.header) === norm(m.column)), ...safeTier(m) }))
    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.idx - b.idx);
  Object.keys(decisions).forEach(k => delete decisions[k]); openForm = null; selected = null;
  EVAL = runEval(); window.__EVAL = EVAL;
  if (source === "claude") { (RUNS[FILE_KEY] = RUNS[FILE_KEY] || []).push({ at: new Date().toLocaleTimeString(), secs: window.__LAST_SECS || null, eval: EVAL,
    decisions: Object.fromEntries(COLS.map(c => [c.column, { field: c.field || null, t: tKey(c.transform), tier: c.tier }])) }); }
  window.__RUNS = RUNS;
  const n = { auto: 0, review: 0, unknown: 0 }; COLS.forEach(c => n[c.tier]++);
  logRun("Rules applied", `${n.auto} Auto · ${n.review} Review · ${n.unknown} Unknown${EVAL ? ` · eval: ${EVAL.wrongAuto} wrong auto, ${EVAL.mustRouted}/${EVAL.mustTotal} must-review routed` : ""}`);
  render();
}

/* Effective mapping used for the clean preview. Auto applies unless changed; review/unknown need a decision. */
function effective(c) {
  const d = decisions[c.column];
  if (d) return d.type === "ignored" ? { field: null, transform: { type: "none" }, decided: true } : { field: d.field, transform: d.transform, decided: true };
  if (c.tier === "auto") return { field: c.field, transform: c.transform || { type: "none" }, decided: false };
  return null;
}

/* ============ 6. EVAL vs answer key ============ */
const tKey = t => !t || t.type === "none" ? "none" : t.type === "multiply" ? "multiply:" + t.factor : t.type;
function runEval() {
  const key = EXPECTED[FILE_KEY]; if (!key) return null;
  const rows = COLS.map(c => { const e0 = key[c.column]; if (!e0) return null;
    const accept = e0.accept || [[e0.field, e0.transform]];
    const hit = accept.find(([f]) => (c.field || null) === f);
    const e = { field: hit ? hit[0] : accept[0][0], transform: hit ? hit[1] : accept[0][1], mustReview: e0.mustReview, trap: e0.trap };
    const fieldOk = !!hit, tOk = accept.some(([f, t]) => (c.field || null) === f && (f === null || tKey(c.transform) === t));
    const extra = accept.every(([f]) => f === null) && !!c.field;
    return { column: c.column, trap: e.trap, fieldOk, tOk, correct: fieldOk && tOk, tier: c.tier, mustReview: !!e.mustReview, extra,
      wrongAuto: c.tier === "auto" && (!(fieldOk && tOk) || !!e.mustReview), routed: !e.mustReview || c.tier !== "auto",
      fixed: !tOk && !!c.suggestion && accept.some(([f, t]) => f === c.field && tKey(c.suggestion.transform) === t) }; }).filter(Boolean);
  const must = rows.filter(r => r.mustReview);
  return { rows, total: rows.length, correct: rows.filter(r => r.correct).length, wrongAuto: rows.filter(r => r.wrongAuto).length,
    mustTotal: must.length, mustRouted: must.filter(r => r.routed).length, auto: rows.filter(r => r.tier === "auto").length,
    fixedBySuggestion: rows.filter(r => r.fixed).length, extras: rows.filter(r => r.extra).length };
}

/* ============ 7. RENDER ============ */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const tLabel = t => !t || t.type === "none" ? "None (format only)" : t.type === "zip5" ? "Normalize to 5-digit ZIP" : t.type === "multiply" ? `Multiply by ${t.factor}` : t.type === "code_map" ? "Code map: " + Object.entries(t.map || {}).map(([a, b]) => `${a}→${b}`).join(", ") : t.type;

function renderHeader() {
  document.getElementById("file-label").textContent = `${FILE.name} (${FILE.client})`;
  document.getElementById("file-stats").textContent = `${ROWS.length} rows · ${HEAD.length} columns`;
  const n = { auto: 0, review: 0, unknown: 0 }; COLS.forEach(c => n[c.tier]++);
  document.getElementById("chips").innerHTML = MAPPING ? `<span class="chip p-met">${n.auto} Auto</span><span class="chip p-review">${n.review} Review</span><span class="chip p-unknown">${n.unknown} Unknown</span>` : "";
  const need = COLS.filter(c => c.tier !== "auto"), done = need.filter(c => decisions[c.column]).length;
  document.getElementById("progress-text").textContent = MAPPING ? `Resolved ${done} of ${need.length} needing review` : "";
  document.getElementById("progress-bar").style.width = (need.length ? 100 * done / need.length : 0) + "%";
}

function renderEval() {
  const slot = document.getElementById("eval-slot");
  if (!MAPPING) { slot.innerHTML = ""; return; }
  const log = `<details class="eval"><summary>Run log (${RUNLOG.length})</summary><table>${RUNLOG.map(r => `<tr><td style="white-space:nowrap">${esc(r.t)}</td><td><b>${esc(r.event)}</b></td><td>${esc(r.detail)}</td></tr>`).join("")}</table></details>`;
  const raw = log + `<details class="eval"><summary>Raw AI output (JSON)</summary><pre id="raw-json" style="white-space:pre-wrap;font-size:11.5px;max-height:300px;overflow:auto">${esc(JSON.stringify(MAPPING, null, 1))}</pre></details>`;
  if (!EVAL) { slot.innerHTML = raw; return; }
  const runs = RUNS[FILE_KEY] || [];
  let hist = "";
  if (runs.length) {
    const cols = HEAD; const agree = k => cols.filter(c => runs.every(r => r.decisions[c] && r.decisions[c][k] === runs[0].decisions[c][k])).length;
    const allAgree = cols.filter(c => runs.every(r => ["field", "t", "tier"].every(k => r.decisions[c] && r.decisions[c][k] === runs[0].decisions[c][k]))).length;
    const unstable = cols.filter(c => !runs.every(r => ["field", "t", "tier"].every(k => r.decisions[c] && r.decisions[c][k] === runs[0].decisions[c][k])));
    hist = `<div class="scorecard"><div class="sc-title">Live run history · ${runs.length} run${runs.length > 1 ? "s" : ""} on this file${runs.length > 1 ? ` · consistency: ${allAgree}/${cols.length} columns identical across runs` : ""}</div>
      <table class="runs"><tr><th>Run</th><th>Time</th><th>Secs</th><th>Wrong auto</th><th>Must-review routed</th><th>AI correct</th><th>Extras</th><th>Auto</th></tr>
      ${runs.map((r, i) => r.eval ? `<tr><td>#${i + 1}</td><td>${esc(r.at)}</td><td>${r.secs ?? "—"}</td><td class="${r.eval.wrongAuto ? "bad" : "ok"}">${r.eval.wrongAuto}</td><td class="${r.eval.mustRouted === r.eval.mustTotal ? "ok" : "bad"}">${r.eval.mustRouted}/${r.eval.mustTotal}</td><td>${r.eval.correct}/${r.eval.total}</td><td class="${r.eval.extras ? "bad" : "ok"}">${r.eval.extras}</td><td>${r.eval.auto}/${r.eval.total}</td></tr>` : "").join("")}</table>
      ${runs.length > 1 ? `<div class="cons">Field agreement ${agree("field")}/${cols.length} · Conversion ${agree("t")}/${cols.length} · Tier ${agree("tier")}/${cols.length}${unstable.length ? ` · <b class="bad">Varied: ${esc(unstable.join(", "))}</b>` : ""}</div>` : ""}</div>`;
  }
  const s = EVAL, tile = (l, v, good) => `<div class="tile"><div class="tl">${l}</div><div class="tv ${good ? "ok" : "bad"}">${v}</div></div>`;
  slot.innerHTML = `<div class="scorecard"><div class="sc-title">Mapping eval · ${SOURCE === "claude" ? "live Claude run" : "saved sample"} vs. answer key</div><div class="tiles">
    ${tile("Wrong auto-applied", s.wrongAuto, s.wrongAuto === 0)}${tile("Must-review routed", s.mustRouted + "/" + s.mustTotal, s.mustRouted === s.mustTotal)}
    ${tile("AI proposals correct", s.correct + "/" + s.total, s.correct === s.total)}${tile("Fixed by rule suggestion", s.fixedBySuggestion, true)}
    ${tile("Extras", s.extras, s.extras === 0)}<div class="tile caveat"><div class="tl">Key caveat</div><div class="tv">${FILE_KEY === "blind" ? "Blind file, key frozen first" : "1 synthetic file"}</div></div></div></div>
    ${hist}<details class="eval"><summary>Detailed results</summary><table><tr><th>Column</th><th>Trap</th><th>AI field</th><th>AI conversion</th><th>Tier</th><th>Result</th></tr>
    ${s.rows.map(r => `<tr><td>${esc(r.column)}</td><td>${esc(r.trap || "")}</td><td>${r.fieldOk ? "✓" : "<b class=bad>✗</b>"}</td><td>${r.tOk ? "✓" : r.fixed ? "✗ (rule suggests fix)" : "<b class=bad>✗</b>"}</td><td>${TIER_LABEL[r.tier]}</td><td>${r.wrongAuto ? "<b class=bad>WRONG AUTO</b>" : r.extra ? "<b class=bad>extra mapping</b>" : r.mustReview ? (r.routed ? "routed to review ✓" : "<b class=bad>not routed</b>") : r.correct ? "correct" : "caught"}</td></tr>`).join("")}</table></details>` + raw;
}

function decisionHtml(c) {
  const d = decisions[c.column]; if (!d) return "";
  const undo = `<button class="link" data-act="undo" data-col="${esc(c.column)}">Undo</button>`;
  if (d.type === "ignored") return `<div class="decision d-escalated"><span class="who">⊘ Ignored</span><span class="note">Not loaded into the dataset</span><span class="spacer"></span>${undo}</div>`;
  const src = d.type === "changed" ? "analyst choice" : d.fix ? "conversion from rule suggestion, approved by analyst" : "AI proposal, approved by analyst";
  const what = `${esc(SCHEMA[d.field].label)} · ${esc(tLabel(d.transform))} <span class="dsrc">(${src})</span>`;
  return `<div class="decision ${d.type === "changed" ? "d-overridden" : "d-accepted"}"><span class="who">${d.type === "changed" ? "✎ Changed" : "✓ Approved"}</span><span class="note">${what}</span><span class="spacer"></span>${undo}</div>`;
}

function formHtml(c) {
  if (openForm !== c.column) return "";
  const opts = Object.entries(SCHEMA).map(([k, f]) => `<option value="${k}" ${k === c.field ? "selected" : ""}>${esc(f.label)}</option>`).join("");
  return `<div class="form" data-stop="1"><label>Map this column to<select id="chg-${c.idx}">${opts}</select></label>
    <div class="actions" style="margin-top:0"><button class="primary" data-act="save-change" data-col="${esc(c.column)}">Save</button><button data-act="cancel" data-col="${esc(c.column)}">Cancel</button></div></div>`;
}

function cardHtml(c) {
  const d = decisions[c.column], eff = effective(c);
  const fieldLabel = c.field && SCHEMA[c.field] ? SCHEMA[c.field].label : "No matching field";
  const sampleVals = ROWS.slice(0, 5).map(r => r[c.idx]).map(v => `<span class="val">${esc(v === "" ? "(blank)" : v)}</span>`).join("");
  const checks = c.checks.length ? c.checks.map(k => `<li class="${k.info ? "ck-info" : k.pass ? "ck-pass" : k.warn ? "ck-warn" : "ck-fail"}">${k.info ? "ⓘ" : k.pass ? "✓" : k.warn ? "!" : "✗"} ${esc(k.name)}${k.detail ? ` <span class="ck-d">· ${esc(k.detail)}</span>` : ""}</li>`).join("") : `<li class="ck-warn">! No checks: column isn't mapped</li>`;
  const past = c.past.length ? c.past.map(p => `${esc(p.client)}: ${esc(SCHEMA[p.field] ? SCHEMA[p.field].label : p.field)} (${esc(p.conversion)})`).join("<br>") : "None";
  const acts = d || openForm === c.column ? "" : c.tier === "auto"
    ? `<div class="actions" data-stop="1"><span class="auto-note">Auto-applied</span><button class="link" data-act="change" data-col="${esc(c.column)}">Change</button></div>`
    : `<div class="actions" data-stop="1">${c.tier === "review" ? `<button class="primary" data-act="approve" data-col="${esc(c.column)}">Approve as proposed</button>` : ""}
       ${c.suggestion ? `<button class="primary alt" data-act="approve-fix" data-col="${esc(c.column)}">Approve with fix</button>` : ""}
       <button data-act="change" data-col="${esc(c.column)}">Change field</button><button data-act="ignore" data-col="${esc(c.column)}">Ignore column</button></div>`;
  return `<article class="card s-${c.tier === "auto" ? "met" : c.tier === "review" ? "review" : "unknown"} ${d ? "decided" : ""} ${selected === c.column ? "selected" : ""}" data-select="${esc(c.column)}" id="card-${c.idx}">
    <div class="card-head"><span class="pill p-${c.tier === "auto" ? "met" : c.tier === "review" ? "review" : "unknown"}">${TIER_LABEL[c.tier]}</span><h2>“${esc(c.column)}” → ${esc(fieldLabel)}</h2><span class="ref-link">Column ${c.letter}</span></div>
    <div class="cols">
      <div class="col"><div class="col-title">Source facts</div><dl>
        <dt>Sample values</dt><dd class="vals">${sampleVals}</dd>
        <dt>Past approved mappings for this header</dt><dd>${past}</dd>
        <dt>AI evidence</dt><dd>${esc(c.header_evidence)} ${esc(c.value_evidence)}</dd></dl></div>
      <div class="col"><div class="col-title">Assessment <span class="method ${c.tier === "auto" ? "m-rule" : "m-judgment"}">${c.tier === "auto" ? "Rule check" : "Needs judgment"}</span></div><dl>
        <dt>Conversion</dt><dd>${esc(tLabel(c.transform))}</dd>
        <dt>Provenance</dt><dd class="prov">Field: ${esc(c.provenance ? c.provenance.field : "—")} · Conversion: ${esc(c.provenance ? c.provenance.conversion : "—")} · Tier: ${esc(c.provenance ? c.provenance.tier : "Rule engine")}</dd>
        <dt>Value checks</dt><dd><ul class="checks">${checks}</ul></dd>
        <dt>Why ${TIER_LABEL[c.tier]}</dt><dd>${c.reasons.map(esc).join(" · ")}</dd>
        ${c.suggestion ? `<dt>Suggested fix</dt><dd class="fix">${esc(c.suggestion.label)}</dd>` : ""}</dl></div>
    </div>${acts}${formHtml(c)}${decisionHtml(c)}</article>`;
}

function renderCards() {
  document.getElementById("cards").innerHTML = MAPPING ? COLS.map(cardHtml).join("")
    : `<div class="empty">Click <b>Run mapping with Claude</b> to have Claude propose a mapping for every column, or <b>use saved sample</b>.</div>`;
}

function renderSource() {
  const hl = selected ? HEAD.indexOf(selected) : -1;
  document.getElementById("source-view").innerHTML = `<table class="grid"><thead><tr><th class="rn"></th>${HEAD.map((h, i) => `<th class="${i === hl ? "hl" : ""}" data-select="${esc(h)}"><span class="cl">${String.fromCharCode(65 + i)}</span>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>${ROWS.map((r, ri) => `<tr><td class="rn">${ri + 1}</td>${HEAD.map((h, i) => `<td class="${i === hl ? "hl" : ""}">${esc(r[i])}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function renderPreview() {
  const map = {}; COLS.forEach(c => { const e = effective(c); if (e && e.field) map[e.field] = { col: c, t: e.transform }; });
  const pending = COLS.filter(c => !effective(c)).map(c => c.column);
  let issues = 0;
  const fields = Object.keys(SCHEMA);
  const head = fields.map(k => `<th class="${map[k] ? "" : "nocol"}" title="${map[k] ? "from column " + esc(map[k].col.column) : "no column mapped yet"}">${esc(SCHEMA[k].label)}${SCHEMA[k].required ? "*" : ""}<span class="cl">${map[k] ? "← " + esc(map[k].col.column) : "not mapped"}</span></th>`).join("");
  const body = ROWS.map((r, ri) => `<tr><td class="rn">${ri + 1}</td>${fields.map(k => {
    if (!map[k]) return `<td class="nocol">—</td>`;
    const { value, issue } = applyTransform(r[map[k].col.idx], map[k].t, k);
    const err = issue || validateCell(k, value); if (err) issues++;
    const shown = value == null ? "" : SCHEMA[k].type === "currency" && typeof value === "number" ? fmtMoney(value) : SCHEMA[k].type === "bool" ? (value === true ? "Yes" : value === false ? "No" : value) : value;
    const rawV = String(r[map[k].col.idx] ?? "").trim(); const conv = !err && value != null && map[k].t && map[k].t.type !== "none" && String(shown) !== rawV;
    return `<td class="${err ? "bad" : conv ? "conv" : ""}" title="${esc(err || (conv ? "converted from: " + rawV : ""))}">${esc(shown)}${err ? ` <span class="badmark">!</span>` : ""}</td>`; }).join("")}</tr>`).join("");
  const reqMissing = fields.filter(k => SCHEMA[k].required && !map[k]).map(k => SCHEMA[k].label);
  document.getElementById("preview-view").innerHTML = `<div class="pv-sum"><b>${Object.keys(map).length}/${fields.length}</b> fields mapped · <b class="${issues ? "bad" : ""}">${issues}</b> cell issue${issues === 1 ? "" : "s"} · <b>${pending.length}</b> column${pending.length === 1 ? "" : "s"} pending review${reqMissing.length ? ` · <span class="bad">Required fields not mapped: ${esc(reqMissing.join(", "))}</span>` : ""}</div>
    <table class="grid"><thead><tr><th class="rn"></th>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function render() {
  renderHeader(); renderEval(); renderCards(); renderSource(); renderPreview();
  document.getElementById("source-view").hidden = tab !== "source"; document.getElementById("preview-view").hidden = tab !== "preview";
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
}

/* ============ 8. INTERACTION ============ */
document.addEventListener("click", e => {
  const tb = e.target.closest(".tab"); if (tb) { tab = tb.dataset.tab; render(); return; }
  const btn = e.target.closest("button[data-act]");
  if (btn) {
    const col = btn.dataset.col, c = COLS.find(x => x.column === col), act = btn.dataset.act;
    if (act === "approve") decisions[col] = { type: "approved", field: c.field, transform: c.transform || { type: "none" } };
    else if (act === "approve-fix") decisions[col] = { type: "approved", field: c.field, transform: c.suggestion.transform, fix: true };
    else if (act === "ignore") decisions[col] = { type: "ignored" };
    else if (act === "change") openForm = col;
    else if (act === "cancel") openForm = null;
    else if (act === "undo") delete decisions[col];
    else if (act === "save-change") { const f = document.getElementById("chg-" + c.idx).value; decisions[col] = { type: "changed", field: f, transform: f === c.field ? (c.transform || { type: "none" }) : { type: "none" } }; openForm = null; }
    selected = col; render();
    document.querySelector("#source-view th.hl")?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    return;
  }
  if (e.target.closest("[data-stop]")) return;
  const sel = e.target.closest("[data-select]");
  if (sel) {
    selected = sel.dataset.select; const fromGrid = !!e.target.closest(".grid"); tab = fromGrid ? tab : "source"; render();
    const c = COLS.find(x => x.column === selected);
    if (fromGrid && c) document.getElementById("card-" + c.idx)?.scrollIntoView({ behavior: "smooth", block: "center" });
    else document.querySelector("#source-view th.hl")?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
});

const runBtn = document.getElementById("run-btn"), runStatus = document.getElementById("run-status");
function setStatus(m, err) { runStatus.textContent = m; runStatus.className = err ? "err" : ""; }
runBtn.addEventListener("click", async () => {
  runBtn.disabled = true; const t0 = Date.now(); setStatus("Claude is reading the file…"); logRun("Claude call started", FILE.name);
  try { const out = await runClaudeMapping(FILE, n => setStatus(`Claude is reading the file… (${n.toLocaleString()} chars)`)); window.__LAST_SECS = Math.round((Date.now() - t0) / 1000); logRun("Claude call finished", `${Math.round((Date.now() - t0) / 1000)}s · ${(window.__LAST_RAW || "").length.toLocaleString()} chars`); build(out, "claude"); setStatus(`Mapped by Claude in ${Math.round((Date.now() - t0) / 1000)}s`); }
  catch (err) {
    setStatus("Mapping failed: " + (err && err.message ? err.message : err) + " Try again, or use the saved sample.", true); logRun("Run failed", err && err.message ? err.message : String(err));
    if (window.__LAST_RAW) document.getElementById("eval-slot").innerHTML = `<details class="eval" open><summary>Raw AI output (couldn't be used)</summary><pre style="white-space:pre-wrap;font-size:11.5px;max-height:300px;overflow:auto">${esc(window.__LAST_RAW)}</pre></details>`;
  }
  finally { runBtn.disabled = false; runBtn.textContent = "Re-run mapping"; }
});
document.getElementById("sample-btn").addEventListener("click", () => { logRun("Loaded saved sample", FILE.name); build(SAMPLE_MAPPING, "sample"); setStatus("Showing saved sample output"); });
document.getElementById("learnings-link").addEventListener("click", e => { e.preventDefault(); const d = document.getElementById("learnings"); d.open = !d.open; if (d.open) d.scrollIntoView({ behavior: "smooth" }); });

const START = location.hash === "#blind" ? "blind" : "sample";
loadFile(START);
const sw = document.createElement("a"); sw.href = START === "blind" ? "#sample-file" : "#blind"; sw.textContent = START === "blind" ? "switch to sample file" : "switch to blind test file";
document.getElementById("file-stats").after(document.createTextNode(" · "), sw);
window.addEventListener("hashchange", () => { if (location.hash === "#blind" || location.hash === "#sample-file") location.reload(); });
if (START === "blind") document.getElementById("sample-btn").style.display = "none";
render();
if (location.hash === "#sample") { build(SAMPLE_MAPPING, "sample"); setStatus("Showing saved sample output"); }
