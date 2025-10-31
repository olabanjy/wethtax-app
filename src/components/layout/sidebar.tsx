import clsx from "clsx";
import { Files, LogOut, Settings } from "lucide-react";
import {
  MdHomeFilled,
  MdOutlineFilePresent,
  MdSupportAgent,
} from "react-icons/md";
import type { SideLinkProps } from "./side-link";
import SideLink from "./side-link";
import { removeLS } from "@/lib/utils";

const sideLinks: SideLinkProps[] = [
  {
    icon: <MdHomeFilled size={24} />,
    title: "Home",
    href: "/dashboard",
  },
  {
    icon: <Files size={24} />,
    title: "File Returns",
    subLinks: [
      {
        icon: <Files size={16} />,
        title: "File Returns",
        href: "/",
      },
      {
        icon: <Files size={16} />,
        title: "File Returns",
        href: "/",
      },
      {
        icon: <Files size={16} />,
        title: "File Returns",
        href: "/",
      },
    ],
  },
  {
    icon: <MdOutlineFilePresent size={24} />,
    title: "Filing History",
    subLinks: [],
  },
  {
    icon: <MdSupportAgent size={24} />,
    title: "Help & Support",
    subLinks: [
      {
        icon: <MdSupportAgent size={16} />,
        title: "Help & Support",
        href: "/",
      },
    ],
  },
];

const Sidebar = () => {
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
            {sideLinks.map((link) => (
              <SideLink key={link.title} {...link} />
            ))}
          </div>

          <div className="w-full pl-1.5">
            <SideLink
              icon={<Settings size={24} />}
              title="Settings"
              subLinks={[
                { icon: <Settings size={16} />, title: "Settings", href: "/" },
              ]}
            />
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
