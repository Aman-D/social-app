import React, { useReducer, createContext } from "react";
import { userReducer } from "../reducer/userReducer";
export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={{ dispatch, user: userState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
