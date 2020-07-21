import React from "react";
import { Router, Location } from "@reach/router";
import { ThemeProvider } from "@material-ui/core";
import { Layout } from "./components/index";
import { AuthPage, DashboardPage, LandingPage, HomePage } from "./pages/index";
import { theme } from "./theme";
import "./App.css";
import UserProvider from "./context-provider/user";

function App() {
  return (
    <Location>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Layout className="App">
            <Router>
              <LandingPage path="/" />
              <HomePage path="/home" />
              <DashboardPage path="/profile" />
            </Router>
          </Layout>
        </UserProvider>
        <Router>
          <AuthPage path="/auth" />
        </Router>
      </ThemeProvider>
    </Location>
  );
}

export default App;
