import React from "react";
import { Router } from "@reach/router";
import { Layout } from "./components/index";
import { AuthPage, DashboardPage } from "./pages/index";

import "./App.css";

function App() {
  return (
    <Layout className="App">
      <Router>
        <DashboardPage path="/" />
        <AuthPage path="/auth" />
      </Router>
    </Layout>
  );
}

export default App;
