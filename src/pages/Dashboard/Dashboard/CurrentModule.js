import React from "react";

import { Button, Card, CardBody, Col, Row } from "react-bootstrap";

// react-circular-progressbar

const CurrentModule = () => {
  return (
    <React.Fragment>
      {" "}
      <h4 className="mb-1">Current Module</h4>
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row>
            <Col xs="2">
              <i className="bx bx-grid-alt bx-sm rounded-circle p-3 border border-3 border-secondary" />
              <h6>Module 2</h6>
            </Col>

            <Col>
              <Row className="mb-2">
                <h5>App Lab -I</h5>
              </Row>

              <Row className="mb-2">
                Topics:
                <Col>
                  <Button className="btn-secondary btn-sm rounded-lg mx-1">
                    App Lab
                  </Button>
                  <Button className="btn-secondary btn-sm rounded-lg mx-1">
                    Layouts
                  </Button>
                  <Button className="btn-secondary btn-sm rounded-lg mx-1">
                    UI Components
                  </Button>
                  <Button className="btn-secondary btn-sm rounded-lg mx-1">
                    Website Hosting
                  </Button>
                </Col>
              </Row>

              <Row className="mb-2">
                You will get introduced to Apps where you can learn about UI
                components and make your app look good and attractive. So get
                ready to see the magic of Apps.
              </Row>

              <Row className="mb-2">
                <Col>
                  <Row>
                    <Col>
                      <div>
                        <i className="bx bx-laptop bx-sm rounded-circle p-3 border border-3 border-secondary" />
                      </div>
                    </Col>
                    <Col className="">
                      <Row>Lessons</Row>
                      <Row>
                        <b>
                          <span className="text-success">1</span>/6
                        </b>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      type="button"
                      color="transparent"
                      className="btn-sm text-danger my-2 me-2"
                      // onClick={handleViewLessons}
                    >
                      View all lessons{" "}
                      <i className="bx bx-chevron-down bx-xs" />
                    </Button>
                  </Row>
                </Col>

                <Col>
                  <Row>
                    <Col>
                      <div>
                        <i className="bx bx-pulse bx-sm rounded-circle p-3 border border-3 border-secondary" />
                      </div>
                    </Col>
                    <Col className="">
                      <Row>Activities</Row>
                      <Row>
                        <b>
                          <span className="text-success">0</span>/14
                        </b>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row>
                    <Col>
                      <div>
                        <i className="bx bx-rocket bx-sm rounded-circle p-3 border border-3 border-secondary" />
                      </div>
                    </Col>
                    <Col className="">
                      <Row>Projects</Row>
                      <Row>
                        <b>
                          <span className="text-success">0</span>/6
                        </b>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row>
                    <Col>
                      <div>
                        <i className="bx bx-extension bx-sm rounded-circle p-3 border border-3 border-secondary" />
                      </div>
                    </Col>
                    <Col className="">
                      <Row>Quizzes</Row>
                      <Row>
                        <b>
                          <span className="text-success">0</span>/6
                        </b>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row>
        <Col>
          <Card className="p-3">
            <CardBody className="pt-4">
              <Row>
                <Col xs="3">
                  <i className="bx bx-calendar bx-sm" />
                  <p>6:00 PM WAT, Wed, Oct 04, 2023</p>
                </Col>

                <Col>
                  <Row>
                    <div className="py-1 mx-2 bg-light text-primary">
                      Upcoming
                    </div>
                    <h5 className="mt-2">Lesson 31: Operators</h5>
                    <p>
                      You will be learning the concept of operators and
                      conditional statements, and their application in real-life
                      apps.
                    </p>
                    <h6>6:00 PM WAT, Wed, Oct 04, 2023</h6>
                    <p className="small">Date and time</p>
                  </Row>

                  <Row>
                    <Col>
                      <Button
                        type="button"
                        color="primary"
                        className="w-100 btn-sm my-2 me-2"
                        // onClick={handleJoinClass}
                      >
                        Join class
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        color="transparent"
                        className="w-100 btn-sm text-primary my-2 me-2"
                        // onClick={handleRescheduleClass}
                      >
                        Reschedule class
                      </Button>
                    </Col>
                  </Row>
                  <p className="text-primary h6">
                    +20 points{" "}
                    <i className="bx bx-info-circle bx-xs text-secondary" />
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col>
          <Card className="bg-danger text-white px-3">
            <CardBody className="pt-4">
              <Row>
                <Row>
                  <div className="py-1 mx-2 bg-light text-danger">
                    Pending Project
                  </div>
                  <h5 className="mt-2">Open aquatic world!</h5>
                  <h6>Lesson 15: Voyage Aquatic</h6>
                  <p>
                    Create a Minecraft project, where the open aquatic world
                    awaits you. Build a coral reef! A volcano! A shipwreck! It's
                    up to you.
                  </p>
                  <h6>17 Aug, 2023</h6>
                  <p className="small">Due date of submission</p>
                </Row>

                <Row>
                  <Col>
                    <Button
                      type="button"
                      color="danger"
                      className="w-100 btn-sm btn-outline-light"
                      // onClick={handleSubmitNow}
                    >
                      Submit now
                    </Button>
                  </Col>

                  <Col>
                    <p className="h6">
                      +50 points{" "}
                      <i className="bx bx-info-circle bx-xs text-white" />
                    </p>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col xs="1">
                    <i className="bx bx-info-circle bx-xs text-white" />
                  </Col>
                  <Col>
                    <p className="small mt-2">
                      Submit project on time to get full points. Points will get
                      reduced if not submitted on time.
                    </p>
                  </Col>
                </Row>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CurrentModule;
