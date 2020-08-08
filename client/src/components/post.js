import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import {
  MoreVert,
  FavoriteOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { url } from "../helper/urls";
import authRequest from "../helper/authRequest";
import { ToastContext } from "../context-provider/toast";
import moment from "moment";

const Post = ({
  post: {
    _id,
    description,
    likes,
    postImage,
    postedBy: { username, image },
    datePosted,
  },
}) => {
  const classes = useStyles();
  const [like, setLiked] = useState(false);
  const { toast } = useContext(ToastContext);
  const handleLike = async (id) => {
    try {
      let headers = new Headers();
      const token = localStorage.getItem("social-app-user");
      headers.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: "POST",
        headers,
      };
      await fetch(`${url.post.like}/${id}`, requestOptions)
        .then((response) => response.json())
        .then(({ data: { type } }) => {
          if (type === "error") {
            toast({ type: "error", message: "Error! PLease try again later" });
          }
          if (type === "success") {
            setLiked(!like);
          }
        });
    } catch (error) {
      console.log(error);
      toast({ type: "error", message: "Error! PLease try again later" });
    }
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          image ? (
            <Avatar
              aria-label="recipe"
              src={image}
              className={classes.avatar}
            />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {username[0]}
            </Avatar>
          )
        }
        title={username}
        subheader={moment(datePosted).format("dddd Do MMMM, YYYY")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      {postImage ? (
        <CardMedia image={postImage} className={classes.media} />
      ) : (
        ""
      )}
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleLike(_id)}
        >
          {!like ? (
            <FavoriteBorderOutlined className={classes.unLike} />
          ) : (
            <FavoriteOutlined color="secondary" className={classes.Like} />
          )}
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  unLike: {
    color: theme.palette.primary.light,
  },
  like: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.main,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },

  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default Post;
