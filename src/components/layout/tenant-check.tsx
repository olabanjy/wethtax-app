import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const TenantCheck = () => {
  const { setTenantName, tenantName, tenants, setTenant } = useStore();
  const { pathname } = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState<null | boolean>(null);

  useEffect(() => {
    const hostWrapper: Record<string, string> = {
      "localhost:5174": "lagos.wethtax.com",
      "localhost:5173": "lagos.wethtax.com",
      "wethtax-app.netlify.app": "lagos.wethtax.com",
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
