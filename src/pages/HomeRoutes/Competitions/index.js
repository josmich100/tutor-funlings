import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import CompetitionComp from "./CompetitionComp";
import CompetitionModule from "./CompetitionModule";

const Competitions = (props) => {
  //meta title
  document.title = "Competitions | Funlings Entertainment Teacher Dashboard";

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CompetitionComp />
          <CompetitionModule />
        </Container>
      </div>
    </React.Fragment>
  );
};

Competitions.propTypes = {
  shops: PropTypes.array,
  onGetShops: PropTypes.func,
};

export default Competitions;
