/* eslint-disable react-hooks/exhaustive-deps */
import { Stepper } from "@/components/ui/stepper";
import { useSearchQuery } from "@/hooks/use-search-query";
import {
  BusinessIdentificationStep,
  CompanyDetailsStep,
  StateTaxIdStep,
  FederalTaxIdStep,
  SuccessStep,
  type BusinessIdentificationValues,
  type CompanyDetailsValues,
  type StateTaxIdValues,
  type FederalTaxIdValues,
} from "@/modules/business";
import { useSend } from "@/hooks/use-send";
import OTP from "@/modules/otp";
import { useStore } from "@/store";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AllValues = BusinessIdentificationValues &
  CompanyDetailsValues &
  StateTaxIdValues &
  FederalTaxIdValues;

const steps = [
  { number: 1, label: "Identification" },
  { number: 2, label: "Company Details" },
  { number: 3, label: "State Tax ID Number" },
  { number: 4, label: "FIRS Tax ID Number" },
];

const BusinessProfile = () => {
  const navigate = useNavigate();
  const { params, onSetParams } = useSearchQuery();
  const current = Number(params.get("step") || 1);
  const [step, setStep] = useState<number>(current);
  const [values, setValues] = useState<Partial<AllValues>>({});

  const [skipStateTaxId, setSkipStateTaxId] = useState(false);

  const [isVerify, setIsVerify] = useState(false);

  const setAuth = useStore((s) => s.setAuth);
  const authDetails = useStore((s) => s.auth.details as any);

  const { mutateAsync: verifyIdentity, isPending: verifying } = useSend<
    { id_type: "CAC"; id_number: string },
    any
  >("/tenant/lagos/api/v1/ums/profile/verify-identity/", {
    method: "post",
    successMessage: "OTP sent to your email and phone number",
    hideToast: "success",
    onSuccess: () => {
      setIsVerify(true);
      onSetParams({
        verify: "true",
        id_type: "CAC",
        id_number: values.regNo as string,
      });
    },
  });

  const { mutateAsync: confirmOtp, isPending: confirming } = useSend<
    { id_type: "CAC"; id_number: string; otp: string },
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

  const { mutateAsync: updateCompany, isPending: updating } = useSend<any, any>(
    "/tenant/lagos/api/v1/ums/profile/me/update-company/",
    {
      method: "patch",
      successMessage: "Company profile updated",
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
    { tax_payer_id: string; tax_payer_id_type: string },
    any
  >("/tenant/lagos/api/v1/ums/profile/update/tax-payer-id/", {
    method: "patch",
    successMessage: "Tax ID Updated",
    onSuccess: (_response, payload) => {
      const id = payload?.tax_payer_id;
      const type = String(payload?.tax_payer_id_type || "");

      if (!id) return;

      if (type === "State") {
        setAuth({
          details: {
            ...(authDetails || {}),
            company_profile: {
              ...(authDetails?.company_profile || {}),
              tax_payer_id: id,
            },
          },
        });
        go(4);
      } else if (type === "Federal") {
        setAuth({
          details: {
            ...(authDetails || {}),
            company_profile: {
              ...(authDetails?.company_profile || {}),
              federal_tax_payer_id: id,
            },
          },
        });
        go(5);
      }
    },
  });

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

  const go = useCallback(
    (n: number) => {
      setStep(n);
      onSetParams({ step: n });
    },
    [onSetParams]
  );

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

  useEffect(() => {
    if (!authDetails?.company_profile?.reg_no) {
      go(1);
      return;
    }

    if (!authDetails?.company_profile?.first_time_filling) {
      go(2);
      return;
    }

    if (!authDetails?.company_profile?.tax_payer_id && !skipStateTaxId) {
      go(3);
      return;
    }

    if (!authDetails?.company_profile?.federal_tax_payer_id) {
      go(4);
      return;
    }

    go(5);
  }, [authDetails, step]);

  return (
    <>
      {isVerify && (
        <OTP
          loading={confirming}
          onSubmit={async (code) => {
            await confirmOtp({
              id_type: "CAC",
              id_number:
                (params.get("id_number") as string) ||
                (values.regNo as string) ||
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
            <BusinessIdentificationStep
              defaultValues={values}
              loading={verifying}
              onSubmit={async (v: BusinessIdentificationValues) => {
                setValues((p: Partial<AllValues>) => ({ ...p, ...v }));
                await verifyIdentity({ id_type: "CAC", id_number: v.regNo });
              }}
            />
          )}

          {step === 2 && (
            <CompanyDetailsStep
              defaultValues={values}
              loading={updating}
              onSubmit={async (v: CompanyDetailsValues) => {
                const merged = { ...values, ...v } as AllValues;
                setValues(merged);
                await updateCompany(buildPayload(merged));
              }}
            />
          )}

          {step === 3 && (
            <StateTaxIdStep
              defaultValues={values}
              loading={updatingTaxId}
              onSubmit={async (v: StateTaxIdValues) => {
                setValues((p: Partial<AllValues>) => ({ ...p, ...v }));
                await updateTaxPayerId({
                  tax_payer_id: v.stateTaxId,
                  tax_payer_id_type: "State",
                });
              }}
              onSkip={() => {
                setSkipStateTaxId(true);
                go(4);
              }}
            />
          )}

          {step === 4 && (
            <FederalTaxIdStep
              defaultValues={values}
              onSubmit={async (v: FederalTaxIdValues) => {
                setValues((p: Partial<AllValues>) => ({ ...p, ...v }));
                await updateTaxPayerId({
                  tax_payer_id: v.firsTaxId,
                  tax_payer_id_type: "Federal",
                });
                go(5);
              }}
            />
          )}

          {step === 5 && (
            <SuccessStep onProceed={() => navigate("/dashboard")} />
          )}
        </div>
      )}
    </>
  );
};

export default BusinessProfile;
