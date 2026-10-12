import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { learnQuestions } from '@/data/scenes'
import { Card, PageHead, T, cn } from '@/components/ui'

export default function Learn() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mx-auto max-w-4xl">
      <PageHead kicker="Scene 7 · Closing" title="What we’d love to learn from you" sub="Six questions. We would rather learn where this is wrong than pretend it is right." />
      <div className="space-y-3">
        {learnQuestions.map((q, i) => (
          <Card key={i}>
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-start gap-4 p-5 text-left">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">{i + 1}</span>
              <span className="flex-1 text-lg font-medium leading-snug"><T>{q.q}</T></span>
              <ChevronDown className={cn('mt-1 shrink-0 text-soft transition-transform', open === i && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <p className="border-t border-line px-5 py-4 pl-[4.25rem] text-soft"><span className="font-semibold text-accent">Why we’re asking: </span>{q.why}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
      <p className="mt-12 text-center text-lg text-soft">Thank you for your time.</p>
    </div>
  )
}
