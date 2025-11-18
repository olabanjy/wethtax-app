import { cn } from "@/lib/utils";

const Label = ({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => {
  return (
    <label
      className={cn("block mb-4 text-lg font-medium text-gray-700", className)}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
