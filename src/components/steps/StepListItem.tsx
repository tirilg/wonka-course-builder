import type { Dispatch } from "react";
import type { Step } from "../../types";
import type { Action } from "../../state/courseReducer";
import { STEP_TYPE_LABEL, getStepSummary } from "../../utils/steps";

type StepListItemProps = {
  step: Step;
  index: number;
  isSelected: boolean;
  dispatch: Dispatch<Action>;
};
export default function StepListItem({
  step,
  index,
  isSelected,
  dispatch,
}: StepListItemProps) {
  return (
    <li
      className={`flex items-center gap-2 rounded-item border-2 bg-white p-3 ${
        isSelected ? "border-purple" : "border-lavender"
      }`}
    >
      <button
        type="button"
        onClick={() => dispatch({ type: "select", id: step.id })}
        aria-current={isSelected ? "step" : undefined}
        className="flex min-w-0 flex-1 flex-col text-left"
      >
        <span className="text-xs font-extrabold text-muted uppercase">
          {index + 1}. {STEP_TYPE_LABEL[step.type]}
        </span>
        <span className="truncate font-bold">{getStepSummary(step)}</span>
      </button>
    </li>
  );
}
