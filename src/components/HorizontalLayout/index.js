import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//actions
import {
  changeLayout,
  changeLayoutWidth,
  changeTopbarTheme,
} from "store/actions";

//redux
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

//components
import Header from "./Header";
import Footer from "./Footer";
// import Rightbar from 'components/CommonForBoth/RightSidebar';

const Layout = (props) => {
  const [hasStore, setHasStore] = useState(false);

  const dispatch = useDispatch();

  const { topbarTheme, layoutWidth, isPreloader, showRightSidebar } =
    useSelector((state) => ({
      topbarTheme: state.Layout.topbarTheme,
      layoutWidth: state.Layout.layoutWidth,
      isPreloader: state.Layout.isPreloader,
      showRightSidebar: state.Layout.showRightSidebar,
    }));

  /*
  document title
  */
  useEffect(() => {
    const title = props.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title = "Funlings Student";
  }, [props.location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"));
  }, [dispatch]);

  useEffect(() => {
    if (isPreloader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(() => {
        if (
          document.getElementById("preloader") !== null &&
          document.getElementById("status") !== null
        ) {
          document.getElementById("preloader").style.display = "none";
          document.getElementById("status").style.display = "none";
        }
      }, 2000);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  }, [isPreloader]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, topbarTheme]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [dispatch, layoutWidth]);

  useEffect(() => {
    if (localStorage.getItem("authFunStudnt")) {
      // get profile data
      const profile = JSON.parse(localStorage.getItem("authFunStudnt"));

      // check if session is expired
      if (Date.now() > profile.endTime) {
        // alert user of expired session
        Swal.fire({
          title: "Session Expired",
          text: "Redirecting you to login in 5 seconds",
          icon: "warning",
          timer: 5000,
        }).then(() => {
          props.history.push("/logout");
        });
        Swal.showLoading();
      }
      if (profile.store) {
        setHasStore(true);
      }
    }
  }, []);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header
          hasStore={hasStore}
          theme={topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
          location={props.location}
        />
        <div className="main-content">{props.children}</div>

        <Footer />
      </div>

      {/* {showRightSidebar ? <Rightbar /> : null} */}
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
};

export default withRouter(Layout);
