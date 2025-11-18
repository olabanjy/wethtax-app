import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Outlet } from "react-router-dom";

const ComputePITlayout = ({ onBack }: { onBack?: () => void }) => {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Button variant="link" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h4 className="text-gray-700 font-medium text-xl">
          Personal Income Tax
        </h4>
      </div>

      <section className="mt-14">
        <Outlet />
      </section>
    </section>
  );
};

export default ComputePITlayout;
