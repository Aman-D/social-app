import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Avatar,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

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

const Profile = ({ profile, followers, following }) => {
  const classes = useStyles();

  if (!profile) {
    return "Loading.............";
  } else {
    return (
      <Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Avatar
              src={
                profile.image ? profile.image : "https://picsum.photos/200/300"
              }
              className={classes.profile}
            />
            <Typography variant="h6">{profile.username}</Typography>
            <Box className={classes.follow}>
              <Box className={classes.followCount}>
                <Typography variant="subtitle1">{followers}</Typography>
                <Typography variant="subtitle2">Followers</Typography>
              </Box>
              <Box className={classes.followCount}>
                <Typography variant="subtitle1">{following}</Typography>
                <Typography variant="subtitle2">Following</Typography>
              </Box>
            </Box>

            {profile.bio ? (
              <Typography variant="subtitle2">{profile.bio}</Typography>
            ) : (
              <Button color="primary">Add Bio</Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Profile;
