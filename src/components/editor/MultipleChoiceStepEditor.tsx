import { X } from "lucide-react";
import type { Step, StepPatch } from "../../types";
import { createChoice } from "../../state/courseReducer";
import { fieldClass, labelClass } from "../../utils/styles";
import GoldenTicketButton from "./GoldenTicketButton";

type MultipleChoiceStepEditorProps = {
  step: Step;
  onChange: (patch: StepPatch) => void;
};

export default function MultipleChoiceStepEditor({
  step,
  onChange,
}: MultipleChoiceStepEditorProps) {
  const mc = step.multipleChoice;

  // Every change sends the whole multipleChoice object, with one part replaced.
  const setChoiceText = (id: string, text: string) =>
    onChange({
      multipleChoice: {
        ...mc,
        choices: mc.choices.map((c) => (c.id === id ? { ...c, text } : c)),
      },
    });

  // A question needs at least 2 answers
  const canRemove = mc.choices.length > 2;

  // Delete one answer
  const removeChoice = (id: string) =>
    onChange({
      multipleChoice: {
        ...mc,
        choices: mc.choices.filter((c) => c.id !== id),
        // If the correct answer is deleted, no answer is correct anymore
        correctChoiceId: mc.correctChoiceId === id ? null : mc.correctChoiceId,
      },
    });

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Question</span>
        <input
          value={mc.question}
          onChange={(e) =>
            onChange({ multipleChoice: { ...mc, question: e.target.value } })
          }
          className={fieldClass}
        />
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className={`${labelClass} mb-3`}>
          Answers
          <span className="mt-1 block text-sm font-normal text-muted">
            Click the ticket next to the right answer to give it the golden
            ticket. Learners who pick it get one step closer to earning theirs.
          </span>
        </legend>

        {/* One row per answer: ticket button, text field, delete button.
            The correct answer's field gets a gold border. */}
        {mc.choices.map((choice, i) => {
          const isCorrect = choice.id === mc.correctChoiceId;

          return (
            <div key={choice.id} className="flex items-center gap-3">
              <GoldenTicketButton
                name={`correct-${step.id}`}
                label={`Answer ${i + 1} is correct`}
                isCorrect={isCorrect}
                onSelect={() =>
                  onChange({
                    multipleChoice: { ...mc, correctChoiceId: choice.id },
                  })
                }
              />
              <input
                value={choice.text}
                onChange={(e) => setChoiceText(choice.id, e.target.value)}
                aria-label={`Answer ${i + 1}${isCorrect ? " (correct)" : ""}`}
                // The "!" makes the gold border win over fieldClass's own border
                className={`${fieldClass} ${isCorrect ? "border-gold! focus:border-purple!" : ""}`}
              />
              <button
                type="button"
                onClick={() => removeChoice(choice.id)}
                disabled={!canRemove}
                aria-label={`Delete answer ${i + 1}`}
                title={
                  canRemove
                    ? `Delete answer ${i + 1}`
                    : "A question needs at least 2 answers"
                }
                // Quiet version: no border, just a grey ✕. Still 52px, so it lines up and is easy to click.
                // Previous, bolder version: add "border-2 border-lavender-line bg-white hover:border-danger"
                className="flex size-13 shrink-0 items-center justify-center rounded-button text-muted/70 transition-colors hover:bg-danger-soft hover:text-danger"
              >
                <X aria-hidden="true" className="size-5" strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </fieldset>

      {/* Adds an empty answer at the end */}
      <button
        type="button"
        onClick={() =>
          onChange({
            multipleChoice: { ...mc, choices: [...mc.choices, createChoice()] },
          })
        }
        className="self-start font-extrabold text-purple"
      >
        + Add answer
      </button>
    </div>
  );
}
