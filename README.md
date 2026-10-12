# Commercial Lifecycle Atlas

A click-through, presenter-friendly walkthrough of how a biopharma commercial organization works across the product lifecycle. Understanding showcase only: no pitch, pricing or performance claims. Scenario data is illustrative.

## Run locally

```
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the built app (HashRouter, works from any static host or file server)
```

## Routes (HashRouter)

| Route | Scene |
|---|---|
| `#/` | 1. Ecosystem home (lifecycle ring, GBU toggle, public context) |
| `#/teams` | 2. Team & hand-off map (+ matrix view). Query: `?stage=launch&team=heva` |
| `#/rhythm` | 3. Operating rhythm |
| `#/data` | 4. Data ecosystem (+ "AI assists here") |
| `#/scenario` | 5. Brand LUMEN, launch in flight |
| `#/hub` | 6. Where an Insights & Analytics hub sits |
| `#/learn` | 7. What we'd love to learn from you |

## Data files (`src/data`)

`stages.ts`, `teams.ts` (teams + hand-off edges), `rhythm.ts`, `data.ts`, `scenario.ts`, `hub.ts`, `publicContext.ts`, `talkTrack.ts`, `scenes.ts`, `types.ts`. All screens read from these; no hard-coded content in scenes.

### Add a stage
Add its id to `StageId` in `types.ts`, add an object to `stages` in `stages.ts` (incl. `gbuLens` for each GBU). The ring, matrix, stage pills and map pick it up (the ring divides itself by stage count).

### Add a team
Add its id to `TeamId` in `types.ts`, add an entry to `teams` in `teams.ts`, add it to a stage's `leadTeams`/`supportTeams`, and add `handoffs` edges. Add a short label in `teamShort`.

### Add a hand-off
Append to `handoffs` in `teams.ts` (`from`, `to`, `reason`, `stageIds`, `cadence[]`, `artifact`, optional `guardrail`).

### Add a scenario
Edit `scenario.ts`: `funnel`, `findings`, `decisions`, `swimlanes`, `expectedEffect`. For a second scenario, export another set and parametrise `src/scenes/Scenario.tsx`.

### Update public context
Edit `publicContext.ts` (text + source label). Stage mapping is `publicExampleChip` in `stages.ts`; home chips are `homeChipIds`.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `←` / `→` | Previous / next scene |
| `P` | Presenter mode (larger type, secondary UI hidden, scene counter) |
| `T` | Talk-track drawer |
| `G` | Guardrails overlay (dashed outline on compliance-sensitive items) |
| `S` | Jump to scenario |
| `M` | Short mode (Home → Teams → Scenario → Learn) |
| `Esc` | Close drawer |

The top bar also has a **Reset view** button to restore defaults between runs.

## Constraints honoured
No backend, auth, storage (no localStorage/sessionStorage), network calls, logos, vendor/competitor names or real people names.
