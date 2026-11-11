import { useState, type Dispatch } from "react";
import { Plus, X } from "lucide-react";
import type { Action } from "../../state/courseReducer";
import {
  STEP_TYPES,
  STEP_TYPE_HINT,
  STEP_TYPE_ICON,
  STEP_TYPE_LABEL,
} from "../../utils/steps";

type AddStepMenuProps = {
  dispatch: Dispatch<Action>;
};

export default function AddStepMenu({ dispatch }: AddStepMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col gap-2"
      // esc closes the menu
      onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
    >
      {isOpen && (
        <ul
          id="add-step-menu"
          aria-label="Choose a step type"
          className="animate-pop-in flex flex-col gap-1 rounded-item border-2 border-lavender-line bg-white p-1.5"
        >
          {STEP_TYPES.map((type) => {
            const Icon = STEP_TYPE_ICON[type];

            return (
              <li key={type}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "add", stepType: type });
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left hover:bg-lavender"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lavender text-purple">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-extrabold text-ink">
                      {STEP_TYPE_LABEL[type]}
                    </span>
                    <span className="text-sm text-muted">
                      {STEP_TYPE_HINT[type]}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="add-step-menu"
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-button border-2 text-lg font-extrabold ${
          isOpen
            ? "border-lavender-line bg-white text-purple hover:border-purple"
            : "candy-press border-transparent bg-purple text-white hover:bg-purple-dark"
        }`}
      >
        {isOpen ? (
          <>
            <X aria-hidden="true" className="size-5" />
            Cancel
          </>
        ) : (
          <>
            <Plus aria-hidden="true" className="size-5" strokeWidth={3} />
            Add step
          </>
        )}
      </button>
    </div>
  );
}
