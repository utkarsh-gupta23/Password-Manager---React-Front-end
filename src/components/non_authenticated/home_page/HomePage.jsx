import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bla">
      <h1>Welcome to Password Manager</h1>
      <br />
      <h2>
        Please <span onClick={() => navigate("login")}>Login</span> or{" "}
        <span onClick={() => navigate("signup")}>Signup</span> up to continue
      </h2>
    </div>
  );
}

export default HomePage;
