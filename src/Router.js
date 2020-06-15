import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './containers/Login';
import Home from './containers/Home';

export default class AppRouter extends Component {
    render() {
      return (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />

    </Switch>
      );
    }
  }