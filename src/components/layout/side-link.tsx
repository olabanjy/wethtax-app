import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavLink, useMatch, useLocation } from "react-router-dom";

export interface SideLinkProps {
  icon?: React.ReactNode;
  title: string;
  href?: string;
  subLinks?: SideLinkProps[];
}

const SideLinkItem = ({
  href = "#",
  onClick,
  isParent,
  icon,
  title,
  isSubActive,
}: SideLinkProps & {
  onClick?: () => void;
  isParent?: boolean;
  isSubActive?: boolean;
}) => {
  const location = useLocation();
  const isActive = useMatch({ path: href }) || location.pathname.startsWith(href) || isSubActive;

  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={cn(
        "w-full h-11 pr-4 outline-none cursor-pointer hover:bg-[#F5F5F5]",
        "flex items-center justify-between",
        isActive
          ? `font-[600] pl-2 text-[#2A2A2A] bg-[#F5F5F5] ${isParent ? "border-l-[6px] border-[#121212]" : "border border-gray-200"}`
          : "text-[#898989] pl-4"
      )}
    >
      <div className={cn("flex items-center gap-3")}>
        {icon && icon}
        <p className={cn("text-sm")}>{title}</p>
      </div>

      {isParent && <ChevronDown size={20} />}
    </NavLink>
  );
};

const SideLink = ({
  icon,
  title,
  href = "#",
  subLinks = [],
}: SideLinkProps) => {
  const [open, setOpen] = useState(false);
  const hasSubLinks = subLinks.length > 0;
  const location = useLocation();

  const anySubActive =
    hasSubLinks &&
    subLinks.some((link) => {
      const href = link.href || "";
      if (!href) return false;
      if (href === "/") return location.pathname === "/";
      return location.pathname.startsWith(href);
    });

  const isExpanded = anySubActive || open;

  return (
    <div>
      <SideLinkItem
        href={href}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        isParent={hasSubLinks}
        icon={icon}
        title={title}
        isSubActive={anySubActive}
      />

      {isExpanded && hasSubLinks && (
        <div className={cn("pl-3 flex flex-col gap-1 my-2")}>
          {subLinks.map((link) => (
            <SideLinkItem
              key={link.title}
              href={link.href}
              icon={link.icon}
              title={link.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideLink;
