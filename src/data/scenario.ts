import type { TeamId } from './types'

export const scenarioMeta = {
  codename: 'Brand LUMEN',
  title: 'Launch in flight',
  description: 'A specialty therapy for a rare chronic condition in Market D (a large European market), 14 weeks after launch. It requires a risk-management programme with periodic monitoring and patient support, which makes it cross-functional by design.',
  disclaimer: 'Illustrative scenario. All numbers are fictional.',
  signal: 'Week 14, Monday review: new patient starts are at 62% of the launch forecast; prescriptions are concentrated in a few centres.',
}

export const funnel = [
  { name: 'Target specialists', value: 420 },
  { name: 'Aware & engaged', value: 360 },
  { name: 'Completed programme enrolment', value: 214 },
  { name: 'First prescription', value: 126 },
  { name: 'Access approved', value: 88 },
  { name: 'Therapy started', value: 74 },
]

export const kpis = {
  startsVsForecast: 62,
  timeToStartAssumed: 9,
  timeToStartObserved: 13,
}

export interface ChartPoint { name: string; value: number; highlight?: boolean }
export interface Finding {
  id: string
  title: string
  headline: string
  detail: string
  owners: TeamId[]
  ownerNote: string
  chartTitle: string
  chart: ChartPoint[]
  unit: string
  dataNeeds: string[]
  guard?: boolean
}

export const findings: Finding[] = [
  {
    id: 'enrol', title: 'Enrolment gap', headline: '146 engaged specialists have not completed required programme enrolment',
    detail: 'The risk-management programme requires enrolment before a first prescription. Engagement is healthy; completion is the bottleneck.',
    owners: ['medical', 'compliance', 'sales'],
    ownerNote: 'Medical (education on monitoring requirements) + Compliance (materials), with Sales providing non-promotional logistics awareness only where permitted.',
    chartTitle: 'Engaged specialists by enrolment status', unit: 'specialists',
    chart: [{ name: 'Enrolled', value: 214 }, { name: 'Not enrolled', value: 146, highlight: true }],
    dataNeeds: ['Enrolment status by specialist and centre', 'Engagement history (medical vs commercial kept separate)', 'Centre-level patient potential'],
    guard: true,
  },
  {
    id: 'access', title: 'Access delay', headline: 'Two regions have slower coverage decisions; median time to approval is 6 weeks longer',
    detail: 'Coverage decisions in two regions take materially longer than elsewhere, delaying starts even where prescribing is active.',
    owners: ['heva'],
    ownerNote: 'HEVA (dossier and regional payer engagement).',
    chartTitle: 'Median time to approval (weeks)', unit: 'weeks',
    chart: [{ name: 'Other regions', value: 4 }, { name: 'Region B', value: 10, highlight: true }, { name: 'Region C', value: 10, highlight: true }],
    dataNeeds: ['Coverage decision log by region and date', 'Payer submission and query history', 'Prescription-to-approval timestamps'],
  },
  {
    id: 'onboard', title: 'Onboarding drop-off', headline: '18% of prescribed patients not started within 14 days',
    detail: 'Patients with approved access are waiting for onboarding, benefits support or scheduling.',
    owners: ['patient'],
    ownerNote: 'Patient Services (onboarding capacity, benefits support).',
    chartTitle: 'Prescribed patients: start within 14 days', unit: '% of patients',
    chart: [{ name: 'Started ≤14 days', value: 82 }, { name: 'Not started', value: 18, highlight: true }],
    dataNeeds: ['Patient-programme status timestamps', 'Onboarding capacity and queue', 'Reasons for delay (coded)'],
  },
  {
    id: 'supply', title: 'Supply watch', headline: 'Projected stock tight at two treatment centres in 5 weeks',
    detail: 'Demand is concentrated, so stock at two centres is projected to run low even though overall supply is adequate.',
    owners: ['supply', 'strategy'],
    ownerNote: 'Supply Chain + Commercial Strategy (allocation).',
    chartTitle: 'Projected weeks of cover at the two centres (illustrative)', unit: 'weeks of cover',
    chart: [{ name: 'Wk 1', value: 6 }, { name: 'Wk 2', value: 5 }, { name: 'Wk 3', value: 4 }, { name: 'Wk 4', value: 3 }, { name: 'Wk 5', value: 2, highlight: true }],
    dataNeeds: ['Stock by treatment centre', 'Centre-level demand projection', 'Replenishment lead times'],
  },
  {
    id: 'forecast', title: 'Forecast assumption', headline: 'Forecast assumes 9-week time-to-start; observed is 13',
    detail: 'The original forecast curve is built on a faster path from prescription to start than is observed.',
    owners: ['finance', 'analytics'],
    ownerNote: 'Finance + Analytics (re-baseline).',
    chartTitle: 'Time-to-start (weeks)', unit: 'weeks',
    chart: [{ name: 'Assumed', value: 9 }, { name: 'Observed', value: 13, highlight: true }],
    dataNeeds: ['Time-to-start distribution by cohort', 'Forecast model assumptions', 'Leading indicators for the start curve'],
  },
]

export const altFindings: Finding[] = [
  {
    id: 'pvm', title: 'Price-volume-mix and gross-to-net', headline: 'Net sales change decomposed into price, volume, mix and gross-to-net effects',
    detail: 'For an established brand the Monday question is usually "what moved net sales?". Decompose before debating the response.',
    owners: ['finance', 'heva', 'analytics'], ownerNote: 'Finance + HEVA (gross-to-net) with Analytics (decomposition).',
    chartTitle: 'Illustrative net-sales bridge (index points)', unit: 'index points',
    chart: [{ name: 'Volume', value: -2 }, { name: 'Price', value: 1 }, { name: 'Mix', value: -1 }, { name: 'Gross-to-net', value: -3, highlight: true }],
    dataNeeds: ['Price, volume and mix by pack and channel', 'Gross-to-net components by customer', 'Contract and rebate terms'],
  },
  {
    id: 'share', title: 'Share shift versus new entrants', headline: 'Share movement across segments after new entrants',
    detail: 'Where share is moving, and whether it is new patient flow or switching, determines whether to defend, adapt or reallocate.',
    owners: ['brand', 'strategy', 'analytics'], ownerNote: 'Brand + Commercial Strategy with Analytics (patient flow and switching).',
    chartTitle: 'Illustrative share change by segment (pts)', unit: 'share points',
    chart: [{ name: 'Seg. A', value: -0.5 }, { name: 'Seg. B', value: -2.5, highlight: true }, { name: 'Seg. C', value: -1 }, { name: 'Seg. D', value: 0.5 }],
    dataNeeds: ['New-to-brand vs switch patient flow', 'Segment-level share', 'Competitor entry timing'],
  },
]

export const steps = [
  { id: 'signal', name: 'Signal', blurb: 'Something moves in the weekly view', day: 'Mon' },
  { id: 'diagnose', name: 'Diagnose', blurb: 'Isolate the causes and their owners', day: 'Tue–Wed' },
  { id: 'decide', name: 'Decide', blurb: 'Choose actions and trade-offs', day: 'Thu' },
  { id: 'act', name: 'Act', blurb: 'Teams execute in sequence', day: 'Thu → Wk 6' },
  { id: 'monitor', name: 'Monitor', blurb: 'Watch the funnel; loop back', day: 'Wk 2+' },
] as const

export const stepTeams: Record<string, TeamId[]> = {
  signal: ['analytics', 'brand', 'it'],
  diagnose: ['analytics', 'medical', 'heva', 'patient', 'supply', 'finance', 'compliance'],
  decide: ['brand', 'medical', 'compliance', 'heva', 'patient', 'supply', 'strategy', 'finance', 'sales', 'omni'],
  act: ['brand', 'medical', 'compliance', 'sales', 'omni', 'patient', 'supply', 'finance', 'analytics'],
  monitor: ['analytics', 'brand', 'heva', 'patient', 'finance', 'strategy'],
}

export interface Decision {
  id: string
  title: string
  owners: TeamId[]
  ownerLabel: string
  tradeoffs: string[]
  compliance?: string
  addresses: string
}

export const decisions: Decision[] = [
  { id: 'd1', title: 'Prioritize 40 high-potential centres for enrolment support', owners: ['brand', 'medical'], ownerLabel: 'Brand + Medical, within guardrails', addresses: 'Enrolment gap',
    tradeoffs: ['Focus on 40 centres leaves others slower to enrol', 'Medical education and commercial support stay separate workstreams', 'Centre selection must be based on patient potential, not on Medical-led promotion'],
    compliance: 'Medical Affairs remains non-promotional. Medical does not target or prioritize for sales purposes; Commercial acts only within approved materials and permitted logistics.' },
  { id: 'd2', title: 'Reallocate field and digital effort to two regions with access delays', owners: ['sales', 'omni', 'heva'], ownerLabel: 'Sales + Omnichannel with HEVA input', addresses: 'Access delay',
    tradeoffs: ['Effort moves from regions that are on track', 'Field activity cannot fix payer timelines on its own; HEVA payer engagement leads', 'Digital content must be approved before use'],
    compliance: 'Materials used in the two regions follow the standard review process.' },
  { id: 'd3', title: 'Add onboarding capacity in Patient Services for 6 weeks', owners: ['patient'], ownerLabel: 'Patient Services', addresses: 'Onboarding drop-off',
    tradeoffs: ['Temporary cost against faster starts', 'Capacity must be released or made permanent after the review'] },
  { id: 'd4', title: 'Adjust stock allocation to two treatment centres', owners: ['supply', 'strategy'], ownerLabel: 'Supply Chain + Commercial Strategy', addresses: 'Supply watch',
    tradeoffs: ['Allocating to two centres reduces buffer elsewhere', 'Depends on how reliable the centre-level demand view is'] },
  { id: 'd5', title: 'Re-baseline forecast and brief leadership', owners: ['finance', 'analytics'], ownerLabel: 'Finance + Analytics', addresses: 'Forecast assumption',
    tradeoffs: ['A lower near-term curve changes plan expectations', 'Re-baselining too early may mask recovery'] },
]

export const columns = ['Signal', 'Diagnose', 'Decide', 'Act', 'Monitor'] as const

export const laneCols = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6']

export const swimlanes: { team: TeamId; cells: { col: number; text: string }[] }[] = [
  { team: 'analytics', cells: [{ col: 0, text: 'Signal flagged in weekly tracker' }, { col: 1, text: 'Funnel and region deep dive' }, { col: 4, text: 'Leadership summary' }, { col: 5, text: 'Track funnel weekly' }, { col: 8, text: 'Re-baselined forecast v2' }] },
  { team: 'brand', cells: [{ col: 0, text: 'Reviews signal' }, { col: 2, text: 'Cross-team huddle' }, { col: 3, text: 'Centre list agreed' }, { col: 5, text: 'Enrolment support live' }] },
  { team: 'medical', cells: [{ col: 2, text: 'Monitoring-education gaps' }, { col: 3, text: 'Education plan agreed' }, { col: 5, text: 'Scientific exchange on requirements' }, { col: 7, text: 'Insights shared back' }] },
  { team: 'compliance', cells: [{ col: 3, text: 'Material check' }, { col: 4, text: 'Approvals' }] },
  { team: 'sales', cells: [{ col: 3, text: 'Regions shifted' }, { col: 5, text: 'Revised call plans' }] },
  { team: 'omni', cells: [{ col: 3, text: 'Journey changes' }, { col: 6, text: 'Approved content live' }] },
  { team: 'heva', cells: [{ col: 1, text: 'Coverage review' }, { col: 3, text: 'Payer plan' }, { col: 5, text: 'Regional payer meetings' }, { col: 8, text: 'Decision times reviewed' }] },
  { team: 'patient', cells: [{ col: 2, text: 'Queue and capacity view' }, { col: 3, text: 'Capacity agreed' }, { col: 5, text: 'Added capacity (6 wks)' }] },
  { team: 'supply', cells: [{ col: 1, text: 'Stock-risk check' }, { col: 3, text: 'Allocation agreed' }, { col: 6, text: 'Allocation executed' }] },
  { team: 'finance', cells: [{ col: 1, text: 'Forecast variance' }, { col: 4, text: 'Re-baseline plan' }, { col: 8, text: 'Reconcile v2' }] },
]

export const expectedEffect = [
  { name: 'Enrolled', baseline: 214, scenario: 280 },
  { name: 'First Rx', baseline: 126, scenario: 165 },
  { name: 'Access approved', baseline: 88, scenario: 120 },
  { name: 'Started', baseline: 74, scenario: 104 },
]

export const metricsToWatch = [
  'Programme enrolment completion among engaged specialists',
  'Median time to coverage approval in the two regions',
  'Share of prescribed patients started within 14 days',
  'Weeks of stock cover at the two centres',
  'Observed vs assumed time-to-start',
  'New starts vs re-baselined forecast',
]
