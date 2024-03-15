import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

//Import Images

function SummaryCard(props) {
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card className="p-1">
            <CardBody>
              <Row>
                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-time bx-sm text-white bg-warning rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-warning mx-2">100 slots available</h6>
                      <p className="text-secondary mx-2">this month</p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-book-open bx-sm text-white bg-primary rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-primary mx-2">18 trial classes</h6>
                      <p className="text-secondary mx-2">this month</p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bxs-graduation bx-sm text-white bg-success rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-success mx-2">18 course classes</h6>
                      <p className="text-secondary mx-2">this month</p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-desktop bx-sm text-white bg-danger rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-danger mx-2">18 pending projects</h6>
                      <p className="text-secondary mx-2">this month</p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-time bx-sm text-white bg-warning rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-warning mx-2">40 slots available</h6>
                      <p className="text-secondary mx-2">next month</p>
                    </Col>
                  </Row>
                </Col>

                {/* <Col lg="4" className="d-none d-lg-block">
                  <div className="clearfix mt-4 mt-lg-0">
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu)
                      }}
                      className="float-end"
                    >
                      <DropdownToggle tag="button" className="btn btn-primary">
                        <i className="bx bxs-cog align-middle me-1" /> Setting
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Action</DropdownItem>
                        <DropdownItem href="#">Another action</DropdownItem>
                        <DropdownItem href="#">Something else</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col> */}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default SummaryCard;
