import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReferralComp from "../Invite/ReferralComp";
import ActivityComp from "./ActivityComp";
import ClassBadges from "./ClassBadges";
import ClassRanks from "./ClassRanks";
import CurrentModule from "./CurrentModule";
import GetHelp from "./GetHelp";
import ProgressComp from "./ProgressComp";
import RecentlyReviewed from "./RecentlyReviewed";
import WeeklyTarget from "./WeeklyTarget";
import WelcomeComp from "./WelcomeComp";

// import { get, ref } from "firebase/database";
// import { getFirebaseBackend } from "helpers/firebase_helper";

const Home = (props) => {
  //meta title
  document.title = "Dashboard | Funlings Entertainment";

  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const checkProfile = async () => {};

  useEffect(() => {
    checkProfile();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboard")}
            breadcrumbItem={props.t("Student Dashboard")}
          /> */}

          <Row>
            <WelcomeComp user={userProfile} />
            <Row className="w-100">
              <Col xl="4">
                <ClassRanks user={userProfile} />
              </Col>
              <Col xl="4">
                <WeeklyTarget />
              </Col>
              <Col xl="4">
                <ActivityComp />
              </Col>
            </Row>
            <GetHelp />
            <ClassBadges />
            <ProgressComp user={userProfile} />
            <CurrentModule />
            <RecentlyReviewed user={userProfile} />
            <ReferralComp />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Home.propTypes = {
  t: PropTypes.any,
};

export default Home;
