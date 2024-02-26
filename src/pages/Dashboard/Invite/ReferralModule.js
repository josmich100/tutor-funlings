import React from "react";

import { Card, CardBody, Col, Row } from "react-bootstrap";

// react-circular-progressbar

const ReferralModule = () => {
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row className="text-center">
            <h3>Refer and Earn</h3>

            <Col className="border border-secondary rounded mx-5 p-3">
              <h5>Refer</h5>
              <i className="bx bxl-message" />
            </Col>

            <Col className="border border-secondary rounded mx-5 p-3">
              <h5>Earn</h5>
              <i className="bx bxl-coin" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ReferralModule;
