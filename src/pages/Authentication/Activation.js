import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { Link, withRouter } from "react-router-dom";

// Toast Alert
import toast from "react-hot-toast";

// import images
import DefaultValues from "constants/DefaultValues";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import AuthContainer from "components/AuthContainer";

const Activation = (props) => {
  // Getting Vendor Data
  const { state } = props.location;

  // Globals
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // API CALL TO Verify Account Creation
  useEffect(async () => {
    // API CALL: Verification
    api
      .post(
        "api/MQUserAuthentications/VerifyActivation",
        JSON.stringify(state),
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        setAlertMessage(response.data.message);
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          setErrorMessage(error.response?.data?.message);
        }
      });
  }, []);

  const mainForm = (
    <>
      <div>
        <h3 className="text-primary text-center">Account Verification</h3>
      </div>
      {alertMessage ? (
        <div className="mt-4">
          <div className="mt-3 text-center">
            <p className="text-muted">{alertMessage}</p>
            <div className="mt-4">
              <Link to="/login" className="btn btn-primary">
                Login Now <i className="mdi mdi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="mt-3 text-center">
            <p className="text-dark font-size-16">{errorMessage}</p>
            <div className="mt-4">
              <Link to="/login" className="btn btn-primary">
                Login Now <i className="mdi mdi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <AuthContainer
      meta="Activation | Funlings Entertainment"
      form={mainForm}
      title=""
      subTitle=""
      history={props.history}
      // isCentralForm={true}
    />
  );
};

export default withRouter(Activation);

Activation.propTypes = {
  history: PropTypes.object,
};
