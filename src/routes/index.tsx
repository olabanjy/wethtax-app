import { Route, Routes } from "react-router-dom";

import Register from "@/pages/auth/register";
import Home from "@/pages/dashboard/home";
import Login from "@/pages/auth/login";
import IndividualProfile from "@/pages/auth/individual-profile";
import BusinessProfile from "@/pages/auth/business-profile";
import ForgotPassword from "@/pages/auth/forgot-password";
import Layout from "@/components/layout/layout";

// company routes
import Company from "@/pages/company";
import MonthlyPAYE from "@/pages/company/monthly-paye";
import AnnualReturn from "@/pages/company/annual-return";

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
        <Route path="annual-returns" element={<AnnualReturn />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
