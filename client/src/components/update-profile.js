import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  TextField,
  Input,
  InputLabel,
  makeStyles,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  TextareaAutosize,
} from "@material-ui/core";
import { UserContext } from "../context-provider/user";
import { useHistory } from "react-router-dom";
import userActionTypes from "../action-type/user";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(10),
  },
  input: {
    width: "100%",
  },
  file: {
    display: "none",
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
    padding: theme.spacing(3),
  },
  chooseFile: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    color: "white",
    width: "fit-content",
    marginTop: theme.spacing(2),
  },
  profile: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatarBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },
  fields: {
    marginTop: theme.spacing(2),
    width: "80%",
  },
  buttonGroup: {
    justifyContent: "center",
  },
  textarea: {
    border: "none",
    fontFamily: theme.typography,
  },
}));
const UpdateProfile = () => {
  const classes = useStyles();
  const { user, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState(user.profile);
  const history = useHistory();

  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //converts file to an url
    reader.onloadend = () => {
      setProfile({
        ...profile,
        image: reader.result,
      });
    };
  };
  const handleSubmit = async (e) => {
    console.log(profile);
    e.preventDefault();
    try {
      const token = localStorage.getItem("social-app-user");
      await fetch("http://localhost:5000/user/profile/update", {
        method: "POST",
        body: JSON.stringify(profile),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ data: { type, result } }) => {
          if (type === "success") {
            dispatch({ type: userActionTypes.UPDATE_USER, payload: result });
          } else {
            console.log("some error");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const { type } = file;
    if (type === "image/jpeg" || type === "image/png") {
      console.log("Right Format");
    }

    preview(file);
  };
  return (
    <form autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
      <Box className={`${classes.avatarBox} ${classes.fields}`}>
        <Avatar
          src={profile.image ? profile.image : "https://picsum.photos/200/300"}
          className={classes.profile}
        />
        <Input
          id="profile_picture"
          type="file"
          name="imageUrl"
          className={classes.file}
          onChange={handleFile}
        />
        <InputLabel htmlFor="profile_picture" className={classes.chooseFile}>
          Choose File
        </InputLabel>
      </Box>
      <TextField
        className={classes.fields}
        id="username"
        label="Username"
        color="secondary"
        type="text"
        name="username"
        value={profile.username}
        onChange={handleChange}
        required
      />
      <TextField
        className={classes.fields}
        id="email"
        label="Email"
        color="secondary"
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        required
      />
      <TextField
        className={`${classes.fields}`}
        multiline
        id="bio"
        label="Bio"
        color="secondary"
        name="bio"
        rows={4}
        rowsMax={4}
        value={profile.bio}
        onChange={handleChange}
        maxLength={100}
        inputProps={{
          maxLength: 100,
        }}
        helperText={`${profile.bio.length}/${100}`}
      />

      <Grid className={classes.buttonGroup} style={{ marginTop: "15px" }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "0 10px" }}
          type="submit"
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0 10px" }}
          onClick={() => {
            history.push(history.location.state.from);
          }}
        >
          Go Back
        </Button>
      </Grid>
    </form>
  );
};

export default UpdateProfile;
