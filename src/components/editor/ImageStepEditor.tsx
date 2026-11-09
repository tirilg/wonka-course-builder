import type { Step, StepPatch } from "../../types";
import { fieldClass, labelClass } from "../../utils/styles";

type Props = {
  step: Step;
  onChange: (patch: StepPatch) => void;
};

export default function ImageStepEditor({ step, onChange }: Props) {
  const { image } = step;

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Image link</span>
        <input
          type="url"
          value={image.url}
          onChange={(e) =>
            onChange({ image: { ...image, url: e.target.value } })
          }
          placeholder="https://..."
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={labelClass}>Description (for screen readers)</span>
        <input
          value={image.alt}
          onChange={(e) =>
            onChange({ image: { ...image, alt: e.target.value } })
          }
          className={fieldClass}
        />
      </label>
    </div>
  );
}
