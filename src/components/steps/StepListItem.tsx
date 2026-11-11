import { useState, type Dispatch } from "react";
import {
  ArrowDown,
  ArrowUp,
  CircleAlert,
  CircleCheck,
  Copy,
  Trash2,
} from "lucide-react";
import type { Step } from "../../types";
import type { Action } from "../../state/courseReducer";
import { STEP_TYPE_LABEL, getMissing, getStepSummary } from "../../utils/steps";
import DeleteStepModal from "./DeleteStepModal";

type StepsListItemProps = {
  step: Step;
  index: number;
  isLast: boolean;
  isSelected: boolean;
  dispatch: Dispatch<Action>;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
};

// Shared look for the small square icon buttons in the toolbar
const iconButtonClass =
  "flex size-10 items-center justify-center text-purple hover:bg-lavender";

export default function StepListItem({
  step,
  index,
  isLast,
  isSelected,
  dispatch,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: StepsListItemProps) {
  // Display number from 1 instead of 0
  const number = index + 1;

  // True after clicking delete: a popup asks "Are you sure?" first
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Complete shows as soon as you've completed needed inputs
  // Warning shows after you've left the step
  const missing = getMissing(step);
  const isComplete = missing.length === 0;
  const showWarning = !isSelected && !isComplete;

  // Different borders and bg based on state - later lines overwrite, so dragging overrides all other stats
  let borderClass = "border-lavender-line bg-white";
  if (showWarning) borderClass = "border-warning-line bg-warning-soft";
  if (isSelected) borderClass = "border-purple bg-white";
  if (isDragOver) borderClass = "border-purple ring-4 ring-wisteria/50";
  if (isDragging) borderClass = "border-dashed border-wisteria opacity-50";

  return (
    // Browser's built-in drag and drop
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", "");
        onDragStart();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      onDragEnd={onDragEnd}
      // animate-step-in plays once when the card first appears (a new, duplicated
      // or restored step). Moving steps around doesn't replay it.
      className={`animate-step-in shrink-0 overflow-hidden rounded-item border-2 shadow-card transition ${borderClass}`}
    >
      {/* Top row: drag handle, number, type/summary and status icon */}
      <div className="flex items-center gap-3 px-4 py-3">
        <GripIcon />

        {/* Clicking the card selects the step for editing */}
        <button
          type="button"
          onClick={() => dispatch({ type: "select", id: step.id })}
          aria-current={isSelected ? "step" : undefined}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          {/* Step number */}
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple font-heading text-lg font-bold text-white">
            {number}
          </span>

          <span className="flex min-w-0 flex-col">
            {/* Step type */}
            <span className="text-sm font-extrabold tracking-wider text-muted uppercase">
              {STEP_TYPE_LABEL[step.type]}
            </span>
            <span className="truncate text-lg font-bold">
              {getStepSummary(step)}
            </span>
          </span>
        </button>

        {/* Status on the right: mint check when complete, amber "!" when something is missing */}
        {isComplete && (
          <CircleCheck
            role="img"
            aria-label="Step complete"
            className="size-6 shrink-0 fill-mint text-white"
          />
        )}
        {showWarning && (
          <CircleAlert
            role="img"
            aria-label="Step incomplete"
            className="size-6 shrink-0 fill-warning-text text-warning-soft"
          />
        )}
      </div>

      {/* Only the selected step shows its actions */}
      {isSelected && (
        <div className="flex items-center gap-3 border-t border-lavender bg-cream px-4 py-2">
          {/* Up and down buttons */}
          <div className="flex divide-x-2 divide-lavender-line overflow-hidden rounded-button border-2 border-lavender-line bg-white">
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "move", from: index, to: index - 1 })
              }
              disabled={index === 0}
              aria-label={`Move step ${number} up`}
              className={iconButtonClass}
            >
              <ArrowUp aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "move", from: index, to: index + 1 })
              }
              disabled={isLast}
              aria-label={`Move step ${number} down`}
              className={iconButtonClass}
            >
              <ArrowDown aria-hidden="true" className="size-5" />
            </button>
          </div>
          <span aria-hidden="true" className="font-extrabold text-muted">
            Move
          </span>

          {/* Duplicate & delete actions */}
          <button
            type="button"
            onClick={() => dispatch({ type: "duplicate", id: step.id })}
            aria-label={`Duplicate step ${number}`}
            className={`ml-auto rounded-button ${iconButtonClass}`}
          >
            <Copy aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            // Asks first instead of deleting straight away
            onClick={() => setConfirmingDelete(true)}
            aria-label={`Delete step ${number}`}
            className="flex size-10 items-center justify-center rounded-button bg-danger-soft text-danger hover:bg-danger hover:text-white"
          >
            <Trash2 aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}

      {/* Only on the page while it's open */}
      {confirmingDelete && (
        <DeleteStepModal
          summary={getStepSummary(step)}
          onConfirm={() => dispatch({ type: "delete", id: step.id })}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </li>
  );
}

// Six-dot drag handle. Shows that the card can be dragged
function GripIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 16"
      className="h-4 w-2.5 shrink-0 cursor-grab fill-purple"
    >
      {[2, 8, 14].map((y) =>
        [2, 8].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />),
      )}
    </svg>
  );
}
