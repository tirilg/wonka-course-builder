import { useState } from "react";
import type { Step, StepPatch } from "../../types";
import { fieldClass, labelClass } from "../../utils/styles";

type ImageStepEditorProps = {
  step: Step;
  onChange: (patch: StepPatch) => void;
};

export default function ImageStepEditor({
  step,
  onChange,
}: ImageStepEditorProps) {
  const { image } = step;

  // The link that failed to load, if any. Comparing it to the current link
  // means the error goes away by itself as soon as the link is changed.
  const [brokenUrl, setBrokenUrl] = useState<string | null>(null);
  const isBroken = brokenUrl === image.url;

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Image link</span>
        <input
          type="url"
          value={image.url}
          onChange={(e) =>
            onChange({ image: { ...image, url: e.target.value } })
          }
          placeholder="https://..."
          className={fieldClass}
        />
      </label>

      {/* Preview, so you can see straight away if the link works */}
      {image.url.trim() &&
        (isBroken ? (
          <p className="rounded-item border-2 border-warning-line bg-warning-soft px-4 py-3 text-sm font-bold text-warning-text">
            Couldn't load this image. Check that the link goes straight to an
            image, not to a web page.
          </p>
        ) : (
          <img
            src={image.url}
            alt={image.alt}
            onError={() => setBrokenUrl(image.url)}
            className="max-h-64 self-start rounded-item border-2 border-lavender-line object-contain"
          />
        ))}

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Image description</span>
        {/* Used as alt text, so people who can't see the image know what it shows */}
        <span className="-mt-1 mb-1 text-sm text-muted">
          Describe what the image shows, for people using screen readers. For
          example: "Red emergency button next to the chocolate river".
        </span>
        <input
          value={image.alt}
          onChange={(e) =>
            onChange({ image: { ...image, alt: e.target.value } })
          }
          className={fieldClass}
        />
      </label>
    </div>
  );
}
