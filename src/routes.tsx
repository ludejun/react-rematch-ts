import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App from './pages/App';
import LoginPage from './pages/login/index';
import Layout from './pages/layout';
import store from './store';


export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <App />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute>
          <Route path="/main">
            <Layout />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { isAuth } = store.getState().user;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}