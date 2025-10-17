import clsx from "clsx";

type Step = { number: number; label: string };

export function Stepper({ steps, active }: { steps: Step[]; active: number }) {
  return (
    <div className="w-full flex items-center justify-center gap-2">
      {steps.map((s, idx) => {
        const isActive = s.number <= active;

        return (
          <div key={s.number} className="flex items-center gap-3">
            <div
              className={clsx(
                "w-[28px] h-[28px] rounded-full flex",
                "text-lg items-center justify-center",
                isActive
                  ? "bg-[#595959] text-white font-semibold"
                  : "border border-[#D0D0D0] bg-transparent text-[#A0A0A0]"
              )}
            >
              {s.number}
            </div>

            <span
              className={clsx(
                "leading-[21px]",
                isActive ? "text-[#595959] font-medium" : "text-[#A0A0A0]"
              )}
            >
              {s.label}
            </span>

            {idx < steps.length - 1 && (
              <div className="w-25 h-px bg-[#D0D0D0]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
