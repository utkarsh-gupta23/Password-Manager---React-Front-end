import { Routes, Route } from "react-router-dom";
import Authenticated from "./components/authenticated/Authenticated";
import NonAuthenticated from "./components/non_authenticated/NonAuthenticated";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        {user && (
          <>
            <Route path="/credentials/*" element={<Authenticated />} />
            <Route path="*" element={<Navigate to="/credentials" />} />
          </>
        )}
        {!user && (
          <>
            <Route path="/home/*" element={<NonAuthenticated />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </>
  );
}

export default App;
