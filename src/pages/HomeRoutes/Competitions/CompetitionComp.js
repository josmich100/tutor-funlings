import React, { useState } from "react";

import { Card, CardBody, Col, Row } from "react-bootstrap";

// react-circular-progressbar

const CompetitionComp = () => {
  const [activeTab, setactiveTab] = useState("1");

  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row>
            <Col
              xs="2"
              className="p-20 mx-2 mb-2 border border-3 border-secondary"
            >
              <i className="bx bx-trophy p-3" />
            </Col>

            <Col>
              <h5>My coding competitions</h5>
              <p>These are your coding competitions as per your Grade.</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default CompetitionComp;
