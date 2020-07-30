import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Paper,
  Button,
} from "@material-ui/core";
import { url } from "../helper/urls";
import { UserContext } from "../context-provider/user";
import { includes } from "lodash";

const useStyles = makeStyles((theme) => {
  return {
    textAvt: {
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      backgroundColor: theme.palette.secondary.main,
    },
    recmdCard: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    searchCard: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
});

const UserCard = ({ user: { _id, username, image }, type, following }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const userId = user.profile["_id"];
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    if (includes(following, _id)) {
      setFollowState(true);
    }
  }, [following]);

  // Return if same user
  if (userId === _id) return null;

  const followUser = async (props) => {
    const { user } = props;
    var headers = new Headers();
    const token = localStorage.getItem("social-app-user");
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-type", "application/json");
    var reqOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        user,
      }),
    };

    const followUrl = followState ? url.post.unFollow : url.post.follow;
    await fetch(followUrl, reqOptions)
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.type === "success") {
          setFollowState(!followState);
        }
        if (data.type === "error") {
          return;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid item xs={type === "vertical" ? 4 : 12}>
      <Paper
        className={type === "vertical" ? classes.recmdCard : classes.searchCard}
      >
        {!image ? (
          <Avatar className={classes.textAvt}>{username[0]}</Avatar>
        ) : (
          <Avatar src={image} />
        )}
        <Typography variant="subtitle2" style={{ margin: "5px 0" }}>
          {username}
        </Typography>
        <Button
          variant={followState ? "outlined" : "contained"}
          color="secondary"
          size="small"
          onClick={() => followUser({ user: _id })}
          disableElevation
          style={{ fontSize: "10px" }}
        >
          {followState ? "FOLLOWING" : "FOLLOW"}
        </Button>
      </Paper>
    </Grid>
  );
};

export default UserCard;
