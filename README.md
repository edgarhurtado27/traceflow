# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Sugested file structure
src/
│
├── algorithms/
│   ├── recursion/
│   │   ├── factorial.ts
│   │   ├── fibonacci.ts
│   │
│   ├── dfs/
│   │   ├── treeDFS.ts
│   │
│   ├── bfs/
│   │   ├── graphBFS.ts
│   │
│   ├── registry.ts
│   └── types.ts
│
├── engine/
│   ├── ExecutionEngine.ts
│   ├── eventFactory.ts
│   ├── snapshotBuilder.ts
│   ├── types.ts
│   └── utils.ts
│
├── visualizers/
│   ├── recursion/
│   │   ├── RecursionStack.tsx
│   │   ├── FrameCard.tsx
│   │   └── RecursionVisualizer.tsx
│   │
│   ├── graph/
│   │   ├── GraphCanvas.tsx
│   │   ├── BFSVisualizer.tsx
│   │   └── DFSVisualizer.tsx
│
├── editor/
│   ├── CodeEditor.tsx
│   ├── syntaxTheme.ts
│   └── highlight.ts
│
├── store/
│   ├── executionStore.ts
│   └── uiStore.ts
│
├── hooks/
│   ├── useExecution.ts
│   ├── usePlayback.ts
│   └── useStepNavigation.ts
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MainLayout.tsx
│   │
│   ├── controls/
│   │   ├── RunButton.tsx
│   │   ├── NextStepButton.tsx
│   │   ├── Timeline.tsx
│   │   └── PlaybackControls.tsx
│   │
│   └── shared/
│       ├── Panel.tsx
│       ├── Card.tsx
│       └── Badge.tsx
│
├── types/
│   ├── algorithm.ts
│   ├── execution.ts
│   └── visualization.ts
│
├── pages/
│   └── Home.tsx
│
├── App.tsx
└── main.tsx



## Second option
src/

algorithms/
  factorial.ts
  fibonacci.ts

engine/
  ExecutionEngine.ts
  types.ts

store/
  executionStore.ts

components/
  Editor.tsx
  Stack.tsx
  Controls.tsx
