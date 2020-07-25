import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@material-ui/core";
import { Container, Fab } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import {
  HomeTwoTone,
  AccountCircleTwoTone,
  // AddCircleTwoTone,
  GroupAddTwoTone,
  SettingsTwoTone,
} from "@material-ui/icons";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { ModalContext } from "../context-provider/global-modal";

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
  const { handleClick } = useContext(ModalContext);

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
      <Fab
        color="secondary"
        aria-label="edit"
        style={{
          position: "fixed",
          bottom: "4%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => handleClick()}
      >
        <AddBox />
      </Fab>
    </Paper>
  );
};

export default NavigationBottom;
