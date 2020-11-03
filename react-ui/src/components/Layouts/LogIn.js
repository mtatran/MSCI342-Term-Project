import React, { Component, Fragment } from "react";
import {Route, Link } from "react-router-dom";
import LogInForm from "../LogInForm"
import Header from "../Header"

class LogIn extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <LogInForm/>
    </Fragment>
    );
  }
}
export default LogIn;
