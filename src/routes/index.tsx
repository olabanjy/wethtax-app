import { Outlet, Route, Routes } from "react-router-dom";

import Register from "@/pages/auth/register";
import Home from "@/pages/dashboard/home";
import Login from "@/pages/auth/login";
import IndividualProfile from "@/pages/auth/individual-profile";
import BusinessProfile from "@/pages/auth/business-profile";
import ForgotPassword from "@/pages/auth/forgot-password";
import Layout from "@/components/layout/layout";
import PersonalIncomeTax from "@/pages/individual/personal-income-tax";
import ComputePIT from "@/pages/individual/personal-income-tax/compute";
import ComputePITlayout from "@/components/layout/individual/compute-pit";

// company routes
import Company from "@/pages/company";
import MonthlyPAYE from "@/pages/company/monthly-paye";
import AnnualReturn from "@/pages/company/annual-return";
import CompanyFileMonthly from "@/pages/company/monthly-paye/file";
import CompanyFileAnnualReturn from "@/pages/company/annual-return/file/annual";
import CompanyFileProjection from "@/pages/company/annual-return/file/projection";
import CompanyFileWithholding from "@/pages/company/annual-return/file/withholding";
import CompanyFileSchedule from "@/pages/company/annual-return/file/schedule";
import AccommodationPIT from "@/pages/individual/personal-income-tax/compute/accommodation";
import IncomePIT from "@/pages/individual/personal-income-tax/compute/income";
import PITBill from "@/pages/individual/personal-income-tax/compute/bill";
import PITSuccess from "@/pages/individual/personal-income-tax/success";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Register />} />
      <Route index path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="individual-profile" element={<IndividualProfile />} />
      <Route path="business-profile" element={<BusinessProfile />} />

      <Route path="dashboard" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="company" element={<Layout />}>
        <Route index element={<Company />} />
        <Route path="monthly-paye" element={<MonthlyPAYE />} />
        <Route path="monthly-paye/file" element={<CompanyFileMonthly />} />
        <Route path="annual-returns" element={<AnnualReturn />} />
        <Route
          path="annual-returns/file/annual"
          element={<CompanyFileAnnualReturn />}
        />
        <Route
          path="annual-returns/file/projection"
          element={<CompanyFileProjection />}
        />
        <Route
          path="annual-returns/file/withholding"
          element={<CompanyFileWithholding />}
        />
        <Route
          path="annual-returns/file/schedule"
          element={<CompanyFileSchedule />}
        />
      </Route>

      <Route path="individual" element={<Layout />}>
        <Route path="personal-income-tax" element={<Outlet />}>
          <Route index element={<PersonalIncomeTax />} />
          <Route path="compute" element={<ComputePITlayout />}>
            <Route index element={<ComputePIT />} />
            <Route path="accommodation" element={<AccommodationPIT />} />
            <Route path="income" element={<IncomePIT />} />
            <Route path="bill" element={<PITBill />} />
          </Route>
          <Route path="success" element={<PITSuccess />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
