import { Button } from "./button";
import { Dialog, DialogContent } from "./dialog";

const ProcessingTaxModal = ({
  open,
  toggle,
  calculating,
  onProceed,
}: {
  open: boolean;
  toggle: () => void;
  calculating: boolean;
  onProceed: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="gap-6 bg-white justify-center items-center py-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
          <img src="/assets/svgs/calculator.svg" alt="" />
        </div>
        <p className="text-center font-medium text-xl">
          Calculating Tax Implication...
        </p>
        <div className="flex gap-2 mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-${
                index * 100
              }`}
            />
          ))}
        </div>
        <Button
          disabled={calculating}
          className="max-w-[14rem] mx-auto w-full"
          onClick={onProceed}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingTaxModal;
