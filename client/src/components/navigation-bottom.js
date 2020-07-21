import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@material-ui/core";
import {
  HomeTwoTone,
  AccountCircleTwoTone,
  // AddCircleTwoTone,
  GroupAddTwoTone,
  SettingsTwoTone,
} from "@material-ui/icons";
import { navigate, useMatch } from "@reach/router";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100vw",
      borderRadius: "10px",
      "& .Mui-selected": {
        color: theme.palette.secondary["light"],
      },
    },
  };
});
const NavigationBottom = () => {
  const classes = useStyles();
  const [value, setValue] = useState("home");
  const match = useMatch("/auth");

  const navigateTo = (value) => {
    navigate(`/${value}`);
  };

  useEffect(() => {
    !match && navigateTo(value);
  }, [value, match]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return match ? null : (
    <Paper className={classes.root} elevation={10}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="home" icon={<HomeTwoTone />} />
        <BottomNavigationAction value="search" icon={<GroupAddTwoTone />} />
        {/* <BottomNavigationAction value="newPost" icon={<AddCircleTwoTone />} /> */}
        <BottomNavigationAction value="settings" icon={<SettingsTwoTone />} />
        <BottomNavigationAction
          value="profile"
          icon={<AccountCircleTwoTone />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationBottom;
