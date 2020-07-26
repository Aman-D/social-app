import React, { useEffect, useState } from "react";
import { PostList } from "../components/index";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { url } from "../helper/urls";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(10),
  },
  bottomText: {
    textAlign: "center",
    margin: `${theme.spacing(10)} 0`,
  },
}));
const Home = () => {
  const [posts, setPosts] = useState(null);
  const classes = useStyles();
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("social-app-user");
      fetch(url.get.allPost, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          if (data.type === "error") {
            setPosts(null);
          }
          if (data.type === "success") {
            const { posts } = data;
            setPosts(posts);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      setPosts(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return posts ? (
    <Grid className={classes.root}>
      <PostList posts={posts} />
      <Typography variant="h5" className={classes.bottomText}>
        You are all caught up :)
      </Typography>
    </Grid>
  ) : (
    "loading.........."
  );
};

export default Home;
