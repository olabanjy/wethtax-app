import clsx from "clsx";
import { useMemo, useState } from "react";
import { BarChart, StatsContainer } from "@/modules/dashboard/home";
import useUser from "@/hooks/use-user-type";

const Home = () => {
  const { user, type } = useUser();

  const [year, setYear] = useState<number>(new Date().getFullYear());

  const stats = useMemo(
    () => [
      {
        id: "pit",
        title: "Personal Income Tax",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
      {
        id: "owed",
        title: "Total Tax Owed",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
      {
        id: "deductible",
        title: "Deductible Expenses",
        value: "₦0",
        paidAmount: "₦0",
        remainingAmount: "₦0",
      },
      {
        id: "refund",
        title: "Refund Due",
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
    // Simple deterministic values per year just for demo purposes
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

    if (type === "Company") {
      return `${user.company_profile?.name}`;
    }

    return `${user.first_name} ${user.other_name} ${user.last_name}`;
  }, [user, type]);

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
