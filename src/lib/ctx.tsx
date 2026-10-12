import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Gbu } from '@/data/types'

interface Ctx {
  presenter: boolean; setPresenter: (v: boolean) => void
  dark: boolean; setDark: (v: boolean) => void
  talk: boolean; setTalk: (v: boolean) => void
  guardrails: boolean; setGuardrails: (v: boolean) => void
  short: boolean; setShort: (v: boolean) => void
  gbu: Gbu; setGbu: (g: Gbu) => void
  resetKey: number; reset: () => void
  toast: string | null; say: (m: string) => void
}
const C = createContext<Ctx>(null as unknown as Ctx)
export const useApp = () => useContext(C)

export function AppProvider({ children }: { children: ReactNode }) {
  const [presenter, setPresenter] = useState(false)
  const [dark, setDark] = useState(false)
  const [talk, setTalk] = useState(false)
  const [guardrails, setGuardrails] = useState(false)
  const [short, setShort] = useState(false)
  const [gbu, setGbu] = useState<Gbu>('Specialty Care')
  const [resetKey, setResetKey] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const say = useCallback((m: string) => setToast(m), [])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 1800); return () => clearTimeout(t) }, [toast])
  useEffect(() => {
    const r = document.documentElement
    r.classList.toggle('dark', dark)
    r.classList.toggle('presenter', presenter)
    r.classList.toggle('guardrails', guardrails)
  }, [dark, presenter, guardrails])
  const reset = useCallback(() => { setResetKey((k) => k + 1); setGbu('Specialty Care'); setTalk(false); setGuardrails(false) }, [])
  return (
    <C.Provider value={{ presenter, setPresenter, dark, setDark, talk, setTalk, guardrails, setGuardrails, short, setShort, gbu, setGbu, resetKey, reset, toast, say }}>
      {children}
    </C.Provider>
  )
}
