import type { Router } from "next/router";
import { useEffect } from "react";

export const useSessionRouter = (routerAsPath: Router["asPath"]) => {
  useEffect(() => {
    const storage = sessionStorage;
    if (!storage.getItem("currentPath")) storage.setItem("currentPath", routerAsPath);
    return () => {
      const prevPath = storage.getItem("currentPath");
      if (prevPath) storage.setItem("prevPath", prevPath);
      storage.setItem("currentPath", globalThis.location.pathname);
    };
  }, [routerAsPath]);
};
