import type { Dispatch } from "react";
import type { Step } from "../../types";
import type { Action } from "../../state/courseReducer";
import StepListItem from "./StepListItem";
import AddStepButtons from "./AddStepButton";

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
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl text-burgundy">Steps</h2>
      <ol className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <StepListItem
            key={step.id}
            step={step}
            index={i}
            isLast={i === steps.length - 1}
            isSelected={step.id === selectedId}
            dispatch={dispatch}
          />
        ))}
      </ol>
      <AddStepButtons dispatch={dispatch} />
    </div>
  );
}
