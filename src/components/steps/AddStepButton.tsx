import type { Dispatch } from "react";
import type { Action } from "../../state/courseReducer";
import { STEP_TYPES, STEP_TYPE_LABEL } from "../../utils/steps";

type AddStepButtonProps = {
  dispatch: Dispatch<Action>;
};

// Render one button per step type
export default function AddStepButtons({ dispatch }: AddStepButtonProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {STEP_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => dispatch({ type: "add", stepType: type })}
          className="flex flex-col items-center gap-1 rounded-button border-2 border-lavender bg-white p-2 text-sm font-extrabold text-purple hover:border-purple"
        >
          {"ICON "}
          {STEP_TYPE_LABEL[type]}
        </button>
      ))}
    </div>
  );
}
