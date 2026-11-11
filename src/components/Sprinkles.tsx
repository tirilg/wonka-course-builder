import { useState, type CSSProperties } from "react";

const COLORS = ["purple", "pink", "gold", "mint"];
const COUNT = 40;

// A random number between min and max
const random = (min: number, max: number) => min + Math.random() * (max - min);

// Candy sprinkles that burst out from the middle of whatever they're placed in.
// Put it inside a `relative` element, behind the content.
export default function Sprinkles() {
  // Made once, when the sprinkles first appear
  const [sprinkles] = useState(() =>
    Array.from({ length: COUNT }, (_, i) => {
      // Roughly evenly spread around the middle, but nudged a bit so it
      // doesn't look like a perfect circle
      const angle = (i / COUNT) * Math.PI * 2 + random(-0.25, 0.25);
      const distance = random(0.75, 1.15); // some fly further than others
      return {
        background: `var(--color-${COLORS[i % COLORS.length]})`,
        "--x": `${Math.cos(angle) * 300 * distance}px`, // where it flies to
        "--y": `${Math.sin(angle) * 230 * distance}px`,
        "--rot": `${random(0, 180)}deg`, // random tilt
        "--spin": `${random(-180, 180)}deg`, // random spin
        "--delay": `${random(0, 0.2)}s`, // not all at exactly the same time
      } as CSSProperties;
    }),
  );

  return (
    <div aria-hidden="true" className="absolute top-1/2 left-1/2">
      {sprinkles.map((style, i) => (
        <span
          key={i}
          className="animate-sprinkle absolute h-4 w-1.5 rounded-full"
          style={style}
        />
      ))}
    </div>
  );
}
