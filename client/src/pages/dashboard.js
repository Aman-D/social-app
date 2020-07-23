import React from "react";
import { Grid } from "@material-ui/core";
import { Profile, Post } from "../components/index";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(10),
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Profile />
      <Post />
    </Grid>
  );
};

export default Dashboard;
