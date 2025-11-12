import clsx from "clsx";

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div
      className={clsx(
        "p-1 border border-[#A0A0A0] rounded-[6px]",
        "h-[34px] flex items-center gap-1"
      )}
    >
      {["LIRS", "FIRS"].map((tab) => (
        <button
          className={clsx(
            "text-sm font-[500] flex items-center",
            "px-2 h-[25px] rounded",
            "transition-all duration-300",
            activeTab === tab
              ? "bg-[#2A2A2A] text-white"
              : "cursor-pointer text-[#2A2A2A]"
          )}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
