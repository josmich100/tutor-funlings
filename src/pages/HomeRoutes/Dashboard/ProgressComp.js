import React from "react";

import { Card, CardBody, Col, Row } from "react-bootstrap";

// react-circular-progressbar

const ProgressComp = ({ user }) => {
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="pt-4">
          <h4 className="card-title mb-1">
            Coding course for {user?.username}
          </h4>
          <p className="">
            This is your learning journey at Funlings. Welcome to the world of
            coding!
          </p>

          <Row className="align-items-center justify-content-center">
            <Col
              xs="2"
              className="flex align-items-center justify-items-center"
            >
              <Row className="mb-2">
                <div>
                  <i className="bx bx-grid-alt bx-sm rounded-circle p-2 border border-3 border-secondary" />
                </div>
              </Row>
              <Row>Modules</Row>
              <Row>
                <b>
                  <span className="text-success">1</span>/8
                </b>
              </Row>
            </Col>

            <Col xs="2">
              <Row className="mb-2">
                <div>
                  <i className="bx bx-laptop bx-sm rounded-circle p-3 border border-3 border-secondary" />
                </div>
              </Row>
              <Row>Lessons</Row>
              <Row>
                <b>
                  <span className="text-success">9</span>/50
                </b>
              </Row>
            </Col>

            <Col xs="2">
              <Row className="mb-2">
                <div>
                  <i className="bx bx-pulse bx-sm rounded-circle p-3 border border-3 border-secondary" />
                </div>
              </Row>
              <Row>Activities</Row>
              <Row>
                <b>
                  <span className="text-success">19</span>/89
                </b>
              </Row>
            </Col>

            <Col xs="2">
              <Row className="mb-2">
                <div>
                  <i className="bx bx-rocket bx-sm rounded-circle p-3 border border-3 border-secondary" />
                </div>
              </Row>
              <Row>Projects</Row>
              <Row>
                <b>
                  <span className="text-success">2</span>/44
                </b>
              </Row>
            </Col>

            <Col xs="2">
              <Row className="mb-2">
                <div>
                  <i className="bx bx-extension bx-sm rounded-circle p-3 border border-3 border-secondary" />
                </div>
              </Row>
              <Row>Quizzes</Row>
              <Row>
                <b>
                  <span className="text-success">3</span>/44
                </b>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ProgressComp;
