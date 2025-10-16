import { useSearchQuery } from "@/hooks/use-search-query";
import Profile from "@/modules/register/profile";
import SelectState from "@/modules/register/select-state";
import { useEffect, useState } from "react";

const Register = () => {
  const [step, setStep] = useState<number>(1);

  const { params, onSetParams } = useSearchQuery();

  const currentStep = params.get("step") || "1";

  useEffect(() => {
    setStep(Number(currentStep));
  }, [currentStep]);

  return (
    <>
      {step === 1 && (
        <SelectState
          handleContinue={() => {
            setStep(2);
            onSetParams({ step: "2" });
          }}
        />
      )}

      {step === 2 && <Profile />}
    </>
  );
};

export default Register;
