import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { stages, gbuNotes } from '@/data/stages'
import type { Gbu } from '@/data/types'
import { homeChipIds } from '@/data/publicContext'
import { useApp } from '@/lib/ctx'
import { Bullets, Card, Chip, PublicBadge, Section, T, TeamChip, cn } from '@/components/ui'

const CX = 260, CY = 260, RO = 240, RI = 150
const pt = (r: number, a: number) => [CX + r * Math.cos(a), CY + r * Math.sin(a)]
function arc(i: number, n: number) {
  const gap = 0.035
  const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n + gap
  const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n - gap
  const [x0, y0] = pt(RO, a0), [x1, y1] = pt(RO, a1), [x2, y2] = pt(RI, a1), [x3, y3] = pt(RI, a0)
  return `M${x0},${y0} A${RO},${RO} 0 0 1 ${x1},${y1} L${x2},${y2} A${RI},${RI} 0 0 0 ${x3},${y3} Z`
}

const gbus: Gbu[] = ['Specialty Care', 'Vaccines', 'General Medicines']

export default function Home() {
  const { gbu, setGbu } = useApp()
  const [sp, setSp] = useSearchParams()
  const [hover, setHover] = useState<string | null>(null)
  const selId = sp.get('stage')
  const sel = stages.find((s) => s.id === selId)
  const shown = stages.find((s) => s.id === hover) ?? sel
  const open = (id: string) => setSp({ stage: id })
  const close = () => setSp({})
  const secRef = useRef<HTMLElement>(null)
  useEffect(() => { if (selId) secRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [selId])

  return (
    <div className="space-y-24">
      <section className="mx-auto max-w-4xl text-center">
        <div className="mb-3 text-sm font-semibold text-accent">Commercial Lifecycle Atlas</div>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">One lifecycle.<br /><span className="text-soft">Five stages. Every team.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-soft">How a biopharma commercial organization works, from business development to late lifecycle.</p>
        <div role="radiogroup" aria-label="Business unit" className="mx-auto mt-8 inline-flex rounded-full bg-muted p-1">
          {gbus.map((g) => (
            <button key={g} role="radio" aria-checked={gbu === g} onClick={() => setGbu(g)}
              className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all', gbu === g ? 'bg-surface text-ink shadow-card' : 'text-soft hover:text-ink')}>{g}</button>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] text-soft"><span className="font-semibold text-ink">What’s different here. </span>{gbuNotes[gbu]}</p>
      </section>

      <section aria-label="Lifecycle ring" className="mx-auto w-full max-w-[600px]">
        <svg viewBox="0 0 520 520" role="group" aria-label="Commercial lifecycle ring with five stages" className="w-full">
          {stages.map((s, i) => {
            const mid = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / stages.length
            const [lx, ly] = pt((RO + RI) / 2, mid)
            const active = sel?.id === s.id || hover === s.id
            return (
              <g key={s.id} role="button" tabIndex={0} aria-label={`Stage ${s.num}: ${s.name}. ${s.coreQuestion}`}
                className="cursor-pointer outline-none" onClick={() => open(s.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open(s.id))}
                onMouseEnter={() => setHover(s.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(s.id)} onBlur={() => setHover(null)}>
                <path d={arc(i, stages.length)} className="fill-primary transition-all" style={{ opacity: active ? 1 : 0.2 + i * 0.12 }} />
                <text x={lx} y={ly + 11} textAnchor="middle" className="fill-white text-[34px] font-semibold" style={{ opacity: 1 }}>{s.num}</text>
              </g>
            )
          })}
          <g className="pointer-events-none">
            <foreignObject x={CX - 125} y={CY - 80} width={250} height={160}>
              <div className="flex h-full flex-col items-center justify-center text-center text-ink">
                {shown ? (
                  <>
                    <div className="text-xs font-semibold text-accent">{shown.num}. {shown.name}</div>
                    <div className="mt-1 text-[16px] font-semibold leading-snug">{shown.coreQuestion}</div>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-semibold text-accent">Lifecycle</div>
                    <div className="mt-1 text-[16px] font-semibold leading-snug">Select a stage</div>
                    <div className="mt-2 text-xs text-soft">Late-lifecycle resources are redeployed to new launches ↻</div>
                  </>
                )}
              </div>
            </foreignObject>
          </g>
        </svg>
      </section>

      <section aria-labelledby="stages-h" ref={secRef} className="scroll-mt-20">
        {!sel ? (
          <>
            <div className="mb-8 text-center">
              <h2 id="stages-h" className="text-4xl font-semibold tracking-tight md:text-5xl">Explore the stages.</h2>
              <p className="mt-3 text-xl text-soft">Each one asks a different question and mobilizes different teams.</p>
            </div>
            <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {stages.map((s) => (
                <li key={s.id}>
                  <button onClick={() => open(s.id)} onMouseEnter={() => setHover(s.id)} onMouseLeave={() => setHover(null)}
                    className="group flex h-full min-h-[300px] w-full flex-col rounded-3xl bg-surface p-6 text-left shadow-card transition-transform duration-200 hover:scale-[1.02]">
                    <span className="text-sm font-semibold text-accent">Stage {s.num}</span>
                    <span className="mt-2 text-2xl font-semibold leading-tight">{s.name}</span>
                    <span className="mt-3 flex-1 text-[0.95rem] text-soft">{s.coreQuestion}</span>
                    <span className="mt-4 text-xs text-soft">{s.timeframe}</span>
                    <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                  </button>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <motion.div key={sel.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <button onClick={close} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"><ArrowLeft size={14} />All stages</button>
              <div role="tablist" aria-label="Stage" className="inline-flex rounded-full bg-muted p-1">
                {stages.map((s) => (
                  <button key={s.id} role="tab" aria-selected={s.id === sel.id} onClick={() => open(s.id)}
                    className={cn('rounded-full px-3.5 py-1.5 text-sm font-medium transition-all', s.id === sel.id ? 'bg-surface text-ink shadow-card' : 'text-soft hover:text-ink')}>{s.num}<span className="hidden md:inline"> · {s.name.split(' ')[0].replace('&', '')}</span></button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-surface p-8 shadow-card md:p-14">
              <div className="text-sm font-semibold text-accent">Stage {sel.num} · {sel.timeframe}</div>
              <h2 id="stages-h" className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{sel.name}</h2>
              <p className="mt-4 max-w-3xl text-2xl text-soft md:text-3xl">{sel.coreQuestion}</p>
              <div className="mt-8 flex max-w-3xl flex-wrap items-start gap-3 rounded-2xl bg-accent/10 p-5">
                <Chip tone="accent">In {gbu}</Chip>
                <p className="min-w-0 flex-1 text-[0.95rem]">{sel.gbuLens[gbu]}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <Card className="p-7"><Section title="Typical activities"><Bullets items={sel.typicalActivities} /></Section></Card>
              <Card className="space-y-6 p-7">
                <Section title="Key decisions"><Bullets items={sel.keyDecisions} /></Section>
                <Section title="Analytics asks"><Bullets items={sel.analyticsAsks} /></Section>
              </Card>
              <Card className="space-y-6 p-7">
                <Section title="Lead teams"><div className="flex flex-wrap gap-1.5">{sel.leadTeams.map((t) => <TeamChip key={t} id={t} stage={sel.id} tone="primary" />)}</div></Section>
                <Section title="Support teams"><div className="flex flex-wrap gap-1.5">{sel.supportTeams.map((t) => <TeamChip key={t} id={t} stage={sel.id} />)}</div></Section>
                <Section title="Data used"><div className="flex flex-wrap gap-1.5">{sel.dataUsed.map((d) => <Chip key={d}><T>{d}</T></Chip>)}</div></Section>
              </Card>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-3 md:grid-cols-2">{sel.publicExampleChip.map((id) => <PublicBadge key={id} id={id} />)}</div>
              <Link to={`/teams?stage=${sel.id}`} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white dark:text-bg">See the team map for this stage <ArrowRight size={14} /></Link>
            </div>
          </motion.div>
        )}
      </section>

      <section className="secondary">
        <div className="mb-6 text-center">
          <Chip tone="primary">Public context</Chip>
          <p className="mt-2 text-sm text-soft">Hover the info icon for the source.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {homeChipIds.map((id) => <PublicBadge key={id} id={id} />)}
        </div>
      </section>
    </div>
  )
}
