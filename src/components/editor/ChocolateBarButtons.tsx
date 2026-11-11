import type { Dispatch } from "react";
import type { Action } from "../../state/courseReducer";
import type { StepType } from "../../types";
import {
  STEP_TYPES,
  STEP_TYPE_HINT,
  STEP_TYPE_ICON,
  STEP_TYPE_LABEL,
} from "../../utils/steps";

type ChocolateBarButtonsProps = {
  dispatch: Dispatch<Action>;
};

// Each step type gets its own wrapper colour, like different chocolate bars.
const WRAPPER: Record<StepType, { bg: string; edge: string }> = {
  text: { bg: "bg-mint/50", edge: "text-mint/50" },
  image: { bg: "bg-pink/50", edge: "text-pink/50" },
  multipleChoice: { bg: "bg-gold/50", edge: "text-gold/50" },
};

export default function ChocolateBarButtons({
  dispatch,
}: ChocolateBarButtonsProps) {
  return (
    <div className="mx-auto grid w-full max-w-lg grid-cols-3 gap-4">
      {STEP_TYPES.map((type) => {
        const Icon = STEP_TYPE_ICON[type];
        const colors = WRAPPER[type];

        return (
          <button
            key={type}
            type="button"
            onClick={() => dispatch({ type: "add", stepType: type })}
            aria-label={`Add ${STEP_TYPE_LABEL[type].toLowerCase()} step`}
            className="group flex flex-col drop-shadow-[0_4px_8px_rgb(100_57_31/0.14)] transition-transform duration-200 ease-out hover:-translate-y-1 active:translate-y-0"
          >
            <span
              aria-hidden="true"
              className="grid grid-cols-3 gap-1 rounded-t-xl bg-chocolate-dark p-1 pb-0.5"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="h-4 rounded bg-chocolate shadow-[inset_1.5px_1.5px_0_rgb(255_255_255/0.22),inset_-1.5px_-1.5px_0_rgb(0_0_0/0.08)] first:rounded-tl-lg [&:nth-child(3)]:rounded-tr-lg"
                />
              ))}
            </span>

            <span aria-hidden="true" className="foil h-1" />
            <span
              className={`flex flex-1 flex-col items-center px-2.5 pt-6 pb-2.5 ${colors.bg}`}
            >
              <span className="flex w-full flex-1 flex-col items-center gap-0.5 rounded-xl bg-white px-2 pb-3 text-center">
                <span className="-mt-4.5 mb-0.5 flex size-9 items-center justify-center rounded-full border-[3px] border-white bg-purple text-white">
                  <Icon
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-lg leading-tight font-extrabold text-purple">
                  {STEP_TYPE_LABEL[type]}
                </span>
                <span className="mb-2 text-xs leading-snug font-bold text-muted">
                  {STEP_TYPE_HINT[type]}
                </span>
                <span className="mt-auto rounded-full bg-lavender px-3 py-0.5 text-xs font-extrabold text-purple transition-colors group-hover:bg-purple group-hover:text-white">
                  + Add
                </span>
              </span>
            </span>
            <span aria-hidden="true" className={`crimp-edge ${colors.edge}`} />
          </button>
        );
      })}
    </div>
  );
}
