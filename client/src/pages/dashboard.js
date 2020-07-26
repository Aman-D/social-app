import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { Profile, PostList } from "../components/index";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context-provider/user";
import { Spinner } from "../components/index";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(10),
    minHeight: "100vh",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const {
    user: { posts, profile },
  } = useContext(UserContext);
  return (
    <Grid className={classes.root}>
      {!profile || !posts ? (
        <Spinner />
      ) : (
        <>
          <Profile profile={profile} />
          <PostList posts={posts} />
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
