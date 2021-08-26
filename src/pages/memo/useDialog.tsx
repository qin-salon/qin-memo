import { useReducer } from "react";

const initialState = {
  isShowMenuDialog: false,
  isShowConfirmDialog: false,
};

/**
 * @package
 */
export type DialogActionType =
  | { type: "SHOW_MENU_DIALOG" }
  | { type: "HIDE_MENU_DIALOG" }
  | { type: "SHOW_CONFIRM_DIALOG" }
  | { type: "HIDE_CONFIRM_DIALOG" };

const reducer = (_state = initialState, action: DialogActionType) => {
  switch (action.type) {
    case "SHOW_MENU_DIALOG":
      return { isShowMenuDialog: true, isShowConfirmDialog: false };
    case "HIDE_MENU_DIALOG":
      return { isShowMenuDialog: false, isShowConfirmDialog: false };
    case "SHOW_CONFIRM_DIALOG":
      return { isShowMenuDialog: false, isShowConfirmDialog: true };
    case "HIDE_CONFIRM_DIALOG":
      return { isShowMenuDialog: false, isShowConfirmDialog: false };
    default:
      throw new Error("Unknown action type");
  }
};

/**
 * @package
 */
export const useDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, dispatch };
};
