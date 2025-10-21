import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password";

export function ResetPassword({
  onProceed,
  loading,
}: {
  onProceed: (payload: { password: string; confirmPassword: string }) => void;
  loading?: boolean;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    if (!password || !confirmPassword) return;
    onProceed({ password, confirmPassword });
  };

  return (
    <div className="w-full py-14 flex justify-center">
      <div
        className={clsx(
          "w-full max-w-[525px] bg-white rounded-[10px]",
          "border border-border pt-12 pb-12 px-10",
          "flex flex-col items-center gap-8"
        )}
      >
        <img src="/assets/png/logo.png" alt="wethtax" className="h-8" />

        <div className="w-full">
          <h2 className="text-center text-[24px] leading-[36px] font-[500] text-[#121212] mb-2">
            Reset Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-[420px] space-y-5">
          <PasswordInput name="password" placeholder="Enter New Password" />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm New Password"
          />
          <Button size="xl" disabled={loading} className="w-full" type="submit">
            {loading ? "Updating..." : "Proceed"}
          </Button>
        </form>
      </div>
    </div>
  );
}


