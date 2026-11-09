import { useReducer } from "react";
import { courseReducer, initialState } from "./state/courseReducer";
import Header from "./components/Header";
import StepList from "./components/steps/StepList";
import StepEditor from "./components/editor/StepEditor";

function App() {
  const [state, dispatch] = useReducer(courseReducer, initialState);
  const selected = state.steps.find((s) => s.id === state.selectedId);

  return (
    <section className="min-h-screen">
      <Header
        title={state.title}
        onTitleChange={(title) => dispatch({ type: "rename", title })}
      />
      <main className="mx-auto flex max-w-[1520px] flex-wrap items-start gap-7 px-8 pt-4 pb-12">
        <aside aria-label="Course steps" className="max-w-sm">
          <StepList
            steps={state.steps}
            selectedId={state.selectedId}
            dispatch={dispatch}
          />
        </aside>
        <section aria-label="Edit step" className="min-w-0 flex-1">
          {selected ? (
            <StepEditor step={selected} dispatch={dispatch} />
          ) : (
            <h2>Add empty state</h2>
          )}
        </section>
      </main>
    </section>
  );
}

export default App;
