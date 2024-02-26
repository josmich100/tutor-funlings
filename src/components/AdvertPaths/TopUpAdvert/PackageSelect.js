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
  const [currentPackage, setCurrentPackage] = useState(null);

  // Publishing Globals
  const [isProcessing, setIsProcessing] = useState(false);

  const [errorBox, setErrorBox] = useState("");

  const handleSelectPackage = (selectedPackage) => {
    setErrorBox("");

    setSelectedPackage(selectedPackage);
  };

  // TopUp or Upgrade Advert
  const upgradeTopUp = () => {
    // comparing Package ID's
    let returnedHim;
    packages.forEach((item) => {
      if (item.id === selectedPackage) {
        returnedHim = item;
      }
    });

    if (returnedHim.id === currentPackage) {
      topUpAdvert();
    } else {
      upgradeAdvert();
    }
  };

  // TopUp Advert
  const topUpAdvert = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsProcessing(true);

    const payload = {
      profileId: state.id,
      packageId: selectedPackage,
    };

    api
      .post("api/MQCustomerMarqueeProfileManagement/TopUpPackage", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setIsProcessing(false);
        toast.success(data?.message);

        // setTimeout(() => {
        // Redirect to Ad Summary
        step1Data.push({
          state: adProfile,
          renewalID: data.data,
        });
        handleNext();
        // }, 2100)
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
      });
  };

  // Upgrade Advert
  const upgradeAdvert = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsProcessing(true);

    const payload = {
      profileId: state.id,
      packageId: selectedPackage,
    };

    api
      .post("api/MQCustomerMarqueeProfileManagement/UpgradePackage", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setIsProcessing(false);
        toast.success(data?.message);

        // Redirect to Ad Summary
        step1Data.push({
          state: adProfile,
          renewalID: data.data,
        });
        handleNext();
      })
      .catch((error) => {
        setIsProcessing(false);
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
            setCurrentPackage(data?.marqueePackage);
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
  }, [state]);

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
                (mqPkg, key) =>
                  !mqPkg.notForRenewal && (
                    <Col className="package-item" key={key}>
                      <label className="h-100 d-flex">
                        <input
                          type="radio"
                          name="paymentPackage"
                          id="paymentPackage"
                          value={mqPkg.id}
                          onChange={(e) => handleSelectPackage(e.target.value)}
                          defaultChecked={
                            mqPkg.id === selectedPackage ? true : null
                          }
                          hidden
                        />

                        <Card
                          className={`package-card ${
                            mqPkg.id === selectedPackage ? "checked" : ""
                          }`}
                        >
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="text-uppercase text-center mb-0 my-2 package-text">
                              {mqPkg.name}
                            </h6>

                            <hr className="title-rule" />

                            <span className="package-price">
                              KES{" "}
                              <span className="price-value">
                                {mqPkg?.minimumPrice.toLocaleString()}
                              </span>
                            </span>

                            <span className="">
                              Bonus: {mqPkg?.bonusRate.toLocaleString()}%
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
              disabled={isProcessing}
              onClick={() => upgradeTopUp()}
              type="submit"
              className="btn btn-primary save-user rounded-pill px-4 py-2 shadow-sm"
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
