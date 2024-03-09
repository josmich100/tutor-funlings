import React from "react";
import { Container } from "react-bootstrap";
import ReferralComp from "./ReferralComp";
import ReferralModule from "./ReferralModule";

const Invite = (props) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ReferralComp />
          <ReferralModule />
        </Container>
      </div>
    </React.Fragment>
  );
};

Invite.propTypes = {};

export default Invite;
