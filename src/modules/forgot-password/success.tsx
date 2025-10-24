import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";

export function PasswordResetSuccess({ onProceed }: { onProceed: () => void }) {
  return (
    <div
      className={clsx(
        "w-full max-w-[650px] mx-auto bg-white rounded-[10px]",
        "border border-border text-center py-16 px-32"
      )}
    >
      <div
        className={clsx(
          "w-[112px] h-[112px] rounded-full bg-[#E7F7E8]",
          "flex items-center justify-center mx-auto mb-5"
        )}
      >
        <FaCheckCircle className="size-16 text-[#11AE16]" />
      </div>

      <h2 className="text-[26px] font-[500] text-primary mb-2">
        Password Updated!
      </h2>

      <p className="text-primary-grey mb-6 text-lg">
        Your password has been reset successfully
      </p>

      <Button size="xl" onClick={onProceed}>
        Proceed to Login
      </Button>
    </div>
  );
}


