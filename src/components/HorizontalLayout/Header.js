import React, { useState } from "react";
import PropTypes from 'prop-types';
import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "store/actions";

// import images
import DefaultValues from "constants/DefaultValues";
import CreateAd from "components/AdvertPaths/CreateAd";
import CreateStore from "components/StoreComponents/CreateStore";
import ProfileMenu from "components/ProfileMenu";
// import RightSidebar from "components/CommonForBoth/RightSidebar";

//i18n
import { withTranslation } from "react-i18next";


const Header = props => {

  const [position, setPosition] = useState();
  const [open, setOpen] = useState(false);

  const onDrawerClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="flex-grow-1 d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img
                    // src={DefaultValues?.main_logo_Round}
                    src={DefaultValues?.main_logo}
                    alt=""
                    height="25px"
                  />
                </span>
                <span className="logo-lg">
                  <img
                    src={DefaultValues?.main_logo}
                    alt=""
                    height="35px"
                  />
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    // src={DefaultValues?.main_logo_Round}
                    src={DefaultValues?.main_logo}
                    alt=""
                    height="25px"
                  />
                </span>
                <span className="logo-lg">
                  <img
                    src={DefaultValues?.main_logo}
                    alt=""
                    height="35px"
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="d-flex align-items-center">

            <span className=" d-none d-md-inline">
              <CreateAd />
            </span>

            {/* {props.location.pathname !== '/store' && <CreateStore props={props} />} */}

            <ProfileMenu />

            {/* <div className="dropdown d-inline-block">
              <button
                onClick={toggleTopDrawer} disabled={open}
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div> */}
          </div>
        </div>
      </header>
      <ReactDrawer
        open={open}
        position={position}
        onClose={onDrawerClose}
      >
        {/* <RightSidebar onClose={onDrawerClose} /> */}
      </ReactDrawer>
    </React.Fragment>
  );
};

Header.propTypes = {
  hasStore: PropTypes.bool,
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header));
