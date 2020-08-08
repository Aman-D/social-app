import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { settingLinks } from "../helper/settingsLink";
import { ArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { LikedPosts } from "../components/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tab: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Options = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h2">Social App</Typography>
          <Typography variant="subtitle2">
            This app is made as a practice project and ensures no data will be
            used for unfair means. Contact dhurweyrock@gmail.com for any
            queries.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {settingLinks.map(({ title, path }, index) => (
          <Paper
            key={index}
            className={classes.tab}
            onClick={() => history.push(path, { from: "/settings" })}
          >
            <Typography className={classes.heading}>{title}</Typography>
            <ArrowRight />
          </Paper>
        ))}
      </Grid>
    </>
  );
};

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route to="/liked-posts" component={LikedPosts} />
        <Route to="/" component={Options} />
      </Switch>
    </div>
  );
};

export default Settings;
