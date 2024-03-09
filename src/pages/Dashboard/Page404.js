import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import MetaTags from "react-meta-tags";

//Import Images
import DefaultValues from "constants/DefaultValues";

const Pages404 = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Error | Funlings</title>
        </MetaTags>
        <Container>
          <div className="text-center mb-3 h-100">
            <h1 className="display-3 font-weight-medium">
              4<i className="bx bx-buoy bx-spin text-primary display-4" />4
            </h1>
            <h4 className="text-uppercase">Sorry, page not found</h4>
            <div className="mt-3 text-center">
              <Link className="btn btn-primary " to="/dashboard">
                Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={DefaultValues.page_404}
              alt=""
              className=""
              height={200}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pages404;
