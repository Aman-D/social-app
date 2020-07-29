import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Paper,
  Button,
} from "@material-ui/core";

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

const UserCard = ({ user: { _id, username, image }, type }) => {
  const classes = useStyles();
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
          href={`http://localhost:5000/user/friend/${_id}`}
          variant="outlined"
          color="secondary"
          size="small"
          disableElevation
        >
          Follow
        </Button>
      </Paper>
    </Grid>
  );
};

export default UserCard;
