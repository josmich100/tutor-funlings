import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

//Import Images
import StarRatings from "react-star-ratings";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

function UserCard(props) {
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card className="p-1">
            <CardBody>
              <Row>
                <Col xs="4">
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        src={avatar1}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5 className="mb-1">Ibrahim Marube</h5>
                        <p className="mb-0">Platinum Tutor</p>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs="4" className="align-self-center">
                  <Row>
                    <Col xs="6">
                      <div>
                        <p className="text-muted text-truncate mb-2">Rating</p>
                        <StarRatings
                          rating={4.7}
                          numberOfStars={5}
                          starRatedColor="gold"
                          starDimension="15px"
                          starSpacing="2px"
                        />
                        <p className="mb-0">4.7 out of 5</p>
                      </div>
                    </Col>
                    <Col xs="6">
                      <div className="">
                        <p className="text-muted text-truncate mb-2">
                          <i className="bx bx-money" /> Live earning{" "}
                          <i className="bx bx-info-circle" />
                        </p>
                        <h5 className="text-danger mb-0">KES -17415</h5>
                      </div>
                    </Col>
                  </Row>
                </Col>

                {/* <Col xs="4" className="d-none d-lg-block">
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

export default UserCard;
