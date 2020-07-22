import React, { useState, useContext } from "react";
import { Box, Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context-provider/user";
import userActionTypes from "../action-type/user";
import { useHistory } from "react-router-dom";
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

const Form = () => {
  const classes = useStyles();
  const [formType, setFormType] = useState("signUp");
  const [signupForm, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const url =
      formType === "signUp"
        ? "http://localhost:5000/auth/signup"
        : "http://localhost:5000/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      });

      response.json().then(async (res) => {
        if (formType === "login") {
          const { token, user, posts } = res.data;
          localStorage.setItem("social-app-user", token);
          await dispatch({
            type: userActionTypes.UPDATE_USER,
            payload: { profile: user, posts },
          });
          history.push("/home");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...signupForm, [name]: value });
  };

  const { username, password, email } = signupForm;
  return (
    <Paper className={classes.paper} elevation={1}>
      <form className={classes.root} onSubmit={handelSubmit} autoComplete="off">
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

export default Form;
