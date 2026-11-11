import type { CSSProperties, Dispatch } from "react";
import { Sparkle } from "lucide-react";
import type { Action } from "../../state/courseReducer";
import ChocolateBarButtons from "./ChocolateBarButtons";

type EmptyEditorProps = {
  courseTitle: string;
  dispatch: Dispatch<Action>;
};

// Sparkles around the ticket. Each twinkles on its own beat.
const SPARKLES = [
  { className: "top-0 left-4 size-6 text-gold", delay: "0s" },
  { className: "top-6 -right-2 size-4 text-pink", delay: "0.7s" },
  { className: "bottom-2 -left-4 size-4 text-wisteria", delay: "1.3s" },
  { className: "-bottom-2 right-8 size-5 text-gold", delay: "0.4s" },
];

// Content pops in one piece after another
const popIn = (delay: number): CSSProperties => ({
  animationDelay: `${delay}ms`,
});

export default function EmptyEditor({
  courseTitle,
  dispatch,
}: EmptyEditorProps) {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-card">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-8 py-14 text-center">
        {/* Floating golden ticket with sparkles */}
        <div aria-hidden="true" className="relative mb-6 px-8 py-6">
          {SPARKLES.map((s) => (
            <Sparkle
              key={s.delay}
              className={`animate-twinkle absolute fill-current ${s.className}`}
              style={{ animationDelay: s.delay }}
            />
          ))}

          <div className="animate-float">
            <div className="golden-ticket animate-shine-loop relative rounded-item border-2 border-gold-dark px-10 py-4 shadow-[0_10px_24px_rgb(185_138_31/0.35)]">
              <span className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border-2 border-gold-dark bg-white [clip-path:inset(0_0_0_50%)]" />
              <span className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full border-2 border-gold-dark bg-white [clip-path:inset(0_50%_0_0)]" />
              <span className="block text-[0.65rem] font-extrabold tracking-[0.25em] text-ink/70 uppercase">
                Admit one
              </span>
              <span className="block font-logo text-3xl text-burgundy">
                Golden Ticket
              </span>
              <span className="mx-auto block max-w-56 truncate text-[0.65rem] font-extrabold tracking-[0.25em] text-ink/70 uppercase">
                {courseTitle.trim() || "Your course"}
              </span>
            </div>
          </div>
        </div>

        <h2
          className="animate-pop-in font-logo text-5xl font-normal text-burgundy"
          style={popIn(100)}
        >
          Ready, set, teach!
        </h2>
        <p
          className="animate-pop-in max-w-lg text-lg text-muted"
          style={popIn(200)}
        >
          Everyone who finishes your course earns their golden ticket, proof
          they're ready for the factory floor.
        </p>

        <div
          className="animate-pop-in mt-6 flex w-full flex-col gap-4"
          style={popIn(320)}
        >
          <p className="font-extrabold text-burgundy">
            Get started by selecting your first step:
          </p>
          <ChocolateBarButtons dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}
