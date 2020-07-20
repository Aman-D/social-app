import React from "react";

const Layout = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export default Layout;
