import React, { useContext, useEffect } from "react";
import { UserContext } from "../context-provider/user";
import userActionTypes from "../action-type/user";
import { useHistory } from "react-router-dom";
const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: userActionTypes.DELETE_USER });
    localStorage.removeItem("social-app-user");
    history.push("/auth");
  }, []);
  return null;
};

export default Logout;
