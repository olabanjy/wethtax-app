import { Stepper } from "@/components/ui/stepper";
import { useSearchQuery } from "@/hooks/use-search-query";
import {
  IdentificationStep,
  PersonalDetailsStep,
  TaxIdStep,
  SuccessStep,
  type IdentificationValues,
  type PersonalDetailsValues,
  type TaxIdValues,
} from "@/modules/individual";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSend } from "@/hooks/use-send";

type AllValues = IdentificationValues & PersonalDetailsValues & TaxIdValues;

const steps = [
  { number: 1, label: "Identification" },
  { number: 2, label: "Personal Details" },
  { number: 3, label: "Tax ID Number" },
];

const IndividualProfile = () => {
  const navigate = useNavigate();
  const { params, onSetParams } = useSearchQuery();
  const current = Number(params.get("step") || 1);
  const [step, setStep] = useState<number>(current);
  const [values, setValues] = useState<Partial<AllValues>>({});

  const { mutateAsync: updateProfile, isPending } = useSend<any, any>(
    "/tenant/lagos/api/v1/ums/profile/me/update/",
    {
      method: "patch",
      successMessage: "Profile updated",
      onSuccess: () => go(4),
    }
  );

  useEffect(() => setStep(current), [current]);

  const header = useMemo(
    () => (
      <div className={clsx("py-8")}>
        <div className="flex flex-col items-center gap-10">
          <img
            src="/assets/png/logo.png"
            alt="Wethtax"
            width={136}
            height={37}
          />

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
    const parseAge = (date?: string) => {
      if (!date) return 0;
      const d = new Date(date);
      if (Number.isNaN(d.getTime())) return 0;
      const diff = Date.now() - d.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return {
      tax_station: v.taxStation ?? "",
      first_time_filling: true,
      past_tax_filling: "none",
      image: null,
      lasrra: (v as any).lassra ?? "",
      title: v.title ?? "",
      age: parseAge(v.dob as any),
      nationality: v.nationality ?? "",
      marital_status: v.maritalStatus ?? "",
      place_of_birth: v.placeOfBirth ?? "",
      gender: v.gender ?? "",
      house_number: 0,
      street: v.address ?? "",
      city: v.lga ?? "",
      lcda: v.lcda ?? "",
      phone_number_1: v.phone ?? "",
      phone_number_2: "",
      email_address: v.email ?? "",
      residential_address: v.address ?? "",
      is_public_servant: v.isPublicServant ?? false,
      business_type: v.businessType ?? "",
      employment_status: v.employmentStatus ?? "",
      occupation: v.occupation ?? "",
      state_of_origin: null,
      state_of_residence: null,
      lga_of_residence: null,
    };
  };

  return (
    <div className="pt-2 pb-10">
      {header}

      {step === 1 && (
        <IdentificationStep
          defaultValues={values}
          onSubmit={(v) => {
            setValues((p) => ({ ...p, ...v }));
            go(2);
          }}
        />
      )}

      {step === 2 && (
        <PersonalDetailsStep
          defaultValues={values}
          onBack={() => go(1)}
          onSubmit={(v) => {
            setValues((p) => ({ ...p, ...v }));
            go(3);
          }}
        />
      )}

      {step === 3 && (
        <TaxIdStep
          defaultValues={values}
          onBack={() => go(2)}
          loading={isPending}
          onSubmit={async (v) => {
            const merged = { ...values, ...v } as AllValues;
            setValues(merged);
            await updateProfile(buildPayload(merged));
          }}
        />
      )}

      {step === 4 && <SuccessStep onProceed={() => navigate("/dashboard")} />}
    </div>
  );
};

export default IndividualProfile;
