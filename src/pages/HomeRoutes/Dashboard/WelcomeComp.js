import React from "react";

import { Card, CardBody, Col, ProgressBar, Row } from "react-bootstrap";

import avatar1 from "../../../assets/images/avatar-1.jpg";

const WelcomeComp = ({ user }) => {
  return (
    <React.Fragment>
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row>
            <Col sm="4">
              <Row className="items-center">
                <Col xs="4">
                  <div className="mb-2">
                    <img
                      src={avatar1}
                      alt=""
                      className="img-thumbnail rounded-circle"
                    />
                  </div>
                  <a href="#" className="small btn btn-primary">
                    Upload profile picture
                  </a>
                </Col>
                <Col xs="4 mt-4 ">
                  <h5 className="font-size-15">{user?.fullName}</h5>
                  <p className="text-muted mb-0">{user?.email}</p>
                </Col>
              </Row>
            </Col>

            <Col sm="4" className="pt-4">
              <ProgressBar color="success" value={5}></ProgressBar>
              <p className="mt-1">870 points remaining for Bronze level</p>
            </Col>

            <Col sm="4" className="pt-4">
              <Row>
                <Col xs="8" className="grow">
                  <p className="text-muted mb-0">Complete Class Projects</p>
                  <h4 className="text-success">125</h4>
                </Col>
                <Col xs="4">
                  <p className="text-muted mb-0">Rank</p>
                  <h4 className="text-success">12</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default WelcomeComp;
