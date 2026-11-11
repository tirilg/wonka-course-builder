// Three kinds of content a step can hold
export type StepType = "text" | "image" | "multipleChoice";

// Single choice in multiple choice
export type Choice = { id: string; text: string };

// Single step in a course
export type Step = {
  id: string;
  type: StepType;
  text: { title: string; body: string };
  image: { url: string; alt: string };
  multipleChoice: {
    question: string;
    choices: Choice[];
    correctChoiceId: string | null; // null = no correct answer picked yet
  };
};

// The fields of a step that can be changed - make sure id is excluded
export type StepPatch = Partial<Omit<Step, "id">>;
