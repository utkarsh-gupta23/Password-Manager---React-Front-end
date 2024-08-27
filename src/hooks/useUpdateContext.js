import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../constants";
import { useAuthContext } from "./useAuthContext";
import { ToastContext } from "../context/ToastContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { dispatch: showToast } = useContext(ToastContext);

  const update = async (username, pass) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/sessions`,
        {
          user: {
            user_name: username,
            password: pass,
          },
        },
        {
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        //update local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        //call login again to similarly update the user context.
        dispatch({ type: "LOGIN", payload: response.data.user });

        showToast({ type: "SUCCESS", payload: "UPDATED SUCCESSFULLY" });
      }
    } catch (error) {
      //   console.log(error.response.data);
      if (error.response && error.response.data)
        setError(error.response.data.message);
    }
  };
  return { update, isLoading, error };
};
