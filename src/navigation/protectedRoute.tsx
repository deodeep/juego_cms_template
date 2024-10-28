import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { accessTokenAtom, roleAtom } from "src/jotai/atom";
import { nonAuthRoutes, rolePermissions } from "./vertical";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const accessToken = useAtomValue(accessTokenAtom);
  const role = useAtomValue(roleAtom);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const authCheckRef = useRef(false);

  useEffect(() => {
    // accessToken atom will not be initialized during the initial render
    const token = localStorage.getItem('accessToken'); //TODO: Check for better approach
    (accessToken && token || !accessToken && !token) && setIsMounted(true); // Component has mounted
  }, [accessToken])

  useEffect(() => {
    if (typeof window !== undefined) {
      if (isMounted) {
        if (!accessToken) {
          router.replace("/login"); // Redirect to login if accessToken or role is not available
        } else if (nonAuthRoutes.includes(router.pathname)) {
          router.replace("/");
        } else if (!rolePermissions[role]?.routes.includes(router.pathname)) {
          router.replace("/401");
        }
        authCheckRef.current = true;
      }
    }
  }, [isMounted]);

  return authCheckRef.current ? children : null
};

export default ProtectedRoute;
