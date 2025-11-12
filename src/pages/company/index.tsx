import clsx from "clsx";
import { useMemo, useState } from "react";
import { BarChart, StatsContainer } from "@/modules/dashboard/home";
import useUser from "@/hooks/use-user-type";

const Home = () => {
  const { user } = useUser();

  const [year, setYear] = useState<number>(new Date().getFullYear());

  const stats = useMemo(
    () => [
      {
        id: "corporate-tax",
        title: "Corporate Tax",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
      {
        id: "indirect-taxes",
        title: "Indirect Taxes",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
      {
        id: "special-taxes",
        title: "Special Taxes",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
      {
        id: "withholding-taxes",
        title: "Withholding Taxes",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
    ],
    []
  );

  const labels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const values = useMemo(() => {
    const base = (year % 7) * 500;
    return [
      3000 + base,
      6500 + base,
      8000 + base,
      11200 + base,
      10400 + base,
      13200 + base,
      12400 + base,
      14200 + base,
      15400 + base,
      17600 + base,
      22200 + base,
      25000 + base,
    ];
  }, [year]);

  const name = useMemo(() => {
    if (!user) return "";

    return `${user.company_profile?.name}`;
  }, [user]);

  return (
    <div className="w-full space-y-6">
      <h1 className={clsx("text-xl leading-[30px] text-[#717171]")}>
        Welcome,{" "}
        <span
          className={clsx(
            "text-2xl leading-[30px] font-[500] text-[#121212] capitalize"
          )}
        >
          {name}
        </span>
      </h1>

      <StatsContainer year={year} onYearChange={setYear} stats={stats} />

      <BarChart
        title="Tax Returns"
        year={year}
        onYearChange={setYear}
        labels={labels}
        values={values}
      />
    </div>
  );
};

export default Home;
