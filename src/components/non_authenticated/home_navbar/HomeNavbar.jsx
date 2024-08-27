import React from "react";
import "./HomeNavbar.css";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <ul>
        <li onClick={() => navigate("")}>Home</li>
        <li onClick={() => navigate("login")}>Login</li>
        <li onClick={() => navigate("signup")}>Sign up</li>
      </ul>
    </div>
  );
};

export default HomeNavbar;
