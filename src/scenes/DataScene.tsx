import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react'
import { dataNodes, aiUseCases, qualityGates, AI_LABEL, type DataNode } from '@/data/data'
import { Bullets, Card, Chip, Drawer, PageHead, Section, T, cn } from '@/components/ui'

export default function DataScene() {
  const [ai, setAi] = useState(false)
  const [sel, setSel] = useState<DataNode | null>(null)
  const [gate, setGate] = useState<string | null>(null)
  const node = (id: string) => dataNodes.find((n) => n.id === id)!
  const aiFor = (n: DataNode) => aiUseCases.filter((a) => a.node === n.id)

  const Node = ({ id, i, children }: { id: string; i: number; children?: React.ReactNode }) => {
    const n = node(id)
    const uc = aiFor(n)
    return (
      <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
        onClick={() => setSel(n)} aria-label={`${n.title}: open details`}
        className={cn('flex h-full w-full flex-col rounded-xl border bg-surface p-4 text-left shadow-card transition-all hover:border-accent', ai && uc.length ? 'border-accent ring-2 ring-accent/30' : 'border-line')}>
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">{n.subtitle}</span>
        <span className="mt-0.5 text-lg font-semibold leading-tight">{n.title}</span>
        {children}
        {ai && uc.length > 0 && (
          <span className="mt-3 flex flex-col gap-1.5">
            {uc.map((a) => (
              <span key={a.id} className="flex items-start gap-1.5 rounded-lg bg-accent/15 px-2 py-1 text-xs font-medium"><Sparkles size={12} className="mt-0.5 shrink-0 text-accent" />{a.name}</span>
            ))}
          </span>
        )}
      </motion.button>
    )
  }
  const Arrow = () => <ChevronRight className="hidden shrink-0 self-center text-accent xl:block" />
  const items = (id: string) => <span className="mt-2 flex flex-wrap gap-1">{node(id).items.slice(0, 5).map((x) => <Chip key={x}>{x}</Chip>)}{node(id).items.length > 5 && <Chip>+{node(id).items.length - 5}</Chip>}</span>

  return (
    <div>
      <PageHead kicker="Scene 4 · Data ecosystem" title="From data to decision to action, and back to data"
        sub="Click any node for examples and the pitfalls we expect to meet there."
        right={
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium">
            <input type="checkbox" checked={ai} onChange={(e) => setAi(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--accent))]" />
            <Sparkles size={16} className="text-accent" /> AI assists here
          </label>
        } />

      {ai && <p className="mb-4 rounded-xl bg-accent/10 p-3 text-sm"><span className="font-semibold">{AI_LABEL}</span>. Each highlighted use case supports a person; it does not replace their judgement.</p>}

      <div className="flex flex-col gap-3 xl:flex-row xl:items-stretch">
        <div className="flex flex-col gap-3 xl:w-[22%]">
          {Node({ id: 'internal', i: 0, children: items('internal') })}
          {Node({ id: 'external', i: 1, children: items('external') })}
        </div>
        <Arrow />
        <div className="xl:w-[14%]">{Node({ id: 'ingestion', i: 2 })}</div>
        <Arrow />
        <div className="xl:w-[14%]">{Node({ id: 'master', i: 3 })}</div>
        <Arrow />
        <div className="xl:w-[14%]">{Node({ id: 'analytics', i: 4 })}</div>
        <Arrow />
        <div className="xl:w-[12%]">{Node({ id: 'insight', i: 5 })}</div>
        <Arrow />
        <div className="xl:w-[12%]">{Node({ id: 'decision', i: 6 })}</div>
        <Arrow />
        <div className="xl:w-[12%]">{Node({ id: 'action', i: 7 })}</div>
      </div>

      <div className="relative mt-4 flex items-center gap-3 rounded-xl border border-dashed border-accent/60 px-4 py-2.5 text-sm text-soft">
        <RotateCcw size={16} className="text-accent" />
        <span><span className="font-semibold text-ink">New data</span> — every action (a call, an email, an approval, a patient start) creates new data that flows back to the sources.</span>
        <motion.span className="ml-auto h-1.5 w-16 rounded-full bg-accent/60" animate={{ x: [0, -24, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} aria-hidden />
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-soft">Quality gates</h2>
        <div className="flex flex-wrap gap-2">
          {qualityGates.map((g) => (
            <button key={g.id} onClick={() => setGate(gate === g.id ? null : g.id)} aria-pressed={gate === g.id}
              className={cn('rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors', gate === g.id ? 'border-primary bg-primary text-white dark:text-bg' : 'border-line bg-surface hover:border-accent')}>{g.name}</button>
          ))}
        </div>
        {gate && <p className="mt-3 text-soft">{qualityGates.find((g) => g.id === gate)!.detail}</p>}
      </section>

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.title ?? ''} subtitle={sel?.subtitle}>
        {sel && (
          <>
            <Section title="What lives here"><div className="flex flex-wrap gap-1.5">{sel.items.map((x) => <Chip key={x}><T>{x}</T></Chip>)}</div></Section>
            <Section title="Examples"><Bullets items={sel.examples} /></Section>
            <Section title="Common pitfalls"><Bullets items={sel.pitfalls} /></Section>
            <Section title="Quality gates that matter here"><div className="flex flex-wrap gap-1.5">{qualityGates.map((g) => <Chip key={g.id} tone="primary">{g.name}</Chip>)}</div></Section>
            {aiFor(sel).length > 0 && (
              <Section title="AI assists here">
                <ul className="space-y-2">{aiFor(sel).map((a) => <li key={a.id} className="rounded-xl bg-accent/10 p-3"><div className="font-medium">{a.name}</div><div className="text-xs text-soft">{AI_LABEL}</div></li>)}</ul>
              </Section>
            )}
          </>
        )}
      </Drawer>
    </div>
  )
}
