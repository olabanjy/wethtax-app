import { Route, Routes } from "react-router-dom";

import Register from "@/pages/auth/register";
import Home from "@/pages/dashboard/home";
import Login from "@/pages/auth/login";
import IndividualProfile from "@/pages/auth/individual-profile";
import BusinessProfile from "@/pages/auth/business-profile";
import ForgotPassword from "@/pages/auth/forgot-password";

const AppRouter = () => {
  return (
    <Routes>
      <Route index path="/" element={<Register />} />
      <Route index path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/individual-profile" element={<IndividualProfile />} />
      <Route path="/business-profile" element={<BusinessProfile />} />

      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
