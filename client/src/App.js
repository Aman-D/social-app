import React from "react";
import { ThemeProvider } from "@material-ui/core";

import { theme } from "./theme";

import UserProvider from "./context-provider/user";
import ToastProvider from "./context-provider/toast";
import GlobalModalProvider from "./context-provider/global-modal";
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./MainApp";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <GlobalModalProvider>
            <ToastProvider>
              <MainApp />
            </ToastProvider>
          </GlobalModalProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
