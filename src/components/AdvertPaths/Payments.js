import React, { useEffect, useState } from "react";
import {
  Card,
  Nav,
  Spinner,
  TabContainer,
  TabContent,
  Table,
  TabPane,
} from "react-bootstrap";

// material UI
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

// Toast Alert
import toast from "react-hot-toast";

// material styles
import { inputStyles } from "assets/material/inputsStyles";
import { Check } from "@mui/icons-material";
import PhoneFormat from "components/Material/PhoneFormat";

import api from "helpers/API/BaseApi";
import vault from "helpers/API/Vault";
// import mpesa from 'assets/images/mpesa.svg'

const Payments = ({ renewalID, step2Data, closeModal, handleBack }) => {
  const state = step2Data[0].state;
  // console.log(state)

  const classes = inputStyles();

  // Globals
  const [currentPackage, setCurrentPackage] = useState(null);
  const [phone, setPhone] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);

  // Processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPromoCode, setIsLoadingPromoCode] = useState(false);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);

  // UI Logic Manipulation
  const [phoneError, setPhoneError] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [showMakePayment, setShowMakePayment] = useState(true);
  const [showPublish, setShowPublish] = useState(false);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const handlePhoneOnChange = (event) => {
    const phone = event.target.value;

    setPhone(phone);

    if (
      phone.match(
        "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$"
      )
    ) {
      if (phone.substring(0, 4) === "+254" && phone.length === 13) {
        setPhoneError(false);
      } else if (phone.substring(0, 2) === "07" && phone.length === 10) {
        setPhoneError(false);
      }
    }
  };

  const handlePhoneOnFocusOut = (event) => {
    if (
      phone.match(
        "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$"
      )
    ) {
      if (phone.substring(0, 4) === "+254" && phone.length === 13) {
        setPhoneError(false);
      } else if (phone.substring(0, 2) === "07" && phone.length === 10) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    } else {
      setPhoneError(true);
    }
  };

  const handleApplyPromoCode = (event, values) => {
    event.preventDefault();

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsLoadingPromoCode(true);

    const data = new FormData(event.currentTarget);

    // Payload defination
    const payload = {
      marqueeProfilePackageId: renewalID
        ? renewalID
        : state.data?.currentMarqueeProfilePackageRefNo,
      promoCode: data.get("promoCode").toUpperCase(),
    };

    // API CALL
    api
      .post("api/MQCustomerMarqueeProfileManagement/ApplyPromoCode", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        // console.log(data)

        setDiscountedPrice(data?.applyPromoCode.finalAmountToPay);
        setIsLoadingPromoCode(false);
        setIsPromoApplied(true);

        toast.success(data?.message);
      })
      .catch((error) => {
        setIsLoadingPromoCode(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response.data?.message);
        }
      });
  };

  // Make Payment Now
  const makePayment = (event, values) => {
    event.preventDefault();

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsProcessing(true);

    if (!phoneError) {
      const payload = {
        marqueeProfileId: state.data?.id,
        marqueeProfilePackageId: renewalID
          ? renewalID
          : state.data?.currentMarqueeProfilePackageRefNo,
        mpesaPhoneNumber: phone,
      };

      // API CALL
      vault
        .post("api/PayIn/MakeMpesaPaymentforMarquee", payload, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setIsProcessing(false);
          toast.success(
            "Processing... Please wait for an MPESA STK push to complete payment."
          );
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          setIsProcessing(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(errorMessage);

            if (errorMessage.includes("Marquee is fully paid")) {
              setTimeout(() => {
                setShowMakePayment(false);
                if (renewalID) {
                  window.location.reload();
                } else {
                  setShowPublish(true);
                }
              }, 4000);
            }
          }
        });
    } else {
      setPhoneError(true);
      setIsProcessing(false);
      toast.error("Invalid Phone Number");
    }
  };

  // Confirm Payment
  const confirmPayment = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsConfirmingPayment(true);

    api
      .get(
        `${"api/MQCustomerMarqueeProfileManagement/GetLastTransactionStatus"}?Id=${
          renewalID ? renewalID : state.data?.currentMarqueeProfilePackageRefNo
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
        const data = response.data?.message;
        setIsConfirmingPayment(false);
        toast.success(data);

        if (renewalID) {
          setTimeout(() => {
            toast.success("Renewal successful");
            window.location.reload();
          }, 2100);
        } else {
          setShowMakePayment(false);
          setShowPublish(true);
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data;
        setIsConfirmingPayment(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(errorMessage.message);

          if (
            errorMessage.message.includes("Request cancelled") ||
            errorMessage.message.includes("The balance is insufficient")
          ) {
            // setTimeout(() => {
            setShowMakePayment(true);
            // }, 4000)
          }
        }
      });
  };

  // Publish Advert
  const publishAdvert = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    setIsPublishing(true);

    const payload = {
      marqueeProfileId: state.data?.id,
    };

    // API CALL
    api
      .post(
        "api/MQCustomerMarqueeProfileManagement/SubmitMarqueeApplication",
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
        // setIsPublishing(false)
        toast.success(data?.message);

        setTimeout(() => {
          window.location.reload();
        }, 2100);
      })
      .catch((error) => {
        setIsPublishing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response.data?.message);

          const errorMessage = error.response.data.message;
          if (errorMessage.includes("submited successfully")) {
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          }
        }
      });
  };

  // Getting Payment Summary Details
  const getPaymentSummary = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    // Get Sub-Category Data
    api
      .get(
        `${"api/MQCustomerMarqueeProfileManagement/GetCurrentPackageByProfile"}?MarqueeProfileId=${
          state.data?.id
        }&CurrentMarqueeProfilePackageRefNo=${
          renewalID ? renewalID : state.data?.currentMarqueeProfilePackageRefNo
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
        // console.log(data)
        setCurrentPackage(data);
        if (data.marqueeOwnerDiscountRate > 0) {
          setDiscountedPrice(data.amountPaid);
          setIsLoadingPromoCode(false);
          setIsPromoApplied(true);
        }
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response);
        }
      });
  };

  useEffect(() => {
    if (state) {
      getPaymentSummary(state.product, state.package);
    }
  }, [state]);

  const paymentTabs = (size) => {
    return (
      <TabContainer activeKey={activeTab} className="py-1">
        <TabContent as="div" style={{ width: size }}>
          <TabPane eventKey="1" transition>
            <div className="d-flex flex-column justify-content-center">
              {/* <span className="fw-bold">Pay with saved MPESA Number</span>
            <div className="d-flex mt-2 mb-3 ms-2 p-2 border border-primary rounded position-relative">
              <i
                className="bx bx-trash-alt text-primary position-absolute"
                style={{
                  right: 5,
                  top: 5,
                }}
              ></i>
              <img
                src={mpesa}
                height={40}
                className='m-1 p-1 rounded'
                style={{ background: '#fff' }}
              />
              <div>
                <p className="my-0 text-primary fs-5 fw-bold">{state.data.phone}</p>
                <p className="my-0 text-dark" style={{ fontSize: 13 }}>Saved on {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <span className="fw-bold">Pay with MPESA Number</span> */}

              <div className="my-2 p-2 ms-2 border border-primary rounded">
                <Box component="form" onSubmit={(e, v) => makePayment(e, v)}>
                  <TextField
                    label="MPESA Phone Number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneOnChange}
                    onBlur={handlePhoneOnFocusOut}
                    className={classes.defaultInput}
                    required
                    fullWidth
                    variant="standard"
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    size="small"
                    margin="normal"
                    InputProps={{
                      inputComponent: PhoneFormat,
                      disableUnderline: true,
                    }}
                    error={phoneError}
                    helperText={phoneError ? "Wrong phone number" : ""}
                  />

                  {/* Proceed Button */}
                  <div className="text-center mt-3">
                    <button
                      disabled={isProcessing}
                      type="submit"
                      className="btn btn-primary save-user rounded-pill px-4 w-lg"
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
                        "Pay"
                      )}
                    </button>
                  </div>
                </Box>
              </div>

              <p className="text-center mt-3 mb-1">Already paid?</p>
              <div className="d-flex justify-content-center">
                <button
                  disabled={isConfirmingPayment}
                  className="btn btn-success save-user rounded-pill px-4 py-2 me-2"
                  onClick={() => confirmPayment()}
                >
                  {isConfirmingPayment ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Checking...
                    </>
                  ) : (
                    "Confirm Payment Status"
                  )}
                </button>
              </div>
            </div>
          </TabPane>
          <TabPane eventKey="2" transition>
            <div className="flex-fill d-flex justify-content-center mt-3">
              <div className="mb-1 p-3 border border-primary rounded">
                <ol className="ms-2">
                  <li className="text-dark mb-1">
                    Go to M-pesa Menu on your phone
                  </li>

                  <li className="text-dark mb-1">
                    Select <strong>Lipa na MPESA</strong> option
                  </li>

                  <li className="text-dark mb-1">
                    Select <strong>Pay Bill</strong> Option
                  </li>

                  <li className="text-dark mb-1">
                    Enter Business No:{" "}
                    <span className="fw-bold fs-5 badge badge-soft-primary">
                      903425
                    </span>
                  </li>

                  <li className="text-dark mb-1">
                    Enter Account No:{" "}
                    <span className="fw-bold fs-5 badge badge-soft-primary">
                      {currentPackage?.marqueeProfilePackageRefNo}
                    </span>
                  </li>

                  <li className="text-dark mb-1">
                    Enter Amount:{" "}
                    <span className="fw-bold fs-5 badge badge-soft-primary">
                      {isPromoApplied
                        ? discountedPrice
                        : currentPackage?.amountPaid.toLocaleString()}
                    </span>
                  </li>

                  <li className="text-dark mb-1">
                    Enter your M-PESA PIN and Send
                  </li>
                </ol>

                <h6 className="text-dark mb-1 text-wrap">
                  You will receive a confirmation SMS from M-PESA
                </h6>
              </div>
            </div>

            <p className="text-center mt-3 mb-1">Already paid?</p>
            {/* Confirm Button */}
            <div className="d-flex justify-content-center">
              <button
                disabled={isConfirmingPayment}
                className="btn btn-success save-user rounded-pill px-4 py-2 me-2"
                onClick={() => confirmPayment()}
              >
                {isConfirmingPayment ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Checking...
                  </>
                ) : (
                  "Confirm Payment Status"
                )}
              </button>
            </div>
          </TabPane>
        </TabContent>
      </TabContainer>
    );
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-column align-items-center mx-2 h-100">
        <Card className="mt-0 mb-1">
          <Card.Body>
            {/* Payment Section */}
            {showMakePayment && (
              <div>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-baseline mt-2">
                    <span className="me-3">Amount Payable:</span>

                    {isPromoApplied ? (
                      <div className="d-flex">
                        <h5 className="text-success fw-bold me-3">
                          <span className="fw-bold">
                            KES{" "}
                            <span className="text-success fw-bold">
                              {discountedPrice}
                            </span>
                          </span>
                        </h5>

                        <h5 className="text-decoration-line-through me-3 mb-0 px-2">
                          KES{" "}
                          <span className="text-dark">
                            {currentPackage?.originalAmount.toLocaleString()}
                          </span>
                        </h5>
                      </div>
                    ) : (
                      <h5 className="text-primary fw-bold me-3">
                        <span className="fw-bold">
                          KES{" "}
                          <span className="text-primary fw-bold">
                            {currentPackage?.amountPaid.toLocaleString()}
                          </span>
                        </span>
                      </h5>
                    )}
                  </div>

                  {!renewalID && (
                    <Box
                      className="mb-3 mt-2 ms-1"
                      component="form"
                      onSubmit={(e, v) => handleApplyPromoCode(e, v)}
                    >
                      <TextField
                        disabled={isPromoApplied}
                        label="Promo Code"
                        name="promoCode"
                        className={classes.filledInput}
                        value={currentPackage?.promocodeNo}
                        required
                        fullWidth
                        variant="filled"
                        type="text"
                        placeholder="XXXXXX"
                        size="small"
                        sx={{ margin: 0 }}
                        InputLabelProps={
                          isPromoApplied && {
                            shrink: true,
                          }
                        }
                        InputProps={{
                          endAdornment: isLoadingPromoCode ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                type="submit"
                                className="rounded bg-success bg-soft"
                                disabled={isPromoApplied}
                              >
                                {isPromoApplied ? <Check /> : "APPLY"}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  )}
                </div>

                <div className="flex-fill px-2 mt-2">
                  <Nav
                    variant="pills"
                    justify
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <Nav.Link
                      active={activeTab === "1"}
                      onClick={() => toggleTab("1")}
                    >
                      <i className="d-none d-sm-block bx bx-wallet font-size-20" />
                      <span className="font-weight-semibold">
                        M-PESA Express
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      active={activeTab === "2"}
                      onClick={() => toggleTab("2")}
                    >
                      <i className="d-none d-sm-block bx bx-wallet-alt font-size-20" />
                      <span className="font-weight-semibold">
                        M-PESA Pay Bill
                      </span>
                    </Nav.Link>
                  </Nav>

                  <div className="d-none d-md-block">{paymentTabs(400)}</div>

                  <div className="d-none d-sm-block d-md-none">
                    {paymentTabs(250)}
                  </div>

                  <div className="d-sm-none">{paymentTabs("auto")}</div>
                </div>
              </div>
            )}

            {/* Confirm Payment and finalize Section */}
            {showPublish && (
              <div className="flex-fill d-flex justify-content-center">
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ minWidth: "70%" }}
                >
                  <div className="table-responsive mt-3 mb-4">
                    <Table borderless className="mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Advert Name:</th>
                          <td>{state.data?.productName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Package:</th>
                          <td>{currentPackage?.marqueePackageName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Total Clicks:</th>
                          <td>
                            {currentPackage?.marqueeAllocatedClicks.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Amount Paid:</th>
                          <td>
                            Ksh {currentPackage?.amountPaid.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  {/* Publish Button */}
                  <div className="d-flex justify-content-center">
                    <button
                      disabled={isPublishing}
                      className="btn btn-success save-user rounded-pill px-4 py-2"
                      onClick={() => publishAdvert()}
                    >
                      {isPublishing ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Publishing...
                        </>
                      ) : (
                        "Publish Advert"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Cancel Button */}
        <div className="my-1 w-100 d-flex justify-content-between">
          <button
            disabled={showPublish}
            className="btn fw-bold text-white save-user bg-dark rounded-pill px-3 py-2 me-2 d-flex align-items-center"
            onClick={() => handleBack()}
          >
            <i className="bx bx-chevron-left me-1 fs-4"></i>
            Back
          </button>
          <button
            className="btn border border-primary text-primary save-user rounded-pill px-4 py-2 me-2"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payments;
