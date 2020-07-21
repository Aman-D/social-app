import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "../components/index";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url(images/people.svg)",
      backgroundOrigin: "center",
      backgroundPosition: "0% 0%",
      backgroundSize: "cover",
      textAlign: "center",
    },
  };
});

const Auth = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Form />
    </Container>
  );
};

export default Auth;
