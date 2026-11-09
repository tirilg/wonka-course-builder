import type { Step, StepPatch } from "../../types";
import { createChoice } from "../../state/courseReducer";
import { fieldClass, labelClass } from "../../utils/styles";

type Props = {
  step: Step;
  onChange: (patch: StepPatch) => void;
};

export default function MultipleChoiceStepEditor({ step, onChange }: Props) {
  const mc = step.multipleChoice;

  // Every change sends the whole multipleChoice object, with one part replaced.
  const setChoiceText = (id: string, text: string) =>
    onChange({
      multipleChoice: {
        ...mc,
        choices: mc.choices.map((c) => (c.id === id ? { ...c, text } : c)),
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
        {mc.choices.map((choice, i) => (
          <div key={choice.id} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${step.id}`}
              checked={mc.correctChoiceId === choice.id}
              onChange={() =>
                onChange({
                  multipleChoice: { ...mc, correctChoiceId: choice.id },
                })
              }
              aria-label={`Answer ${i + 1} is correct`}
            />
            <input
              value={choice.text}
              onChange={(e) => setChoiceText(choice.id, e.target.value)}
              aria-label={`Answer ${i + 1}`}
              className={fieldClass}
            />
          </div>
        ))}
      </fieldset>

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
