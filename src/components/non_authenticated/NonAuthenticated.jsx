import React from "react";
import HomeNavbar from "./home_navbar/HomeNavbar";
import HomePage from "./home_page/HomePage";
import { Routes, Route } from "react-router-dom";

import Signup from "./signup/Signup";
import LoginForm from "./login/Login";

function NonAuthenticated() {
  return (
    <>
      <HomeNavbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default NonAuthenticated;
