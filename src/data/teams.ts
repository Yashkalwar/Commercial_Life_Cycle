import type { Handoff, StageId, Team, TeamId } from './types'
import { stages } from './stages'

export const teams: Team[] = [
  {
    id: 'strategy', name: 'Commercial Strategy', type: 'Business',
    purpose: 'Decide where to compete and how.',
    keyQuestions: ['Which indications and markets deserve priority?', 'In what order do we launch?', 'What does the long-range plan assume?'],
    typicalTasks: ['Market sizing', 'Portfolio and opportunity assessment', 'Launch sequencing', 'Long-range commercial plans'],
    deliverables: ['Opportunity assessments', 'Launch sequence', 'Long-range commercial plan'],
    kpis: ['Portfolio value', 'Launch readiness', 'Plan attainment'],
  },
  {
    id: 'brand', name: 'Brand & Marketing', type: 'Customer-facing',
    purpose: 'Create demand through positioning and messaging.',
    keyQuestions: ['Who are our priority segments?', 'What message resonates, and is it consistent with the evidence?', 'Which campaigns are contributing?'],
    typicalTasks: ['Brand strategy', 'Segmentation', 'Campaigns', 'Congress / event plans', 'Promotional materials'],
    deliverables: ['Brand plan', 'Segmentation and targeting framework', 'Campaign plans', 'Approved promotional materials'],
    kpis: ['Share', 'Engagement', 'Campaign contribution'],
  },
  {
    id: 'sales', name: 'Sales / Field Force', type: 'Customer-facing',
    purpose: 'Execute engagement with HCPs and accounts.',
    keyQuestions: ['Who should I see this week, and why?', 'What changed at my accounts?', 'Where am I below target?'],
    typicalTasks: ['Targeting', 'Call planning', 'Territory management', 'Pre-call preparation'],
    deliverables: ['Call plans', 'Territory plans', 'Field activity records'],
    kpis: ['Reach', 'Frequency', 'Call quality', 'Target achievement'],
  },
  {
    id: 'omni', name: 'Omnichannel & Digital', type: 'Customer-facing',
    purpose: 'Right message, right channel, right time.',
    keyQuestions: ['Which channel works for which HCP?', 'Where do journeys stall?', 'Which rules should trigger which content?'],
    typicalTasks: ['Email, web, webinars, portals', 'Journey design', 'Content personalization', 'Next-best-action rules'],
    deliverables: ['Journey maps', 'Content plans', 'Next-best-action rule sets'],
    kpis: ['Engagement', 'Channel mix', 'Journey conversion'],
  },
  {
    id: 'medical', name: 'Medical Affairs', type: 'Product',
    purpose: 'Scientific exchange and evidence; non-promotional.',
    keyQuestions: ['What are the evidence gaps?', 'What are scientific leaders telling us?', 'How do we educate on monitoring or safe-use requirements?'],
    typicalTasks: ['Medical strategy', 'MSL engagement', 'KOL / scientific-leader mapping', 'Evidence communication', 'Medical education', 'Insight gathering', 'Publication planning'],
    deliverables: ['Medical plan', 'Evidence-generation plan', 'Publication plan', 'Field medical insight reports'],
    kpis: ['Quality of scientific engagement', 'Insights actioned', 'Evidence gaps closed'],
    boundaryNote: 'Operates independently from promotional activity; collaboration with Commercial follows compliance guardrails.',
  },
  {
    id: 'heva', name: 'HEVA / Market Access & Pricing', type: 'Business',
    purpose: 'Make sure eligible patients can actually get the therapy at a sustainable value.',
    keyQuestions: ['Where is coverage slower than assumed?', 'What price corridor is defensible?', 'What does the payer need to see?'],
    typicalTasks: ['Value and evidence dossiers', 'HTA / payer strategy', 'Pricing corridors', 'Contracting', 'Reimbursement and coverage tracking', 'Access barrier analysis'],
    deliverables: ['Value dossier', 'Pricing corridor', 'Coverage tracker', 'Access barrier analysis'],
    kpis: ['Coverage / reimbursement milestones', 'Time to access', 'Net price'],
  },
  {
    id: 'patient', name: 'Patient Services', type: 'Customer-facing',
    purpose: 'Smooth the patient journey from prescription to therapy.',
    keyQuestions: ['Where do patients drop between prescription and start?', 'Do we have onboarding capacity?', 'Who needs adherence support?'],
    typicalTasks: ['Onboarding', 'Benefits investigation support', 'Adherence programmes', 'Patient education', 'Drop-off analysis'],
    deliverables: ['Onboarding workflow', 'Adherence programme', 'Drop-off analysis'],
    kpis: ['Time to therapy start', 'Persistence', 'Programme enrolment'],
  },
  {
    id: 'finance', name: 'Finance & Planning', type: 'Business',
    purpose: 'Connect commercial activity to financial outcomes.',
    keyQuestions: ['Are we on plan, and what changed?', 'What is the net impact of a scenario?', 'Which investment case holds up?'],
    typicalTasks: ['Budgets', 'Brand P&L', 'Forecast reconciliation', 'Gross-to-net', 'Investment cases', 'Scenario planning'],
    deliverables: ['Brand P&L', 'Reconciled forecast', 'Investment cases'],
    kpis: ['Plan vs actual', 'ROI of investment cases', 'Forecast accuracy'],
  },
  {
    id: 'supply', name: 'Supply Chain & Manufacturing', type: 'Product',
    purpose: 'Have the right supply at the right place.',
    keyQuestions: ['Is demand reflected in the supply plan?', 'Where is stock at risk?', 'How should limited stock be allocated?'],
    typicalTasks: ['Demand planning', 'Launch stock build', 'Allocation', 'Stock-out risk monitoring'],
    deliverables: ['Supply plan', 'Allocation proposals', 'Stock-risk alerts'],
    kpis: ['Service level', 'Stock-out events', 'Forecast bias'],
  },
  {
    id: 'rnd', name: 'R&D / Clinical Development', type: 'Product',
    purpose: 'Generate the product and the evidence.',
    keyQuestions: ['Which indication should come first?', 'When are data readouts?', 'What does the pipeline look like?'],
    typicalTasks: ['Trial design inputs', 'Pipeline updates', 'Indication sequencing', 'Data readouts'],
    deliverables: ['Pipeline updates', 'Data readout timelines'],
    kpis: ['Pipeline milestones'],
    boundaryNote: 'Interaction with Commercial is mostly pre-launch and portfolio planning.',
  },
  {
    id: 'regulatory', name: 'Regulatory', type: 'Product',
    purpose: 'Approvals, labels, and what can be said.',
    keyQuestions: ['When is approval expected?', 'What does the label allow?', 'Which claims are permissible?'],
    typicalTasks: ['Submissions', 'Label negotiation', 'Promotional-claim consultation'],
    deliverables: ['Approval timing', 'Label constraints'],
    kpis: ['Approval milestones'],
  },
  {
    id: 'compliance', name: 'Compliance, Legal & Privacy', type: 'Business',
    purpose: 'Keep activity within rules.',
    keyQuestions: ['Is this material and process within the rules?', 'Is the data use consented and proportionate?', 'Does the engagement meet guardrails?'],
    typicalTasks: ['Material review', 'Data-privacy review', 'Contract review', 'Speaker / engagement guardrails'],
    deliverables: ['Material approvals', 'Privacy assessments', 'Guardrail guidance'],
    kpis: ['Review turnaround', 'Audit readiness'],
    boundaryNote: 'Event-driven but gating: work does not proceed without review.',
  },
  {
    id: 'analytics', name: 'Insights & Analytics (incl. a central capabilities hub)', type: 'Data & AI',
    purpose: 'Turn data into decisions for Commercial, Medical and HEVA.',
    keyQuestions: ['What happened, why, and what should we do?', 'Which segments and accounts matter most?', 'What does the forecast look like under different assumptions?'],
    typicalTasks: ['Performance analytics', 'Segmentation', 'Targeting', 'Forecasting', 'Market and patient insights', 'Dashboards', 'Omnichannel analytics', 'AI-assisted insight generation'],
    deliverables: ['Dashboards and trackers', 'Deep dives', 'Forecast scenarios', 'Insight narratives'],
    kpis: ['Decisions influenced', 'Turnaround time', 'Adoption of insights', 'Quality and consistency across business units'],
  },
  {
    id: 'it', name: 'Data, Digital & IT', type: 'Data & AI',
    purpose: 'The platforms and pipelines.',
    keyQuestions: ['Is data fresh and available?', 'Are identities resolved consistently?', 'How do we enable AI safely?'],
    typicalTasks: ['Data platform', 'MDM', 'CRM and integrations', 'Security', 'AI enablement'],
    deliverables: ['Data platform', 'Master data', 'CRM and integrations'],
    kpis: ['Data freshness', 'Availability', 'Adoption'],
  },
]

const ALL: StageId[] = ['bd', 'prelaunch', 'launch', 'growth', 'lcm']
const IN_MARKET: StageId[] = ['launch', 'growth', 'lcm']

export const handoffs: Handoff[] = [
  { id: 'h1', from: 'strategy', to: 'heva', reason: 'Forecast assumes access; HEVA tests that assumption', stageIds: ['prelaunch', 'launch'], cadence: ['Weekly'], artifact: 'Access-assumption register and weekly launch tracker' },
  { id: 'h2', from: 'brand', to: 'medical', reason: 'Positioning must be consistent with the evidence', stageIds: ['prelaunch', 'growth'], cadence: ['Monthly'], artifact: 'Evidence-consistency check of positioning and key messages', guardrail: true },
  { id: 'h3', from: 'analytics', to: 'sales', reason: 'Targets, call plans, territory performance', stageIds: IN_MARKET, cadence: ['Daily', 'Weekly'], artifact: 'Weekly target list and territory performance view' },
  { id: 'h4', from: 'analytics', to: 'omni', reason: 'Journey performance, next-best-action rules', stageIds: ['launch', 'growth'], cadence: ['Weekly'], artifact: 'Journey performance report and NBA rule backlog' },
  { id: 'h5', from: 'heva', to: 'finance', reason: 'Net price, gross-to-net, scenario impact', stageIds: ['prelaunch', 'growth', 'lcm'], cadence: ['Monthly', 'Quarterly'], artifact: 'Gross-to-net bridge and pricing scenario pack' },
  { id: 'h6', from: 'finance', to: 'supply', reason: 'Forecast to supply plan; stock build at launch', stageIds: ['prelaunch', 'launch'], cadence: ['Weekly'], artifact: 'Forecast reconciliation and launch stock-build plan' },
  { id: 'h7', from: 'strategy', to: 'finance', reason: 'Plan assumptions reconciled with the financial view', stageIds: ['bd', 'prelaunch', 'launch', 'lcm'], cadence: ['Weekly', 'Quarterly'], artifact: 'Forecast reconciliation' },
  { id: 'h8', from: 'strategy', to: 'supply', reason: 'Launch sequence and volumes drive the supply plan', stageIds: ['prelaunch', 'launch'], cadence: ['Weekly'], artifact: 'Launch sequence and volume scenarios' },
  { id: 'h9', from: 'patient', to: 'heva', reason: 'Where do patients drop between prescription and start? Access causes vs onboarding causes', stageIds: ['launch', 'growth'], cadence: ['Weekly'], artifact: 'Prescription-to-start drop-off analysis' },
  { id: 'h10', from: 'patient', to: 'medical', reason: 'Clinical and monitoring questions raised in onboarding feed medical insight', stageIds: ['launch', 'growth'], cadence: ['Weekly'], artifact: 'Aggregated onboarding questions and barriers', guardrail: true },
  { id: 'h11', from: 'rnd', to: 'strategy', reason: 'Indication sequencing from market opportunity', stageIds: ['bd', 'prelaunch'], cadence: ['Quarterly'], artifact: 'Indication-sequencing options paper' },
  { id: 'h12', from: 'regulatory', to: 'brand', reason: 'What claims are permissible', stageIds: ['prelaunch'], cadence: ['Event-driven'], artifact: 'Label-aligned claims guidance', guardrail: true },
  { id: 'h13', from: 'regulatory', to: 'compliance', reason: 'Label and claim constraints feed material review', stageIds: ['prelaunch'], cadence: ['Event-driven'], artifact: 'Label constraints note', guardrail: true },
  { id: 'h14', from: 'compliance', to: 'brand', reason: 'Promotional-material review gates every release', stageIds: ['prelaunch', 'launch', 'growth'], cadence: ['Event-driven'], artifact: 'Material approval record', guardrail: true },
  { id: 'h15', from: 'it', to: 'analytics', reason: 'Platforms, MDM, AI enablement', stageIds: ALL, cadence: ['Continuous'], artifact: 'Governed data platform, master data and AI tooling' },
  { id: 'h16', from: 'analytics', to: 'strategy', reason: 'Market sizing and scenario inputs', stageIds: ['bd', 'prelaunch', 'lcm'], cadence: ['Monthly'], artifact: 'Market-sizing model and scenario pack' },
  { id: 'h17', from: 'analytics', to: 'heva', reason: 'Access barrier analysis and coverage tracking', stageIds: ['prelaunch', 'launch', 'growth'], cadence: ['Weekly'], artifact: 'Coverage tracker and access-barrier drill-down' },
  { id: 'h18', from: 'analytics', to: 'brand', reason: 'Segmentation, targeting and campaign performance', stageIds: ['prelaunch', 'launch', 'growth'], cadence: ['Weekly', 'Monthly'], artifact: 'Segmentation refresh and campaign performance report' },
  { id: 'h19', from: 'analytics', to: 'medical', reason: 'Real-world and market insight for non-promotional evidence planning', stageIds: ['prelaunch', 'growth'], cadence: ['Monthly'], artifact: 'Real-world evidence landscape and insight synthesis', guardrail: true },
  { id: 'h20', from: 'analytics', to: 'finance', reason: 'Forecast variance and re-baselining', stageIds: ALL, cadence: ['Monthly'], artifact: 'Forecast variance analysis' },
  { id: 'h21', from: 'brand', to: 'sales', reason: 'Messaging, segments and target lists for the field', stageIds: ['prelaunch', 'launch', 'growth'], cadence: ['Weekly'], artifact: 'Brand plan cascade and target list' },
  { id: 'h22', from: 'brand', to: 'omni', reason: 'Campaign orchestration across channels', stageIds: ['prelaunch', 'growth'], cadence: ['Weekly'], artifact: 'Campaign and channel plan' },
  { id: 'h23', from: 'compliance', to: 'medical', reason: 'Guardrails for scientific exchange and engagement', stageIds: ALL, cadence: ['Event-driven'], artifact: 'Engagement guardrail guidance', guardrail: true },
  { id: 'h24', from: 'supply', to: 'patient', reason: 'Stock position at treatment centres informs onboarding scheduling', stageIds: ['launch'], cadence: ['Weekly'], artifact: 'Stock position by treatment centre' },
  { id: 'h25', from: 'it', to: 'omni', reason: 'CRM, journey tooling and integrations', stageIds: ['prelaunch', 'launch', 'growth'], cadence: ['Monthly'], artifact: 'CRM and integration roadmap' },
]

export const teamById = (id: TeamId) => teams.find((t) => t.id === id)!
export const teamShort = (id: TeamId) =>
  ({ analytics: 'Insights & Analytics', heva: 'HEVA', sales: 'Sales / Field', supply: 'Supply Chain', compliance: 'Compliance & Legal', rnd: 'R&D', it: 'Data, Digital & IT', strategy: 'Commercial Strategy', brand: 'Brand & Marketing', omni: 'Omnichannel', medical: 'Medical Affairs', patient: 'Patient Services', finance: 'Finance & Planning', regulatory: 'Regulatory' } as Record<TeamId, string>)[id]

export function worksWith(id: TeamId) {
  return {
    receivesFrom: handoffs.filter((h) => h.to === id),
    givesTo: handoffs.filter((h) => h.from === id),
  }
}

export type Role = 'Lead' | 'Support' | 'Consulted'
export function roleOf(team: TeamId, stage: StageId): Role | null {
  const s = stages.find((x) => x.id === stage)!
  if (s.leadTeams.includes(team)) return 'Lead'
  if (s.supportTeams.includes(team)) return 'Support'
  if (handoffs.some((h) => h.stageIds.includes(stage) && (h.from === team || h.to === team))) return 'Consulted'
  return null
}
