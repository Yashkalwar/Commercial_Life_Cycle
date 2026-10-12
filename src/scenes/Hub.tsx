import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ShieldCheck, X } from 'lucide-react'
import * as H from '@/data/hub'
import { Card, Chip, PageHead, T, Bullets, cn } from '@/components/ui'

const audiences = ['Commercial', 'Medical', 'HEVA'] as const

export default function Hub() {
  const [aud, setAud] = useState<(typeof audiences)[number] | null>(null)
  const [flow, setFlow] = useState(0)
  const [lvl, setLvl] = useState(2)
  const list = H.requestTypes.filter((r) => !aud || r.audience.includes(aud))

  return (
    <div>
      <PageHead kicker="Scene 6 · Where an Insights & Analytics hub sits" title="From request to impact"
        sub={H.hubDisclaimer} />

      <Card className="mb-6 p-5">
        <div className="flex flex-col gap-2 xl:flex-row xl:items-stretch" role="list" aria-label="Request-to-impact flow">
          {H.hubFlow.map((s, i) => (
            <div key={s.name} role="listitem" className="flex flex-1 items-center gap-1">
              <button onClick={() => setFlow(i)} aria-pressed={flow === i}
                className={cn('h-full w-full rounded-xl border px-3 py-3 text-left transition-all', flow === i ? 'border-primary bg-primary text-white dark:text-bg' : 'border-line bg-surface hover:border-accent')}>
                <span className={cn('text-[10px] font-semibold uppercase tracking-wider', flow === i ? 'opacity-80' : 'text-accent')}>{i + 1}</span>
                <span className="block text-sm font-semibold leading-tight">{s.name}</span>
              </button>
              {i < H.hubFlow.length - 1 && <ChevronRight size={14} className="hidden shrink-0 text-accent xl:block" />}
            </div>
          ))}
        </div>
        <motion.p key={flow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-lg"><span className="font-semibold">{H.hubFlow[flow].name}:</span> {H.hubFlow[flow].detail}</motion.p>
        <p className="mt-1 text-sm text-soft">Feedback loops into the next request.</p>
      </Card>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Who it serves</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {H.serves.map((s) => (
            <Card key={s.name} className="p-5" {...(s.boundary ? { 'data-guard': '' } : {})}>
              <h3 className="mb-2 text-lg font-semibold">{s.name}</h3>
              <Bullets items={s.asks} />
              {s.boundary && <p className="mt-3 flex gap-2 rounded-lg bg-attn/10 p-2.5 text-sm"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-attn" />{s.boundary}</p>}
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 text-xl font-semibold">Request types</h2>
          {audiences.map((a) => (
            <button key={a} aria-pressed={aud === a} onClick={() => setAud(aud === a ? null : a)} className={cn('rounded-full border px-3 py-1 text-sm', aud === a ? 'border-accent bg-accent/20' : 'border-line bg-surface text-soft hover:border-accent')}>{a}</button>
          ))}
          {aud && <button onClick={() => setAud(null)} className="flex items-center gap-1 text-xs text-accent hover:underline"><X size={12} />Clear</button>}
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {list.map((r) => (
            <motion.div layout key={r.id}>
              <Card className="h-full p-4">
                <h3 className="font-semibold">{r.name}</h3>
                <p className="mt-1 text-sm text-soft">e.g. {r.example}</p>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div><dt className="inline text-xs font-semibold uppercase tracking-wider text-soft">Typical turnaround: </dt><dd className="inline">{r.tier}</dd></div>
                  <div><dt className="inline text-xs font-semibold uppercase tracking-wider text-soft">Reusable asset: </dt><dd className="inline">{r.asset}</dd></div>
                </dl>
                <div className="mt-3 flex flex-wrap gap-1">{r.audience.map((a) => <Chip key={a}>{a}</Chip>)}</div>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-2 text-xs text-soft">Turnaround tiers are typical ranges for an operating model, not commitments.</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="mb-3 text-xl font-semibold">Maturity lens</h2>
          <Card className="p-5">
            <div className="flex items-end gap-2" role="tablist" aria-label="Maturity levels">
              {H.maturity.map((m, i) => (
                <button key={m.name} role="tab" aria-selected={lvl === i} onClick={() => setLvl(i)}
                  className={cn('flex-1 rounded-t-lg border p-2 text-left transition-colors', lvl === i ? 'border-primary bg-primary text-white dark:text-bg' : 'border-line bg-muted hover:border-accent')}
                  style={{ height: 70 + i * 28 }}>
                  <span className="block text-sm font-semibold leading-tight">{m.name}</span>
                  <span className={cn('mt-1 block text-xs', lvl === i ? 'opacity-80' : 'text-soft')}>{m.q}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-accent/10 p-3 font-medium">{H.maturityCallout}</p>
          </Card>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold">Why consistency across business units is hard (and valuable)</h2>
          <Card className="p-5">
            <ul className="space-y-3">
              {H.consistencyPoints.map((p) => <li key={p.name}><div className="font-semibold">{p.name}</div><div className="text-sm text-soft"><T>{p.detail}</T></div></li>)}
            </ul>
          </Card>
        </section>
      </div>
    </div>
  )
}
