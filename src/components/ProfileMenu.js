import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// users
import user1 from "assets/images/user-icon.svg";

import api from "helpers/API/BaseApi";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [profilePic, setProfilePic] = useState(user1);

  const [username, setUsername] = useState("User");

  // Get Profile Data
  const getProfileData = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));

    api
      .get("api/MQUserAuthentications/GetUserById?UserId=" + profile.userId, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
      })
      .then((response) => {
        const data = response.data.profile;

        profile["email"] = data.email;
        profile["filePath"] = data.filePath;
        profile["name"] = data.name;
        profile["phoneNumber"] = data.phoneNumber;
        localStorage.setItem("authFunStudnt", JSON.stringify(profile));

        setProfilePic(data.filePath ? data.filePath : user1);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("authFunStudnt")) {
      getProfileData();

      const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
      setUsername(profile.name);

      setProfilePic(profile.filePath ? profile.filePath : user1);
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        drop="down"
        navbar
        show={menu}
        onToggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <Dropdown.Toggle
          className="btn header-item "
          id="page-header-user-dropdown"
          as="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={profilePic}
            alt="Header Avatar"
          />
          <span className="d-none d-lg-inline-block ms-2 me-1">{username}</span>
          {/* <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <Dropdown.Item href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </Dropdown.Item>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
