import { useReducer, useState } from "react";
import { courseReducer, initialState } from "./state/courseReducer";
import Header from "./components/Header";
import StepList from "./components/steps/StepList";
import StepEditor from "./components/editor/StepEditor";
import EmptyEditor from "./components/editor/EmptyEditor";
import PublishModal from "./components/PublishModal";

function App() {
  // State holds the course and dispatch sends actions to reducer (add, delete, move)
  const [state, dispatch] = useReducer(courseReducer, initialState);

  // State to decide if the "published" modal should be displayed
  const [showPublished, setShowPublished] = useState(false);

  // Find position of selected step - if nothing is selected it is -1
  const selectedIndex = state.steps.findIndex((s) => s.id === state.selectedId);
  // Get the step itself based on the selected index
  const selected = state.steps[selectedIndex];

  return (
    <section className="min-h-screen">
      <Header
        title={state.title}
        onTitleChange={(title) => dispatch({ type: "rename", title })}
        canUndo={state.undoStack.length > 0}
        onUndo={() => dispatch({ type: "undo" })}
        steps={state.steps}
        onPublish={() => {
          // TODO: save the course somewhere
          console.log("Publishing course", {
            title: state.title,
            steps: state.steps,
          });
          setShowPublished(true);
        }}
      />
      <main className="mx-auto flex max-w-[1520px] flex-wrap items-start gap-7 px-8 pt-10 pb-12">
        <aside aria-label="Course steps" className="w-full sm:w-96">
          <StepList
            steps={state.steps}
            selectedId={state.selectedId}
            dispatch={dispatch}
          />
        </aside>
        <section aria-label="Edit step" className="min-w-0 flex-1">
          {/* Edit the selected step, or show the empty editor component when there are none */}
          {selected ? (
            <StepEditor
              step={selected}
              index={selectedIndex}
              total={state.steps.length}
              hasBeenLeft={state.leftIds.includes(selected.id)}
              dispatch={dispatch}
            />
          ) : (
            <EmptyEditor courseTitle={state.title} dispatch={dispatch} />
          )}
        </section>
      </main>

      {/* Publish modal, only on the page while it's open */}
      {showPublished && (
        <PublishModal
          courseTitle={state.title}
          onClose={() => setShowPublished(false)}
        />
      )}
    </section>
  );
}

export default App;
