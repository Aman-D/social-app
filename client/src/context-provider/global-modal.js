import React, { createContext, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@material-ui/core";
import { UserContext } from "../context-provider/user";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ModalContext = createContext();
const GlobalModalProvider = ({ children }) => {
  const classes = useStyles();
  const [modalChildren, setchildren] = useState({
    component: <h1>I am the modal</h1>,
    title: "Modal",
  });
  const [open, setOpen] = React.useState(false);

  const { user } = useContext(UserContext);
  const handleClick = (component, title) => {
    setchildren({ component, title });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ handleClick }}>
      {children}
      {user && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {modalChildren.title}
              </Typography>
            </Toolbar>
          </AppBar>
          {modalChildren.component}
        </Dialog>
      )}
    </ModalContext.Provider>
  );
};

export default GlobalModalProvider;
