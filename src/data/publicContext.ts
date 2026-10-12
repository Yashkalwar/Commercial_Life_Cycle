export interface PublicChip {
  id: string
  label: string
  text: string[]
  source: string
}

export const publicContext: PublicChip[] = [
  { id: 'business', label: 'Business', text: ['Q2 2026 net sales of about €11.6bn, up about 17.8% at constant exchange rates; full-year 2026 growth guidance raised to around 10%.'], source: 'Company Q2 2026 results, July 30, 2026' },
  { id: 'immunology', label: 'Immunology', text: ['Largest brand surpassed €5bn in quarterly sales for the first time in Q2 2026.'], source: 'Q2 2026 results' },
  { id: 'launches', label: 'Launches', text: ['Recent pharma launches generated about €1.3bn in Q2 2026, up about 48%.'], source: 'Q2 2026 results' },
  { id: 'portfolio', label: 'Portfolio', text: ['Late-stage pipeline decisions in 2026 refocused development priorities; acquisitions added new portfolios (e.g., Ayvakit, Heplisav-B).'], source: 'Q2 2026 results' },
  { id: 'injector', label: 'Launch example', text: ['A subcutaneous formulation of an oncology brand was approved with an on-body injector enabling home administration (US, EU, JP).'], source: 'Q2 2026 results' },
  { id: 'eu-neuro', label: 'Launch example', text: ['A neurology therapy was approved in the EU with a risk-management and patient-support programme; Germany launch planned in 2026.'], source: 'Q2 2026 results' },
  { id: 'rare-decision', label: 'Launch example', text: ['A rare-disease regulatory decision in the US is scheduled for late November 2026.'], source: 'Q2 2026 results' },
  { id: 'org', label: 'Organization', text: ['A Go-To-Market Capabilities hub in Hyderabad centralizes support to Specialty Care, Vaccines, General Medicines and R&D, Data & Digital as a partner to Medical, HEVA and Commercial.'], source: 'Company careers pages' },
  { id: 'gcc', label: 'Organization', text: ['The Hyderabad global capability centre expanded in February 2026 to host about 4,500 people.'], source: 'Company press release, Feb 2026' },
  { id: 'ai', label: 'Technology ambition', text: ['Company has publicly stated an ambition to be an AI-powered biopharma at scale.'], source: 'Company communications' },
  { id: 'next', label: 'Next event', text: ['Q3 2026 results scheduled for October 30, 2026.'], source: 'Company financial calendar' },
]

export const homeChipIds = ['business', 'launches', 'org', 'ai', 'next']
export const chipById = (id: string) => publicContext.find((c) => c.id === id)!
