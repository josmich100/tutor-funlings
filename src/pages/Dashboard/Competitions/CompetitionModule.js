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
} from "react-bootstrap";

// react-circular-progressbar

const CompetitionModule = () => {
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
                Live (1)
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
                Practice (1)
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
                Completed (36)
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
            </Col>

            <Col xs="8">
              <h5>Kenyan Institute of Science Junior Code Clash 2023</h5>
              <p>Hosted by: Kenyan Institute of Science, Nairobi</p>
            </Col>

            <Col>
              <Button
                type="button"
                color="success"
                className="btn-sm my-2 me-2"
                // onClick={handleStartCompetition}
              >
                Register & Start
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default CompetitionModule;
