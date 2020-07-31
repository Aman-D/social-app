import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Profile, PostList } from "../components/index";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context-provider/user";
import { Spinner } from "../components/index";
import { url } from "../helper/urls";
import userActionTypes from "../action-type/user";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(10),
    minHeight: "100vh",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const {
    user: { posts, profile, followers, following },
    dispatch,
  } = useContext(UserContext);

  const fetchffCount = async () => {
    var headers = new Headers();
    const token = localStorage.getItem("social-app-user");
    headers.append("Authorization", `Bearer ${token}`);
    var reqOptions = {
      method: "GET",
      headers,
    };
    await fetch(url.get.ffCount, reqOptions)
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.type === "success") {
          dispatch({
            type: userActionTypes.UPDATE_FF,
            payload: {
              followers: data.followers,
              following: data.following,
            },
          });
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchffCount();
  }, []);

  return (
    <Grid className={classes.root}>
      {!profile || !posts ? (
        <Spinner />
      ) : (
        <>
          <Profile
            profile={profile}
            followers={followers}
            following={following}
          />
          <PostList posts={posts} />
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
