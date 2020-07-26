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
} from "@material-ui/core";
import { UserContext } from "../context-provider/user";
import { useHistory } from "react-router-dom";
import userActionTypes from "../action-type/user";
import { ToastContext } from "../context-provider/toast";
import { url } from "../helper/urls";
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
  const { toast } = useContext(ToastContext);
  const [currentUser, setProfile] = useState(user);
  const { profile } = currentUser;
  const history = useHistory();

  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //converts file to an url
    reader.onloadend = () => {
      setProfile({
        ...currentUser,
        profile: {
          ...profile,
          image: reader.result,
        },
      });
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("social-app-user");
      await fetch(url.post.updateUser, {
        method: "POST",
        body: JSON.stringify(currentUser.profile),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ data: { type, user } }) => {
          if (type === "success") {
            dispatch({
              type: userActionTypes.UPDATE_PROFILE,
              payload: { profile: user },
            });
            toast({ type, message: "Profile updated" });
          } else {
            toast({ type, message: "Please try again later" });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setProfile({
      ...currentUser,
      profile: {
        ...profile,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const { type, size } = file;
    console.log(Math.round(size / 1024 / 1024));
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
