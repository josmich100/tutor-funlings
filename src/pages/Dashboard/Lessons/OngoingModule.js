import React, { useState } from "react";

import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "react-bootstrap";

// react-circular-progressbar

const OngoingModule = () => {
  const [activeTab, setactiveTab] = useState("1");

  return (
    <React.Fragment>
      {" "}
      <Row className="border-bottom border-secondary mt-3">
        <Nav>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                setactiveTab("1");
              }}
            >
              <p
                className={[
                  "font-weight-bold mb-4",
                  activeTab === "1" && "text-underline",
                ]}
              >
                Ongoing Module
              </p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                setactiveTab("2");
              }}
            >
              <p
                className={[
                  "font-weight-bold mb-4",
                  activeTab === "2" && "text-underline",
                ]}
              >
                Completed Modules (1)
              </p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                setactiveTab("3");
              }}
            >
              <p
                className={[
                  "font-weight-bold mb-4",
                  activeTab === "3" && "text-underline",
                ]}
              >
                Upcoming Modules (6)
              </p>
            </NavLink>
          </NavItem>
        </Nav>
      </Row>
      <Card className="p-3 mt-3">
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

          <Row>
            <Row>
              <Card>
                <CardBody>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row className="border-top border-secondary">
                        <Col xs="2">
                          <i className="bx bx-calendar bx-sm" />
                          <p>7:45 PM WAT, Fri, Aug 25, 2023</p>
                        </Col>

                        <Col>
                          <Row>
                            <h5 className="flex-row mt-2">
                              Lesson 1: Building and Working of Applications{" "}
                              <span className="text-sm text-danger">
                                <i className="bx bxs-circle bx-xs"></i>{" "}
                                Completed
                              </span>
                            </h5>
                            <p>
                              This lesson takes you on a journey to the working
                              of apps. How are applications made? You will have
                              an in-depth knowledge of the different components
                              in an app.
                            </p>
                          </Row>

                          <Row className="mb-2">
                            <Col>
                              <i className="bx bx-teacher bx-sm" /> Teacher:
                              Ibrahim Marube
                            </Col>
                            <Col>
                              <i className="bx bx-teacher bx-sm" /> Points: +20{" "}
                              <i className="bx bx-info-circle bx-xs text-secondary" />
                            </Col>
                          </Row>

                          <Row className="align-items-center justify-content-center">
                            <Col>
                              <i className="bx bx-info-circle bx-sm text-danger" />{" "}
                              Activities: Not completed
                            </Col>
                            <Col>
                              <i className="bx bx-info-circle bx-sm text-danger" />{" "}
                              Projects: Not completed
                            </Col>
                            <Col>
                              <i className="bx bx-info-circle bx-sm text-danger" />{" "}
                              Quiz: Not completed
                            </Col>
                          </Row>

                          <Button
                            type="button"
                            color="transparent"
                            className="btn-sm text-danger my-2 me-2"
                            // onClick={handleViewClass}
                          >
                            View class details
                          </Button>
                        </Col>
                      </Row>

                      <Row className="border-top border-secondary">
                        <Col xs="2">
                          <i className="bx bx-calendar bx-sm" />
                          <p>6:00 PM WAT, Wed, Oct 04, 2023</p>
                        </Col>

                        <Col>
                          <Row>
                            <h5 className="flex-row mt-2">
                              Lesson 2: Operators{" "}
                              <span className="text-sm text-info">
                                <i className="bx bxs-circle bx-xs"></i> Upcoming
                              </span>
                            </h5>
                            <p>
                              You will be learning the concept of operators and
                              conditional statements and their applications in
                              real-life apps.
                            </p>
                          </Row>

                          <Row className="mb-2">
                            <Col>
                              <i className="bx bx-teacher bx-sm" /> Teacher:
                              Ibrahim Marube
                            </Col>
                            <Col>
                              <i className="bx bx-teacher bx-sm" /> Points: +20{" "}
                              <i className="bx bx-info-circle bx-xs text-secondary" />
                            </Col>
                          </Row>

                          <div className="flex-row">
                            <Button
                              type="button"
                              color="transparent"
                              className="btn-sm btn-outline-danger my-2 me-2"
                              // onClick={handleJoinClass}
                            >
                              Join class
                            </Button>
                            <Button
                              type="button"
                              color="transparent"
                              className="btn-sm text-danger my-2 me-2"
                              // onClick={handleRescheduleClass}
                            >
                              Reschedule class
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2"></TabPane>
                    <TabPane tabId="3"></TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Row>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default OngoingModule;
