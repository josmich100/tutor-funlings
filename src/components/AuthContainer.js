import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";

import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

import DefaultValues from "constants/DefaultValues";

const AuthContainer = (props) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleSelect = (activeItem, e) => {
    setActiveItem(activeItem);
  };

  useEffect(() => {
    if (localStorage.getItem("authFunStudnt")) {
      props.history.push("/dashboard");
      // localStorage.removeItem("authFunStudnt")
    }
  }, []);

  const items = [
    {
      src: DefaultValues.carousel1,
      altText: "Slide 1",
    },
    {
      src: DefaultValues.carousel2,
      altText: "Slide 2",
    },
    {
      src: DefaultValues.carousel3,
      altText: "Slide 3",
    },
  ];

  return (
    <Fragment>
      <MetaTags>
        <title>{props.meta}</title>
      </MetaTags>

      <div className="auth-full-bg">
        {props.isCentralForm ? (
          <Container fluid className="auth-container-center">
            <Card className="auth-center-card">
              <Row className="bg-primary bg-soft">
                <Col xs={7}>
                  <div className="text-primary p-4">
                    <h4 className="text-primary">{props.title}</h4>
                    <p>{props.subTitle}</p>
                  </div>
                </Col>
                <Col className="col-5 align-self-end">
                  <img
                    src={DefaultValues.auth_bgimage}
                    alt=""
                    className="img-fluid"
                  />
                </Col>
              </Row>

              <Card.Body className="pt-0">
                <div className="auth-logo">
                  <div className="auth-logo-light">
                    <img
                      src={DefaultValues.main_logo_Round}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="auth-logo-dark">
                    <img
                      src={DefaultValues.main_logo_Round}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>

                {/* AUTH FORM */}
                {props.form}
              </Card.Body>
              <Card.Footer className="mb-0 text-muted text-center border-0">
                {DefaultValues.copyright}
              </Card.Footer>
            </Card>
          </Container>
        ) : (
          // SIDE FORM
          <Container fluid className="auth-container-side">
            <div className="side-wrapper">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <div className="logo mb-1">
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
                        height="80px"
                      />
                    </span>
                  </div>

                  <div className="my-auto">
                    <h2 className="text-primary fw-bold">{props.title}</h2>
                    <p className="text-muted fs-5">{props.subTitle}</p>

                    {/* AUTH FORM */}
                    {props.form}
                  </div>
                </Card.Body>
                <Card.Footer className="mb-0 text-muted text-center border-0">
                  {DefaultValues.copyright}
                </Card.Footer>
              </Card>
            </div>
            <Col className="d-none d-lg-inline">
              <Carousel
                controls={false}
                indicators={false}
                pause={false}
                activeIndex={activeItem}
                onSelect={handleSelect}
              >
                {items.map((item, key) => (
                  <Carousel.Item key={key} style={{ height: "100vh" }}>
                    <div className="d-flex flex-column justify-content-center h-100">
                      <img
                        src={item.src}
                        alt={item.altText}
                        className="img-fluid"
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Container>
        )}
      </div>
    </Fragment>
  );
};

AuthContainer.propTypes = {
  isCentralForm: PropTypes.bool,
  meta: PropTypes.string,
  form: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  history: PropTypes.object,
};

export default AuthContainer;
