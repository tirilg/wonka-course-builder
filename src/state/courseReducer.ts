// All course data and every way it can change lives here.
// Components never change data directly: they send an action with dispatch(),
// and courseReducer works out the new state.

import type { Choice, Step, StepPatch, StepType } from "../types";

// How to reverse one change. Each one is applied to the course as it is
// now, so undoing never throws away text typed in the meantime.
export type UndoEntry =
  | { kind: "remove"; id: string } // reverses add and duplicate
  | { kind: "restore"; step: Step; index: number } // reverses delete
  | { kind: "move"; from: number; to: number }; // reverses move

// What the app remembers
export type State = {
  title: string;
  steps: Step[];
  selectedId: string | null;
  undoStack: UndoEntry[]; // newest last
  leftIds: string[]; // steps you've been on and then left
};

// Only remember the last 50 changes
const MAX_UNDO = 50;

// Every change that is allowed. Components send an action with dispatch(...)
export type Action =
  | { type: "rename"; title: string }
  | { type: "add"; stepType: StepType }
  | { type: "select"; id: string }
  | { type: "update"; id: string; patch: StepPatch }
  | { type: "delete"; id: string }
  | { type: "duplicate"; id: string }
  | { type: "move"; from: number; to: number }
  | { type: "undo" };

// What the app starts with: an empty, unnamed course
export const initialState: State = {
  title: "",
  steps: [],
  selectedId: null,
  undoStack: [],
  leftIds: [],
};

// A new, empty answer for a question (also used by the question editor)
export function createChoice(): Choice {
  return { id: crypto.randomUUID(), text: "" };
}

// A new, empty step. Questions start with 2 empty answers.
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

// A copy of a step with new ids, so the copy and original stay separate
function copyStep(step: Step): Step {
  const mc = step.multipleChoice;
  const choices = mc.choices.map((c) => ({ ...c, id: crypto.randomUUID() }));
  const correctIndex = mc.choices.findIndex((c) => c.id === mc.correctChoiceId);

  return {
    ...step,
    id: crypto.randomUUID(),
    text: { ...step.text },
    image: { ...step.image },
    multipleChoice: {
      ...mc,
      choices,
      correctChoiceId: choices[correctIndex]?.id ?? null,
    },
  };
}

// Save how to reverse a change, so the undo button can do it later
function pushUndo(state: State, entry: UndoEntry): State {
  return { ...state, undoStack: [...state.undoStack, entry].slice(-MAX_UNDO) };
}

// Remove a step. If it was selected, select the one before it
// (or the new first step, or nothing if the list is now empty).
function removeStep(state: State, id: string): State {
  const index = state.steps.findIndex((s) => s.id === id);
  const steps = state.steps.filter((s) => s.id !== id);

  if (state.selectedId !== id) return { ...state, steps };

  const next = steps[Math.max(index - 1, 0)];
  return { ...state, steps, selectedId: next?.id ?? null };
}

// Move a step from one position to another
function moveStep(state: State, from: number, to: number): State {
  const steps = [...state.steps];
  const [moved] = steps.splice(from, 1);
  steps.splice(to, 0, moved);
  return { ...state, steps };
}

// Takes the old state + an action and returns a new state.
export function courseReducer(state: State, action: Action): State {
  const next = applyAction(state, action);

  // Whenever the selection moves away from a step, remember that you left it.
  // The editor uses this to explain what's missing when you come back.
  const left = state.selectedId;
  if (left && next.selectedId !== left && !next.leftIds.includes(left)) {
    return { ...next, leftIds: [...next.leftIds, left] };
  }
  return next;
}

// Does the actual work for each action
function applyAction(state: State, action: Action): State {
  switch (action.type) {
    // Change the course name
    case "rename":
      return { ...state, title: action.title };

    // Add a new step at the end and select it
    case "add": {
      const step = createStep(action.stepType);
      const next = {
        ...state,
        steps: [...state.steps, step],
        selectedId: step.id,
      };
      return pushUndo(next, { kind: "remove", id: step.id });
    }

    // Start editing a step
    case "select":
      return { ...state, selectedId: action.id };

    // Change some fields of a step (typing, picking the correct answer...).
    // Not undoable, so typing never fills up the undo list.
    case "update":
      return {
        ...state,
        steps: state.steps.map((s) =>
          s.id === action.id ? { ...s, ...action.patch } : s,
        ),
      };

    // Remove a step, remembering where it was so undo can put it back
    case "delete": {
      const index = state.steps.findIndex((s) => s.id === action.id);
      if (index === -1) return state;

      const step = state.steps[index];
      return pushUndo(removeStep(state, action.id), {
        kind: "restore",
        step,
        index,
      });
    }

    // Copy a step, put the copy right after it, and select the copy
    case "duplicate": {
      const index = state.steps.findIndex((s) => s.id === action.id);
      if (index === -1) return state;

      const copy = copyStep(state.steps[index]);
      const steps = [...state.steps];
      steps.splice(index + 1, 0, copy); // put the copy right after the original
      return pushUndo(
        { ...state, steps, selectedId: copy.id },
        { kind: "remove", id: copy.id },
      );
    }

    // Move a step up, down, or to where it was dropped
    case "move": {
      const { from, to } = action;
      if (to < 0 || to >= state.steps.length || from === to) return state;
      return pushUndo(moveStep(state, from, to), {
        kind: "move",
        from: to,
        to: from,
      });
    }

    // Reverse the newest change on the undo stack
    case "undo": {
      const entry = state.undoStack.at(-1);
      if (!entry) return state;

      // Take the entry off the stack, then reverse the change
      const rest = { ...state, undoStack: state.undoStack.slice(0, -1) };

      switch (entry.kind) {
        case "remove":
          return removeStep(rest, entry.id);

        case "restore": {
          // Put the deleted step back where it was, and select it
          const steps = [...rest.steps];
          steps.splice(entry.index, 0, entry.step);
          return { ...rest, steps, selectedId: entry.step.id };
        }

        case "move":
          return moveStep(rest, entry.from, entry.to);
      }
    }
  }
}
