import { Files } from "lucide-react";
import {
  MdHomeFilled,
  MdOutlineFilePresent,
  MdSupportAgent,
} from "react-icons/md";
import type { SideLinkProps } from "../side-link";

export const companySideLinks: SideLinkProps[] = [
  {
    icon: <MdHomeFilled size={24} />,
    title: "Home",
    href: "/company",
  },
  {
    icon: <Files size={24} />,
    title: "File Returns",
    subLinks: [
      {
        title: "Monthly PAYE",
        href: "/company/monthly-paye",
      },
      {
        title: "Annual Returns",
        href: "/company/annual-returns",
      },
      {
        title: "Development Levy",
        href: "/company/development-levy",
      },
      {
        title: "Business Premises Levy",
        href: "/company/business-premises-levy",
      },
      {
        title: "Capital Gains Tax",
        href: "/company/capital-gains-tax",
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
