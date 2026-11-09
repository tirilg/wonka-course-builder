import type { Step, StepType } from "../types";

// The words trainers see for each step type
export const STEP_TYPE_LABEL: Record<StepType, string> = {
  text: "Text",
  image: "Image",
  multipleChoice: "Question",
};

// The same types as a list, for rendering one button per type
export const STEP_TYPES = Object.keys(STEP_TYPE_LABEL) as StepType[];

// One short line describing a step, shown in the step list
export function getStepSummary(step: Step): string {
  switch (step.type) {
    case "text":
      return step.text.title || "Untitled text";
    case "image":
      return step.image.alt || "No image yet";
    case "multipleChoice":
      return step.multipleChoice.question || "Untitled question";
  }
}
