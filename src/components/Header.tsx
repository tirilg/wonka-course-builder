import { useState } from "react";
import { Send, Undo2 } from "lucide-react";
import type { Step } from "../types";
import { getPublishBlocker } from "../utils/steps";

type HeaderProps = {
  title: string;
  onTitleChange: (title: string) => void;
  canUndo: boolean;
  onUndo: () => void;
  steps: Step[];
  onPublish: () => void;
};

export default function Header({
  title,
  onTitleChange,
  canUndo,
  onUndo,
  steps,
  onPublish,
}: HeaderProps) {
  // Why the course can't be published yet (null = ready to publish)
  const publishBlocker = getPublishBlocker(title, steps);

  // Only show the "needs a name" warning once you've clicked into the field and left it empty
  const [hasLeftTitle, setHasLeftTitle] = useState(false);
  const showTitleWarning = hasLeftTitle && !title.trim();

  return (
    <>
      <header className="bg-lavender">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center gap-x-6 gap-y-3 px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="font-logo text-3xl text-burgundy">Wonkademy</span>
          </div>

          {/* Thin divider line between logo and course name input */}
          <div
            aria-hidden="true"
            className="hidden h-12 w-px bg-lavender-line sm:block"
          />

          {/* Course name input*/}
          <div className="flex min-w-64 flex-1 flex-col gap-1 sm:max-w-xl">
            <input
              type="text"
              id="course-title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              // Enter finishes editing
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              // Remember that the field has been visited, for the warning
              onBlur={() => setHasLeftTitle(true)}
              placeholder="Name your course"
              maxLength={80}
              className={`w-full h-12 rounded-field border-2 px-4 font-heading text-xl font-semibold text-burgundy transition placeholder:font-normal placeholder:text-muted/70 focus:border-purple focus:ring-4 focus:ring-wisteria/30 ${
                showTitleWarning
                  ? "border-warning-line bg-warning-soft"
                  : "border-lavender-line bg-white hover:border-wisteria"
              }`}
            />
          </div>

          {/* Header CTAs */}
          <div className="ml-auto flex flex-wrap items-center justify-end gap-3 self-end">
            {/* Undo button */}
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex h-12 items-center gap-2 rounded-button border-2 border-lavender-line bg-white px-4 font-extrabold text-purple hover:border-purple"
            >
              <Undo2 aria-hidden="true" className="size-5" />
              Undo
            </button>

            {/* Publish button */}
            <button
              type="button"
              onClick={onPublish}
              disabled={!!publishBlocker}
              title={publishBlocker ?? undefined}
              className="candy-press-gold flex h-12 items-center gap-2 rounded-button bg-gold px-5 font-extrabold text-ink hover:brightness-105"
            >
              <Send aria-hidden="true" className="size-5" />
              Publish course
            </button>
          </div>
        </div>
      </header>
      {/* Decorative edge under the header */}
      <div aria-hidden="true" className="scallop-edge" />
    </>
  );
}
