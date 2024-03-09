import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";

import ApexRadial from "./ApexRadial";

const Lessons = () => {
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody>
          <CardTitle className="mb-4">Weekly Ranking</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted">This month</p>
              <h3>800 Points</h3>
              <p className="text-muted">
                <span className="text-success me-2">
                  {" "}
                  200 <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                From previous week
              </p>
              <div className="mt-4">
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light btn-sm"
                >
                  View More <i className="mdi mdi-arrow-right ms-1"></i>
                </Link>
              </div>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0">
                <ApexRadial dataColors='["--bs-primary"]' />
              </div>
            </Col>
          </Row>
          <p className="text-muted mb-0">
            Complete classes and submit projects to get more points
          </p>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Lessons;
