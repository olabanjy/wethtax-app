import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IdentifyAccount,
  VerifyCode,
  ResetPassword,
  PasswordResetSuccess,
} from "@/modules/forgot-password";
import { useSend } from "@/hooks/use-send";

type Step = 1 | 2 | 3 | 4;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [context, setContext] = useState<{ taxId?: string; token?: string }>(
    {}
  );

  // Step 1: identify account by Tax ID
  const identify = useSend<
    { taxId: string },
    { message: string; token: string }
  >("/ums/profile/reset-password/", {
    useAuth: false,
    onSuccess: (data, variables) => {
      setContext({ taxId: variables.taxId, token: data?.token });
      setStep(2);
    },
    successMessage: "Verification code sent",
  });

  // Step 2: verify code
  const verify = useSend<{ token?: string }, { message: string }>(
    "/ums/profile/verify_otp/",
    {
      useAuth: false,
      onSuccess: () => setStep(3),
      successMessage: "Code verified",
    }
  );

  // Step 3: reset password
  const reset = useSend<
    { password: string; confirmPassword: string; token?: string },
    { message: string }
  >("/ums/profile/reset-password/", {
    useAuth: false,
    onSuccess: () => setStep(4),
    successMessage: "Password updated",
  });

  const handleIdentify = useCallback(
    (payload: { taxId: string }) => identify.mutate(payload),
    [identify]
  );

  const handleVerify = useCallback(
    (code: string) => verify.mutate({ token: code }),
    [verify]
  );

  const handleReset = useCallback(
    (payload: { password: string; confirmPassword: string }) =>
      reset.mutate({ ...payload, token: context.token }),
    [reset, context.token]
  );

  return (
    <div className="w-full">
      {step === 1 && (
        <IdentifyAccount
          onProceed={handleIdentify}
          loading={identify.isPending}
        />
      )}
      {step === 2 && (
        <VerifyCode onVerify={handleVerify} loading={verify.isPending} />
      )}
      {step === 3 && (
        <ResetPassword onProceed={handleReset} loading={reset.isPending} />
      )}
      {step === 4 && (
        <div className="w-full py-14">
          <PasswordResetSuccess onProceed={() => navigate("/login")} />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
