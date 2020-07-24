import React from "react";
import { Container, Fab } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import { NavigationBottom } from "./index";
const Layout = ({ children, ...rest }) => {
  return (
    <Container style={{ minHeight: "100vh" }} {...rest}>
      {children}
      <NavigationBottom />
      <Fab
        color="secondary"
        aria-label="edit"
        style={{
          position: "fixed",
          bottom: "4%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <AddBox />
      </Fab>
    </Container>
  );
};

export default Layout;
