import React from "react";

import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  ProgressBar as Progress,
  Row,
} from "react-bootstrap";

const WeeklyTarget = () => {
  return (
    <React.Fragment>
      <Card className="p-3">
        <CardBody>
          <CardTitle className="mb-0">Weekly Target</CardTitle>
          <CardText className="mb-4">Sep 25 - Oct 1</CardText>

          <Row className="text-center">
            <div className="my-5">
              <p className="text-muted mb-1">Your points</p>
              <h3 className="bg-success text-bg-success w-50 py-2 mx-auto rounded">
                200
              </h3>
            </div>

            <p className="text-muted mb-0">
              Complete classes and submit projects to get more points
            </p>
            <p className="text-muted">
              Your target: <b>140</b>
            </p>

            <Progress color="success" value={100} className="mb-1"></Progress>
            <Row>
              <Col>
                Time left: <b>1 day</b>
              </Col>
              <Col>
                Score: <b>-200/140</b>
              </Col>
            </Row>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default WeeklyTarget;
