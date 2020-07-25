import React, { createContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const ToastContext = createContext();
const ToastProvider = ({ children }) => {
  const classes = useStyles();
  const [toast, setToast] = useState({
    type: "success",
    message: "This is a success message",
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = ({ type, message }) => {
    setToast({ type, message });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ toast: handleClick }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toast.type}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
