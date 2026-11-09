type HeaderProps = {
  title: string;
  onTitleChange: (title: string) => void;
};

export default function Header({ title, onTitleChange }: HeaderProps) {
  return (
    <>
      <header className="bg-lavender">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center gap-x-6 gap-y-3 px-8 py-4">
          <div className="flex items-center gap-3">
            <span className="font-logo text-3xl text-burgundy">Wonkademy</span>
          </div>

          <div
            aria-hidden="true"
            className="hidden h-9 w-px bg-lavender-line sm:block"
          />

          <div className="flex min-w-0 flex-col">
            <label
              htmlFor="course-title"
              className="text-xs font-extrabold text-muted"
            >
              Course name
            </label>
            <input
              type="text"
              id="course-title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Give your course a name"
              className="w-full max-w-md border-b-2 border-dashed border-lavender-line bg-transparent py-1 font-heading text-xl placeholder:text-muted/70 focus:border-purple"
            />
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="scallop-edge" />
    </>
  );
}
