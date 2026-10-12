import { Fragment, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShieldCheck, X } from 'lucide-react'
import { stages } from '@/data/stages'
import { teams, handoffs, teamShort, worksWith, roleOf } from '@/data/teams'
import type { Cadence, Handoff, StageId, Team, TeamId, TeamType } from '@/data/types'
import { useApp } from '@/lib/ctx'
import { Bullets, CadenceChip, Card, Chip, Drawer, GuardIcon, PageHead, Section, T, TypeChip, cn } from '@/components/ui'

const types: TeamType[] = ['Customer-facing', 'Product', 'Business', 'Data & AI']
const cadences: Cadence[] = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Event-driven', 'Continuous']
const order = types.flatMap((t) => teams.filter((x) => x.type === t))

const W = 900, H = 620
const pos = Object.fromEntries(order.map((t, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / order.length
  return [t.id, { x: W / 2 + 330 * Math.cos(a), y: H / 2 + 235 * Math.sin(a) }]
})) as Record<TeamId, { x: number; y: number }>

const nodeLabel = (id: TeamId) => teamShort(id)

export default function Teams() {
  const app = useApp()
  const [sp, setSp] = useSearchParams()
  const stageId = (sp.get('stage') as StageId) || 'launch'
  const teamId = sp.get('team') as TeamId | null
  const [tab, setTab] = useState<'map' | 'matrix'>('map')
  const [cad, setCad] = useState<Cadence[]>([])
  const [guard, setGuard] = useState(false)
  const [edge, setEdge] = useState<Handoff | null>(null)

  const stage = stages.find((s) => s.id === stageId)!
  const setStage = (id: StageId) => { const n = new URLSearchParams(sp); n.set('stage', id); setSp(n) }
  const setTeam = (id: TeamId | null) => { const n = new URLSearchParams(sp); id ? n.set('team', id) : n.delete('team'); setSp(n) }
  const showGuard = guard || app.guardrails

  const edges = useMemo(() => handoffs.filter((h) => h.stageIds.includes(stageId) && (cad.length === 0 || h.cadence.some((c) => cad.includes(c)))), [stageId, cad])
  const team = teamId ? teams.find((t) => t.id === teamId) ?? null : null

  return (
    <div>
      <PageHead kicker="Scene 2 · Teams & hand-offs" title="Who works with whom, for what, at which stage"
        sub="The interesting part is not the org chart: it is the hand-offs and who waits for whom." />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div role="tablist" className="flex rounded-xl border border-line bg-surface p-1">
          {(['map', 'matrix'] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn('rounded-lg px-4 py-1.5 text-sm font-medium capitalize', tab === t ? 'bg-primary text-white dark:text-bg' : 'text-soft hover:text-ink')}>{t === 'map' ? 'Hand-off map' : 'Matrix view'}</button>
          ))}
        </div>
        {tab === 'map' && (
          <>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Stage">
              {stages.map((s) => (
                <button key={s.id} onClick={() => setStage(s.id)} aria-pressed={s.id === stageId}
                  className={cn('rounded-full border px-3 py-1 text-sm', s.id === stageId ? 'border-primary bg-primary text-white dark:text-bg' : 'border-line bg-surface text-soft hover:border-accent')}>{s.num}. {s.name}</button>
              ))}
            </div>
          </>
        )}
      </div>

      {tab === 'map' && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-soft">Cadence</span>
          {cadences.map((c) => (
            <button key={c} aria-pressed={cad.includes(c)} onClick={() => setCad(cad.includes(c) ? cad.filter((x) => x !== c) : [...cad, c])}
              className={cn('rounded-full border px-2.5 py-0.5 text-xs font-medium', cad.includes(c) ? 'border-accent bg-accent/20 text-ink' : 'border-line bg-surface text-soft hover:border-accent')}>{c}</button>
          ))}
          {cad.length > 0 && <button onClick={() => setCad([])} className="flex items-center gap-1 text-xs text-accent hover:underline"><X size={12} />Clear</button>}
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={showGuard} onChange={(e) => setGuard(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--accent))]" />
            <ShieldCheck size={16} className="text-attn" /> Show compliance guardrails
          </label>
        </div>
      )}

      {tab === 'map' ? (
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="secondary space-y-4 lg:max-h-[680px] lg:overflow-y-auto lg:pr-1">
            {types.map((t) => (
              <div key={t}>
                <div className="mb-1.5"><TypeChip t={t} /></div>
                <div className="space-y-1.5">
                  {teams.filter((x) => x.type === t).map((x) => {
                    const r = roleOf(x.id, stageId)
                    return (
                      <button key={x.id} onClick={() => setTeam(x.id)} data-guard={x.id === 'medical' || x.id === 'compliance' ? '' : undefined}
                        className={cn('flex w-full items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-left text-sm transition-colors hover:border-accent', teamId === x.id ? 'border-accent' : 'border-line', !r && 'opacity-50')}>
                        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', r === 'Lead' ? 'bg-primary' : r === 'Support' ? 'bg-accent' : r === 'Consulted' ? 'border-2 border-soft' : 'bg-line')} />
                        <span className="flex-1 font-medium">{x.name}</span>
                        {x.boundaryNote && showGuard && <GuardIcon />}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </aside>

          <Card className="relative overflow-hidden p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="group" aria-label={`Hand-off network for ${stage.name}`}>
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="rgb(var(--soft))" /></marker>
                <marker id="arrg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="rgb(var(--attn))" /></marker>
              </defs>
              <text x={W / 2} y={H / 2 - 8} textAnchor="middle" className="fill-ink text-[18px] font-semibold">{stage.name}</text>
              <text x={W / 2} y={H / 2 + 14} textAnchor="middle" className="fill-soft text-[12px]">{edges.length} hand-offs shown · click a line or a team</text>
              {edges.map((h) => {
                const a = pos[h.from], b = pos[h.to]
                const g = h.guardrail && showGuard
                const dim = teamId && h.from !== teamId && h.to !== teamId
                const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy)
                const ex = b.x - (dx / len) * 52, ey = b.y - (dy / len) * 22
                const sx = a.x + (dx / len) * 20, sy = a.y + (dy / len) * 14
                return (
                  <g key={h.id} role="button" tabIndex={0} aria-label={`Hand-off from ${nodeLabel(h.from)} to ${nodeLabel(h.to)}: ${h.reason}`}
                    className="cursor-pointer" onClick={() => setEdge(h)} onKeyDown={(e) => e.key === 'Enter' && setEdge(h)} style={{ opacity: dim ? 0.12 : 1 }}>
                    <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="transparent" strokeWidth={14} />
                    <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={g ? 'rgb(var(--attn))' : 'rgb(var(--soft))'} strokeOpacity={g ? 1 : 0.55} strokeWidth={g ? 2.5 : 1.5} strokeDasharray={g ? '6 4' : undefined} markerEnd={g ? 'url(#arrg)' : 'url(#arr)'} />
                  </g>
                )
              })}
              {order.map((t) => {
                const r = roleOf(t.id, stageId)
                const p = pos[t.id]
                const sel = teamId === t.id
                const hasB = !!t.boundaryNote && showGuard
                return (
                  <g key={t.id} role="button" tabIndex={0} aria-label={`${t.name}: ${r ?? 'not involved'} at ${stage.name}`}
                    className="cursor-pointer" onClick={() => setTeam(t.id)} onKeyDown={(e) => e.key === 'Enter' && setTeam(t.id)} style={{ opacity: r ? 1 : 0.35 }}>
                    <rect x={p.x - 62} y={p.y - 20} width={124} height={40} rx={10}
                      className={cn(r === 'Lead' ? 'fill-primary' : 'fill-surface', sel && 'stroke-accent')} stroke={sel ? 'rgb(var(--accent))' : r === 'Support' ? 'rgb(var(--accent))' : 'rgb(var(--line))'} strokeWidth={sel ? 3 : 1.5} />
                    <foreignObject x={p.x - 60} y={p.y - 19} width={120} height={38} className="pointer-events-none">
                      <div className={cn('flex h-full items-center justify-center px-1 text-center text-[11px] font-semibold leading-tight', r === 'Lead' ? 'text-white dark:text-bg' : 'text-ink')}>{nodeLabel(t.id)}</div>
                    </foreignObject>
                    {hasB && <circle cx={p.x + 62} cy={p.y - 20} r={9} fill="rgb(var(--attn))" />}
                  </g>
                )
              })}
            </svg>
            <div className="flex flex-wrap items-center gap-4 border-t border-line px-3 py-2 text-xs text-soft">
              <Legend swatch="bg-primary" label="Lead" /><Legend swatch="bg-accent" label="Support" /><Legend swatch="border-2 border-soft" label="Consulted" /><Legend swatch="bg-line" label="Not involved" />
              <span>Arrow = who gives to whom</span>
            </div>
          </Card>
        </div>
      ) : (
        <Matrix onPick={setTeam} />
      )}

      <Drawer open={!!team} onClose={() => setTeam(null)} title={team?.name ?? ''} subtitle={team && <div className="flex items-center gap-2"><TypeChip t={team.type} />{team.boundaryNote && <GuardIcon />}</div>}>
        {team && <TeamDetail team={team} stage={stageId} onEdge={setEdge} />}
      </Drawer>
      <Drawer open={!!edge} onClose={() => setEdge(null)} width="max-w-md" title={edge ? `${teamShort(edge.from)} → ${teamShort(edge.to)}` : ''} subtitle={edge?.guardrail && <span className="flex items-center gap-1 text-attn"><ShieldCheck size={14} />Compliance guardrail applies</span>}>
        {edge && (
          <>
            <Card className="p-4 text-lg">“<T>{edge.reason}</T>”</Card>
            <Section title="Example artifact"><Chip tone="primary">{edge.artifact}</Chip></Section>
            <Section title="Cadence"><div className="flex flex-wrap gap-1.5">{edge.cadence.map((c) => <CadenceChip key={c} c={c} />)}</div></Section>
            <Section title="Stages"><div className="flex flex-wrap gap-1.5">{edge.stageIds.map((s) => <Chip key={s}>{stages.find((x) => x.id === s)!.name}</Chip>)}</div></Section>
            {edge.guardrail && <p className="rounded-xl border border-attn/50 bg-attn/10 p-3 text-sm">This exchange follows compliance guardrails. Medical Affairs remains non-promotional and independent from promotional activity.</p>}
          </>
        )}
      </Drawer>
    </div>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return <span className="flex items-center gap-1.5"><span className={cn('h-2.5 w-2.5 rounded-full', swatch)} />{label}</span>
}

function TeamDetail({ team, stage, onEdge }: { team: Team; stage: StageId; onEdge: (h: Handoff) => void }) {
  const { receivesFrom, givesTo } = worksWith(team.id)
  const row = (h: Handoff, other: TeamId) => (
    <button key={h.id} onClick={() => onEdge(h)} className={cn('w-full rounded-lg border border-line p-3 text-left hover:border-accent', !h.stageIds.includes(stage) && 'opacity-60')}>
      <div className="flex items-center gap-2 font-medium">{teamShort(other)} {h.guardrail && <GuardIcon />}</div>
      <div className="text-sm text-soft"><T>{h.reason}</T></div>
      <div className="mt-1.5 flex flex-wrap gap-1">{h.cadence.map((c) => <CadenceChip key={c} c={c} />)}</div>
    </button>
  )
  return (
    <>
      <p className="text-lg">{team.purpose}</p>
      {team.boundaryNote && <p data-guard className="flex gap-2 rounded-xl border border-attn/50 bg-attn/10 p-3 text-sm"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-attn" />{team.boundaryNote}</p>}
      <Section title="Key questions"><Bullets items={team.keyQuestions} /></Section>
      <Section title="Typical tasks"><Bullets items={team.typicalTasks} /></Section>
      <Section title="Deliverables"><Bullets items={team.deliverables} /></Section>
      <Section title="KPIs"><div className="flex flex-wrap gap-1.5">{team.kpis.map((k) => <Chip key={k}>{k}</Chip>)}</div></Section>
      <Section title="Receives from"><div className="space-y-2">{receivesFrom.length ? receivesFrom.map((h) => row(h, h.from)) : <p className="text-sm text-soft">No inbound hand-offs modelled.</p>}</div></Section>
      <Section title="Gives to"><div className="space-y-2">{givesTo.length ? givesTo.map((h) => row(h, h.to)) : <p className="text-sm text-soft">No outbound hand-offs modelled.</p>}</div></Section>
      <p className="text-xs text-soft">Dimmed hand-offs do not apply at the currently selected stage.</p>
    </>
  )
}

function Matrix({ onPick }: { onPick: (id: TeamId) => void }) {
  const dot = (r: ReturnType<typeof roleOf>) => (
    <span className={cn('mx-auto block h-3.5 w-3.5 rounded-full', r === 'Lead' ? 'bg-primary' : r === 'Support' ? 'bg-accent' : r === 'Consulted' ? 'border-2 border-soft' : 'bg-line/60')} aria-label={r ?? 'Not involved'} />
  )
  return (
    <Card className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="p-3">Team</th>
            {stages.map((s) => <th key={s.id} className="p-3 text-center font-semibold">{s.num}. {s.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {types.map((ty) => (
            <Fragment key={ty}>
              <tr className="bg-muted/60"><td colSpan={6} className="px-3 py-1.5"><TypeChip t={ty} /></td></tr>
              {teams.filter((t) => t.type === ty).map((t) => (
                <tr key={t.id} className="border-b border-line/60 hover:bg-muted/40">
                  <td className="p-3"><button onClick={() => onPick(t.id)} className="text-left font-medium hover:text-accent">{t.name}</button></td>
                  {stages.map((s) => <td key={s.id} className="p-3">{dot(roleOf(t.id, s.id))}</td>)}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-5 border-t border-line p-3 text-xs text-soft">
        <Legend swatch="bg-primary" label="Lead" /><Legend swatch="bg-accent" label="Support" /><Legend swatch="border-2 border-soft" label="Consulted (appears in hand-offs)" /><Legend swatch="bg-line" label="Not involved" />
      </div>
    </Card>
  )
}
