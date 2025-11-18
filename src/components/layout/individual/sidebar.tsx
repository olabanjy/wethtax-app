import { Files } from "lucide-react";
import {
  MdHomeFilled,
  MdOutlineFilePresent,
  MdSupportAgent,
} from "react-icons/md";
import type { SideLinkProps } from "../side-link";

export const individualSideLinks: SideLinkProps[] = [
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
        title: "Personal Income Tax (PIT)",
        href: "/individual/personal-income-tax",
      },
      {
        title: "Development Levy",
        href: "/individual/development-levy",
      },
      {
        title: "Employment Taxes (PAYE)",
        href: "/individual/paye",
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
