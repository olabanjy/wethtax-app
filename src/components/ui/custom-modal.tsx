import { Dialog, DialogContent } from "./dialog";
import { cn } from "@/lib/utils";

const CustomModal = ({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn("bg-transparent shadow-none border-none", className)}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
