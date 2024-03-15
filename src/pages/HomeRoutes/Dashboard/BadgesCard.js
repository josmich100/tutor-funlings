import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

//Import Images
import badge1 from "../../../assets/images/companies/img-1.png";
import badge2 from "../../../assets/images/companies/img-2.png";
import badge3 from "../../../assets/images/companies/img-3.png";
import badge4 from "../../../assets/images/companies/img-4.png";
import badge5 from "../../../assets/images/companies/img-5.png";

function BadgesCard(props) {
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card className="p-1">
            <CardBody>
              <h5 className="mb-4">Badges Earned</h5>

              <Row className="mx-1">
                <Col xs="2" className="mb-3">
                  <img
                    src={badge1}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge2}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge3}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge4}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge5}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge1}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge2}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge3}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge4}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
                </Col>

                <Col xs="2" className="mb-3">
                  <img
                    src={badge5}
                    alt=""
                    className="avatar-md img-thumbnail"
                  />
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

export default BadgesCard;
