import StatsCard from "./stats-card";
import YearSelect from "../common/year-select";
import clsx from "clsx";

type Stat = {
  id: string;
  title: string;
  value: string | number;
  paidAmount?: string | number;
  remainingAmount?: string | number;
};

type StatsContainerProps = {
  heading?: string;
  year: number;
  onYearChange: (year: number) => void;
  stats: Stat[];
};

const StatsContainer = ({
  heading = "Overview",
  year,
  onYearChange,
  stats,
}: StatsContainerProps) => {
  return (
    <section
      className={clsx(
        "w-full rounded-2xl bg-[#121212] space-y-6",
        "pt-7 pb-6 pl-7 pr-8"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl leading-[30px] font-[600] text-[#F5F5F5]">
          {heading}
        </h2>

        <YearSelect
          year={year}
          onChange={onYearChange}
          className="text-white"
          labelClassName="text-[#E7E7E7]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatsCard
            key={s.id}
            title={s.title}
            value={s.value}
            paidAmount={s.paidAmount}
            remainingAmount={s.remainingAmount}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button className="text-sm text-[#C9C9E8] hover:text-white cursor-pointer">
          See all »
        </button>
      </div>
    </section>
  );
};

export default StatsContainer;
