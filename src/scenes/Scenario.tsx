import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { ChevronLeft, ChevronRight, Play, RotateCcw, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as S from '@/data/scenario'
import { teams, teamShort } from '@/data/teams'
import { Bullets, Card, Chip, Drawer, GuardIcon, Illustrative, PageHead, Section, TeamChip, cn } from '@/components/ui'
import type { TeamId } from '@/data/types'

const css = (v: string) => `rgb(var(${v}))`

function MiniBars({ data, unit }: { data: S.ChartPoint[]; unit: string }) {
  return (
    <div className="h-52" role="img" aria-label={`Bar chart in ${unit}`}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 18, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={css('--line')} />
          <XAxis dataKey="name" tick={{ fill: css('--soft'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: css('--soft'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} isAnimationActive>
            {data.map((d, i) => <Cell key={i} fill={d.highlight ? css('--attn') : css('--primary')} />)}
            <LabelList dataKey="value" position="top" fill={css('--ink')} fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function Scenario() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [alt, setAlt] = useState(false)
  const [finding, setFinding] = useState<S.Finding | null>(null)
  const [pos, setPos] = useState<Record<string, number>>(Object.fromEntries(S.decisions.map((d) => [d.id, 2])))
  const [dec, setDec] = useState<S.Decision | null>(null)
  const [runKey, setRunKey] = useState(0)

  useEffect(() => {
    if (!playing) return
    if (step >= S.steps.length - 1) { setPlaying(false); return }
    const t = setTimeout(() => setStep((s) => s + 1), 4200)
    return () => clearTimeout(t)
  }, [playing, step])

  const replay = () => { setStep(0); setRunKey((k) => k + 1); setPos(Object.fromEntries(S.decisions.map((d) => [d.id, 2]))); setPlaying(true) }
  const stepId = S.steps[step].id
  const active = S.stepTeams[stepId]
  const fs = alt ? S.altFindings : S.findings

  const drops = S.funnel.slice(1).map((f, i) => S.funnel[i].value - f.value)
  const maxDrop = drops.indexOf(Math.max(...drops)) + 1
  const funnelData = S.funnel.map((f, i) => ({ ...f, highlight: i === maxDrop }))

  return (
    <div>
      <PageHead kicker="Scene 5 · One story, end to end" title={`${S.scenarioMeta.codename}: ${S.scenarioMeta.title}`}
        sub={S.scenarioMeta.description}
        right={
          <div className="flex flex-wrap items-center gap-2">
            <Illustrative>{S.scenarioMeta.disclaimer}</Illustrative>
            <button onClick={replay} className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white dark:text-bg"><Play size={14} />Replay story</button>
          </div>
        } />

      <ol className="mb-5 grid grid-cols-5 gap-2" aria-label="Story steps">
        {S.steps.map((s, i) => (
          <li key={s.id}>
            <button onClick={() => { setPlaying(false); setStep(i) }} aria-current={i === step ? 'step' : undefined}
              className={cn('w-full rounded-xl border p-3 text-left transition-all', i === step ? 'border-primary bg-primary text-white shadow-card dark:text-bg' : i < step ? 'border-accent/60 bg-accent/10' : 'border-line bg-surface hover:border-accent')}>
              <div className={cn('text-[11px] font-semibold uppercase tracking-wider', i === step ? 'opacity-80' : 'text-accent')}>{i + 1} · {s.day}</div>
              <div className="text-base font-semibold md:text-lg">{s.name}</div>
              <div className={cn('hidden text-xs md:block', i === step ? 'opacity-80' : 'text-soft')}>{s.blurb}</div>
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-5 xl:grid-cols-[1fr_240px]">
        <motion.div key={`${stepId}-${runKey}-${alt}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="min-w-0">
          {stepId === 'signal' && (
            <div className="space-y-4">
              <Card className="border-attn/60 bg-attn/10 p-4 text-lg">{S.scenarioMeta.signal}</Card>
              <div className="grid gap-3 md:grid-cols-3">
                <Kpi label="New patient starts vs forecast" value={`${S.kpis.startsVsForecast}%`} sub={`Gap: ${100 - S.kpis.startsVsForecast} pts below forecast`} warn />
                <Kpi label="Time to start" value={`${S.kpis.timeToStartObserved} wks`} sub={`vs ${S.kpis.timeToStartAssumed} wks assumed in forecast`} warn />
                <Kpi label="Overall funnel conversion" value={`${((S.funnel[5].value / S.funnel[0].value) * 100).toFixed(1)}%`} sub="Target specialists → therapy started" />
              </div>
              <Card className="p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">Launch funnel (illustrative)</h3><Chip tone="attn">Largest drop: {S.funnel[maxDrop - 1].name} → {S.funnel[maxDrop].name} (−{drops[maxDrop - 1]})</Chip></div>
                <div className="h-72" role="img" aria-label="Launch funnel chart">
                  <ResponsiveContainer>
                    <BarChart data={funnelData} layout="vertical" margin={{ left: 10, right: 40 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={170} tick={{ fill: css('--ink'), fontSize: 13 }} axisLine={false} tickLine={false} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                        {funnelData.map((d, i) => <Cell key={i} fill={d.highlight ? css('--attn') : css('--primary')} />)}
                        <LabelList dataKey="value" position="right" fill={css('--ink')} fontSize={13} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-soft">
                  {S.funnel.slice(1).map((f, i) => <span key={f.name} className="rounded-full bg-muted px-2.5 py-1">{S.funnel[i].name} → {f.name}: {((f.value / S.funnel[i].value) * 100).toFixed(0)}%</span>)}
                </div>
              </Card>
            </div>
          )}

          {stepId === 'diagnose' && (
            <div className="space-y-3">
              {alt && <Card className="border-accent/50 bg-accent/10 p-3 text-sm">If this were a large established brand instead, the Monday question is “what moved net sales and share?”. Two alternate findings replace the five launch findings. Illustrative.</Card>}
              <div className="grid gap-3 md:grid-cols-2">
                {fs.map((f, i) => (
                  <motion.button key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} onClick={() => setFinding(f)}
                    data-guard={f.guard ? '' : undefined}
                    className="rounded-xl border border-line bg-surface p-4 text-left shadow-card transition-colors hover:border-accent">
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">Finding {i + 1}{f.guard && <GuardIcon />}</div>
                    <div className="text-lg font-semibold">{f.title}</div>
                    <p className="mt-1 text-[0.95rem] text-soft">{f.headline}</p>
                    <div className="mt-3 flex flex-wrap gap-1">{f.owners.map((o) => <Chip key={o}>{teamShort(o)}</Chip>)}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {stepId === 'decide' && (
            <div className="space-y-4">
              <p className="text-soft">Decision board. Use the arrows on a card to move it across the board as the week progresses. Select a card for trade-offs.</p>
              <div className="grid gap-2 md:grid-cols-5">
                {S.columns.map((c, ci) => (
                  <div key={c} className="min-h-[200px] rounded-xl bg-muted/60 p-2">
                    <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-soft">{c}</div>
                    <div className="space-y-2">
                      {S.decisions.filter((d) => pos[d.id] === ci).map((d) => (
                        <motion.div layout key={d.id} className={cn('rounded-lg border bg-surface p-2.5 text-sm shadow-card', dec?.id === d.id ? 'border-accent' : 'border-line')} data-guard={d.compliance ? '' : undefined}>
                          <button onClick={() => setDec(d)} className="text-left font-medium leading-snug">{d.title}</button>
                          <div className="mt-1 text-xs text-soft">{d.ownerLabel}</div>
                          <div className="mt-2 flex justify-between">
                            <button aria-label="Move left" disabled={ci === 0} onClick={() => setPos({ ...pos, [d.id]: ci - 1 })} className="rounded p-0.5 hover:bg-muted disabled:opacity-30"><ChevronLeft size={16} /></button>
                            {d.compliance && <GuardIcon />}
                            <button aria-label="Move right" disabled={ci === 4} onClick={() => setPos({ ...pos, [d.id]: ci + 1 })} className="rounded p-0.5 hover:bg-muted disabled:opacity-30"><ChevronRight size={16} /></button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {dec && (
                <Card className="p-5">
                  <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold">{dec.title}</h3><Chip tone="accent">Addresses: {dec.addresses}</Chip></div>
                  <div className="mt-2 flex flex-wrap gap-1">{dec.owners.map((o) => <TeamChip key={o} id={o} />)}</div>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <Section title="Trade-offs"><Bullets items={dec.tradeoffs} /></Section>
                    {dec.compliance && <div className="rounded-xl border border-attn/50 bg-attn/10 p-3 text-sm"><div className="mb-1 flex items-center gap-1.5 font-semibold"><ShieldCheck size={15} className="text-attn" />Compliance note</div>{dec.compliance}</div>}
                  </div>
                </Card>
              )}
            </div>
          )}

          {stepId === 'act' && (
            <Card className="overflow-x-auto p-3">
              <div className="min-w-[860px]">
                <div className="grid items-center gap-1 pb-2" style={{ gridTemplateColumns: '150px repeat(10, 1fr)' }}>
                  <div />
                  {S.laneCols.map((c, i) => <div key={c} className={cn('text-center text-xs font-semibold uppercase tracking-wider', i < 5 ? 'text-accent' : 'text-soft')}>{c}</div>)}
                </div>
                {S.swimlanes.map((l, li) => (
                  <div key={l.team} className="grid items-stretch gap-1 border-t border-line py-1" style={{ gridTemplateColumns: '150px repeat(10, 1fr)' }}>
                    <div className="flex items-center text-sm font-medium">{teamShort(l.team)}{l.team === 'medical' && <span className="ml-1"><GuardIcon /></span>}</div>
                    {S.laneCols.map((_, ci) => {
                      const cell = l.cells.find((c) => c.col === ci)
                      return (
                        <div key={ci}>
                          {cell && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: ci * 0.12 + li * 0.04 }}
                              className={cn('h-full rounded-md px-1.5 py-1 text-[11px] leading-tight', ci < 5 ? 'bg-accent/20' : 'bg-primary/15')}>{cell.text}</motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {stepId === 'monitor' && (
            <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <Card className="p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">Expected effect on funnel (≈6 weeks)</h3><Illustrative /></div>
                <div className="h-72" role="img" aria-label="Illustrative expected effect on funnel">
                  <ResponsiveContainer>
                    <BarChart data={S.expectedEffect} margin={{ top: 16, left: -16 }}>
                      <CartesianGrid vertical={false} stroke={css('--line')} />
                      <XAxis dataKey="name" tick={{ fill: css('--soft'), fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: css('--soft'), fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: css('--surface'), border: `1px solid ${css('--line')}`, borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="baseline" name="Current trajectory" fill={css('--soft')} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="scenario" name="Illustrative scenario" fill={css('--accent')} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-1 text-xs text-soft">Illustrative scenario, not a prediction. Fictional numbers.</p>
              </Card>
              <Card className="p-5">
                <h3 className="mb-2 font-semibold">Metrics to watch</h3>
                <Bullets items={S.metricsToWatch} />
                <button onClick={() => { setPlaying(false); setStep(0) }} className="mt-4 flex items-center gap-2 rounded-lg border border-accent px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10"><RotateCcw size={14} />Back to Signal: the loop continues</button>
              </Card>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <button disabled={step === 0} onClick={() => { setPlaying(false); setStep(step - 1) }} className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-sm disabled:opacity-30"><ChevronLeft size={14} />Previous step</button>
            <button disabled={step === 4} onClick={() => { setPlaying(false); setStep(step + 1) }} className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-sm disabled:opacity-30">Next step<ChevronRight size={14} /></button>
          </div>
        </motion.div>

        <aside aria-label="Teams involved" className="secondary">
          <Card className="p-3">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-soft">Teams involved</h3>
            <ul className="space-y-1">
              {teams.map((t) => {
                const on = active.includes(t.id as TeamId)
                return (
                  <li key={t.id}>
                    <Link to={`/teams?team=${t.id}&stage=launch`} className={cn('flex items-center gap-2 rounded-lg px-2 py-1 text-xs transition-all', on ? 'bg-accent/20 font-semibold text-ink' : 'text-soft/60 hover:text-ink')}>
                      <span className={cn('h-2 w-2 rounded-full', on ? 'bg-accent' : 'bg-line')} />{teamShort(t.id)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Card>
          <label className="mt-3 flex cursor-pointer items-start gap-2 rounded-xl border border-line bg-surface p-3 text-xs">
            <input type="checkbox" checked={alt} onChange={(e) => { setAlt(e.target.checked); setStep(1) }} className="mt-0.5 h-4 w-4 accent-[rgb(var(--accent))]" />
            <span><span className="font-semibold">If this were a large established brand instead…</span><br />Swaps in price-volume-mix / gross-to-net and share-shift findings.</span>
          </label>
        </aside>
      </div>

      <Drawer open={!!finding} onClose={() => setFinding(null)} title={finding?.title ?? ''} subtitle={finding?.headline}>
        {finding && (
          <>
            <Illustrative>Illustrative, fictional data</Illustrative>
            <p>{finding.detail}</p>
            <Section title={finding.chartTitle}><MiniBars data={finding.chart} unit={finding.unit} /></Section>
            <Section title="Who owns the fix"><div className="flex flex-wrap gap-1.5">{finding.owners.map((o) => <TeamChip key={o} id={o} stage="launch" tone="primary" />)}</div><p data-guard={finding.guard ? '' : undefined} className="mt-2 text-sm text-soft">{finding.ownerNote}</p></Section>
            <Section title="What we’d need from the data"><Bullets items={finding.dataNeeds} /></Section>
            {finding.guard && <p className="rounded-xl border border-attn/50 bg-attn/10 p-3 text-sm">Medical education stays non-promotional; any commercial activity follows approved materials and compliance guardrails.</p>}
          </>
        )}
      </Drawer>
    </div>
  )
}

function Kpi({ label, value, sub, warn }: { label: string; value: string; sub: string; warn?: boolean }) {
  return (
    <Card className={cn('p-4', warn && 'border-attn/60')}>
      <div className="text-xs font-semibold uppercase tracking-wider text-soft">{label}</div>
      <div className={cn('mt-1 text-4xl font-semibold', warn ? 'text-attn' : 'text-primary')}>{value}</div>
      <div className="text-sm text-soft">{sub}</div>
    </Card>
  )
}
