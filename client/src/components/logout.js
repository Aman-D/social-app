import React, { useContext } from "react";
import { UserContext } from "../context-provider/user";
import userActionTypes from "../action-type/user";
const Logout = () => {
  const { dispatch } = useContext(UserContext);
  dispatch({ type: userActionTypes.DELETE_USER });
  localStorage.removeItem("social-app-user");
  return null;
};

export default Logout;
