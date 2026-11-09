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
  return (
    <div className="flex flex-col gap-6 rounded-card bg-white p-8 shadow-card">
      {step.type === "text" && <TextStepEditor />}
      {step.type === "image" && <ImageStepEditor />}
      {step.type === "multipleChoice" && <MultipleChoiceStepEditor />}
    </div>
  );
}
