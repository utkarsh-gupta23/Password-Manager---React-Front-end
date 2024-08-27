import { useEffect, useState } from "react";
import Card from "../card/Card";
import axios from "axios";
import "./CredentialList.css";
import { useCredentailContext } from "../../../hooks/useCredentialContext";
import AddCredentialForm from "../add_credential/AddCredential";
import AddCredentialModal from "../../modal/AddCredentialModal";
import { API_URL } from "../../../constants";

function CredentialList({ modal, closeModal }) {
  const { credentials, dispatch: updateCredentials } = useCredentailContext();
  useEffect(() => {
    console.log("hello from Credential List");
    async function fetchCredentials() {
      try {
        const response = await axios.get(`${API_URL}/credentials`, {
          withCredentials: true,
        });
        if (response.status == 200) {
          updateCredentials({ type: "SET", payload: response.data });
        }
      } catch (error) {
        console.log(error);
      }
      // setCredentials(response.data);
    }
    fetchCredentials();
  }, []);
  return (
    <div className="container">
      <div className="card-container">
        <div>Your Credentials</div>
        {credentials &&
          credentials.map((ele) => {
            return (
              <Card
                key={ele.username + ele.password + ele.website}
                title={ele.title}
                username={ele.username}
                password={ele.password}
                website={ele.website}
                id={ele.id}
              />
            );
          })}
      </div>
      {modal && (
        <AddCredentialModal onClose={closeModal}>
          <AddCredentialForm onClose={closeModal} />
        </AddCredentialModal>
      )}
    </div>
  );
}

export default CredentialList;
