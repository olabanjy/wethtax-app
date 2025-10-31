import clsx from "clsx";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "@/hooks/use-user-type";

const Layout = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className={clsx(
        "w-full grid grid-cols-[16.25rem_1fr]",
        "h-dvh overflow-y-hidden"
      )}
    >
      <Sidebar />

      <main className={clsx("w-full h-full overflow-y-hidden")}>
        <Topbar />

        <div
          className={clsx(
            "w-full h-[calc(100dvh-5.75rem)] bg-[#F5F5F5]",
            "overflow-y-auto py-6 pl-10 pr-16"
          )}
        >
          <Outlet />
        </div>

        <div
          className={clsx(
            "w-full h-10 bg-[#E7E7E7] pr-14",
            "flex items-center justify-end"
          )}
        >
          <p className="text-xs leading-[18px] text-[#2A2A2A]">
            © {new Date().getFullYear()} Wethtax. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Layout;
