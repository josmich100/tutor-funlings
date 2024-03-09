import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const CertificateList = (props) => {
  return (
    <React.Fragment>
      {" "}
      <h5>My certificates</h5>
      <Col xs="3">
        <Card className="text-center">
          <CardBody className="pt-4">
            <Row
              xs="4"
              className="p-20 mx-2 mb-2 border border-3 border-secondary"
            >
              <i className="bx bx-award p-3" />
            </Row>
            <Row>
              <h6 className="mt-2">Young Animator</h6>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CertificateList.propTypes = {
  //   t: PropTypes.any,
};

export default CertificateList;
