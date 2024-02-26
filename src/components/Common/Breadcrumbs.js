import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "react-bootstrap";

const Breadcrumbs = (props) => {
  const [username, setusername] = useState("");

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    setusername(profile.name.split(" ")[0]);
  }, []);

  return (
    <div className="page-title-box d-sm-flex align-items-center justify-content-between pb-3">
      <div className="page-title-right fs-5">
        <ol className="breadcrumb m-0">
          <Breadcrumb.Item
            href={props.breadcrumbItem === "Dashboard" ? "#" : "/dashboard"}
          >
            {props.breadcrumbItem === "Dashboard"
              ? `Welcome ${username}`
              : props.title}
          </Breadcrumb.Item>
          {props.breadcrumbItem !== "Dashboard" && (
            <Breadcrumb.Item active>{props.breadcrumbItem}</Breadcrumb.Item>
          )}
        </ol>
      </div>
      <p className="mb-0 fs-5 d-none d-md-block">{props.breadcrumbItem}</p>
    </div>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
};

export default Breadcrumbs;
