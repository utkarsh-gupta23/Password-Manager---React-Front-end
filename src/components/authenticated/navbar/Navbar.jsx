import React, { useState } from "react";

import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { AccountCircleOutlined } from "@mui/icons-material";
import SearchBox from "../search_box/SearchBox";

const Navbar = ({ openModal }) => {
  //mock logout and user
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <ul>
        <li onClick={() => navigate("")}>Credentials</li>
        <li onClick={() => navigate("edit-profile")}>
          <AccountCircleOutlined sx={{ mr: "8px" }} />
          {user.display_name}
        </li>
        <li
          onClick={() => {
            navigate("");
            openModal();
          }}
        >
          Add Credential
        </li>

        <li onClick={logout}>Logout</li>
      </ul>
      <SearchBox />
    </div>
  );
};

export default Navbar;
