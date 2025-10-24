import clsx from "clsx";
import { MdOutlineNotifications } from "react-icons/md";

const Bell = () => {
  return (
    <div className={clsx("w-[50px] h-9 relative", "flex items-center")}>
      <MdOutlineNotifications size={28} className="text-[#717171]" />

      <div
        className={clsx(
          "absolute top-0 right-2 px-1 h-[18px]",
          "bg-[#BE4149] rounded-[50px] text-white",
          "text-xs font-[500] leading-[18px]"
        )}
      >
        99+
      </div>
    </div>
  );
};

export default Bell;
