import clsx from "clsx";
import Tabs from "./tabs";
import { useEffect, useState } from "react";
import useUser from "@/hooks/use-user-type";
import { getLS, setLS } from "@/lib/utils";

const CAvatar = () => {
  const [activeTab, setActiveTab] = useState(
    () => getLS<string>("wethtax_company_active_tab") || "LIRS"
  );

  useEffect(() => {
    setLS("wethtax_company_active_tab", activeTab);
  }, [activeTab]);

  const { user } = useUser();

  const taxId =
    user?.company_profile[
      activeTab === "LIRS" ? "tax_payer_id" : "federal_tax_payer_id"
    ];

  return (
    <div className="flex items-center h-9 gap-2">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <img
        src="/assets/png/stripe.png"
        alt="Avatar"
        className="w-8 h-8 rounded-full ml-2"
      />

      <p className={clsx("text-sm leading-[21px] text-[#414141]")}>
        Taxpayer ID: <b>{taxId ?? "No Taxpayer ID"}</b>
      </p>
    </div>
  );
};

export default CAvatar;
