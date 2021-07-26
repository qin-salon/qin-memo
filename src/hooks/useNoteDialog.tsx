import { useCallback, useState } from "react";

export const useNoteDialog = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleOpenMenu = useCallback(() => {
    setIsShowMenu(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsShowMenu(false);
  }, []);

  return { isShowMenu, handleOpenMenu, handleCloseMenu };
};
