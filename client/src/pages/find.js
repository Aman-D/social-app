import React, { useContext, useState, useEffect } from "react";
import { useSearchBox } from "../components/index";
import { NavContext } from "../context-provider/navBar";
import {
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Paper,
  Button,
  GridList,
  GridListTile,
} from "@material-ui/core";
import { url } from "../helper/urls";
import { ToastContext } from "../context-provider/toast";
import { Spinner } from "../components/index";
const useStyles = makeStyles((theme) => {
  return {
    intro: {
      textAlign: "center",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    recomd: {
      flexDirection: "column",
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: theme.spacing(2),
    },
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
    searchButton: {
      marginLeft: theme.spacing(1),
      color: theme.palette.getContrastText(theme.palette.common.white),
      backgroundColor: theme.palette.common.white,
    },
    searchCard: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
});
const Find = () => {
  const classes = useStyles();
  const [searchQuery, SearchBox] = useSearchBox("car");
  const [searching, toggleSearching] = useState(false);
  const { setNavBar } = useContext(NavContext);
  const { toast } = useContext(ToastContext);
  const [recUsers, setRecUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  useEffect(() => {
    setNavBar(SearchBox);
  }, []);

  const ha = async () => {
    var headers = new Headers();
    const token = localStorage.getItem("social-app-user");
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-type", "application/json");
    var reqOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        user: searchQuery,
      }),
    };
    await fetch(url.post.findUser, reqOptions)
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.type === "error") {
          toast({ type: "error", message: "Server Error" });
        }
        if (data.type === "success") {
          setSearchUser(data.users);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    var headers = new Headers();
    const token = localStorage.getItem("social-app-user");
    headers.append("Authorization", `Bearer ${token}`);

    var reqOptions = {
      method: "GET",
      headers,
    };

    const fetchR = async () => {
      await fetch(url.get.recommendation, reqOptions)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data.type === "success") {
            setRecUsers(data.result);
          }
          if (data.type === "error") {
            toast({
              type: "error",
              message: "Server Problem, Please try later",
            });
          }
        })
        .catch((error) => console.log(error));
    };

    fetchR();
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.intro}>
          Search for your friends, influencer, loved ones and stay connected.
          <Button
            size="small"
            variant="contained"
            color="inherit"
            className={classes.searchButton}
            onClick={ha}
          >
            Search
          </Button>
        </Typography>
      </Grid>
      {searchUser === null ? (
        ""
      ) : searchUser.length === 0 ? (
        <h6>No users found</h6>
      ) : (
        <Grid item xs={12} className={classes.recomd}>
          {!searchUser ? (
            <Spinner />
          ) : (
            <>
              <Typography variant="h6">Search Result</Typography>
              <Grid
                container
                justify="center"
                spacing={2}
                className={classes.list}
              >
                {searchUser.map(({ username, image }, index) => (
                  <Grid key={index} item xs={12}>
                    <Paper className={classes.searchCard}>
                      {!image ? (
                        <Avatar className={classes.textAvt}>
                          {username[0]}
                        </Avatar>
                      ) : (
                        <Avatar src={image} />
                      )}
                      <Typography
                        variant="subtitle2"
                        style={{ margin: "0 5px" }}
                      >
                        {username}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        disableElevation
                      >
                        Follow
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      )}
      <Grid item xs={12} className={classes.recomd}>
        {!recUsers ? (
          <Spinner />
        ) : (
          <>
            <Typography variant="h6">Recommendation</Typography>
            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.list}
            >
              {recUsers.map(({ username, image }, index) => (
                <Grid key={index} item xs={4}>
                  <Paper className={classes.recmdCard}>
                    {!image ? (
                      <Avatar className={classes.textAvt}>{username[0]}</Avatar>
                    ) : (
                      <Avatar src={image} />
                    )}
                    <Typography variant="subtitle2" style={{ margin: "5px 0" }}>
                      {username}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      disableElevation
                    >
                      Follow
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Find;
