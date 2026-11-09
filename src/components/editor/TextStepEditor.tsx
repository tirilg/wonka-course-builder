import type { Step, StepPatch } from "../../types";
import { fieldClass, labelClass } from "../../utils/styles";

type TextStepProps = {
  step: Step;
  onChange: (patch: StepPatch) => void;
};

export default function TextStepEditor({ step, onChange }: TextStepProps) {
  const { text } = step;

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Title</span>
        <input
          value={text.title}
          onChange={(e) =>
            onChange({ text: { ...text, title: e.target.value } })
          }
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={labelClass}>Text</span>
        <textarea
          value={text.body}
          onChange={(e) =>
            onChange({ text: { ...text, body: e.target.value } })
          }
          rows={6}
          className={fieldClass}
        />
      </label>
    </div>
  );
}
