export const hubDisclaimer = 'A typical operating model — not a description of any specific organization.'

export const hubFlow = [
  { name: 'Intake', detail: 'A request arrives with the business question and a named owner.' },
  { name: 'Triage', detail: 'Prioritize by business value, urgency and reuse.' },
  { name: 'Scope', detail: 'Agree the question, definitions and the decision it informs with the business owner.' },
  { name: 'Build', detail: 'Analyze, model or build the asset.' },
  { name: 'Quality review', detail: 'Peer review of logic, definitions and lineage.' },
  { name: 'Narrative', detail: 'Turn the analysis into an insight, risk and recommendation.' },
  { name: 'Decision', detail: 'The business owner decides, with sign-off.' },
  { name: 'Action tracking', detail: 'Track what was done and the effect.' },
  { name: 'Feedback', detail: 'Learnings feed the next request.' },
]

export const serves = [
  { name: 'Commercial', asks: ['Targeting and segmentation', 'Launch and performance tracking', 'Omnichannel measurement', 'Forecasting'] },
  { name: 'Medical', asks: ['Real-world and market insight for evidence planning', 'Structuring scientific-engagement insights', 'Publication and evidence-landscape analysis'], boundary: 'Non-promotional. Support for Medical stays separate from targeting or promotional use; collaboration follows compliance guardrails.' },
  { name: 'HEVA', asks: ['Access barrier and coverage analysis', 'Pricing and gross-to-net scenarios', 'Payer landscape and evidence support'] },
]

export interface RequestType {
  id: string
  name: string
  example: string
  tier: string
  asset: string
  audience: ('Commercial' | 'Medical' | 'HEVA')[]
}

export const requestTypes: RequestType[] = [
  { id: 'adhoc', name: 'Ad-hoc question', example: 'Why did new patient starts dip in Region X last week?', tier: 'Same day – 2 days', asset: 'Reusable query / metric definition', audience: ['Commercial', 'HEVA'] },
  { id: 'recurring', name: 'Recurring report / dashboard', example: 'Weekly launch tracker with funnel and coverage views', tier: 'Weeks to build, then automated', asset: 'Governed dashboard', audience: ['Commercial', 'HEVA'] },
  { id: 'deepdive', name: 'Deep dive', example: 'Root-cause of prescription-to-start drop-off', tier: '1–2 weeks', asset: 'Analysis template', audience: ['Commercial', 'HEVA', 'Medical'] },
  { id: 'forecast', name: 'Forecasting / scenario', example: 'Re-baseline forecast under slower time-to-start', tier: '1–3 weeks', asset: 'Scenario model', audience: ['Commercial', 'HEVA'] },
  { id: 'segment', name: 'Segmentation / targeting', example: 'Refresh specialist segments before the quarterly plan', tier: '3–6 weeks', asset: 'Segmentation framework', audience: ['Commercial'] },
  { id: 'omni', name: 'Omnichannel analytics', example: 'Where journeys stall by channel and segment', tier: '2–4 weeks', asset: 'Journey measurement framework', audience: ['Commercial'] },
  { id: 'medical', name: 'Medical / real-world insight', example: 'Evidence-gap landscape and treatment-pattern summary', tier: '2–6 weeks', asset: 'Insight repository entry', audience: ['Medical'] },
  { id: 'selfserve', name: 'Self-serve / AI-assisted', example: 'Ask a performance question in plain language and see the lineage', tier: 'Immediate (with review for new metrics)', asset: 'Curated semantic layer', audience: ['Commercial', 'Medical', 'HEVA'] },
]

export const maturity = [
  { name: 'Descriptive', q: 'What happened?' },
  { name: 'Diagnostic', q: 'Why did it happen?' },
  { name: 'Predictive', q: 'What is likely to happen?' },
  { name: 'Prescriptive', q: 'What should we do?' },
  { name: 'Assistive / agentic', q: 'What can be prepared for me?' },
]

export const maturityCallout = 'Human decision-making and explainability stay central at every level.'

export const consistencyPoints = [
  { name: 'Shared definitions', detail: 'The same metric means the same thing in every business unit.' },
  { name: 'Reusable components', detail: 'Build once, adapt per business unit, instead of rebuilding.' },
  { name: 'Lineage', detail: 'Any number can be traced to its source and logic.' },
  { name: 'Adoption', detail: 'Consistency only matters if the business uses it.' },
]
