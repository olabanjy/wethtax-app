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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSend } from "@/hooks/use-send";
import OTP from "@/modules/otp";
import { useStore } from "@/store";

type AllValues = IdentificationValues & PersonalDetailsValues & TaxIdValues;

const steps = [
  { number: 1, label: "Identification" },
  { number: 2, label: "Personal Details" },
  { number: 3, label: "Tax ID Number" },
];

const IndividualProfile = () => {
  const navigate = useNavigate();
  const { params, onSetParams } = useSearchQuery();

  const setAuth = useStore((s) => s.setAuth);
  const authDetails = useStore((s) => s.auth.details as any);

  const current = Number(params.get("step") || 1);
  const [step, setStep] = useState<number>(current);
  const [values, setValues] = useState<Partial<AllValues>>({});

  const [isVerify, setIsVerify] = useState(false);

  const { mutateAsync: verifyIdentity, isPending: verifying } = useSend<
    { id_type: "BVN" | "NIN"; id_number: string },
    any
  >("/tenant/lagos/api/v1/ums/profile/verify-identity/", {
    method: "post",
    successMessage: "OTP sent to your email and phone number",
    hideToast: "success",
    onSuccess: () => {
      setIsVerify(true);
      onSetParams({
        verify: "true",
        id_type: values.idType as any,
        id_number: values.idNumber as any,
      });
    },
  });

  const { mutateAsync: confirmOtp, isPending: confirming } = useSend<
    { id_type: "BVN" | "NIN"; id_number: string; otp: string },
    any
  >("/tenant/lagos/api/v1/ums/profile/verify-identity/confirm-otp/", {
    method: "post",
    successMessage: "Identity verified",
    onSuccess: (data) => {
      setIsVerify(false);
      onSetParams({ verify: "false", id_type: "", id_number: "" });
      go(2);
      const userData = (data as any)?.data ?? data;
      if (userData) {
        setAuth({ details: { ...(authDetails || {}), ...userData } });
      }
    },
  });

  const { mutateAsync: updateProfile, isPending } = useSend<any, any>(
    "/tenant/lagos/api/v1/ums/profile/me/update/",
    {
      method: "patch",
      successMessage: "Profile updated",
      onSuccess: (data) => {
        const userData = (data as any)?.data ?? data;
        if (userData) {
          setAuth({ details: { ...(authDetails || {}), ...userData } });
        }
        go(3);
      },
    }
  );

  const { mutateAsync: updateTaxPayerId, isPending: updatingTaxId } = useSend<
    { tax_payer_id: string },
    any
  >("/tenant/lagos/api/v1/ums/profile/update/tax-payer-id/", {
    method: "patch",
    successMessage: "Tax ID Updated",
    onSuccess: () => {
      setAuth({
        details: { ...(authDetails || {}), tax_payer_id_verified: true },
      });
      go(4);
    },
  });

  useEffect(() => setStep(current), [current]);

  useEffect(() => {
    if (params.get("verify") === "true") {
      setIsVerify(true);
    }
  }, [params]);

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

  const go = useCallback(
    (n: number) => {
      setStep(n);
      onSetParams({ step: n });
    },
    [onSetParams]
  );

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

  useEffect(() => {
    if (!authDetails?.identity_verified) {
      go(1);
      return;
    }

    if (!authDetails?.profile?.first_time_filling) {
      go(2);
      return;
    }

    if (!authDetails?.tax_payer_id_verified) {
      go(3);
      return;
    }

    go(4);
  }, [authDetails, go, step]);

  return (
    <>
      {isVerify && (
        <OTP
          loading={confirming}
          onSubmit={async (code) => {
            await confirmOtp({
              id_type: (params.get("id_type") as any) || (values.idType as any),
              id_number:
                (params.get("id_number") as string) ||
                (values.idNumber as string) ||
                "",
              otp: code,
            });
          }}
        />
      )}

      {!isVerify && (
        <div className="pt-2 pb-10">
          {header}

          {step === 1 && (
            <IdentificationStep
              defaultValues={values}
              loading={verifying}
              onSubmit={async (v) => {
                setValues((p) => ({ ...p, ...v }));
                await verifyIdentity({
                  id_type: v.idType as any,
                  id_number: v.idNumber,
                });
              }}
            />
          )}

          {step === 2 && (
            <PersonalDetailsStep
              defaultValues={values}
              loading={isPending}
              onSubmit={async (v) => {
                const merged = { ...values, ...v } as AllValues;
                setValues(merged);
                await updateProfile(buildPayload(merged));
              }}
            />
          )}

          {step === 3 && (
            <TaxIdStep
              defaultValues={values}
              loading={updatingTaxId}
              onSubmit={async (v) => {
                await updateTaxPayerId({ tax_payer_id: v.taxId });
              }}
            />
          )}

          {step === 4 && (
            <SuccessStep onProceed={() => navigate("/dashboard")} />
          )}
        </div>
      )}
    </>
  );
};

export default IndividualProfile;
