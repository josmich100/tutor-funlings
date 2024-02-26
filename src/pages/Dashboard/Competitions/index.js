import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { getShops as onGetShops } from "store/e-commerce/actions";
import CompetitionComp from "./CompetitionComp";
import CompetitionModule from "./CompetitionModule";

const Competitions = (props) => {
  //meta title
  document.title = "Competitions | Funlings Entertainment Student Dashboard";

  const dispatch = useDispatch();

  const { shops } = useSelector((state) => ({
    shops: state.ecommerce.shops,
  }));

  useEffect(() => {
    dispatch(onGetShops());
  }, [dispatch]);

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
