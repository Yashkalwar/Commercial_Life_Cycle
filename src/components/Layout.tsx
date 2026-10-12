import { useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, Sun, Presentation, RotateCcw, MessageSquareQuote, ShieldCheck } from 'lucide-react'
import { useApp } from '@/lib/ctx'
import { scenes, shortPaths } from '@/data/scenes'
import { talkTrack } from '@/data/talkTrack'
import { Drawer, cn } from './ui'

export function Layout() {
  const app = useApp()
  const loc = useLocation()
  const nav = useNavigate()

  const list = useMemo(() => (app.short ? scenes.filter((s) => shortPaths.includes(s.path)) : scenes), [app.short])
  const idx = Math.max(0, list.findIndex((s) => s.path === loc.pathname))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (t && ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return
      const k = e.key.toLowerCase()
      const dialogOpen = !!document.querySelector('[role=dialog]')
      if (k === 'arrowright' || k === 'arrowleft') {
        if (dialogOpen) return
        const cur = list.findIndex((s) => s.path === loc.pathname)
        const n = list[(cur === -1 ? 0 : cur) + (k === 'arrowright' ? 1 : -1)]
        if (n) nav(n.path)
      } else if (k === 'p') app.setPresenter(!app.presenter)
      else if (k === 't') app.setTalk(!app.talk)
      else if (k === 'g') app.setGuardrails(!app.guardrails)
      else if (k === 's') nav('/scenario')
      else if (k === 'm') { app.setShort(!app.short); app.say(app.short ? 'Full mode: 7 scenes' : 'Short mode: 4 scenes') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [list, loc.pathname, app, nav])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="glass sticky top-0 z-30 border-b border-line/50">
        <div className="mx-auto flex h-12 max-w-[1500px] items-center gap-6 px-4 md:px-8">
          <NavLink to="/" className="shrink-0 text-[15px] font-semibold tracking-tight">
            Lifecycle <span className="text-accent">Atlas</span>
          </NavLink>
          <nav aria-label="Scenes" className="secondary hidden flex-1 items-center justify-center gap-1 lg:flex">
            {list.map((s) => (
              <NavLink key={s.path} to={s.path} end className={({ isActive }) => cn('rounded-full px-3 py-1 text-[13px] transition-colors', isActive ? 'bg-ink/10 font-medium text-ink' : 'text-soft hover:text-ink')}>{s.label}</NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            {app.presenter && <span className="mr-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-soft" aria-live="polite">{idx + 1} / {list.length}</span>}
            <IconBtn label="Talk track (T)" on={app.talk} onClick={() => app.setTalk(!app.talk)}><MessageSquareQuote size={16} /></IconBtn>
            <IconBtn label="Guardrails overlay (G)" on={app.guardrails} onClick={() => app.setGuardrails(!app.guardrails)}><ShieldCheck size={16} /></IconBtn>
            <IconBtn label="Reset view" onClick={() => { app.reset(); nav(loc.pathname) }}><RotateCcw size={16} /></IconBtn>
            <IconBtn label="Presenter mode (P)" on={app.presenter} onClick={() => app.setPresenter(!app.presenter)} text="Presenter"><Presentation size={16} /></IconBtn>
            <IconBtn label="Toggle dark mode" onClick={() => app.setDark(!app.dark)}>{app.dark ? <Sun size={16} /> : <Moon size={16} />}</IconBtn>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 pb-28 pt-10 md:px-8 md:pt-14">
        <motion.div key={loc.pathname + app.resetKey} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <Outlet />
        </motion.div>
      </main>

      {app.guardrails && (
        <div className="fixed left-1/2 top-16 z-40 -translate-x-1/2 rounded-full bg-attn px-4 py-1.5 text-xs font-semibold text-black shadow-card">
          Guardrails overlay: dashed outlines mark compliance-sensitive elements (G to hide)
        </div>
      )}
      {app.toast && <div role="status" className="fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-sm text-white shadow-card dark:text-bg">{app.toast}</div>}

      <Minimap list={list} cur={loc.pathname} />
      <footer className="border-t border-line/60 px-4 py-4 pb-16 text-center text-xs text-soft">
        Built from public information and general industry knowledge. Scenario data is illustrative. Not Sanofi data.
      </footer>
      <TalkDrawer path={loc.pathname} />
    </div>
  )
}

function IconBtn({ children, label, onClick, on, text }: { children: React.ReactNode; label: string; onClick: () => void; on?: boolean; text?: string }) {
  return (
    <button onClick={onClick} aria-label={label} aria-pressed={on} title={label}
      className={cn('flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors', on ? 'bg-ink text-bg' : 'text-soft hover:bg-ink/10 hover:text-ink')}>
      {children}{text}
    </button>
  )
}

function Minimap({ list, cur }: { list: typeof scenes; cur: string }) {
  const nav = useNavigate()
  return (
    <nav aria-label="Scene minimap" className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2 glass-s rounded-full px-4 py-2.5 shadow-card">
      <ul className="flex items-center gap-2">
        {list.map((s, i) => (
          <li key={s.path} className="group relative">
            <button onClick={() => nav(s.path)} aria-label={`Scene ${i + 1}: ${s.label}`} aria-current={cur === s.path ? 'page' : undefined}
              className={cn('block h-2.5 rounded-full transition-all', cur === s.path ? 'w-7 bg-accent' : 'w-2.5 bg-line hover:bg-soft')} />
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs text-white group-hover:block group-focus-within:block dark:text-bg">{i + 1}. {s.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function TalkDrawer({ path }: { path: string }) {
  const app = useApp()
  const scene = scenes.find((s) => s.path === path)
  return (
    <Drawer open={app.talk} onClose={() => app.setTalk(false)} title="Talk track" subtitle={scene?.title} width="max-w-md">
      <ul className="space-y-4">
        {(talkTrack[path] ?? []).map((n, i) => (
          <li key={i} className="rounded-xl bg-muted p-4 text-lg leading-snug">{n}</li>
        ))}
      </ul>
      <p className="text-xs text-soft">Shortcuts: P presenter · T talk track · G guardrails · S scenario · M short mode · ←/→ scenes</p>
    </Drawer>
  )
}
