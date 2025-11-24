import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const TenantCheck = () => {
  const { setTenantName, tenantName, tenants, setTenant } = useStore();
  const { pathname } = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState<null | boolean>(null);

  useEffect(() => {
    const hostWrapper: Record<string, string> = {
      "localhost:5174": "lagos.taxapp.ng",
      "localhost:5173": "lagos.taxapp.ng",
      "https://wethtax-app.netlify.app": "lagos.taxapp.ng",
    };

    const originName = origin.replace("http://", "").replace("https://", "");

    const host = hostWrapper?.[originName] ?? originName;

    const splitHost = host.split(".");

    const tenant = splitHost.length !== 3 ? "" : splitHost[0];

    if (tenant || tenantName) {
      if (!tenantName) {
        setTenantName(tenant);
        setTenant(tenants[tenant]);
      }
      setShouldRedirect(false);
    } else {
      setShouldRedirect(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantName]);

  if (shouldRedirect === null) return;

  if (shouldRedirect)
    return <Navigate to="/get-started" state={{ pathname }} />;

  return <Outlet />;
};

export default TenantCheck;
