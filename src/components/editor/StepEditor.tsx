import type { Dispatch } from "react";
import type { Step, StepPatch } from "../../types";
import type { Action } from "../../state/courseReducer";
import TextStepEditor from "./TextStepEditor";
import ImageStepEditor from "./ImageStepEditor";
import MultipleChoiceStepEditor from "./MultipleChoiceStepEditor";

type StepEditorProps = {
  step: Step;
  dispatch: Dispatch<Action>;
};

export default function StepEditor({ step, dispatch }: StepEditorProps) {
  const onChange = (patch: StepPatch) =>
    dispatch({ type: "update", id: step.id, patch });
  return (
    <div className="flex flex-col gap-6 rounded-card bg-white p-8 shadow-card">
      {step.type === "text" && (
        <TextStepEditor step={step} onChange={onChange} />
      )}
      {step.type === "image" && (
        <ImageStepEditor step={step} onChange={onChange} />
      )}
      {step.type === "multipleChoice" && (
        <MultipleChoiceStepEditor step={step} onChange={onChange} />
      )}
    </div>
  );
}
