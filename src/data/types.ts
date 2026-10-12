export type Cadence = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Event-driven' | 'Continuous'
export type TeamType = 'Customer-facing' | 'Product' | 'Business' | 'Data & AI'
export type StageId = 'bd' | 'prelaunch' | 'launch' | 'growth' | 'lcm'
export type Gbu = 'Specialty Care' | 'Vaccines' | 'General Medicines'
export type TeamId =
  | 'strategy' | 'brand' | 'sales' | 'omni' | 'medical' | 'heva' | 'patient'
  | 'finance' | 'supply' | 'rnd' | 'regulatory' | 'compliance' | 'analytics' | 'it'

export interface Stage {
  id: StageId
  num: number
  name: string
  timeframe: string
  coreQuestion: string
  typicalActivities: string[]
  keyDecisions: string[]
  leadTeams: TeamId[]
  supportTeams: TeamId[]
  dataUsed: string[]
  analyticsAsks: string[]
  publicExampleChip: string[]
  gbuLens: Record<Gbu, string>
}

export interface Team {
  id: TeamId
  name: string
  type: TeamType
  purpose: string
  keyQuestions: string[]
  typicalTasks: string[]
  deliverables: string[]
  kpis: string[]
  boundaryNote?: string
}

export interface Handoff {
  id: string
  from: TeamId
  to: TeamId
  reason: string
  stageIds: StageId[]
  cadence: Cadence[]
  artifact: string
  guardrail?: boolean
}
