import React, { useEffect, useState, useContext } from "react";
import { PostList, Spinner, NavCam } from "../components/index";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { url } from "../helper/urls";
import { NavContext } from "../context-provider/navBar";

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
  const { setNavBar } = useContext(NavContext);
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
    setNavBar(NavCam);
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
    <Spinner />
  );
};

export default Home;
