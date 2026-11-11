import { useState, type Dispatch } from "react";
import type { Step } from "../../types";
import type { Action } from "../../state/courseReducer";
import StepListItem from "./StepListItem";
import AddStepMenu from "./AddStepMenu";

type StepListProps = {
  steps: Step[];
  selectedId: string | null;
  dispatch: Dispatch<Action>;
};

export default function StepList({
  steps,
  selectedId,
  dispatch,
}: StepListProps) {
  // Which step is being dragged, and which step it is hovering over
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Called when a drag ends, whether it was dropped or cancelled
  function resetDrag() {
    setDragIndex(null);
    setOverIndex(null);
  }

  // Move the dragged step to the position it was dropped on
  function handleDrop(to: number) {
    if (dragIndex !== null && dragIndex !== to) {
      dispatch({ type: "move", from: dragIndex, to });
    }
    resetDrag();
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-card bg-white shadow-card">
      {/* Card heading */}
      <div className="flex items-baseline justify-between px-5 pt-5 pb-2">
        <h2 className="text-2xl text-burgundy font-extrabold">Steps</h2>
      </div>

      {/* Shown before any steps have been added */}
      {steps.length === 0 && (
        <div className="mx-4 my-2 flex flex-col items-center gap-1 rounded-item border-2 border-dashed border-lavender-line bg-cream px-4 py-5 text-center">
          <span className="font-heading text-lg font-bold text-purple">
            No steps yet
          </span>
          <span className="max-w-60 text-sm text-balance text-muted">
            Add text, images and questions to build your course.
          </span>
        </div>
      )}

      {/* Container grows with the steps - scrolls once it reaches 60% of the screen height */}
      {steps.length > 0 && (
        <ol className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto px-4 py-2">
          {steps.map((step, i) => (
            <StepListItem
              key={step.id}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              isSelected={step.id === selectedId}
              dispatch={dispatch}
              isDragging={i === dragIndex}
              isDragOver={i === overIndex && i !== dragIndex}
              onDragStart={() => setDragIndex(i)}
              onDragOver={() => setOverIndex(i)}
              onDrop={() => handleDrop(i)}
              onDragEnd={resetDrag}
            />
          ))}
        </ol>
      )}

      {/* Add steps menu */}
      <div className="border-t border-lavender p-4">
        <AddStepMenu dispatch={dispatch} />
      </div>
    </div>
  );
}
