import type { Cadence, TeamId } from './types'

export interface RhythmEntry {
  cadence: Exclude<Cadence, 'Event-driven' | 'Continuous'> | 'Annual'
  headline: string
  summary: string[]
  audience: string[]
  inputs: string[]
  outputs: string[]
  typicalQuestions: string[]
  analyticsInvolvement: string
}

export const rhythm: RhythmEntry[] = [
  {
    cadence: 'Daily',
    headline: 'Performance pulse and exceptions',
    summary: ['Performance pulse (sales / units, Rx signals, new patient starts)', 'Field activity exceptions', 'Alert triage', 'Ad-hoc analytics requests', 'Supply / stock flags'],
    audience: ['Brand and sales operations', 'Field managers', 'Supply planners'],
    inputs: ['Sales and unit feeds', 'Rx signals', 'CRM activity', 'Stock positions'],
    outputs: ['Pulse view', 'Exception list', 'Triaged alerts'],
    typicalQuestions: ['Did anything move overnight?', 'Which territories have no recent activity?', 'Where is stock getting tight?'],
    analyticsInvolvement: 'Keeps the pulse and alerts reliable, triages exceptions, and answers quick ad-hoc questions.',
  },
  {
    cadence: 'Weekly',
    headline: 'Where are we, why, what do we do',
    summary: ['Monday "where are we" performance review', 'Tue–Wed deep dives (underperforming regions, HCP segments, campaigns, access)', 'Thu action planning (reallocate effort, adjust targeting, fix access)', 'Fri leadership summary: performance → insight → risk → action → expected impact'],
    audience: ['Brand lead and brand team', 'Sales leadership', 'HEVA', 'Patient Services', 'Analytics partner'],
    inputs: ['Weekly tracker', 'Field and digital activity', 'Coverage updates', 'Patient-programme data'],
    outputs: ['Prioritized issue list', 'Agreed actions with owners', 'Leadership summary'],
    typicalQuestions: ['Are we on track versus forecast?', 'Which segment or region explains the gap?', 'What do we change this week?'],
    analyticsInvolvement: 'Prepares the Monday view, runs Tue–Wed deep dives, frames options for Thursday and drafts the Friday narrative.',
  },
  {
    cadence: 'Monthly',
    headline: 'Business review and forecast reconciliation',
    summary: ['Business review (actual vs plan vs forecast)', 'Forecast reconciliation with Finance and Supply', 'Campaign and channel performance', 'Access milestones'],
    audience: ['Brand and country leadership', 'Finance', 'Supply', 'HEVA'],
    inputs: ['Actuals', 'Plan and forecast', 'Campaign results', 'Access milestones'],
    outputs: ['Business review pack', 'Reconciled forecast', 'Channel performance readout'],
    typicalQuestions: ['Why did actual differ from plan?', 'Does the supply plan still match the forecast?', 'Which channels earned their budget?'],
    analyticsInvolvement: 'Builds variance analysis, supports forecast reconciliation and measures campaign and channel performance.',
  },
  {
    cadence: 'Quarterly',
    headline: 'Planning refresh',
    summary: ['Segmentation refresh', 'Territory / field alignment', 'Budget re-allocation', 'Competitive review', 'Evidence-plan updates'],
    audience: ['Commercial leadership', 'Finance', 'Medical (for evidence plan)', 'HEVA'],
    inputs: ['Quarter results', 'Competitive intelligence', 'Updated segmentation data'],
    outputs: ['Refreshed segments and targets', 'Territory alignment', 'Re-allocated budget', 'Updated evidence plan'],
    typicalQuestions: ['Have the segments changed?', 'Is the field in the right places?', 'Where should budget move?'],
    analyticsInvolvement: 'Refreshes segmentation and alignment analyses, models budget re-allocation scenarios and summarizes competitive moves.',
  },
  {
    cadence: 'Annual',
    headline: 'Long-range plan and portfolio review',
    summary: ['Long-range plan', 'Brand strategy', 'Budget cycle', 'Incentive design', 'Portfolio review'],
    audience: ['Executive leadership', 'Commercial Strategy', 'Finance', 'Brand'],
    inputs: ['Market and pipeline outlook', 'Prior-year performance', 'Portfolio priorities'],
    outputs: ['Long-range plan', 'Brand strategies', 'Budgets', 'Incentive design'],
    typicalQuestions: ['Where do we invest over the next 3–5 years?', 'Which brands are tail brands?', 'What does the incentive design reward?'],
    analyticsInvolvement: 'Provides market and portfolio models, scenario analyses and evidence for the planning decisions.',
  },
]

export const weekDays = [
  { day: 'Mon', title: 'Where are we?', detail: 'Performance review against forecast: starts, Rx, access and activity.' },
  { day: 'Tue', title: 'Why?', detail: 'Deep dives into underperforming regions and segments.' },
  { day: 'Wed', title: 'Why?', detail: 'Campaigns, access and patient-journey drill-downs; cross-team huddle.' },
  { day: 'Thu', title: 'What do we do?', detail: 'Action planning: reallocate effort, adjust targeting, fix access.' },
  { day: 'Fri', title: 'What does leadership need to know?', detail: 'Performance → insight → risk → action → expected impact.' },
]

export const mondayStory: { step: string; text: string; teams: TeamId[] }[] = [
  { step: '1', text: 'I open the weekly tracker before my first meeting. New starts are below forecast in two regions, and I want to know whether that is access, activity or onboarding.', teams: ['brand', 'analytics'] },
  { step: '2', text: 'I message my analytics partner to cut the funnel by region and segment, and to flag anything unusual in field and digital activity.', teams: ['brand', 'analytics', 'sales'] },
  { step: '3', text: 'HEVA shares the latest coverage decisions. One region looks slower than assumed, which could explain part of the gap.', teams: ['heva', 'analytics'] },
  { step: '4', text: 'Patient Services tells me how many prescribed patients are still waiting to start, and how much onboarding capacity they have.', teams: ['patient'] },
  { step: '5', text: 'By noon I have a short list of questions for Tuesday and a note for Finance and Supply that the forecast may need a second look.', teams: ['brand', 'finance', 'supply'] },
]
