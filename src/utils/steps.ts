import { AlignLeft, CircleHelp, Image, type LucideIcon } from "lucide-react";
import type { Step, StepType } from "../types";

// The words trainers see for each step type
export const STEP_TYPE_LABEL: Record<StepType, string> = {
  text: "Text",
  image: "Image",
  multipleChoice: "Question",
};

// The icon for each step type
export const STEP_TYPE_ICON: Record<StepType, LucideIcon> = {
  text: AlignLeft,
  image: Image,
  multipleChoice: CircleHelp,
};

// A short hint about what each step type is for
export const STEP_TYPE_HINT: Record<StepType, string> = {
  text: "Explain how it works",
  image: "Show how it looks",
  multipleChoice: "Check they got it",
};

// What you're doing when you edit each step type, shown as the editor heading
export const STEP_TYPE_ACTION: Record<StepType, string> = {
  text: "Write some text",
  image: "Add an image",
  multipleChoice: "Ask a question",
};

// A longer explanation, shown at the top of the editor
export const STEP_TYPE_DESCRIPTION: Record<StepType, string> = {
  text: "Explain a rule or share something learners need to know.",
  image:
    "Show learners what something looks like. Add a description so everyone can follow along.",
  multipleChoice:
    "Check that learners understood. Write a question, add answers and give the right one a golden ticket.",
};

// The same types as a list, for rendering one button per type
export const STEP_TYPES = Object.keys(STEP_TYPE_LABEL) as StepType[];

// One short line describing a step, shown in the step list
export function getStepSummary(step: Step): string {
  switch (step.type) {
    case "text":
      return step.text.title || "Untitled text";
    case "image":
      // The description is the best summary; otherwise say whether there's an image
      if (step.image.alt.trim()) return step.image.alt;
      if (step.image.url.trim()) return "Image without description";
      return "No image yet";
    case "multipleChoice":
      return step.multipleChoice.question || "Untitled question";
  }
}

// What still needs filling in before a step is done. Empty list = complete.
export function getMissing(step: Step): string[] {
  const missing: string[] = [];

  switch (step.type) {
    case "text":
      if (!step.text.title.trim()) missing.push("title");
      if (!step.text.body.trim()) missing.push("text");
      break;

    case "image":
      if (!step.image.url.trim()) missing.push("image");
      if (!step.image.alt.trim()) missing.push("image description");
      break;

    case "multipleChoice": {
      const mc = step.multipleChoice;
      const filledChoices = mc.choices.filter((c) => c.text.trim());
      if (!mc.question.trim()) missing.push("question");
      if (filledChoices.length < 2) missing.push("at least 2 answers");
      if (!mc.correctChoiceId) missing.push("correct answer");
      break;
    }
  }

  return missing;
}

// Checklist before publishing. Returns the first problem it finds as a
// message, or null if there are no problems (the course is ready).
export function getPublishBlocker(title: string, steps: Step[]): string | null {
  if (!title.trim()) return "Add a course name to publish";
  if (steps.length === 0) return "Add a step to publish";

  const unfinished = steps.filter((step) => getMissing(step).length > 0);
  if (unfinished.length === 1) return "1 step needs a look";
  if (unfinished.length > 1) return `${unfinished.length} steps need a look`;

  return null; // no problems: ready to publish
}
