import PropTypes from "prop-types";
import React from "react";
import { Toaster } from 'react-hot-toast';

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "routes/allRoutes";

// Import all middleware
import Authmiddleware from "routes/middleware/Authmiddleware";

// layouts Format 
import VerticalLayout from "components/VerticalLayout/";
import HorizontalLayout from "components/HorizontalLayout/";
import NonAuthLayout from "components/NonAuthLayout";

// Import scss
import "assets/scss/theme.scss";
import 'react-image-lightbox/style.css';
import "flatpickr/dist/themes/material_blue.css";

const App = props => {

  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>

      <Toaster
        toastOptions={{
          // style: { maxWidth: 500, },
          position: "top-right",
          className: 'bg-primary text-white',
          duration: 3000,
          icon: <i className="bx bx-info-circle" />,
          iconTheme: {
            primary: 'none'
          },
          loading: {
            position: "top-center",
            icon: <i className="bx bx-sync bx-spin" />,
          },
          success: {
            position: "top-center",
            className: 'bg-success text-white',
            duration: 2000,
            icon: <i className="bx bx-check-circle" />,
            iconTheme: {
              primary: 'none'
            },
          },
          error: {
            position: "top-right",
            className: 'fs-5 text-white',
            duration: 4000,
            style: { backgroundColor: 'red' },
            icon: <i className="bx bx-error" />,
            iconTheme: {
              primary: 'none'
            }
          }
        }}
      />
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
