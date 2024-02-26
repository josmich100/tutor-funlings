import React from "react";

import { Card, CardBody, Col, Row } from "react-bootstrap";

import avatar1 from "../../../assets/images/avatar-1.png";

const GetHelp = () => {
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody className="pt-4">
          <h4 className="card-title mb-1">Get Help</h4>
          <p className="">
            We are always here if you have any issues or want to share feedback.
            Please feel free to contact us.
          </p>

          <Row>
            <Col xs="3" className="border-end border-secondary mx-2">
              <h6>Get priority support</h6>
              <Row>
                <Col xs="1">
                  <i className="bx bxl-whatsapp text-danger" />
                </Col>
                <Col>
                  Message priority support{"  "}
                  <i className="bx bx-info-circle text-muted" />
                </Col>
              </Row>
              <Row>
                <Col xs="1">
                  <i className="bx bx-envelope text-danger" />
                </Col>
                <Col>
                  Email priority support{"  "}
                  <i className="bx bx-info-circle text-muted" />
                </Col>
              </Row>
            </Col>

            <Col xs="3" className="border-end border-secondary mx-2">
              <h6>Teacher details</h6>
              <Row className="align-items-center">
                <Col xs="1">
                  <img
                    src={avatar1}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </Col>
                <Col>Ibrahim Marube</Col>
              </Row>
              <Row>
                <Col xs="1">
                  <i className="bx bxl-whatsapp text-danger" />
                </Col>
                <Col>
                  Message your teacher{"  "}
                  <i className="bx bx-info-circle text-muted" />
                </Col>
              </Row>
            </Col>

            <Col xs="3">
              <h6>CEO details</h6>
              <Row className="align-items-center">
                <Col xs="1">
                  <img
                    src={avatar1}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </Col>
                <Col>Doris Ratego</Col>
              </Row>
              <Row>
                <Col xs="1">
                  <i className="bx bx-envelope text-danger" />
                </Col>
                <Col>
                  Email CEO{"  "}
                  <i className="bx bx-info-circle text-muted" />
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default GetHelp;
