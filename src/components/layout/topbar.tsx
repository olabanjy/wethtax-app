import clsx from "clsx";
import Searchbar from "@/components/ui/searchbar";
import Bell from "../ui/bell";
import IAvatar from "./individual/avatar";
import useUser from "@/hooks/use-user-type";
import CAvatar from "./company/avatar";

const Topbar = () => {
  const { type } = useUser();

  return (
    <div
      className={clsx(
        "w-full h-[52px] bg-white pl-6 pr-16",
        "border-l border-b border-[#E7E7E7]",
        "flex items-center justify-between"
      )}
    >
      <div className="w-[300px]">
        <Searchbar />
      </div>

      <div className="flex items-center gap-4">
        <Bell />

        {type === "Individual" ? <IAvatar /> : <CAvatar />}
      </div>
    </div>
  );
};

export default Topbar;
