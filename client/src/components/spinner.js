import React from "react";
import { CircularProgress, Container, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "-webkit-fill-available",
    },
  };
});
const Spinner = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <CircularProgress color="secondary" />
    </Container>
  );
};

export default Spinner;
