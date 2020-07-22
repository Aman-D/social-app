import React, { useContext } from "react";
import { Layout, Logout } from "./components/index";
import { AuthPage, DashboardPage, LandingPage, HomePage } from "./pages/index";
import { UserContext } from "./context-provider/user";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
function MainApp() {
  const { user } = useContext(UserContext);
  return (
    <Layout className="App">
      <Switch>
        <Route
          path="/home"
          render={() => (!user ? <Redirect to="/auth" /> : <HomePage />)}
        />
        <Route
          path="/profile"
          render={() => (!user ? <Redirect to="/auth" /> : <DashboardPage />)}
        />
        <Route path="/auth/logout" component={Logout} />
        <Route
          excat
          path="/auth"
          render={() => (user ? <Redirect to="/home" /> : <AuthPage />)}
        />

        <Route
          excat
          path="/"
          render={() => (user ? <Redirect to="/auth" /> : <LandingPage />)}
        />
      </Switch>
    </Layout>
  );
}

export default MainApp;
