import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const DashboardSuccess = ({
  title,
  description,
  onProceed,
}: {
  title: string;
  description: string;
  onProceed?: () => void;
}) => {
  return (
    <section className="py-36 flex flex-col justify-center items-center w-full max-w-[45rem] mx-auto">
      <div className="w-24 h-24 rounded-full bg-[#B5E6B7] flex items-center justify-center p-5">
        <div className="w-full h-full rounded-full bg-[#11AE16] flex items-center justify-center">
          <CheckIcon color="white" size={24} />
        </div>
      </div>
      <h4 className="font-semibold text-gray-800 text-4xl text-center mt-8 mb-4">
        {title}
      </h4>
      <p className="text-gray-800 text-center text-lg">{description}</p>
      {onProceed && (
        <Button onClick={onProceed} className="mt-12 w-full max-w-[20rem] mx-auto h-12">
          Proceed to Filing History
        </Button>
      )}
    </section>
  );
};

export default DashboardSuccess;
