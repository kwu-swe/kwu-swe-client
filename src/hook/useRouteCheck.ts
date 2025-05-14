import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ** components
import PageLoading from "@/design/PageLoading";

interface RouteCheckOptions {
  checkAuth?: boolean;
  checkRole?: string[];
  redirectTo?: string;
}

export function useRouteCheck(options: RouteCheckOptions = {}) {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkRoute = async () => {
      try {
        // TODO: 여기에 실제 인증/권한 체크 로직 구현
        // 예시:
        // const isAuthenticated = await checkAuthentication();
        // const userRole = await getUserRole();

        // if (options.checkAuth && !isAuthenticated) {
        //   navigate("/sign-in", { state: { from: location.pathname } });
        //   return;
        // }

        // if (options.checkRole && !options.checkRole.includes(userRole)) {
        //   navigate(options.redirectTo || "/dashboard");
        //   return;
        // }

        // 임시 딜레이 (실제 구현 시 제거)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsChecking(false);
      } catch (error) {
        console.error("Route check failed:", error);
        navigate("/sign-in");
      }
    };

    checkRoute();
  }, [navigate, location, options]);

  return {
    isChecking,
    LoadingComponent: isChecking ? PageLoading : null,
  };
}
