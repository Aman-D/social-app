import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  DialogContent,
  IconButton,
  Grid,
  CardHeader,
  Avatar,
  CardMedia,
} from "@material-ui/core";
import { Close, PhotoSizeSelectActual } from "@material-ui/icons";
import moment from "moment";
import { UserContext } from "../context-provider/user";
import { ToastContext } from "../context-provider/toast";

const useStyles = makeStyles((theme) => ({
  postBody: {
    border: "1px solid lightgray",
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
  dialogTitle: {
    display: "flex",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textarea: {
    resize: "none",
    overflow: "auto",
    outline: "none",
    border: "none",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    width: "100%",
  },
  input: {
    display: "none",
  },
  media: {
    maxWidth: 345,
    height: 324,
    // 16:9
  },
  removePhoto: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const NewPost = () => {
  const { toast } = useContext(ToastContext);
  const classes = useStyles();
  const [post, setPost] = useState({
    description: "",
    postImage: "",
  });

  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //converts file to an url
    reader.onloadend = () => {
      setPost({
        ...post,
        postImage: reader.result,
      });
    };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.description) {
      toast({ type: "error", message: "Post can't be blank" });
      return;
    }
    try {
      var headers = new Headers();
      const token = localStorage.getItem("social-app-user");
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers,
        body: JSON.stringify(post),
      };

      fetch("http://localhost:5000/post/new", requestOptions)
        .then((response) => response.json())
        .then(({ data: { type, message } }) => {
          if (type === "error") {
            toast({ type: "error", message: "Error! PLease try again later" });
          }
          if (type === "success") {
            toast({ type: "success", message });
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      toast({ type: "error", message: "Error! PLease try again later" });
      console.log(error);
    }
  };

  const removePhoto = () => setPost({ ...post, postImage: "" });
  return (
    <>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <CardHeader
              avatar={
                user.profile.image ? (
                  <Avatar
                    alt={user.profile.username}
                    src={user.profile.image}
                  />
                ) : (
                  <Avatar aria-label="username" className={classes.avatar}>
                    A
                  </Avatar>
                )
              }
              title={user.profile.username}
              subheader={moment(user.profile.datePosted).format(
                "dddd Do MMMM, YYYY"
              )}
            />
          </Grid>
          <Grid item xs={12} className={classes.postBody}>
            <form onSubmit={handleSubmit}>
              <textarea
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                }}
                className={classes.textarea}
                name="description"
                value={post.description}
                onChange={handleChange}
                maxLength={500}
                rows={5}
              ></textarea>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleFile}
              />

              {post.postImage && (
                <div style={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    image={post.postImage}
                  />
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="close"
                    className={classes.removePhoto}
                    onClick={removePhoto}
                  >
                    <Close />
                  </IconButton>
                </div>
              )}
              <div>
                <label htmlFor="icon-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className={classes.button}
                    startIcon={<PhotoSizeSelectActual />}
                  >
                    Picture
                  </Button>
                </label>
                <Button
                  className={classes.button}
                  variant="contained"
                  type="submit"
                  color="inherit"
                  color="secondary"
                >
                  POST
                </Button>
              </div>
            </form>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

export default NewPost;
