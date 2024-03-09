import React from "react";

import { Card, CardBody, Col, Row } from "react-bootstrap";

const ClassBadges = () => {
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="pt-4">
          <h4 className="card-title mb-4">My class badges</h4>
          <p className="">
            These class badges have been earned in classes from teachers for
            excellent performance.
          </p>

          <Row>
            <Col xs="8" className="mx-3">
              <Row>
                <Col>
                  <div className="btn position-relative">
                    <i className="bx bx-award bx-lg" />
                    <span className="badge bg-success rounded-pill">+1</span>
                  </div>
                </Col>
                <Col>
                  <div className="btn position-relative">
                    <i className="bx bx-award bx-lg" />
                    <span className="badge bg-success rounded-pill">+3</span>
                  </div>
                </Col>
                <Col>
                  <div className="btn position-relative">
                    <i className="bx bx-award bx-lg" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ClassBadges;
