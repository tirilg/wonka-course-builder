# Wonka Course Editor

A small course editor for trainers at the chocolate factory. You build a course out of steps with different content options (text, images and multiple choice questions). Steps can be created, duplicated, moved and deleted, and simple validation is added to ensure a step is complete. Publish it when every step is complete.

## Getting started

Requires Node.js 20.19+ or 22.12+ (needed by Vite).

```bash
npm install
npm run dev      # start the dev server
```

| Script            | What it does                               |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start Vite with hot reload                 |
| `npm run build`   | Type-check with `tsc` and build to `dist/` |
| `npm run preview` | Serve the production build locally         |
| `npm run lint`    | Lint with Oxlint                           |

## Features

- **Three step types:** text (title + body), image (URL + description, with a
  live preview) and multiple choice (question, answers, one correct answer
  marked with a golden ticket).
- **Manage steps:** add, select, duplicate, delete (with a confirmation modal),
  move up/down with buttons or drag and drop.
- **Undo:** add, duplicate, delete and move can all be undone (last 50 changes).
- **Gentle validation:** a step only shows what's missing after you've left it,
  so you aren't warned about fields you haven't had a chance to fill in yet.
- **Publish check:** the publish button stays disabled and explains why until
  the course has a name and every step is complete.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for dev server and build
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens in `@theme`
- [lucide-react](https://lucide.dev) for icons
- [Oxlint](https://oxc.rs) for linting

## Project structure

```
src/
├── types.ts               # Data model: Step, StepType, Choice, StepPatch
├── state/
│   └── courseReducer.ts   # All state changes + the undo stack
├── utils/
│   ├── steps.ts           # Labels, icons, summaries and validation per step type
│   └── styles.ts          # Shared Tailwind class strings
├── components/
│   ├── Header.tsx         # Course name, undo and publish
│   ├── PublishModal.tsx
│   ├── steps/             # Left column: step list, add menu, delete modal
│   └── editor/            # Right column: one editor per step type + empty state
├── index.css              # Design tokens, fonts and custom utilities
└── App.tsx                # Wires the reducer to the layout
```

## How I used AI

I used AI as a partner during this project, but not as the main architect. I set the structure and design direction first, then used AI to prompt ideas based on the initial structure and vision, as well as to speed up the process so every functionality with proper interaction would fit in the time constraint. I reviewed everything it produced before commiting changes.

**Tools**

- **Claude (chat + Claude Design canvas):** exploring layouts, empty states and
  UX details, and talking through decisions like `useReducer` vs `useState`.
- **Claude Code:** generating components, the Tailwind design tokens, and
  time-consuming visuals like animations and custom SVGs.

**How I worked**

1. **Structure first.** I set up the project, the data model (`types.ts`) and
   the the skeleton of the reducer, so every state change goes through one place.
2. **Design direction.** I chose the colour scheme and visual direction (light,
   purple-led, gold for standout elements). AI turned it into tokens and reusable
   utilities (scalloped header, candy stripes, golden ticket).
3. **One component by hand, then AI from that pattern.** I built `StepList` and
   `StepListItem` myself, then had Claude Code build the rest in the same
   structure.
4. **Clear prompts, reviewed diffs.** Each prompt said what to build, where, what
   not to touch and when it was done. I read every changed file before keeping it.

**Kept, changed and rejected**

- **Kept:** most of the core ideas behind the components, the token setup, the
  animations and the golden ticket. Also kept Claude's idea for managing "Undo" in the app.
- **Changed:**
  - With all steps in one list, "Add step" drifted further down as the course
    grew. I realized at some point it will disappear if there are many steps. I made the list scroll inside its panel and kept "Add step" pinned.
  - Claude suggested using Gold/Amber color for both "correct answer" and "needs attention". I made gold
    only have a positive meaning, and gave unfinished steps their own darker, scheme.
  - Removed more use of colors and visual elements in the design to avoid the list being too busy.
  - Renamed anything unclear, e.g. `mcq` → `multipleChoice`.
- **Rejected:** AI added drag and drop with dnd-kit, which reshaped the code so
  much I no longer recognised it. I chose the browser's built-in drag and drop
  instead: fewer features, but code I fully understand and can explain. With more time I'd revisit dnd-kit
  for smoother touch and screen reader support.
