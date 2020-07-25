import React, { createContext, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Modal,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  CardHeader,
  Avatar,
  TextField,
} from "@material-ui/core";
import { Close, PhotoCamera } from "@material-ui/icons";
import { UserContext } from "../context-provider/user";
import moment from "moment";
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
  appBar: {
    position: "relative",
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
    fontSize: theme.typography.body2,
    width: "100%",
  },
  input: {
    display: "none",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ModalContext = createContext();
const GlobalModalProvider = ({ children }) => {
  const classes = useStyles();
  const [modalChildren, setchildren] = useState(<h1>I am the modal</h1>);
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = useState({
    body: "",
    image: "",
  });
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    console.log(post);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ handleClick }}>
      {children}
      {user && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Post
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Post
              </Button>
            </Toolbar>
          </AppBar>
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
                      <Avatar aria-label="recipe" className={classes.avatar}>
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
                <form>
                  <textarea
                    className={classes.textarea}
                    name="body"
                    value={post.body}
                    onChange={handleChange}
                    maxLength={500}
                    rows={20}
                  ></textarea>
                </form>
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </ModalContext.Provider>
  );
};

export default GlobalModalProvider;
