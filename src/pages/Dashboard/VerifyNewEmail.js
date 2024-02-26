import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Card, Container } from "react-bootstrap";

// Toast Alert
import toast from "react-hot-toast";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumbs";

// Importing Custom Components
import api from "helpers/API/BaseApi";

const VerifyNewEmail = (props) => {
  // Getting Vendor Data
  const { state } = props.location;

  // Globals
  // const [isLoading, setIsLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // Processing
    // setIsLoading(true)

    // Payload
    const payload = {
      userId: state.userId,
      newEmail: state.email,
      code: state.code,
    };

    // API CALL: Verification
    api
      .post("api/MQUserAuthentications/ConfirmEmailChange", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setIsLoading(false)
        setAlertMessage(response.data.message);
      })
      .catch((error) => {
        // setIsLoading(false)
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          setErrorMessage(error.response?.data?.message);
        }
      });
  }, []);

  // Login again
  const reActivateSession = () => {
    alert("All is well");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Email Verification | Funlings Entertainment</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Marquee"
            back="#"
            breadcrumbItem="Email Verification"
          />

          <Card>
            <Card.Body>
              <div className="text-center">
                <div className="avatar-sm mx-auto mb-4">
                  <span className="avatar-title rounded-circle bg-primary bg-soft font-size-24">
                    <i className="mdi mdi-mail text-primary"></i>
                  </span>
                </div>
                <p className="font-16 text-muted mb-2"></p>
                {alertMessage ? (
                  <>
                    <h5>{alertMessage}</h5>

                    <div className="mt-4">
                      <button
                        onClick={() => reActivateSession()}
                        className="btn btn-primary"
                      >
                        Login to re-Activate your session{" "}
                        <i className="mdi mdi-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <h5>{errorMessage}</h5>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VerifyNewEmail;
