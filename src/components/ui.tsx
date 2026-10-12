import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'
import type { Cadence, TeamId, TeamType } from '@/data/types'
import { teamShort } from '@/data/teams'
import { chipById } from '@/data/publicContext'

export const cn = clsx

const ACR: Record<string, string> = {
  HCP: 'Healthcare professional',
  HEVA: 'Health Economics, Value & Access',
  MSL: 'Medical Science Liaison',
  KOL: 'Key Opinion Leader',
  NBA: 'Next-best-action',
  MDM: 'Master data management',
  GTN: 'Gross-to-net',
  TRx: 'Total prescriptions',
  NBRx: 'New-to-brand prescriptions',
  PSP: 'Patient support programme',
  HTA: 'Health technology assessment',
  LCM: 'Lifecycle management',
}
const RE = /\b(HCPs?|HEVA|MSLs?|KOLs?|NBA|MDM|GTN|TRx|NBRx|PSP|HTA|LCM)\b/g

export function T({ children }: { children: string }) {
  const parts = children.split(RE)
  return (
    <>
      {parts.map((p, i) => {
        const key = p.replace(/s$/, '')
        if (i % 2 === 1 && (ACR[p] || ACR[key])) {
          return (
            <span key={i} tabIndex={0} className="group relative cursor-help border-b border-dotted border-soft/60">
              {p}
              <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 hidden w-max max-w-[220px] -translate-x-1/2 rounded-md bg-primary px-2 py-1 text-xs font-normal text-white group-hover:block group-focus:block dark:text-bg">
                {ACR[p] || ACR[key]}
              </span>
            </span>
          )
        }
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

export function Card({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cn('rounded-3xl bg-surface shadow-card', className)}>{children}</div>
}

export function Chip({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'primary' | 'accent' | 'attn'; className?: string }) {
  const tones = {
    neutral: 'bg-muted text-soft',
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/15 text-accent',
    attn: 'bg-attn/20 text-ink',
  }
  return <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', tones[tone], className)}>{children}</span>
}

export const CadenceChip = ({ c }: { c: Cadence }) => <Chip tone="accent">{c}</Chip>
const typeTone: Record<TeamType, 'primary' | 'accent' | 'attn' | 'neutral'> = { 'Customer-facing': 'accent', Product: 'attn', Business: 'primary', 'Data & AI': 'neutral' }
export const TypeChip = ({ t }: { t: TeamType }) => <Chip tone={typeTone[t]}>{t}</Chip>

export function TeamChip({ id, stage, tone = 'neutral' }: { id: TeamId; stage?: string; tone?: 'neutral' | 'primary' | 'accent' }) {
  return (
    <Link to={`/teams?team=${id}${stage ? `&stage=${stage}` : ''}`} className="rounded-full">
      <Chip tone={tone} className="hover:ring-2 hover:ring-accent/50">{teamShort(id)}</Chip>
    </Link>
  )
}

export function Guard({ children, className }: { children: ReactNode; className?: string }) {
  return <div data-guard className={className}>{children}</div>
}

export function GuardIcon({ title = 'Compliance guardrail' }: { title?: string }) {
  return <span title={title} aria-label={title} className="inline-flex text-attn"><ShieldCheck size={16} /></span>
}

export function PublicBadge({ id }: { id: string }) {
  const c = chipById(id)
  return (
    <div className="rounded-2xl bg-surface p-4 text-sm shadow-card">
      <div className="mb-1 flex items-center gap-2">
        <Chip tone="primary">Public context</Chip>
        <span className="text-xs text-soft">{c.label}</span>
        <span className="group relative ml-auto" tabIndex={0} aria-label={`Source: ${c.source}`}>
          <Info size={14} className="text-soft" />
          <span role="tooltip" className="absolute right-0 top-full z-50 mt-1 hidden w-max max-w-[260px] rounded-md bg-primary px-2 py-1 text-xs text-white group-hover:block group-focus:block dark:text-bg">Source: {c.source}</span>
        </span>
      </div>
      <p className="text-ink">{c.text.join(' ')}</p>
      <p className="mt-1 text-xs text-soft">Source: {c.source}</p>
    </div>
  )
}

export function Drawer({ open, onClose, title, subtitle, children, width = 'max-w-xl' }: { open: boolean; onClose: () => void; title: string; subtitle?: ReactNode; children: ReactNode; width?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    window.addEventListener('keydown', k, true)
    return () => { window.removeEventListener('keydown', k, true); prev?.focus?.() }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bk" className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={onClose} />
          <motion.aside key="dr" role="dialog" aria-modal="true" aria-label={title}
            className={cn('fixed right-0 top-0 z-50 flex h-full w-full flex-col glass-s rounded-l-3xl shadow-2xl', width)}
            initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} transition={{ duration: 0.2 }}>
            <header className="flex items-start gap-3 border-b border-line p-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold leading-snug">{title}</h2>
                {subtitle && <div className="mt-1 text-sm text-soft">{subtitle}</div>}
              </div>
              <button ref={ref} onClick={onClose} aria-label="Close drawer" className="rounded-lg p-2 text-soft hover:bg-muted"><X size={20} /></button>
            </header>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-soft">{title}</h3>
      {children}
    </section>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((i) => (
        <li key={i} className="flex gap-2 text-[0.95rem]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /><span><T>{i}</T></span></li>
      ))}
    </ul>
  )
}

export function PageHead({ kicker, title, sub, right }: { kicker: string; title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-3xl">
        <div className="mb-1 text-sm font-semibold text-accent">{kicker}</div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        {sub && <p className="mt-3 text-xl leading-snug text-soft">{sub}</p>}
      </div>
      {right}
    </div>
  )
}

export function Illustrative({ children = 'Illustrative scenario, not a prediction' }: { children?: ReactNode }) {
  return <Chip tone="attn">{children}</Chip>
}
