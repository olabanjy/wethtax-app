import SubmitButtonGroup from "./submit-button-group";
import { Dialog, DialogContent } from "./dialog";

const CrosscheckDialog = ({
  open,
  toggle,
  onProceed,
}: {
  open: boolean;
  toggle: () => void;
  onProceed: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="items-center justify-center gap-0 py-20 px-14">
        <img
          src="/assets/svgs/warning.svg"
          alt=""
          className="w-20 h-16 mx-auto mb-6"
        />
        <h4 className="text-2xl text-center font-semibold text-gray-800 mb-4">
          Crosscheck your entries
        </h4>
        <p className="text-center text-gray-600">
          Check all your information before you proceed because you will not be
          able to edit your entries after submitting
        </p>
        <SubmitButtonGroup
          className="mt-12 gap-3 justify-center"
          firstButtonProps={{
            children: "Cancel",
            className: "w-1/2 max-w-full",
            onClick: toggle,
          }}
          secondButtonProps={{
            children: "Proceed",
            className: "w-1/2 max-w-full",
            onClick: onProceed,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CrosscheckDialog;
