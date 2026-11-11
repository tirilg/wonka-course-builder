import type { Dispatch } from "react";
import type { Step, StepPatch } from "../../types";
import type { Action } from "../../state/courseReducer";
import { getMissing } from "../../utils/steps";
import MissingBanner from "./MissingBanner";
import TextStepEditor from "./TextStepEditor";
import ImageStepEditor from "./ImageStepEditor";
import MultipleChoiceStepEditor from "./MultipleChoiceStepEditor";
import StepTypeToggle from "./StepTypeToggle";

type StepEditorProps = {
  step: Step;
  index: number;
  total: number;
  // True when you've been on this step before and come back to it
  hasBeenLeft: boolean;
  dispatch: Dispatch<Action>;
};

// The editor card on the right: type toggle, the fields for the step's type,
// and a banner if you come back to a step that isn't finished
export default function StepEditor({
  step,
  index,
  total,
  hasBeenLeft,
  dispatch,
}: StepEditorProps) {
  const missing = getMissing(step);

  // Every editor below calls this with the fields it changed
  const onChange = (patch: StepPatch) =>
    dispatch({ type: "update", id: step.id, patch });

  return (
    <div className="flex flex-col gap-8 rounded-card bg-white p-8 shadow-card">
      {/* Only explain what's missing once you've left the step and come back */}
      {hasBeenLeft && missing.length > 0 && <MissingBanner missing={missing} />}

      <StepTypeToggle
        stepId={step.id}
        value={step.type}
        onChange={(type) => onChange({ type })}
      />

      {/* The fields for the chosen type */}
      <section
        aria-label="Content"
        className="flex flex-col gap-4 border-t border-lavender pt-8"
      >
        {step.type === "text" && (
          <TextStepEditor step={step} onChange={onChange} />
        )}
        {step.type === "image" && (
          <ImageStepEditor step={step} onChange={onChange} />
        )}
        {step.type === "multipleChoice" && (
          <MultipleChoiceStepEditor step={step} onChange={onChange} />
        )}
      </section>

      {/* Where you are in the course */}
      {/* pt-6 above the text, and -mb-2 trims the card's 32px bottom padding to 24px,
          so there's the same space above and below the text */}
      <footer className="-mb-2 border-t border-lavender pt-6 text-sm font-bold text-muted">
        Step {index + 1} of {total}
      </footer>
    </div>
  );
}
