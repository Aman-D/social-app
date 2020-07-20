import React, { useState } from "react";
import { Container, Box, Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
const useStyles = makeStyles((theme) => {
  console.log(theme);

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
    paper: {
      padding: theme.spacing(2),
      boxSizing: "content-box",
      width: "80%",
    },
    cta_button: {
      margin: theme.spacing(1),
    },
  };
});

const Auth = () => {
  const classes = useStyles();
  const [formType, setFormType] = useState("signUp");
  const Form = () => {
    const [signupForm, setForm] = useState({
      username: "",
      password: "",
      email: "",
    });

    const handelSubmit = (e) => {
      e.preventDefault();
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...signupForm, [name]: value });
    };

    const { username, password, email } = signupForm;
    return (
      <Paper className={classes.paper} elevation={1}>
        <form
          className={classes.root}
          onSubmit={handelSubmit}
          autoComplete="off"
        >
          {formType === "signUp" && (
            <TextField
              required
              id="username"
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              onChange={handleChange}
            />
          )}
          <TextField
            required
            id="email-signup"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            required
            id="password-signup"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            className={classes.cta_button}
          >
            {formType === "signUp" ? "SIGN UP" : "LOG IN"}
          </Button>
          {formType === "signUp" ? (
            <Box my={2}>
              <p>Already have an account ?</p>
              <Button color="secondary" onClick={() => setFormType("login")}>
                Log In
              </Button>
            </Box>
          ) : (
            <Box my={2}>
              <p>New to this app ?</p>
              <Button color="secondary" onClick={() => setFormType("signUp")}>
                Sign up Here
              </Button>
            </Box>
          )}
        </form>
      </Paper>
    );
  };

  return (
    <Container className={classes.container}>
      <Form />
    </Container>
  );
};

export default Auth;
