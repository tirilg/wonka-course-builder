import { useEffect, useRef } from "react";
import Sprinkles from "./Sprinkles";

type PublishModalProps = {
  courseTitle: string;
  onClose: () => void;
};

export default function PublishModal({
  courseTitle,
  onClose,
}: PublishModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() is built into the browser - dims the page, keeps focus inside, and lets esc close it
  useEffect(() => {
    const dialog = dialogRef.current;
    // Only open it if it isn't already open (React runs this twice in dev mode)
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="publish-heading"
      className="m-auto overflow-visible bg-transparent backdrop:bg-ink/40"
    >
      <div className="relative">
        <Sprinkles />

        <div className="animate-pop-in relative flex max-w-md flex-col items-center gap-3 rounded-card bg-white p-8 text-center shadow-card">
          <h2
            id="publish-heading"
            className="font-logo text-4xl font-normal text-burgundy"
          >
            Course published!
          </h2>
          <p className="text-muted">
            Everyone who finishes{" "}
            <strong className="text-ink">{courseTitle}</strong> earns their
            golden ticket.
          </p>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="candy-press mt-2 rounded-button bg-purple px-6 py-3 font-extrabold text-white hover:bg-purple-dark"
          >
            Back to editing
          </button>
        </div>
      </div>
    </dialog>
  );
}
