import { act, createContext, useEffect, useReducer } from "react";

export const CredentialContext = createContext({});

const credReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        credentials: action.payload,
        originalCredentials: action.payload,
      };
    case "CREATE":
      return {
        credentials: [action.payload, ...state.credentials],
        originalCredentials: [action.payload, ...state.credentials],
      };
    case "DELETE":
      return {
        credentials: state.credentials.filter((c) => c.id != action.payload.id),
        originalCredentials: state.originalCredentials.filter(
          (c) => c.id != action.payload.id
        ),
      };
    case "SEARCH":
      if (action.payload === "") {
        return {
          ...state,
          credentials: state.originalCredentials, // Reset to the original list
        };
      }
      return {
        ...state,
        credentials: state.originalCredentials.filter(
          (c) =>
            c.title.includes(action.payload) ||
            c.website.includes(action.payload) ||
            c.username.includes(action.payload)
        ),
      };
    case "UPDATE":
      return {
        credentials: state.credentials.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        originalCredentials: state.originalCredentials.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    default:
      return state;
  }
};

export const CredentialContextProvider = ({ children }) => {
  //diptach passes everything in action object

  //so when the app renders, the user is null
  const [state, dispatch] = useReducer(credReducer, {
    credentials: [],
    originalCredentials: [],
  });

  console.log(
    `${new Date().toLocaleTimeString()} CredentialContext state : ${JSON.stringify(
      state
    )}`
  );
  return (
    <CredentialContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CredentialContext.Provider>
  );
};
