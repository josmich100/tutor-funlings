import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Slider } from "@mui/material";

// Toast Alert
import toast from "react-hot-toast";

import { Markup } from "interweave";
//Import Breadcrumb
import api from "helpers/API/BaseApi";

const AdSummary = ({ renewalID, step2Data, handleNext, adProfile }) => {
  const state = adProfile;

  // Globals
  const [calculatedData, setCalculatedData] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [sliderSteps, setSliderSteps] = useState(5);
  const [amount2Pay, setAmount2Pay] = useState(0);

  // Processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);

  const handleSliderOnChangeCommitted = (event) => {
    if (event.target.value !== amount2Pay) {
      getPriceEstimate(amount2Pay);
    }
  };

  // Getting Estimate Price
  const getPriceEstimate = (amountSpent) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsCalculating(true);

    const payload = {
      marqueeProfilePackageId: renewalID
        ? renewalID
        : state.currentMarqueeProfilePackageRefNo,
      amounttoSpent: amountSpent,
    };

    // API CALL
    api
      .post(
        "api/MQCustomerMarqueeProfileManagement/GetEstimateMarqueeProfilePackageDataByPrice",
        payload,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.calculateMarquee;

        setCalculatedData(data);

        setIsCalculating(false);
      })
      .catch((error) => {
        setIsCalculating(false);
        // console.log(error)
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response.data?.message);
        }
      });
  };

  // Commiting Advert to Kipcore
  const commitAdvert = (amountSpent) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsProcessing(true);

    const payload = {
      marqueeProfilePackageId: renewalID
        ? renewalID
        : state.currentMarqueeProfilePackageRefNo,
      amounttoSpent: amountSpent,
      saveData: true,
    };

    // API CALL
    api
      .post(
        "api/MQCustomerMarqueeProfileManagement/GetEstimateMarqueeProfilePackageDataByPrice",
        payload,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        step2Data.push({
          product: state.id,
          package: state.currentMarqueeProfilePackageRefNo,
          renewalID: renewalID,
          state: { data: state, estimateData: data },
        });
        handleNext();
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response?.data?.message);
        }
      });
  };

  // Getting Payment Summary Details
  const getPaymentSummary = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // Get Sub-Category Data
    api
      .get(
        `${"api/MQCustomerMarqueeProfileManagement/GetCurrentPackageByProfile"}?MarqueeProfileId=${id}&CurrentMarqueeProfilePackageRefNo=${
          renewalID ? renewalID : state.currentMarqueeProfilePackageRefNo
        }`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.marqueeProfilePackage;
        // console.log(response.data);
        setAmount2Pay(data.marqueePackageMinimumPrice);
        // console.log(data)

        setSliderSteps(
          Math.round(
            (data.marqueePackageMaximumPrice -
              data.marqueePackageMinimumPrice) /
              10
          )
        );

        getPriceEstimate(data.marqueePackageMinimumPrice);

        setCurrentPackage(data);
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response);
        }
      });
  };

  // UseEffect to getProduct GUID
  useEffect(() => {
    if (state) {
      getPaymentSummary(state.id);
    }
  }, [state]);

  return (
    <React.Fragment>
      <div className="h-100 pb-2">
        <Row className="m-0 justify-content-center">
          <Col lg={renewalID ? "6" : "5"} className="me-3">
            <div className="flex-grow-1 overflow-hidden pe-1">
              <h5>{state.productName}</h5>
            </div>

            <Markup content={state.description} />

            <div className="text-muted mt-4">
              <p>
                <i className="mdi mdi-chevron-right text-success me-1" />{" "}
                <b>Location:</b> {state.productLocation}
              </p>

              <p>
                <i className="mdi mdi-chevron-right text-success me-1" />{" "}
                <b>Contact Person:</b> {state.seller}
              </p>

              <p>
                <i className="mdi mdi-chevron-right text-success me-1" />{" "}
                <b>Contact Number:</b> {state.phone}
              </p>

              <p>
                <i className="mdi mdi-chevron-right text-success me-1" />{" "}
                <b>Contact Email:</b> {state.email}
              </p>
            </div>
          </Col>
          <hr className="d-lg-none m-0" />
          <Col lg="5">
            <div className="my-4">
              <p>
                <b>Package Name: </b>
                {currentPackage?.marqueePackageName}
              </p>
              <p>
                <b>Click Price: </b>
                Ksh. {currentPackage?.marqueePackagePricePerClicks}
              </p>
              <p>
                <b>Bonus: </b>
                {currentPackage?.marqueePackageBonusRate?.toLocaleString()}%
              </p>
            </div>

            <div>
              <div className="d-flex">
                <p>
                  Price {currentPackage?.marqueePackageMaximumPrice && "Range"}:
                </p>
                <span className="ms-3 fw-bold">
                  KES{" "}
                  <span className="h5">
                    {currentPackage?.marqueePackageMinimumPrice?.toLocaleString()}
                  </span>
                  {currentPackage?.marqueePackageMaximumPrice && (
                    <span className="h5">
                      {" "}
                      - KES{" "}
                      {currentPackage?.marqueePackageMaximumPrice?.toLocaleString()}
                    </span>
                  )}
                </span>
              </div>

              {currentPackage?.marqueePackageMaximumPrice && (
                <Slider
                  name="amount"
                  valueLabelDisplay="on"
                  valueLabelFormat={`KES ${amount2Pay?.toLocaleString()}`}
                  // marks
                  step={sliderSteps}
                  value={amount2Pay}
                  onChange={(e) => setAmount2Pay(e.target.value)}
                  onChangeCommitted={(e) => handleSliderOnChangeCommitted(e)}
                  min={currentPackage?.marqueePackageMinimumPrice}
                  max={currentPackage?.marqueePackageMaximumPrice}
                  sx={{
                    color: "#FFA05C",
                    marginTop: "1.5rem",
                    "& .MuiSlider-valueLabel": {
                      background: "unset",
                      backgroundColor: "#de864b ",
                    },
                  }}
                />
              )}

              <div className="d-flex">
                <p>Total Clicks:</p>
                <span className="ms-3 fw-bold h5">
                  {isCalculating ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Calculating...
                    </>
                  ) : (
                    calculatedData?.totalClicks
                  )}
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-center">
          <button
            disabled={isProcessing || isCalculating}
            className="btn btn-primary save-user rounded-pill px-4 py-2"
            onClick={() => commitAdvert(amount2Pay)}
          >
            {isProcessing ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Saving...
              </>
            ) : (
              "Save and Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdSummary;
