import clsx from "clsx";
import { LogOut, Settings } from "lucide-react";
import type { SideLinkProps } from "./side-link";
import SideLink from "./side-link";
import { removeLS } from "@/lib/utils";

const Sidebar = ({ links }: { links: SideLinkProps[] }) => {
  return (
    <div
      className={clsx(
        "w-full h-full bg-white pt-10 pb-20",
        "flex flex-col items-start justify-between"
      )}
    >
      <div className={clsx("w-full h-full", "flex flex-col gap-12")}>
        <img
          src="/assets/png/logo.png"
          alt="Wethtax Logo"
          className="w-[143px] h-10 ml-8"
        />

        <div className="w-full flex flex-col gap-5">
          <div
            className={clsx(
              "w-full pl-1.5 flex flex-col gap-2",
              "pb-5 border-b border-[#E7E7E7]"
            )}
          >
            {links.map((link) => (
              <SideLink key={link.title} {...link} />
            ))}
          </div>

          <div className="w-full pl-1.5">
            <SideLink icon={<Settings size={24} />} title="Settings" />
          </div>
        </div>
      </div>

      <button
        className={clsx(
          "w-full h-11 px-6 text-[#898989] outline-none",
          "flex items-center gap-3 cursor-pointer hover:text-red-500",
          "transition-all duration-300"
        )}
        onClick={() => {
          removeLS("wethtax_frontend");
          window.location.href = "/login";
        }}
      >
        <LogOut size={24} />

        <p>Sign out</p>
      </button>
    </div>
  );
};

export default Sidebar;
