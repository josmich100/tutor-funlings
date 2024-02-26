import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { Col, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";

// Toast Alert
import toast from "react-hot-toast";

import { IMaskInput } from "react-imask";
import Select from "react-select";

// Importing Custom Components
import api from "helpers/API/BaseApi";

const EditStore = () => {
  const phoneRegex =
    "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$";

  const [showModal, setShowModal] = useState(false);

  const [storeProfile, setStoreProfile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [towns, setTowns] = useState([{ label: "Select Country First" }]);

  // selected values
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");

  const [shownOptions, setShownOptions] = useState([
    "WhatsApp",
    "Website",
    "Twitter",
    "AppStore",
    "PlayStore",
    "Telegram",
    "Instagram",
    "Facebook",
    "Youtube",
    "Tiktok",
  ]);
  const [mediaOptions, setMediaOptions] = useState([]);

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [numOfphones, setNumOfphones] = useState(2);
  const [tikTok, setTikTok] = useState("");
  const [playstore, setPlaystore] = useState("");
  const [appStore, setAppStore] = useState("");

  // Processing variables
  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorBox, setErrorBox] = useState("");

  const handleRemovePhoneNumber = (position, lastIndex) => {
    /* before looping and shifting values,
     * check if the deleted value is the last one
     */
    if (position === lastIndex) {
      additionalPhoneNumbers[position].setValue("");

      setNumOfphones(numOfphones - 1);
      return;
    }

    /* start shift values upward */
    let values = [];

    // store remaining values
    additionalPhoneNumbers.forEach((num, index) => {
      if (position !== index) {
        values.push(num.value);
      }
    });

    // set all values to null
    additionalPhoneNumbers.forEach((num) => {
      num.setValue("");
    });

    // map them afresh
    values.forEach((value, index) => {
      additionalPhoneNumbers[index].setValue(value);
    });
    /* finish shifting values upwards */

    setNumOfphones(numOfphones - 1);
  };

  const handleAddSocialMedia = () => {
    // add selected option to shown list
    shownOptions.push(selectedMedia);

    // remove selected option from selection list
    const newList = mediaOptions.filter((item) => {
      return item !== selectedMedia;
    });

    setMediaOptions(newList);

    if (newList.length === 0) {
      setSelectedMedia("");
    } else {
      setSelectedMedia(newList[0]);
    }
  };

  const handleRemoveSocialMedia = (itemName) => {
    // add removed item to selection list
    mediaOptions.unshift(itemName);

    // remove selected option from shown list
    const newList = shownOptions.filter((item) => {
      return item !== itemName;
    });

    setShownOptions(newList);
  };

  const handleSelectCountry = (selectedCountry) => {
    setSelectedCountry(selectedCountry);

    setErrorBox("");

    fetchTowns(selectedCountry?.value);
    setTowns([{ label: "Loading..." }]);
    setSelectedTown("");
  };

  const handleSelectTown = (selectedTown) => {
    setErrorBox("");

    setSelectedTown(selectedTown);
  };

  // Fetching Towns Based on Country
  const fetchTowns = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // Get Sub-Category Data
    api
      .get(`${"api/MQLookups/GetTowns"}?Id=${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.mqLookups;
        setTowns([
          {
            label: "Towns",
            options: data.map(function (item) {
              return {
                label: item.name,
                value: item.id,
              };
            }),
          },
        ]);
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response?.data?.message);
        }
      });
  };

  const validatePhone = (value, num) => {
    if (value === "" || value === null) {
      setPhoneError(-1);
      return true;
    } else {
      // else value is not empty
      if (value.match(phoneRegex)) {
        setPhoneError(-1);
        return true;
      } else {
        setPhoneError(num);
        return false;
      }
    }
  };

  //check select options
  const handleValidSubmit = (event) => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    if (selectedCountry) {
      if (selectedTown) {
        if (
          validatePhone(phone, 0) &&
          validatePhone(phone1, 1) &&
          validatePhone(phone2, 2)
        ) {
          // check for any empty fields
          if (form.checkValidity() === true) {
            setErrorBox("");
            // console.log(values)
            handleProfileUpdate(event);
          } else {
            toast.error("Review all your entries for possible error(s)");
          }
        } else {
          setValidated(false);
          toast.error("Invalid Phone Number");
        }
      } else {
        setErrorBox("town"); // red mark subcategory selection
        setValidated(false);
        // popup red alert
        toast.error("Town Required");
      }
    } else {
      setErrorBox("country"); // red mark category selection
      setValidated(false);
      toast.error("Country Required");
    }
  };

  const handleProfileUpdate = (event) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    setIsProcessing(true);

    const form = event.currentTarget;

    // Payload
    const payload = {
      adOwner: userId,
      businessName: form.businessName.value,
      physicalAddress: form.physicalAddress.value,
      country: selectedCountry?.value,
      town: selectedTown?.value,
      emailAddress: email ? email : null,
      phone: phone ? phone : null,
      phone1: phone1 ? phone1 : null,
      phone2: phone2 ? phone2 : null,
      website: website ? website : null,
      whatsapp: whatsapp ? whatsapp : null,
      facebook: facebook ? facebook : null,
      twitter: twitter ? twitter : null,
      telegram: telegram ? telegram : null,
      instagram: instagram ? instagram : null,
      youtube: youtube ? youtube : null,
      appStore: appStore ? appStore : null,
      playstore: playstore ? playstore : null,
      tikTok: tikTok ? tikTok : null,
      userId: userId,
      id: storeProfile.id,
    };

    // console.log(payload)

    // API CALL
    api
      .post("api/MQCustomerStoresManagement/EditStoreProfile", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        profile["store"] = data?.storeProfile;
        localStorage.setItem("authFunStudnt", JSON.stringify(profile));

        toast.success(data.message);

        setShowModal(false);
        setIsProcessing(false);
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
      const store = profile.store;

      // console.log(store)

      setStoreProfile(store);

      setEmail(store.emailAddress);
      setPhone(store.phone);
      setWebsite(store.website);
      setWhatsapp(store.whatsapp);
      setTelegram(store.telegram);
      setInstagram(store.instagram);
      setFacebook(store.facebook);
      setYoutube(store.youtube);
      setTwitter(store.twitter);
      setPhone(store.phone);
      setPhone1(store.phone1);
      setPhone2(store.phone2);
      setTikTok(store.tikTok);
      setPlaystore(store.playstore);
      setAppStore(store.appStore);

      // API CALL: PC
      const get1 = api
        .get("api/MQLookups/GetCountries", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.mqLookups;

          const selectedVal = data.filter((item) => {
            if (item.id === store.country) {
              return item;
            }
          });

          setSelectedCountry({
            label: selectedVal[0].name,
            value: selectedVal[0].id,
          });

          setCountries([
            {
              label: "Countries",
              options: data.map(function (item) {
                return {
                  label: item.name,
                  value: item.id,
                };
              }),
            },
          ]);
        })
        .catch((error) => {
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
            return;
          } else {
            console.log(error.response?.data?.message);
          }
        });

      const get2 = api
        .get(`${"api/MQLookups/GetTowns"}?Id=${store.country}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.mqLookups;

          const selectedVal = data.filter((item) => {
            if (item.id === store.town) {
              return item;
            }
          });

          setSelectedTown({
            label: selectedVal[0].name,
            value: selectedVal[0].id,
          });
        })
        .catch((error) => {
          console.log(error.response?.data?.message);
        });

      await Promise.all([get1, get2]);
    }

    // set selected medias
    if (mediaOptions.length === 0) {
      setSelectedMedia("");
    } else {
      setSelectedMedia(mediaOptions[0]);
    }

    return () => {
      setShowModal(false);
    };
  }, []);

  /**
   * -----------------UI-----------------UI-----------------
   */

  const socialMediaInputs = [
    {
      label: "WhatsApp",
      placeholder: "e.g. +2547XXXXXXXX",
      value: whatsapp,
      setValue: setWhatsapp,
    },
    {
      label: "Website",
      placeholder: "e.g. https://www.example.com",
      value: website,
      setValue: setWebsite,
    },
    {
      label: "Twitter",
      placeholder: "e.g. https://twitter.com/username",
      value: twitter,
      setValue: setTwitter,
    },
    {
      label: "AppStore",
      placeholder: "",
      value: appStore,
      setValue: setAppStore,
    },
    {
      label: "PlayStore",
      placeholder: "",
      value: playstore,
      setValue: setPlaystore,
    },
    {
      label: "Telegram",
      placeholder: "e.g. https://t.me/username",
      value: telegram,
      setValue: setTelegram,
    },
    {
      label: "Instagram",
      placeholder: "e.g. https://www.instagram.com/username",
      value: instagram,
      setValue: setInstagram,
    },
    {
      label: "Facebook",
      placeholder: "e.g. https://www.facebook.com/username",
      value: facebook,
      setValue: setFacebook,
    },
    {
      label: "Youtube",
      placeholder: "e.g. https://www.youtube.com/...",
      value: youtube,
      setValue: setYoutube,
    },
    {
      label: "Tiktok",
      placeholder: "",
      value: tikTok,
      setValue: setTikTok,
    },
  ];

  const additionalPhoneNumbers = [
    {
      value: phone1,
      setValue: setPhone1,
    },
    {
      value: phone2,
      setValue: setPhone2,
    },
  ];

  return (
    <React.Fragment>
      <div className="d-none d-md-block">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-sm border border-dark fs-5"
        >
          <i className="fas fa-edit" /> Edit
        </button>
      </div>

      <div className="d-md-none">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-sm border border-dark fs-6"
        >
          <i className="fas fa-edit-alt" /> Edit
        </button>
      </div>

      <Modal
        backdrop="static"
        size="lg"
        centered
        enforceFocus={false}
        animation
        show={showModal}
        onHide={() => setShowModal(false)}
        restoreFocus={false}
        fullscreen="lg-down"
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3 text-dark">Edit Store</span>
          </Modal.Header>
          <Modal.Body as="div" className="px-3 h-100 position-relative">
            <Form noValidate validated={validated} onSubmit={handleValidSubmit}>
              <Row>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="businessName"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    defaultValue={storeProfile?.businessName}
                    placeholder="e.g. Ngamia Ltd."
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Name Required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={6} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. johndoe@email.com"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Invalid Email
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  as={Col}
                  xs={12}
                  lg={6}
                  controlId="country"
                >
                  <Form.Label>Country</Form.Label>
                  <Select
                    value={selectedCountry}
                    onChange={handleSelectCountry}
                    options={countries}
                    className={`${
                      errorBox === "country" &&
                      "border border-2 border-danger rounded"
                    }`}
                    classNamePrefix="select2-selection"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  as={Col}
                  xs={12}
                  lg={6}
                  controlId="town"
                >
                  <Form.Label>Town</Form.Label>
                  <Select
                    value={selectedTown}
                    onChange={handleSelectTown}
                    options={towns}
                    className={`${
                      errorBox === "town" &&
                      "border border-2 border-danger rounded"
                    }`}
                    classNamePrefix="select2-selection"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="physicalAddress"
                >
                  <Form.Label>Physical Address</Form.Label>
                  <Form.Control
                    defaultValue={storeProfile?.physicalAddress}
                    as="textarea"
                    rows={3}
                    placeholder="Enter a brief decription about physical location of business..."
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Address description Required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  as={Col}
                  xs={12}
                  lg={6}
                  controlId="phone"
                >
                  <Form.Label>Phone Number</Form.Label>
                  <IMaskInput
                    className={`form-control ${
                      phoneError === 0 ? "border border-danger text-danger" : ""
                    }`}
                    value={phone}
                    mask="[*000] 000 000 000 0"
                    unmask
                    lazy={true}
                    autoComplete="tel"
                    placeholder="+254 7xx xxx xxx"
                    onAccept={(value) => {
                      setPhone(value);
                      setWhatsapp(value);
                      if (value.match(phoneRegex)) {
                        setPhoneError(-1);
                      }
                    }}
                    onBlur={() => {
                      if (phone.match(phoneRegex)) {
                        setPhoneError(-1);
                      } else {
                        setValidated(false);
                        setPhoneError(0);
                      }
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone Number Required
                  </Form.Control.Feedback>
                  {phoneError === 0 && (
                    <Form.Text className="text-danger">
                      Invalid Phone Number
                    </Form.Text>
                  )}

                  <div className="my-2 d-flex justify-content-end">
                    <button
                      disabled={numOfphones > 1}
                      type="button"
                      onClick={() => setNumOfphones(numOfphones + 1)}
                      className="btn btn-sm btn-primary shadow-none border border-primary"
                    >
                      <i className="bx bx-plus" /> Add Other Phone Number
                    </button>
                  </div>
                </Form.Group>

                {/* ADDITIONAL PHONE NUMBERS */}
                {additionalPhoneNumbers
                  .slice(0, numOfphones)
                  .map((item, key) => (
                    <Form.Group
                      key={key}
                      className="mb-2"
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId={`phone${key + 1}`}
                    >
                      <Form.Label>{`Phone Number ${key + 2}`}</Form.Label>

                      <div key={key} className="d-flex">
                        <div className="flex-grow-1 me-1">
                          <IMaskInput
                            className={`form-control ${
                              phoneError === key + 1
                                ? "border border-danger text-danger"
                                : ""
                            }`}
                            value={item.value}
                            mask="[*000] 000 000 000 0"
                            unmask
                            lazy={true}
                            autoComplete="tel"
                            placeholder="+254 7xx xxx xxx"
                            onAccept={(value) => {
                              item.setValue(value);
                              if (value.match(phoneRegex)) {
                                setPhoneError(-1);
                              }
                            }}
                            onBlur={() => {
                              if (item.value.match(phoneRegex)) {
                                setPhoneError(-1);
                              } else {
                                setValidated(false);
                                setPhoneError(key + 1);
                              }
                            }}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Phone Number Required
                          </Form.Control.Feedback>
                          {phoneError === key + 1 && (
                            <Form.Text className="text-danger">
                              Invalid Phone Number
                            </Form.Text>
                          )}
                        </div>

                        <div className="d-flex flex-column mt-1 align-items-center">
                          <button
                            type="button"
                            className="border border-2 border-primary rounded-circle p-0 "
                            onClick={() => {
                              handleRemovePhoneNumber(key, numOfphones - 1);
                            }}
                          >
                            <i className="fas fa-minus avatar fs-5 m-1 text-primary" />
                          </button>
                        </div>
                      </div>
                    </Form.Group>
                  ))}

                <hr className="my-1" />

                <Form.Label>Social Media</Form.Label>

                {socialMediaInputs.map(
                  (inpt, key) =>
                    shownOptions.find((item) => item === inpt.label) && (
                      <Col xs={12} md={6} key={key} className="d-flex mb-3">
                        <div className="flex-grow-1 me-1">
                          <InputGroup as={Row} className="m-0">
                            <InputGroup.Text as={Col} xs="3">
                              {inpt.label}
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              value={inpt.value}
                              onChange={(e) => inpt.setValue(e.target.value)}
                              placeholder={inpt.placeholder}
                            />
                          </InputGroup>
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            type="button"
                            className="border border-2 border-primary rounded-circle p-0"
                            onClick={() => {
                              inpt.setValue("");
                              handleRemoveSocialMedia(inpt.label);
                            }}
                          >
                            <i className="fas fa-minus avatar fs-5 m-1 text-primary" />
                          </button>
                        </div>
                      </Col>
                    )
                )}

                <hr className="my-2" />

                {mediaOptions.length > 0 && (
                  <div className="d-flex align-items-center mb-3">
                    <Form.Group as="div" className="me-2">
                      <Form.Select
                        value={selectedMedia}
                        onChange={(e) => setSelectedMedia(e.target.value)}
                      >
                        {mediaOptions.map((item, key) => (
                          <option
                            className="border-none"
                            key={key}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <div>
                      <button
                        disabled={socialMediaInputs.length < 1}
                        type="button"
                        className="border border-2 border-primary rounded-circle p-0"
                        onClick={() => handleAddSocialMedia()}
                      >
                        <i className="fas fa-plus fs-5 m-1 text-primary" />
                      </button>
                    </div>
                  </div>
                )}
              </Row>

              <div className="mt-1 mb-2 d-flex justify-content-center">
                <button
                  disabled={isProcessing}
                  type="submit"
                  className="btn btn-primary save-user rounded-pill px-4 py-2"
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
                    "Save"
                  )}
                </button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(EditStore);
