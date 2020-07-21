import React, { useContext } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Avatar,
  Box,
  Typography,
} from "@material-ui/core";
import { UserContext } from "../context-provider/user";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  profile: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  follow: {
    display: "flex",
  },
  followCount: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
}));
const Profile = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { profile } = user;

  if (!profile) {
    return "Loading.............";
  } else {
    return (
      <Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Avatar
              src="https://picsum.photos/200/300"
              className={classes.profile}
            />
            <Typography variant="h6">{profile.username}</Typography>
            <Box className={classes.follow}>
              <Box className={classes.followCount}>
                <Typography variant="subtitle1">0</Typography>
                <Typography variant="subtitle2">Followers</Typography>
              </Box>
              <Box className={classes.followCount}>
                <Typography variant="subtitle1">0</Typography>
                <Typography variant="subtitle2">Following</Typography>
              </Box>
            </Box>

            <Typography variant="caption">{profile.bio}</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Profile;
