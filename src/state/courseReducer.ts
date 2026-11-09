import type { Step, StepType } from '../types';

// State is everything the course editor needs to remember
export type State = {steps: Step[]; selectedId: string | null }

// Every available action that changes the course
export type Action = 
  | { type: 'add'; stepType: StepType }
  | { type: 'update'; id: string; patch: Partial<Step> }
  | { type: 'move'; from: number; to: number }
  | { type: 'delete'; id: string }
  | { type: 'select'; id: string }

// Helper for adding unique id to empty choice
const newChoice = () => ({id: crypto.randomUUID(), text: ''})

// Creates a new, empty step of selected type
export function createStep(type: StepType): Step {
    return {
        id: crypto.randomUUID(),
        type, 
        text: {title: '', body: ''}, 
        image: {url: '', alt: ''},
        multipleChoice: {
            question: '', 
            choices: [newChoice(), newChoice()],
            correctChoiceId: null,
        }
    }
}

// Reducer: takes the current state and an action and returns the new state
export function courseReducer(state: State, action: Action): State {
    switch(action.type) {
        case 'add': {
            const step = createStep(action.stepType)

            //Insert new step right after the selected one (or at the end if none are selected)
            const selectedIndex = state.steps.findIndex(s => s.id === state.selectedId)
            const insertAt = selectedIndex === -1 ? state.steps.length : selectedIndex + 1

            const steps = [...state.steps];
            steps.splice(insertAt, 0, step)

            return {steps, selectedId: step.id}

        }
        // Actions not handled yet: return the state unchanged.
        default:
            return state
    }
}