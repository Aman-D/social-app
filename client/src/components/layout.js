import React from "react";
import { Container, Fab } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import { NavigationBottom } from "./index";
const Layout = ({ children, ...rest }) => {
  return (
    <Container style={{ minHeight: "100vh", marginTop: 70 }} {...rest}>
      {children}
      <NavigationBottom />
    </Container>
  );
};

export default Layout;
