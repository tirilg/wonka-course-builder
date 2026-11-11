import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

type DeleteStepModalProps = {
  summary: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// "Are you sure?" popup before deleting a step. Only on the page while it's open, like PublishModal.
export default function DeleteStepModal({
  summary,
  onConfirm,
  onCancel,
}: DeleteStepModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open as a real popup: dims the page, keeps focus inside, Escape cancels
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      aria-labelledby="delete-heading"
      className="m-auto overflow-visible bg-transparent backdrop:bg-ink/40"
    >
      <div className="animate-pop-in flex max-w-sm flex-col gap-3 rounded-card bg-white p-7 shadow-card">
        <h2 id="delete-heading" className="text-2xl font-extrabold text-ink">
          Are you sure?
        </h2>
        <p className="text-muted">This step will be removed from the course</p>

        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="flex h-12 items-center justify-center rounded-button border-2 border-lavender-line bg-white px-4 font-extrabold text-ink hover:border-purple"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-12 items-center justify-center gap-2 rounded-button border-2 border-danger bg-danger px-4 font-extrabold text-white hover:brightness-110"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            Delete step
          </button>
        </div>
      </div>
    </dialog>
  );
}
