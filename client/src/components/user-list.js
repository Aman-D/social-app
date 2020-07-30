import React, { useEffect, useState, useContext } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { UserCard } from "./index";
import { url } from "../helper/urls";
import { ToastContext } from "../context-provider/toast";
import { includes } from "lodash";
const useStyles = makeStyles((theme) => {
  return {
    list: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: theme.spacing(2),
      justifyContent: "flex-start",
    },
  };
});
const UserList = ({ users, title, type, useFFilter }) => {
  const classes = useStyles();
  const [following, setFollowing] = useState([]); // array of users the user is following
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const getFollowing = async () => {
      var headers = new Headers();
      const token = localStorage.getItem("social-app-user");
      headers.append("Authorization", `Bearer ${token}`);
      var reqOptions = {
        method: "GET",
        headers,
      };
      await fetch(url.get.following, reqOptions)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data.type === "success") {
            setFollowing(data.following);
          }
          if (data.type === "error") {
            toast({ type: "warning", message: "Some technical problem" });
          }
        })
        .catch((error) => console.log(error));
    };
    getFollowing();
  }, []);

  // don't show the people user is already following in recommendation
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Grid container justify="center" spacing={2} className={classes.list}>
        {users.map((user, index) => {
          if (useFFilter) {
            if (!includes(following, user["_id"])) {
              return <UserCard key={index} user={user} type={type} />;
            }
          } else {
            return (
              <UserCard
                key={index}
                following={following}
                user={user}
                type={type}
              />
            );
          }
        })}
      </Grid>
    </>
  );
};

export default UserList;
