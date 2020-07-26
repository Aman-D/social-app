import React, { createContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import { useSearchBox } from "../components/index";
export const NavContext = createContext();
const NavBarProvider = ({ children }) => {
  const trigger = useScrollTrigger();
  const [search, SearchBar] = useSearchBox("");
  const [navComponent, setComponent] = useState(<h1>Navbar</h1>);
  const setNavBar = (component) => {
    setComponent(component);
  };
  return (
    <NavContext.Provider value={{ setNavBar }}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>{navComponent}</Toolbar>
        </AppBar>
      </Slide>
      {children}
    </NavContext.Provider>
  );
};

export default NavBarProvider;
