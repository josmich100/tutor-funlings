import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";

// Toast Alert
import toast from "react-hot-toast";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumbs";
import api from "helpers/API/BaseApi";

const ContactUs = (props) => {
  // Globals
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  // Processing Globals
  const [validated, setValidated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authFunStudnt")) {
      const obj = JSON.parse(localStorage.getItem("authFunStudnt"));
      setName(obj.name);
      setEmail(obj.email);
    }
  }, [props.success]);

  // Submit Contact Form
  const handleSubmitContact = (event) => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
      const token = profile.token;

      setIsProcessing(true);

      // Payload
      const payload = {
        sourceOwner: form.name.value,
        sourceEmail: form.email.value,
        messageData: form.message.value,
      };

      // API CALL
      api
        .post(
          "api/MQCommunicationsManagement/SendContactInfoByMarqueeOwner",
          payload,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          setIsProcessing(false);

          toast.success(data?.message);

          // setTimeout(() => {
          // Redirect to Dashboard
          props.history.push("/dashboard");
          // }, 2100)
        })
        .catch((error) => {
          setIsProcessing(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response.data?.message);
          }
        });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Contact Us | Marquee</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Marquee" back="#" breadcrumbItem="Contact Us" />

          <Row className="mb-3">
            <Col lg={6}>
              <Card className="mb-0 shadow-sm">
                <Card.Body>
                  <h4>Leave a message</h4>
                  <p className="text-muted">
                    Feel free to contact us and we will get back to you as soon
                    as possible.
                  </p>

                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmitContact}
                  >
                    <Form.Group className="mb-3" as="div" controlId="name">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control defaultValue={name} required />
                      <Form.Control.Feedback type="invalid">
                        Name Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" as="div" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        placeholder="e.g. johnsmith@email.com"
                        defaultValue={email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Email Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" as="div" controlId="message">
                      <Form.Label>Message</Form.Label>
                      <Form.Text>(Maximum is 500 characters)</Form.Text>
                      <Form.Control
                        as="textarea"
                        maxLength={500}
                        rows={5}
                        placeholder="Type Message Here..."
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <button
                        disabled={isProcessing}
                        type="submit"
                        className="btn btn-primary w-md"
                      >
                        {isProcessing ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Submitting...
                          </>
                        ) : (
                          "SEND"
                        )}
                      </button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col className="d-flex mt-4 mt-lg-0">
              <Card className="mb-0 flex-fill shadow-sm">
                <Card.Body>
                  <h4>Info</h4>

                  <div>
                    <ul className="list-unstyled">
                      <li className="event-list pb-2">
                        <div className="d-flex">
                          <div className="flex-shrink-1 me-3">
                            <i className="bx bx-map-pin h2 text-primary" />
                          </div>
                          <div className="flex-grow-1">
                            <h5>Our Location</h5>
                            <p className="text-primary">
                              Methodist Ministries Center, Third Floor Block B,
                              Oloitoktok Rd – Kilimani, Nairobi.
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className="event-list pb-2">
                        <div className="d-flex">
                          <div className="flex-shrink-1 me-3">
                            <i className="bx bx-phone-call h2 text-primary" />
                          </div>
                          <div className="flex-grow-1 d-flex flex-column align-items-start">
                            <h5>Call</h5>
                            <p
                              className="text-primary"
                              onClick={(e) => {
                                window.location = `tel:+254 711 082 608`;
                                e.preventDefault();
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              +254 711 082608
                            </p>
                            <p
                              className="text-primary"
                              onClick={(e) => {
                                window.location = `tel:+254 730 731 200`;
                                e.preventDefault();
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              +254 730 731 200
                            </p>
                            <p
                              className="text-primary"
                              onClick={(e) => {
                                window.location = `tel:+254 791 650 607`;
                                e.preventDefault();
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              +254 791 650 607
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className="event-list pb-2">
                        <div className="d-flex">
                          <div className="flex-shrink-1 me-3">
                            <i className="bx bx-mail-send h2 text-primary" />
                          </div>
                          <div className="flex-grow-1 d-flex flex-column align-items-start">
                            <h5>Email</h5>
                            <p
                              className="text-primary"
                              onClick={(e) => {
                                window.location = `mailto:business@ngamia.africa`;
                                e.preventDefault();
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              business@marquee.africa
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
