import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

const SubmitButtonGroup = ({
  className,
  firstButtonProps,
  secondButtonProps,
}: {
  className?: string;
  firstButtonProps?: ButtonProps;
  secondButtonProps?: ButtonProps;
}) => {
  const {
    children: firstButtonLabel,
    className: firstButtonClassName,
    ...restFirstButtonProps
  } = firstButtonProps || {};
  const {
    children: secondButtonLabel,
    className: secondButtonClassName,
    ...restSecondButtonProps
  } = secondButtonProps || {};

  return (
    <div className={cn("mt-16 flex justify-end gap-6", className)}>
      <Button
        className={cn("w-full max-w-[14rem] h-12", firstButtonClassName)}
        variant="outline"
        {...restFirstButtonProps}
      >
        {firstButtonLabel}
      </Button>
      <Button
        className={cn("w-full max-w-[14rem] h-12", secondButtonClassName)}
        {...restSecondButtonProps}
      >
        {secondButtonLabel}
      </Button>
    </div>
  );
};

export default SubmitButtonGroup;
