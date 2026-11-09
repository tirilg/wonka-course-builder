import type { Dispatch } from "react";
import type { Step } from "../../types";
import type { Action } from "../../state/courseReducer";
import { STEP_TYPE_LABEL, getStepSummary } from "../../utils/steps";

type Props = {
  step: Step;
  index: number;
  isLast: boolean;
  isSelected: boolean;
  dispatch: Dispatch<Action>;
};

const actionClass =
  "flex items-center justify-center gap-1 py-3 font-extrabold hover:bg-lavender";

export default function StepListItem({
  step,
  index,
  isLast,
  isSelected,
  dispatch,
}: Props) {
  const number = index + 1;

  return (
    <li
      className={`overflow-hidden rounded-item border-2 bg-white shadow-card ${
        isSelected ? "border-purple" : "border-lavender-line"
      }`}
    >
      <button
        type="button"
        onClick={() => dispatch({ type: "select", id: step.id })}
        aria-current={isSelected ? "step" : undefined}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <GripIcon />

        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple font-heading text-lg font-bold text-white">
          {number}
        </span>

        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-extrabold tracking-wider text-muted uppercase">
            {STEP_TYPE_LABEL[step.type]}
          </span>
          <span className="truncate text-lg font-bold">
            {getStepSummary(step)}
          </span>
        </span>
      </button>

      <div className="grid grid-cols-3 divide-x divide-lavender border-t border-lavender bg-cream">
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "move", from: index, to: index - 1 })
          }
          disabled={index === 0}
          aria-label={`Move step ${number} up`}
          className={`${actionClass} text-purple`}
        >
          <span aria-hidden="true">↑</span> Up
        </button>

        <button
          type="button"
          onClick={() =>
            dispatch({ type: "move", from: index, to: index + 1 })
          }
          disabled={isLast}
          aria-label={`Move step ${number} down`}
          className={`${actionClass} text-purple`}
        >
          <span aria-hidden="true">↓</span> Down
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: "delete", id: step.id })}
          aria-label={`Delete step ${number}`}
          className={`${actionClass} text-danger`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// Six-dot drag handle (decorative for now)
function GripIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 16"
      className="h-4 w-2.5 shrink-0 fill-purple"
    >
      {[2, 8, 14].map((y) =>
        [2, 8].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />),
      )}
    </svg>
  );
}
