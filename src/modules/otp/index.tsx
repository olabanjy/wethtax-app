import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const NUMBER_OF_DIGITS = 6;

const OTP = ({
  onSubmit,
  loading,
}: {
  onSubmit: (code: string) => void | Promise<void>;
  loading?: boolean;
}) => {

  const [values, setValues] = useState<string[]>(
    Array.from({ length: NUMBER_OF_DIGITS }, () => "")
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const allFilled = values.every((v) => v.length === 1);
  const code = values.join("");

  function focusAt(index: number) {
    const clamped = Math.max(0, Math.min(NUMBER_OF_DIGITS - 1, index));
    inputRefs.current[clamped]?.focus();
    inputRefs.current[clamped]?.select?.();
  }

  function handleChange(index: number, next: string) {
    const normalized = next.replace(/\D/g, "");

    if (normalized.length > 1) {
      const parts = normalized.slice(0, NUMBER_OF_DIGITS).split("");
      setValues((prev) => {
        const draft = [...prev];
        let writeIndex = index;
        for (const digit of parts) {
          if (writeIndex > NUMBER_OF_DIGITS - 1) break;
          draft[writeIndex] = digit;
          writeIndex += 1;
        }
        return draft;
      });
      focusAt(Math.min(index + parts.length, NUMBER_OF_DIGITS - 1));
      return;
    }

    setValues((prev) => {
      const draft = [...prev];
      draft[index] = normalized.slice(0, 1);
      return draft;
    });

    if (normalized) {
      focusAt(index + 1);
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    const key = e.key;

    if (key === "Backspace") {
      if (values[index]) {
        // Clear current value
        setValues((prev) => {
          const draft = [...prev];
          draft[index] = "";
          return draft;
        });
      } else {
        focusAt(index - 1);
        setValues((prev) => {
          const draft = [...prev];
          const prevIndex = Math.max(0, index - 1);
          draft[prevIndex] = "";
          return draft;
        });
      }
      e.preventDefault();
      return;
    }

    if (key === "ArrowLeft") {
      focusAt(index - 1);
      e.preventDefault();
      return;
    }

    if (key === "ArrowRight") {
      focusAt(index + 1);
      e.preventDefault();
      return;
    }
  }

  function handlePaste(
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) {
    const text = e.clipboardData.getData("text");
    if (!text) return;
    e.preventDefault();

    const digits = text.replace(/\D/g, "").slice(0, NUMBER_OF_DIGITS);
    if (!digits) return;

    const parts = digits.split("");
    setValues((prev) => {
      const draft = [...prev];
      let writeIndex = index;
      for (const digit of parts) {
        if (writeIndex > NUMBER_OF_DIGITS - 1) break;
        draft[writeIndex] = digit;
        writeIndex += 1;
      }
      return draft;
    });

    focusAt(Math.min(index + parts.length, NUMBER_OF_DIGITS - 1));
  }

  function handleCopy(e: React.ClipboardEvent<HTMLInputElement>) {
    if (!code) return;
    e.preventDefault();
    try {
      e.clipboardData.setData("text/plain", code);
    } catch {
      // noop
    }
  }

  const handleSubmit = useCallback(async () => {
    if (code.length !== NUMBER_OF_DIGITS) return;
    await onSubmit(code);
  }, [code, onSubmit]);

  useEffect(() => {
    if (allFilled && !loading) {
      handleSubmit();
    }
  }, [allFilled, handleSubmit, loading]);

  return (
    <div className="w-full py-14 flex justify-center">
      <div
        className={clsx(
          "w-full max-w-[525px] bg-white rounded-[10px]",
          "border border-border pt-12 pb-20 px-16",
          "flex flex-col items-center gap-8"
        )}
      >
        <img src="/assets/png/logo.png" alt="wethtax" className="h-8" />

        <div
          className={clsx(
            "w-full max-w-[320px] flex flex-col",
            "items-center gap-2 text-center"
          )}
        >
          <div className="text-[24px] leading-[36px] font-[500] text-[#121212]">
            A verification code has been sent to you
          </div>

          <p className="text-[#717171] max-w-[300px] text-[15px] leading-[21px]">
            Please enter the 6 digit code sent to your email address & phone
            number
          </p>
        </div>

        <div className="flex items-center gap-4">
          {values.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              className={clsx(
                "w-[50px] h-[56px] text-center text-2xl rounded border border-input",
                "focus-visible:border-[#414141] focus-visible:ring-ring/50 focus-visible:ring-[1px] outline-none"
              )}
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={(e) => handlePaste(idx, e)}
              onCopy={handleCopy}
              onFocus={(e) => e.currentTarget.select()}
              aria-label={`Digit ${idx + 1}`}
            />
          ))}
        </div>

        <Button
          size="xl"
          disabled={!allFilled || !!loading}
          className="w-full max-w-[420px]"
          onClick={handleSubmit}
        >
          {loading ? "Verifying..." : "Continue"}
        </Button>

        <button
          type="button"
          className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
        >
          I didn’t receive a code
        </button>
      </div>
    </div>
  );
};

export default OTP;
