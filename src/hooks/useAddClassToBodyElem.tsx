import { useEffect } from "react";

export const useAddClassToBodyElem = (className: string) => {
  useEffect(() => {
    document.body.classList.add(className);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
