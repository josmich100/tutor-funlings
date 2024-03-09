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

const QuizModule = () => {
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
        </Nav>
      </Row>
      <Card className="p-3 mt-3">
        <CardBody className="pt-4">
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
                        <i className="bx bx-clipboard p-3" />
                      </Col>

                      <Col>
                        <Row>
                          <h5 className="mt-2">
                            Building and Working of Applications
                          </h5>
                          <h6>
                            Lesson 21: Building and Working of Applications
                          </h6>
                        </Row>

                        <Row className="my-2">
                          <Col className="border-end border-secondary">
                            <h6>100</h6>
                            <p>Maximum score</p>
                          </Col>
                          <Col className="border-end border-secondary">
                            <h6>10</h6>
                            <p>No. of questions</p>
                          </Col>
                          <Col>
                            <h6>Aug 28, 2023</h6>
                            <p>Due date of submission</p>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col>
                            <Button
                              type="button"
                              color="transparent"
                              className="btn-sm btn-outline-danger"
                              // onClick={handleStartQuiz}
                            >
                              Start Quiz
                            </Button>
                          </Col>

                          <Col>
                            <p className="h6">
                              +50 points{" "}
                              <i className="bx bx-info-circle bx-xs text-white" />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2"></TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default QuizModule;
