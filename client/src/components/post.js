import React, { useState } from "react";

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
import { MoreVert, FavoriteOutlined } from "@material-ui/icons";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
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
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },

  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const Post = ({
  post: {
    description,
    likes,
    postImage,
    postedBy: { username },
    datePosted,
  },
}) => {
  const classes = useStyles();
  const [like, setLiked] = useState(false);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {username[0]}
          </Avatar>
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
          onClick={() => setLiked(!like)}
        >
          <FavoriteOutlined className={like ? classes.like : classes.unLike} />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
