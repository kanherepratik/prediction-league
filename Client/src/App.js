import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/* import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import NewBookPage from "./components/pages/NewBookPage";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation"; */
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    {/* {isAuthenticated && <TopNavigation />} */}
    <GuestRoute location={location} path="/" exact component={Login} />
    <GuestRoute location={location} path="/signup" exact component={SignUp} />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={Dashboard}
    />
    {/*<Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    /> 
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/books/new"
      exact
      component={NewBookPage}
    /> */}
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);