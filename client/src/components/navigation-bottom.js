import React, { useState } from "react";
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
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";

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
  const ex = `\/[a-z]*`;
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname.match(ex)[0].slice(1));
  const match = useRouteMatch("/auth");
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
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
