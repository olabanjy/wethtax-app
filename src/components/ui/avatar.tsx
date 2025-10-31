import useUser from "@/hooks/use-user-type";
import { useMemo } from "react";

const IAvatar = () => {
  const { user, type } = useUser();

  const key = useMemo(() => {
    if (type === "Company") {
      return "company_profile";
    }
    return "profile";
  }, [type]);

  return (
    <div className="flex items-center h-9 gap-2">
      <img
        src="/assets/png/avatar.png"
        alt="Avatar"
        className="w-8 h-8 rounded-full"
      />

      <div>
        <p className="text-xs leading-[18px] font-[500] text-[#2A2A2A]">LIRS</p>
        <p className="text-sm leading-[21px] text-[#717171]">
          {user?.[key]?.tax_payer_id
            ? `Taxpayer ID: ${user?.[key]?.tax_payer_id}`
            : "No Taxpayer ID"}
        </p>
      </div>
    </div>
  );
};

export default IAvatar;
