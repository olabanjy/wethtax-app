import clsx from "clsx";

type StatsCardProps = {
  title: string;
  value: string | number;
  paidLabel?: string;
  paidAmount?: string | number;
  remainingLabel?: string;
  remainingAmount?: string | number;
  className?: string;
};

const StatsCard = ({
  title,
  value,
  paidLabel = "Amount Paid:",
  paidAmount,
  remainingLabel = "Remaining:",
  remainingAmount,
  className,
}: StatsCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-[#414141] bg-[#2A2A2A] group",
        "px-4 py-5 hover:bg-[#595959] transition-all duration-300",
        className
      )}
    >
      <div className="space-y-4">
        <div className="text-[#E7E7E7] font-[500]">{title}</div>

        <div className="text-[32px] font-[600] text-white">{value}</div>

        <hr className="border-[#595959] group-hover:border-[#717171] transition-all duration-300" />

        <div className="text-[15px] text-[#E7E7E7] space-y-1">
          {paidAmount !== undefined ? (
            <div>
              {paidLabel} <span className="font-medium">{paidAmount}</span>
            </div>
          ) : null}

          {remainingAmount !== undefined ? (
            <div>
              {remainingLabel}{" "}
              <span className="font-medium">{remainingAmount}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
