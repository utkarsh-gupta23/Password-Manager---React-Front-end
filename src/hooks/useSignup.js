import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../constants";
import { useAuthContext } from "./useAuthContext";
import { ToastContext } from "../context/ToastContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { dispatch: showToast } = useContext(ToastContext);
  const signup = async (username, pass, pass_conf, displayName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/registrations`,
        {
          user: {
            user_name: username,
            password: pass,
            password_confirmation: pass_conf,
            display_name: displayName,
          },
        },
        { withCredentials: true }
      );
      if (response.status == 201) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({ type: "LOGIN", payload: response.data.user });
        showToast({ type: "SUCCESS", payload: "User Created sucessfully" });
      }
    } catch (error) {
      //   console.log(error.response.data);
      setError(error.response.data.message);
    }
  };
  return { signup, isLoading, error };
};
