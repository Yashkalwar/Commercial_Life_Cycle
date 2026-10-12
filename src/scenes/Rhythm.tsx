import { useState } from 'react'
import { motion } from 'framer-motion'
import { rhythm, weekDays, mondayStory } from '@/data/rhythm'
import { Bullets, Card, Chip, PageHead, Section, T, TeamChip, cn } from '@/components/ui'

export default function Rhythm() {
  const [sel, setSel] = useState<string>('Weekly')
  const cur = rhythm.find((r) => r.cadence === sel)!

  return (
    <div>
      <PageHead kicker="Scene 3 · Operating rhythm" title="Day, week, month, quarter, year"
        sub="Every team runs on a cadence. The weekly loop is the heartbeat of an in-market brand." />

      <div className="relative mb-6 flex items-stretch gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Cadence">
        {rhythm.map((r, i) => (
          <button key={r.cadence} role="tab" aria-selected={sel === r.cadence} onClick={() => setSel(r.cadence)}
            className={cn('relative min-w-[150px] flex-1 rounded-xl border p-4 text-left transition-all', sel === r.cadence ? 'border-primary bg-primary text-white shadow-card dark:text-bg' : 'border-line bg-surface hover:border-accent')}>
            <div className={cn('text-xs font-semibold uppercase tracking-wider', sel === r.cadence ? 'opacity-80' : 'text-accent')}>{i + 1}</div>
            <div className="text-lg font-semibold">{r.cadence}</div>
            <div className={cn('mt-0.5 text-xs', sel === r.cadence ? 'opacity-80' : 'text-soft')}>{r.headline}</div>
          </button>
        ))}
      </div>

      <motion.div key={sel} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2"><Chip tone="accent">{cur.cadence}</Chip><h2 className="text-xl font-semibold">{cur.headline}</h2></div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Section title="Audience"><Bullets items={cur.audience} /></Section>
            <Section title="Inputs"><Bullets items={cur.inputs} /></Section>
            <Section title="Outputs"><Bullets items={cur.outputs} /></Section>
            <Section title="Typical questions"><Bullets items={cur.typicalQuestions} /></Section>
          </div>
          {cur.cadence !== 'Weekly' && <div className="mt-5"><Section title="What happens"><Bullets items={cur.summary} /></Section></div>}
          <div className="mt-5 rounded-xl bg-accent/10 p-4"><span className="text-xs font-semibold uppercase tracking-wider text-accent">Analytics involvement</span><p className="mt-1">{cur.analyticsInvolvement}</p></div>
        </Card>

        {cur.cadence === 'Weekly' && (
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {weekDays.map((d, i) => (
              <motion.div key={d.day} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className="h-full p-4">
                  <div className="mb-1 flex items-center justify-between"><span className="text-sm font-bold text-accent">{d.day}</span>{i < 4 && <span className="hidden text-soft md:block">→</span>}</div>
                  <div className="font-semibold">{d.title}</div>
                  <p className="mt-1 text-sm text-soft">{d.detail}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <section className="secondary mt-10">
        <h2 className="mb-1 text-2xl font-semibold">A Monday morning for a Brand Lead</h2>
        <p className="mb-4 text-soft">Illustrative, told from the role’s point of view.</p>
        <ol className="grid gap-3 md:grid-cols-5">
          {mondayStory.map((s) => (
            <li key={s.step}>
              <Card className="flex h-full flex-col p-4">
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white dark:text-bg">{s.step}</span>
                <p className="flex-1 text-[0.95rem]"><T>{s.text}</T></p>
                <div className="mt-3 flex flex-wrap gap-1">{s.teams.map((t) => <TeamChip key={t} id={t} />)}</div>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
