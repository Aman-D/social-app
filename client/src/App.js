import React from "react";
import { ThemeProvider } from "@material-ui/core";

import { theme } from "./theme";

import UserProvider from "./context-provider/user";
import ToastProvider from "./context-provider/toast";
import GlobalModalProvider from "./context-provider/global-modal";
import NavBarProvider from "./context-provider/navBar";
import CameraProvider from "./context-provider/camera";
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./MainApp";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ToastProvider>
            <CameraProvider>
              <GlobalModalProvider>
                <NavBarProvider>
                  <MainApp />
                </NavBarProvider>
              </GlobalModalProvider>
            </CameraProvider>
          </ToastProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
