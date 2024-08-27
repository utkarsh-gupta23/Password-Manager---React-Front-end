import { useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { ToastContext } from "../context/ToastContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: showToast } = useContext(ToastContext);

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    showToast({ type: "SUCCESS", payload: "LOGGED OUT SUCCESSFULLY" });
  };

  return { logout };
};
