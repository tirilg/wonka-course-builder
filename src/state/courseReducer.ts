import type { Choice, Step, StepPatch, StepType } from "../types";

// What the app remembers
export type State = {
  title: string;
  steps: Step[];
  selectedId: string | null;
};

// Every change that is allowed. Components send an action with dispatch(...)
export type Action =
  | { type: "rename"; title: string }
  | { type: "add"; stepType: StepType }
  | { type: "select"; id: string }
  | { type: "update"; id: string; patch: StepPatch }
  | { type: "delete"; id: string }
  | { type: "move"; from: number; to: number };

export const initialState: State = { title: "", steps: [], selectedId: null };

export function createChoice(): Choice {
  return { id: crypto.randomUUID(), text: "" };
}

// A new, empty step
function createStep(type: StepType): Step {
  return {
    id: crypto.randomUUID(),
    type,
    text: { title: "", body: "" },
    image: { url: "", alt: "" },
    multipleChoice: {
      question: "",
      choices: [createChoice(), createChoice()],
      correctChoiceId: null,
    },
  };
}

// Takes the old state + an action and returns a new state.
export function courseReducer(state: State, action: Action): State {
  switch (action.type) {
    case "rename":
      return { ...state, title: action.title };

    case "add": {
      const step = createStep(action.stepType);
      return { ...state, steps: [...state.steps, step], selectedId: step.id };
    }

    case "select":
      return { ...state, selectedId: action.id };

    case "update":
      return {
        ...state,
        steps: state.steps.map((s) =>
          s.id === action.id ? { ...s, ...action.patch } : s,
        ),
      };

    case "delete":
      return {
        ...state,
        steps: state.steps.filter((s) => s.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      };

    case "move": {
      const { from, to } = action;
      if (to < 0 || to >= state.steps.length || from === to) return state;
      const steps = [...state.steps];
      const [moved] = steps.splice(from, 1);
      steps.splice(to, 0, moved);
      return { ...state, steps };
    }
  }
}
