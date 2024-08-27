import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../constants";
import { useAuthContext } from "./useAuthContext";
import { ToastContext } from "../context/ToastContext";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { dispatch: showToast } = useContext(ToastContext);
  const updateUser = async (username, displayName, password, new_password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${API_URL}/registrations`,
        {
          user_name: username,
          password: password,
          display_name: displayName,
          new_password: new_password,
        },
        { withCredentials: true }
      );
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({ type: "LOGIN", payload: response.data.user });
        showToast({ type: "SUCCESS", payload: "User updated sucessfully" });
      }
    } catch (error) {
      //   console.log(error.response.data);
      setError(error.response.data.message);
    }
  };
  return { updateUser, isLoading, error };
};
