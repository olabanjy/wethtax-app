import clsx from "clsx";
import Searchbar from "@/components/ui/searchbar";
import Bell from "../ui/bell";
import IAvatar from "../ui/avatar";

const Topbar = () => {
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

        <IAvatar />
      </div>
    </div>
  );
};

export default Topbar;
