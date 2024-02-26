import PropTypes from "prop-types";
import React, { Fragment } from "react";

// import images
import DefaultValues from "constants/DefaultValues";
import { Link, Redirect, withRouter } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";

// images
import startPic from "assets/images/start_pic.png";

const Start = () => {
  if (localStorage.getItem("authFunStudnt")) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="auth-full-bg pt-xl-4 bg-white">
        <Container fluid="xl">
          <header className="auth-navbar-header">
            {/* logo */}
            <div className="start-brand-box">
              <Link to="#" className="logo logo-dark">
                <span className="logo-sm">
                  <img
                    // src={DefaultValues?.main_logo_Round}
                    src={DefaultValues?.main_logo}
                    alt=""
                    height="30px"
                  />
                </span>
                <span className="logo-lg">
                  <img src={DefaultValues?.main_logo} alt="" height="60px" />
                </span>
              </Link>

              <Link to="#" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    // src={DefaultValues?.main_logo_Round}
                    src={DefaultValues?.main_logo}
                    alt=""
                    height="28px"
                  />
                </span>
                <span className="logo-lg">
                  <img src={DefaultValues?.main_logo} alt="" height="35px" />
                </span>
              </Link>
            </div>

            <div className="d-flex justify-content-between align-items-center d-none d-md-block">
              <Link to="/login" className="me-4 fw-bold fs-5">
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-pill bg-primary text-white fw-bold fs-5 py-2 px-4"
              >
                Get Started
              </Link>
            </div>
          </header>

          <Row className="mb-5 h-75 align-items-center">
            <Col xs={{ offset: 3, span: 6 }} className="d-md-none">
              <img src={startPic} alt="" className="start-page-img" />
            </Col>

            <div className="d-flex align-items-center mt-4 mb-2 d-md-none">
              <div>
                <Link
                  to="/login"
                  className="mx-3 fw-bold fs-5 btn btn-outline-primary"
                >
                  Log In
                </Link>
              </div>
              <div className="flex-grow-1"></div>
              <div>
                <Link
                  to="/register"
                  className="rounded-pill bg-primary text-white fw-bold py-2 px-3 fs-5"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <Col md="7" className="mb-5 mb-md-0">
              <h1
                className="text-warning fw-bold d-none d-md-inline"
                style={{ fontSize: 48 }}
              >
                Funlings Entertainment
              </h1>
              <h1
                className="text-warning fw-bold d-md-none mt-3"
                style={{ fontSize: 32 }}
              >
                Funlings Entertainment
              </h1>
              <p className="fs-5 my-md-5">
                Empower your kids with a premium online learning experience that
                encourages imagination and collaborative creation with their
                peers.
              </p>
              <Link
                to={{ pathname: "https://www.ngamia.africa/marquee/" }}
                className="rounded-pill bg-primary text-white fs-4 fw-bold py-2 px-4"
              >
                Learn More
              </Link>
            </Col>
            <Col className="d-none d-md-block">
              <img src={startPic} alt="" className="start-page-img" />
            </Col>
          </Row>
          <footer>
            <div className="d-flex mb-md-2 position-absolute bottom-0">
              {/* Social Media Icons */}
              <ul className="nav justify-content-center justify-content-md-end list-unstyled mb-2">
                <li className="ms-2">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="bx bxl-facebook fs-3 p-1 rounded-circle bg-primary text-white" />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://twitter.com/" target="_blank">
                    <i className="bx bxl-twitter fs-3 p-1 rounded-circle bg-primary text-white" />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://www.linkedin.com/" target="_blank">
                    <i className="bx bxl-linkedin fs-3 p-1 rounded-circle bg-primary text-white" />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="bx bxl-instagram fs-3 p-1 rounded-circle bg-primary text-white" />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://www.youtube.com/" target="_blank">
                    <i className="bx bxl-youtube fs-3 p-1 rounded-circle bg-primary text-white" />
                  </a>
                </li>
                <li className="ms-2">
                  <a href="https://wa.me/254705469866" target="_blank">
                    <i className="bx bxl-whatsapp fs-3 p-1 rounded-circle bg-primary text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </Container>
      </div>
    </Fragment>
  );
};

export default withRouter(Start);

Start.propTypes = {
  history: PropTypes.object,
};
