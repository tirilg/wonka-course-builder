import { useState } from "react";

type Props = {
  name: string;
  label: string;
  isCorrect: boolean;
  onSelect: () => void;
};

// A radio button that looks like a ticket. Turns golden when clicked
export default function GoldenTicketButton({
  name,
  label,
  isCorrect,
  onSelect,
}: Props) {
  const [celebrate, setCelebrate] = useState(false);

  return (
    <label
      title={label}
      onAnimationEnd={(e) => {
        if (e.animationName === "ticket-shine") setCelebrate(false);
      }}
      className={`flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-button border-2 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold ${
        isCorrect
          ? "golden-ticket border-gold-dark text-ink"
          : "border-lavender-line bg-white text-purple hover:bg-lavender"
      } ${celebrate ? "ticket-celebrate" : ""}`}
    >
      <input
        type="radio"
        name={name}
        checked={isCorrect}
        onChange={() => {
          setCelebrate(true);
          onSelect();
        }}
        aria-label={label}
        className="sr-only"
      />
      <TicketIcon checked={isCorrect} />
    </label>
  );
}

function TicketIcon({
  size = 26,
  checked = false,
}: {
  size?: number;
  checked?: boolean;
}) {
  return (
    <svg
      width={size}
      height={(size * 20) / 28}
      viewBox="0 0 28 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h24v4.5a2.5 2.5 0 0 0 0 5V17H2v-4.5a2.5 2.5 0 0 0 0-5z" />
      {checked && (
        <path d="M9.5 10l3 3 6-6" strokeWidth={2.6} strokeLinecap="round" />
      )}
    </svg>
  );
}
