import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import EditProfile from "./edit_profile/EditProfile";
import CredentialList from "./credentials/CredentialList";
import { CredentialContextProvider } from "../../context/CredentialContext";

function Authenticated() {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <CredentialContextProvider>
        <Navbar openModal={openModal} />
        <Routes>
          <Route
            path="/"
            element={<CredentialList modal={modal} closeModal={closeModal} />}
          />
          <Route path="edit-profile" element={<EditProfile />} />
          {/* <Route path="add-credential" element={<AddCredential />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CredentialContextProvider>
    </>
  );
}

export default Authenticated;
