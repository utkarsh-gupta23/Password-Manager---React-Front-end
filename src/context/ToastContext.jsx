import { createContext, useEffect, useReducer } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = createContext({});

const configuration = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      toast.error(action.payload, configuration);
      return state;

    case "SUCCESS":
      toast.success(action.payload, configuration);
      return state;

    default:
      return state;
  }
};

export const ToastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, {});

  return (
    <ToastContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
