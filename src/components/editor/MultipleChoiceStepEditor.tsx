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
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Question</span>
        <input
          value={mc.question}
          onChange={(e) =>
            onChange({ multipleChoice: { ...mc, question: e.target.value } })
          }
          className={fieldClass}
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>Answers (pick the correct one)</legend>
        {/* One row per answer: ticket, text field, "Correct" tag and delete button */}
        {mc.choices.map((choice, i) => {
          const isCorrect = choice.id === mc.correctChoiceId;

          return (
            <div
              key={choice.id}
              className={`flex items-center gap-2.5 rounded-item border-2 p-2 transition-colors ${
                isCorrect
                  ? "border-gold bg-gold-soft"
                  : "border-lavender bg-white"
              }`}
            >
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
                aria-label={`Answer ${i + 1}`}
                className={fieldClass}
              />
              {isCorrect && (
                <span className="shrink-0 rounded-full bg-gold px-2.5 py-1 text-xs font-extrabold tracking-wide uppercase">
                  Correct
                </span>
              )}
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
                className="flex size-10 shrink-0 items-center justify-center rounded-button text-muted hover:bg-danger-soft hover:text-danger"
              >
                <X aria-hidden="true" className="size-5" />
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
