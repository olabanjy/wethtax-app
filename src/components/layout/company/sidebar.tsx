import { Files } from "lucide-react";
import { MdHomeFilled, MdSupportAgent } from "react-icons/md";
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
    icon: <MdSupportAgent size={24} />,
    title: "Help & Support",
  },
];
