import type { StepType } from "../../types";
import {
  STEP_TYPES,
  STEP_TYPE_ACTION,
  STEP_TYPE_DESCRIPTION,
  STEP_TYPE_ICON,
  STEP_TYPE_LABEL,
} from "../../utils/steps";

type StepTypeToggleProps = {
  stepId: string;
  value: StepType;
  onChange: (type: StepType) => void;
};

export default function StepTypeToggle({
  stepId,
  value,
  onChange,
}: StepTypeToggleProps) {
  // Where the bubble's tail sits: under the middle of the chosen option
  const activeIndex = STEP_TYPES.indexOf(value);
  const pointerLeft = `${((activeIndex * 2 + 1) / 6) * 100}%`;

  return (
    <fieldset>
      <legend className="mb-2 font-extrabold">Step type</legend>

      <div className="grid grid-cols-3 gap-1 rounded-item bg-lavender p-1.5">
        {STEP_TYPES.map((type) => {
          const Icon = STEP_TYPE_ICON[type];
          const isActive = type === value;

          return (
            <label
              key={type}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-button py-3 text-lg font-extrabold transition has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold ${
                isActive
                  ? "bg-purple text-white"
                  : "text-purple hover:bg-white/60"
              }`}
            >
              <input
                type="radio"
                name={`step-type-${stepId}`}
                value={type}
                checked={isActive}
                onChange={() => onChange(type)}
                className="sr-only"
              />
              <Icon aria-hidden="true" className="size-5" strokeWidth={2.5} />
              {STEP_TYPE_LABEL[type]}
            </label>
          );
        })}
      </div>

      {/* Speech bubble explaining the chosen type */}
      <div className="relative mt-5 rounded-item border-2 border-lavender-line bg-cream px-5 py-4">
        <span
          aria-hidden="true"
          style={{ left: pointerLeft }}
          className="absolute -top-[9px] size-4 -translate-x-1/2 rotate-45 rounded-tl-[3px] border-t-2 border-l-2 border-lavender-line bg-cream transition-[left] duration-300 ease-out"
        />
        <h2 className="text-lg text-burgundy font-bold">
          {STEP_TYPE_ACTION[value]}
        </h2>
        <p className="text-sm text-muted">{STEP_TYPE_DESCRIPTION[value]}</p>
      </div>
    </fieldset>
  );
}
