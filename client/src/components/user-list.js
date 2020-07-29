import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { UserCard } from "./index";
const useStyles = makeStyles((theme) => {
  return {
    list: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: theme.spacing(2),
    },
  };
});
const UserList = ({ users, title, type }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Grid container justify="center" spacing={2} className={classes.list}>
        {users.map((user, index) => (
          <UserCard key={index} user={user} type={type} />
        ))}
      </Grid>
    </>
  );
};

export default UserList;
