import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function IdentifyAccount({
  onProceed,
  loading,
}: {
  onProceed: (payload: { taxId: string }) => void;
  loading?: boolean;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const taxId = String(form.get("taxId") ?? "").trim();
    if (!taxId) return;
    onProceed({ taxId });
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

          <p className="text-[#717171] text-center text-[15px] leading-[21px]">
            In order to enforce authorization, your account will be verified
            using the phone number or email registered with your Tax ID
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[420px] space-y-5"
        >
          <Input name="taxId" placeholder="Enter your Tax ID Number" />
          <Button size="xl" disabled={loading} className="w-full" type="submit">
            {loading ? "Processing..." : "Proceed"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          Are you new to Wethtax?{" "}
          <a className="text-[#7879C5]" href="/register?step=2">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
