import React from "react";
import { Router } from "@reach/router";
import { ThemeProvider } from "@material-ui/core";
import { Layout } from "./components/index";
import { AuthPage, DashboardPage } from "./pages/index";
import { theme } from "./theme";
import "./App.css";

function App() {
  return (
    <Layout className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <DashboardPage path="/" />
          <AuthPage path="/auth" />
        </Router>
      </ThemeProvider>
    </Layout>
  );
}

export default App;
