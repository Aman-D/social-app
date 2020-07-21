import React from "react";
import { Container } from "@material-ui/core";
import { NavigationBottom } from "./index";
const Layout = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
      <NavigationBottom />
    </Container>
  );
};

export default Layout;
