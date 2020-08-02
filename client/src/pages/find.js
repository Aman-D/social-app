import React, { useContext, useState, useEffect } from "react";
import { useSearchBox } from "../components/index";
import { NavContext } from "../context-provider/navBar";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { url } from "../helper/urls";
import { ToastContext } from "../context-provider/toast";
import { Spinner } from "../components/index";
import { UserList } from "../components/index";
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
    searchButton: {
      marginLeft: theme.spacing(1),
      color: theme.palette.getContrastText(theme.palette.common.white),
      backgroundColor: theme.palette.common.white,
    },
  };
});
const Find = () => {
  const classes = useStyles();
  const [searchQuery, SearchBox] = useSearchBox("car");
  const { setNavBar } = useContext(NavContext);
  const { toast } = useContext(ToastContext);
  const [recUsers, setRecUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  useEffect(() => {
    setNavBar(SearchBox);
  }, []);

  const handleSubmit = async () => {
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
      <Grid
        item
        container
        xs={12}
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <Typography className={classes.intro}>
          Search for your friends, influencer, loved ones and stay connected.
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="inherit"
          className={classes.searchButton}
          onClick={handleSubmit}
        >
          {" "}
          Search
        </Button>
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
            <UserList
              users={searchUser}
              title="Search Result"
              type="horizontal"
              useFFilter={false}
            />
          )}
        </Grid>
      )}
      <Grid item xs={12} className={classes.recomd}>
        {!recUsers ? (
          <Spinner />
        ) : (
          <UserList
            useFFilter={true}
            users={recUsers}
            title="Recommendation"
            type="vertical"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Find;
