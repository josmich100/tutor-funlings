import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";

const Invite = (props) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h5">Invite Friends</CardTitle>
                  <p className="card-title-desc">
                    Ready to refer your friends and start earning rewards?
                    Spread the word, share the love, and let the rewards roll
                    in. It's a win-win for everyone!
                  </p>

                  {/* <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-primary d-lg-none" type="button">
                      Toggle offcanvas
                    </button>
                  </div> */}
                  <div className="alert d-flex align-items-center justify-content-between alert-info">
                    <p className="fs-2 align-self-center">FUN1023AC</p>
                    <i
                      className="bx bx-clipboard"
                      style={{ fontSize: "28px" }}
                    ></i>
                  </div>

                  {/* <div
                    className="offcanvas-lg offcanvas-end"
                    id="offcanvasResponsive"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title"
                        id="offcanvasResponsiveLabel"
                      >
                        Sharing is caring. Your friends get to experience the
                        amazing benefits of Funlings thanks to your
                        recommendation.
                      </h5>
                      <button type="button" className="btn-close"></button>
                    </div>
                    <div className="offcanvas-body">
                      <p className="mb-0">
                        This is content within an <code>.offcanvas-lg</code>.
                      </p>
                    </div>
                  </div> */}

                  <p className="card-title-desc mt-3 mb-2">
                    Sharing is caring. Your friends get to experience the
                    amazing benefits of Funlings thanks to your recommendation.
                  </p>
                  {/* <ul className="mb-0 list-inline">
                    <li className="list-inline-item">
                      <code>.offcanvas</code>,
                    </li>{" "}
                    <li className="list-inline-item">
                      <code>.offcanvas-sm</code>,
                    </li>{" "}
                    <li className="list-inline-item">
                      <code>.offcanvas-md</code>,
                    </li>{" "}
                    <li className="list-inline-item">
                      <code>.offcanvas-lg</code>,
                    </li>{" "}
                    <li className="list-inline-item">
                      <code>.offcanvas-xl</code>,
                    </li>{" "}
                    <li className="list-inline-item">
                      <code>.offcanvas-xxl</code>
                    </li>{" "}
                  </ul> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

Invite.propTypes = {};

export default Invite;
