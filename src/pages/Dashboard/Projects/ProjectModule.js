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

const ProjectModule = () => {
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
                Pending
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
                Submitted
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
                Reviewed
              </p>
            </NavLink>
          </NavItem>
        </Nav>
      </Row>
      <Card className="p-3 mt-3">
        <CardBody className="pt-4">
          <Row>
            <Row>
              <Card>
                <CardBody>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col
                          xs="4"
                          className="p-20 mx-2 mb-2 border border-3 border-secondary"
                        >
                          <i className="bx bx-server p-3" />
                        </Col>

                        <Col>
                          <Row>
                            <h5 className="mt-2">Open aquatic world!</h5>
                            <h6>Lesson 15: Voyage Aquatic</h6>
                            <p>
                              Create a Minecraft project, where the open aquatic
                              world awaits you. Build a coral reef! A volcano! A
                              shipwreck! It's up to you.
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
                                Submit project on time to get full points.
                                Points will get reduced if not submitted on
                                time.
                              </p>
                            </Col>
                          </Row>
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
export default ProjectModule;
