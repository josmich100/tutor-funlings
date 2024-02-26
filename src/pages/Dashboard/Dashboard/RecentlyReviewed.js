import React from "react";
import StarRatings from "react-star-ratings";

import { Button, Card, CardBody, Col, Row } from "react-bootstrap";

// react-circular-progressbar

const RecentlyReviewed = ({ user }) => {
  return (
    <React.Fragment>
      {" "}
      <div className="flex-row">
        <h4 className="mb-1">Recent reviewed project</h4>
        <Button
          type="button"
          color="transparent"
          className="btn-sm text-danger"
          // onClick={handleViewProjects}
        >
          View all
        </Button>
      </div>
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row>
            <Col
              xs="4"
              className="p-20 mx-2 mb-2 border border-3 border-secondary"
            >
              <i className="bx bx-server p-3" />
            </Col>

            <Col>
              <Row className="mb-2">
                <h5>Shake Me!</h5>
                <h6>Lesson 5: Shake Me!</h6>
                <p>
                  Create a project in Sprite lab that makes the car move towards
                  the east by shaking itself when it's clicked.
                </p>
              </Row>

              <Row className="mb-2">
                <Col className="border-end border-secondary">
                  <h6>08:57 PM WAT, Jun 30, 2023</h6>
                  <p className="small">Date of submission</p>
                </Col>
                <Col className="border-end border-secondary">
                  <h6>06:27 PM WAT, Jul 02, 2023</h6>
                  <p className="small">Date of review</p>
                </Col>
                <Col xs="2">
                  <h6>100</h6>
                  <p className="small">Points earned</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <h6>Feedback by teacher</h6>
            <Row>
              <Col className="border-end border-secondary">
                Hello, {user?.username}! Your project works fine. Consider
                learning more code blocks.
              </Col>
              <Col>
                <h6>Rating</h6>
                <StarRatings
                  rating={5}
                  numberOfStars={5}
                  starRatedColor="gold"
                  starDimension="15px"
                  starSpacing="2px"
                />
              </Col>
            </Row>
          </Row>

          <Button
            type="button"
            color="transparent"
            className="btn-sm text-danger"
            // onClick={handleViewProject}
          >
            View project details
          </Button>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default RecentlyReviewed;
