import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

//Import Images

function PerformanceCard(props) {
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card className="p-1">
            <CardBody>
              <h5 className="mb-4">My performance since beginning</h5>

              <Row>
                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-filter bx-sm text-white bg-warning rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-warning mx-2 mb-0">21.08%</h6>
                      <p className="text-secondary small mx-2">
                        conversion % <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-user bx-sm text-white bg-info rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-info mx-2 mb-0">39</h6>
                      <p className="text-secondary small mx-2">
                        student conversions <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-credit-card bx-sm text-white bg-success rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-success mx-2 mb-0">0</h6>
                      <p className="text-secondary small mx-2">
                        active paid students <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-line-chart bx-sm text-white bg-danger rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-danger mx-2 mb-0">0.00%</h6>
                      <p className="text-secondary small mx-2">
                        conversion % in last 30 days{" "}
                        <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-book-open bx-sm text-white bg-primary rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-primary mx-2 mb-0">1008</h6>
                      <p className="text-secondary small mx-2">
                        trial classes assigned{" "}
                        <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-book-open bx-sm text-white bg-primary rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-primary mx-2 mb-0">355</h6>
                      <p className="text-secondary small mx-2">
                        trial classes taken <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-book-open bx-sm text-white bg-primary rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-primary mx-2 mb-0">185</h6>
                      <p className="text-secondary small mx-2">
                        trial classes completed{" "}
                        <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bxs-graduation bx-sm text-white bg-success rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-success mx-2 mb-0">10</h6>
                      <p className="text-secondary small mx-2">
                        paid students assigned{" "}
                        <i className="bx bx-info-circle" />
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col xs="3">
                  <Row>
                    <Col xs="2">
                      <i className="bx bx-check-circle bx-sm text-white bg-success rounded p-2" />
                    </Col>
                    <Col xs="10">
                      <h6 className="text-success mx-2 mb-0">58.33%</h6>
                      <p className="text-secondary small mx-2">
                        punctuality score this month{" "}
                        <i className="bx bx-info-circle" />
                      </p>
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

export default PerformanceCard;
