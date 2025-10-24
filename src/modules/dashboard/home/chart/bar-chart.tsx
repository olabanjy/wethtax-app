import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import YearSelect from "../common/year-select";

type BarChartProps = {
  title?: string;
  year: number;
  onYearChange: (year: number) => void;
  labels: string[];
  values: number[];
  max?: number;
};

const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(n);

const BarChart = ({
  title = "Tax Returns",
  year,
  onYearChange,
  labels,
  values,
  max,
}: BarChartProps) => {
  const yMax = useMemo(() => {
    const m = Math.max(max ?? 0, ...values);
    return Math.max(0, Math.ceil(m / 1000) * 1000);
  }, [values, max]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        animations: { enabled: true },
        foreColor: "#717171",
      },
      grid: {
        borderColor: "#EAEAEA",
        strokeDashArray: 0,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          borderRadius: 6,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      colors: ["#5B5BD6"],
      xaxis: {
        categories: labels,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: Array(labels.length).fill("#717171") as string[],
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        min: 0,
        max: yMax,
        tickAmount: 5,
        forceNiceScale: true,
        labels: {
          formatter: (val: number) => formatNumber(val),
          style: { colors: ["#717171"], fontSize: "12px" },
        },
      },
      tooltip: {
        y: { formatter: (val: number) => formatNumber(val) },
      },
      legend: { show: false },
    }),
    [labels, yMax]
  );

  const series = useMemo(
    () => [{ name: title, data: values }],
    [title, values]
  );

  return (
    <section className="rounded-2xl border border-[#E6E6E6] bg-white p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#121212]">{title}</h2>
        <YearSelect year={year} onChange={onYearChange} />
      </div>

      <div className="w-full">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={340}
          width="100%"
        />
      </div>
    </section>
  );
};

export default BarChart;
