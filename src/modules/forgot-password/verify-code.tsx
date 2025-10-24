import OTP from "@/modules/otp";

export function VerifyCode({
  onVerify,
  loading,
}: {
  onVerify: (code: string) => void | Promise<void>;
  loading?: boolean;
}) {
  return <OTP onSubmit={onVerify} loading={loading} />;
}


