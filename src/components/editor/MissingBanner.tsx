import { CircleAlert } from "lucide-react";

type MissingBannerProps = {
  missing: string[];
};

export default function MissingBanner({ missing }: MissingBannerProps) {
  return (
    <div
      role="status"
      className="flex gap-3 rounded-item border-2 border-warning-line bg-warning-soft px-5 py-4 text-warning-text"
    >
      <CircleAlert
        aria-hidden="true"
        className="mt-0.5 size-6 shrink-0 fill-warning-text text-warning-soft"
      />
      <div className="flex flex-col gap-1">
        <p className="font-extrabold">This step isn't finished yet</p>
        <p className="text-sm">
          Still missing: {formatList(missing)}. Fill{" "}
          {missing.length === 1 ? "it" : "them"} in below and this note will go
          away.
        </p>
      </div>
    </div>
  );
}

// ["a"] → "a", ["a", "b"] → "a and b", ["a", "b", "c"] → "a, b and c"
function formatList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}
