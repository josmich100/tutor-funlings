import { Input } from "@mui/base";
import React from "react";

import { Button, Card, CardBody, Col, Form, Row } from "react-bootstrap";

// react-circular-progressbar

const ReferralComp = () => {
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row>
            <Col xs="4" className="p-20 mx-2 border border-3 border-secondary">
              <i className="bx bx-server p-3" />
            </Col>

            <Col>
              <Row className="mb-2 mx-3">
                <h3>
                  Refer your friends to Funlings and earn NGN 1000 for each
                  referral
                </h3>

                <Row className="mb-2">
                  <Button
                    type="button"
                    color="danger"
                    className="text-white my-2"
                    // onClick={handleViewProjects}
                  >
                    <i className="bx bx-users" /> Submit referral via form
                  </Button>
                </Row>

                <Row className="mb-2">
                  <Col>
                    <Button
                      type="button"
                      color="transparent"
                      className="w-100 border-danger text-danger"
                      // onClick={handleWhatsAppInvite}
                    >
                      <i className="bx bxl-whatsapp" /> Invite via WhatsApp
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      color="transparent"
                      className="w-100 border-danger text-danger"
                      // onClick={handleFacebookInvite}
                    >
                      <i className="bx bxl-facebook" /> Invite via Facebook
                    </Button>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <h6>Invite via link (copy and share with friends)</h6>
                  <Form>
                    <Row className="align-items-center">
                      <Col>
                        <Input
                          name="invitation_link"
                          placeholder="something@idk.cool"
                          value="https://student-funlings.com/referral/invite/?utm_medium=6824ghjgkfs7"
                          type="text"
                        />
                      </Col>
                      <Col xs="2">
                        <Button
                          type="button"
                          color="danger"
                          className="text-white px-3"
                        >
                          Copy
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Row>

              <Button
                type="button"
                color="transparent"
                className="h6 text-danger px-3"
                // onClick={handleReferral}
              >
                Know more
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ReferralComp;
