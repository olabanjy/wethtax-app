import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export interface SideLinkProps {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  subLinks?: {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

const SideLink = ({
  icon,
  title,
  subLinks = [],
  isActive = false,
}: SideLinkProps) => {
  return (
    <button
      className={clsx(
        "w-full h-11 pr-4 outline-none cursor-pointer",
        "flex items-center justify-between",
        isActive
          ? "font-[600] pl-2 text-[#2A2A2A] bg-[#F5F5F5] border-l-[6px] border-[#121212]"
          : "text-[#898989] pl-4"
      )}
    >
      <div className={clsx("flex items-center gap-3")}>
        {icon}

        <p>{title}</p>
      </div>

      {subLinks.length > 0 && <ChevronDown size={20} />}
    </button>
  );
};

export default SideLink;
