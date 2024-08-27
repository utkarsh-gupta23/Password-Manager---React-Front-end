import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import ToastContextProvider from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <AuthContextProvider>
      <ToastContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastContextProvider>
    </AuthContextProvider>
  </>
);
