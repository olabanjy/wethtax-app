import { Stepper } from "@/components/ui/stepper";
import { useSearchQuery } from "@/hooks/use-search-query";
import {
  BusinessIdentificationStep,
  CompanyDetailsStep,
  BusinessTaxIdStep,
  SuccessStep,
  type BusinessIdentificationValues,
  type CompanyDetailsValues,
  type BusinessTaxIdValues,
} from "@/modules/business";
import { useSend } from "@/hooks/use-send";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AllValues =
  & BusinessIdentificationValues
  & CompanyDetailsValues
  & BusinessTaxIdValues;

const steps = [
  { number: 1, label: "Identification" },
  { number: 2, label: "Company Details" },
  { number: 3, label: "Tax ID Number" },
];

const BusinessProfile = () => {
  const navigate = useNavigate();
  const { params, onSetParams } = useSearchQuery();
  const current = Number(params.get("step") || 1);
  const [step, setStep] = useState<number>(current);
  const [values, setValues] = useState<Partial<AllValues>>({});

  const { mutateAsync: updateCompany, isPending } = useSend<any, any>(
    "/tenant/lagos/api/v1/ums/profile/me/update-company/",
    {
      method: "patch",
      successMessage: "Company profile updated",
      onSuccess: () => go(4),
    }
  );

  useEffect(() => setStep(current), [current]);

  const header = useMemo(
    () => (
      <div className={clsx("py-8")}>
        <div className="flex flex-col items-center gap-10">
          <img src="/assets/png/logo.png" alt="Wethtax" width={136} height={37} />

          <Stepper steps={steps} active={step} />
        </div>
      </div>
    ),
    [step]
  );

  const go = (n: number) => {
    setStep(n);
    onSetParams({ step: n });
  };

  const buildPayload = (v: Partial<AllValues>) => {
    return {
      image: null,
      tax_station: v.taxStation ?? "",
      first_time_filling: true,
      past_tax_filling: "none",
      name: v.name ?? "",
      reg_no: v.regNo ?? "",
      email: v.email ?? "",
      business_type: v.businessType ?? "",
      phone_number: v.phone ?? "",
      number_of_employees: v.numEmployees ?? 0,
      number_of_directors: v.numDirectors ?? 0,
      place_of_business: v.placeOfBusiness ?? "",
      street_number: "",
      street_name: v.address ?? "",
      city: v.lga ?? "",
      lcda: v.lcda ?? "",
      state: null,
      lga: null,
    };
  };

  return (
    <div className="pt-2 pb-10">
      {header}

      {step === 1 && (
        <BusinessIdentificationStep
          defaultValues={values}
          onSubmit={(v: BusinessIdentificationValues) => {
            setValues((p: Partial<AllValues>) => ({ ...p, ...v }));
            go(2);
          }}
        />
      )}

      {step === 2 && (
        <CompanyDetailsStep
          defaultValues={values}
          onBack={() => go(1)}
          onSubmit={(v: CompanyDetailsValues) => {
            setValues((p: Partial<AllValues>) => ({ ...p, ...v }));
            go(3);
          }}
        />
      )}

      {step === 3 && (
        <BusinessTaxIdStep
          defaultValues={values}
          loading={isPending}
          onBack={() => go(2)}
          onSubmit={async (v: BusinessTaxIdValues) => {
            const merged = { ...values, ...v } as AllValues;
            setValues(merged);
            await updateCompany(buildPayload(merged));
          }}
        />
      )}

      {step === 4 && <SuccessStep onProceed={() => navigate("/dashboard")} />}
    </div>
  );
};

export default BusinessProfile;
