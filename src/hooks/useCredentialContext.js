import { useContext } from "react";
import { CredentialContext } from "../context/CredentialContext";

export const useCredentailContext = () => {
  const context = useContext(CredentialContext);

  if (!context) {
    throw Error("Credential context must be used inside provider");
  }
  return context;
};
