import React, { useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Profile } from "../components/index";
import userActionTypes from "../action-type/user";
import { UserContext } from "../context-provider/user";

const Dashboard = () => {
  const { dispatch, user } = useContext(UserContext);
  const { UPDATE_USER } = userActionTypes;

  const fetchProfile = async (token) => {
    await fetch("http://localhost:5000/user/profile", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data: { result: { user, posts } } }) =>
        dispatch({ type: UPDATE_USER, payload: { profile: user, posts } })
      );
    return;
  };
  useEffect(() => {
    if (!user.profile) {
      try {
        const token = localStorage.getItem("social-app-user");
        fetchProfile(token);
      } catch (error) {
        console.log(error);
      }
    }
  }, [fetchProfile, user.profile]);

  return (
    <Grid>
      <Profile />
    </Grid>
  );
};

export default Dashboard;
