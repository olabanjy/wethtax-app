import DashboardSuccess from "@/modules/dashboard/common/success";
import { useNavigate } from "react-router-dom";

const CompanyDevelopmentLevySuccess = () => {
  const navigate = useNavigate();

  return (
    <DashboardSuccess
      title="Your tax filing has been successfully submitted to the LIRS."
      description="You will receive an email notification once the filing status is updated. In the meantime, you can track the progress by checking your Filing History"
      onProceed={() => navigate("/company/development-levy")}
    />
  );
};

export default CompanyDevelopmentLevySuccess;
