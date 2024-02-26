import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";

import { SyncLoader } from "react-spinners";
// Importing Custom Components
import api from "helpers/API/BaseApi";
import useGetPackages from "services/useGetPackages";

// Toast Alert
import toast from "react-hot-toast";

const PackageSelect = ({ adProfile, handleNext, step1Data }) => {
  const state = adProfile;

  const packages = useGetPackages();

  // Globals
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Publishing Globals
  const [isRenewing, setIsRenewing] = useState(false);

  const [errorBox, setErrorBox] = useState("");

  const handleSelectPackage = (selectedPackage) => {
    setErrorBox("");

    setSelectedPackage(selectedPackage);
  };

  // Renew Advert
  const renewAdvert = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsRenewing(true);

    const payload = {
      profileId: state?.id,
      packageId: selectedPackage,
    };

    api
      .post("api/MQCustomerMarqueeProfileManagement/RenewedPackage", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        toast.success(data?.message);

        // Redirect to Ad Summary
        step1Data.push({
          state: adProfile,
          renewalID: data.data,
        });
        handleNext();
      })
      .catch((error) => {
        setIsRenewing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
      });
  };

  // API CALL:
  useEffect(async () => {
    if (localStorage.getItem("authFunStudnt")) {
      const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
      const token = profile.token;

      // API CALL: PC
      const get1 = api
        .get(
          `${"api/MQCustomerMarqueeProfileManagement/GetCurrentPackageByProfile"}?MarqueeProfileId=${
            state.id
          }&CurrentMarqueeProfilePackageRefNo=${
            state.currentMarqueeProfilePackageRefNo
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
          if (data) {
            // console.log(data)
            setSelectedPackage(data?.marqueePackage);
          }
          setDataLoaded(true);
        })
        .catch((error) => {
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            console.log(error.response);
          }
        });

      await Promise.all([get1]);
    }
  }, [state, packages]);

  return (
    <React.Fragment>
      {dataLoaded ? (
        <div>
          <h5>Select Advertising Package</h5>

          <Row
            className={`package-container  ${
              errorBox === "pkgSelect" &&
              "border border-2 border-danger rounded"
            }`}
          >
            {packages &&
              packages.map(
                (mqPackage, key) =>
                  !mqPackage.notForRenewal && (
                    <Col className="package-item" key={key}>
                      <label className="h-100 d-flex">
                        <input
                          type="radio"
                          name="paymentPackage"
                          id="paymentPackage"
                          value={mqPackage.id}
                          onChange={(e) => handleSelectPackage(e.target.value)}
                          checked={
                            mqPackage.id === selectedPackage ? true : null
                          }
                          hidden
                        />

                        <Card
                          className={`package-card ${
                            mqPackage.id === selectedPackage ? "checked" : ""
                          }`}
                        >
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="text-uppercase text-center mb-0 my-2 package-text">
                              {mqPackage.name}
                            </h6>

                            <hr className="title-rule" />

                            <span className="package-price">
                              KES{" "}
                              <span className="price-value">
                                {mqPackage?.minimumPrice.toLocaleString()}
                              </span>
                            </span>

                            <span className="">
                              Bonus: {mqPackage?.bonusRate.toLocaleString()}%
                            </span>
                          </div>
                        </Card>
                      </label>
                    </Col>
                  )
              )}
          </Row>

          {/* Proceed Button */}
          <div className="my-3 d-flex justify-content-end">
            <button
              disabled={isRenewing}
              onClick={() => renewAdvert()}
              type="submit"
              className="btn btn-primary save-user rounded-pill px-4 py-2 shadow-sm"
            >
              {isRenewing ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-file-pen me-2"></i>
                  Renew Now
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <SyncLoader color="#de864b " size={20} margin={3} />
          <h5>Loading package data</h5>
        </div>
      )}
    </React.Fragment>
  );
};

export default PackageSelect;
