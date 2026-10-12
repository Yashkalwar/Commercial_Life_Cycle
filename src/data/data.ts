export type DataNodeId = 'internal' | 'external' | 'ingestion' | 'master' | 'analytics' | 'insight' | 'decision' | 'action'

export interface DataNode {
  id: DataNodeId
  title: string
  subtitle: string
  items: string[]
  examples: string[]
  pitfalls: string[]
  ai: string[]
}

export const aiUseCases = [
  { id: 'qa', name: 'Natural-language performance Q&A', node: 'analytics' as DataNodeId },
  { id: 'narr', name: 'Automated narrative summaries for leadership', node: 'insight' as DataNodeId },
  { id: 'nba', name: 'Next-best-action suggestions', node: 'decision' as DataNodeId },
  { id: 'precall', name: 'Pre-call briefing', node: 'action' as DataNodeId },
  { id: 'fcst', name: 'Forecast scenario assistant', node: 'analytics' as DataNodeId },
  { id: 'triage', name: 'Insight triage', node: 'insight' as DataNodeId },
  { id: 'qual', name: 'Qualitative insight structuring', node: 'ingestion' as DataNodeId },
]

export const AI_LABEL = 'assistive • explainable • human-in-the-loop'

export const internalSources = ['Sales', 'CRM and field activity', 'Samples', 'Digital engagement', 'Marketing campaigns', 'Patient-support programme data', 'Forecasts and budgets']
export const externalSources = ['Claims', 'Prescription data', 'HCP master and affiliations', 'Hospital / account data', 'Epidemiology', 'Competitor intelligence', 'Payer data', 'Market research', 'Publications and trial-investigator data']

export const qualityGates = [
  { id: 'identity', name: 'Identity resolution', detail: 'The same HCP, account or patient cohort is recognized across sources.' },
  { id: 'consent', name: 'Consent and privacy', detail: 'Data is used only within consent and privacy rules.' },
  { id: 'fresh', name: 'Data freshness', detail: 'Latency is known and visible to the user.' },
  { id: 'lineage', name: 'Lineage', detail: 'Every number can be traced back to its source.' },
  { id: 'defs', name: 'Definitions', detail: 'A single "source of truth" per metric.' },
]

export const dataNodes: DataNode[] = [
  {
    id: 'internal', title: 'Internal sources', subtitle: 'What the company generates',
    items: internalSources,
    examples: ['Weekly sales and unit feeds', 'Call and email activity from CRM', 'Programme enrolment and onboarding status', 'Budget and forecast files'],
    pitfalls: ['Activity logged inconsistently across teams', 'Forecast versions that differ by function', 'Programme data held in separate systems'],
    ai: [],
  },
  {
    id: 'external', title: 'External sources', subtitle: 'What the market generates',
    items: externalSources,
    examples: ['Claims and prescription panels', 'HCP master and affiliations', 'Epidemiology estimates', 'Payer coverage decisions', 'Publication and investigator data'],
    pitfalls: ['Latency between event and availability', 'Panel coverage that differs by market', 'Different HCP identifiers across providers'],
    ai: [],
  },
  {
    id: 'ingestion', title: 'Ingestion & quality', subtitle: 'Land it, check it, label it',
    items: ['Ingestion pipelines', 'Validation rules', 'Freshness monitoring', 'Privacy and consent checks'],
    examples: ['Row-count and range checks per feed', 'Freshness status shown on every dashboard', 'Consent flags applied before use'],
    pitfalls: ['Silent feed failures', 'Latency not communicated to users', 'Consent status lost during transformation'],
    ai: ['qual'],
  },
  {
    id: 'master', title: 'Master data', subtitle: 'HCP · Account · Product',
    items: ['HCP master', 'Account / institution master', 'Product master', 'Affiliations and hierarchies'],
    examples: ['One identifier per HCP across CRM, claims and digital', 'Account hierarchies linking centres to systems', 'A single product and pack hierarchy'],
    pitfalls: ['Identity resolution errors split or merge HCPs', 'Affiliations out of date', 'Hierarchies that differ between systems'],
    ai: [],
  },
  {
    id: 'analytics', title: 'Analytics & models', subtitle: 'Measure, explain, forecast',
    items: ['Performance metrics', 'Segmentation', 'Targeting models', 'Forecast models', 'Attribution and mix'],
    examples: ['Launch tracker metrics', 'Segmentation refresh', 'Forecast scenarios', 'Marketing-mix measurement'],
    pitfalls: ['Conflicting definitions of the same metric', 'Models without documented lineage', 'Results that cannot be explained to the business'],
    ai: ['qa', 'fcst'],
  },
  {
    id: 'insight', title: 'Insight', subtitle: 'What it means',
    items: ['Narratives', 'Root-cause explanations', 'Risk and opportunity flags', 'Recommendations'],
    examples: ['A leadership summary: performance → insight → risk → action → impact', 'A drill-down that isolates the cause of a gap'],
    pitfalls: ['Insights delivered without a decision owner', 'Too many insights, no prioritization', 'Narrative drift from the underlying numbers'],
    ai: ['narr', 'triage'],
  },
  {
    id: 'decision', title: 'Decision', subtitle: 'Who decides, with what trade-offs',
    items: ['Business review', 'Action planning', 'Investment decisions', 'Sign-off'],
    examples: ['Reallocate effort between regions', 'Adjust the forecast', 'Approve an investment case'],
    pitfalls: ['Decisions not recorded', 'Trade-offs not made visible', 'Compliance boundaries unclear'],
    ai: ['nba'],
  },
  {
    id: 'action', title: 'Action', subtitle: 'Where the work happens',
    items: ['Field calls', 'Digital and omnichannel journeys', 'Patient support actions', 'Access activities'],
    examples: ['Call plans and pre-call briefings', 'Triggered emails or portal content', 'Onboarding capacity changes'],
    pitfalls: ['Actions not tracked back to outcomes', 'Suggestions that arrive too late to be useful', 'Feedback does not reach the data layer'],
    ai: ['precall'],
  },
]
