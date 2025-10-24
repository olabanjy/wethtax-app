import clsx from "clsx";
import { useMemo, useState } from "react";
import { BarChart, StatsContainer } from "@/modules/dashboard/home";

const Home = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const stats = useMemo(
    () => [
      {
        id: "pit",
        title: "Personal Income Tax",
        value: "₦20,500",
        paidAmount: "₦15,000",
        remainingAmount: "₦5,500",
      },
      {
        id: "owed",
        title: "Total Tax Owed",
        value: "₦32,120",
        paidAmount: "₦20,000",
        remainingAmount: "₦12,120",
      },
      {
        id: "deductible",
        title: "Deductible Expenses",
        value: "₦10,000",
        paidAmount: "₦8,500",
        remainingAmount: "₦1,500",
      },
      {
        id: "refund",
        title: "Refund Due",
        value: "₦32,120",
        paidAmount: "₦20,000",
        remainingAmount: "₦12,120",
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

  return (
      <div className="w-full space-y-6">
        <h1 className={clsx("text-xl leading-[30px] text-[#717171]")}>
          Welcome,{" "}
          <span
            className={clsx(
              "text-2xl leading-[30px] font-[500] text-[#121212]"
            )}
          >
            John Ebuka Doe
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
