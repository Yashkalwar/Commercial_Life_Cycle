import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AppProvider } from '@/lib/ctx'
import { Layout } from '@/components/Layout'
import Home from '@/scenes/Home'
import Teams from '@/scenes/Teams'
import Rhythm from '@/scenes/Rhythm'
import DataScene from '@/scenes/DataScene'
import Scenario from '@/scenes/Scenario'
import Hub from '@/scenes/Hub'
import Learn from '@/scenes/Learn'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/rhythm" element={<Rhythm />} />
            <Route path="/data" element={<DataScene />} />
            <Route path="/scenario" element={<Scenario />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  </React.StrictMode>,
)
