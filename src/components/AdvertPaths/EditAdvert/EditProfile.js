import React, { useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

// Toast Alert
import toast from "react-hot-toast";

import { SyncLoader } from "react-spinners";

import { IMaskInput } from "react-imask";
import Select from "react-select";

// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import useGetPackages from "services/useGetPackages";

const EditProfile = ({ step1Data, handleNext, adProfile }) => {
  const phoneRegex =
    "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$";

  // select options
  const packages = useGetPackages();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [advertProfile, setAdvertProfile] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([
    { label: "Select Category First" },
  ]);

  // selected values
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
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

  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [numOfphones, setNumOfphones] = useState(1);
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

  const handleDescriptionEdit = (data) => {
    setDescription(data);

    if (data.length < 501) {
      setErrorBox("");
    } else {
      setErrorBox("desc");
    }
  };

  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);

    setErrorBox("");

    fetchSubCategories(selectedCategory?.value);
    setSubCategories([{ label: "Loading..." }]);
    setSelectedSubCategory("");
  };

  const fetchSubCategories = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    api
      .get(
        `${"api/MQLookups/GetMarqueeSubCategories"}?MarqueeCategoryId=${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.mqLookups;
        setSubCategories([
          {
            label: "Sub-Categories",
            options: data.map((item) => {
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

  const handleSelectSubCategory = (selectedSubCategory) => {
    setErrorBox("");

    setSelectedSubCategory(selectedSubCategory);
  };

  const handleSelectPackage = (selectedPackage) => {
    setErrorBox("");

    setSelectedPackage(selectedPackage);
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

    // if description is empty
    if (
      description &&
      description.trim().length > 0 &&
      description.trim().length < 501
    ) {
      // if selected category has been set
      if (selectedCategory) {
        // console.log(selectedCategory)

        // if selected subcategory has been set
        if (selectedSubCategory) {
          // console.log(selectedSubCategory)

          // if selected package has been set
          if (selectedPackage) {
            // console.log(selectedPackage)

            if (validatePhone(phone, 0) && validatePhone(phone1, 1)) {
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
            //no selected package
            setErrorBox("pkgSelect"); // red mark packages
            setValidated(false);
            // popup red alert
            toast.error("Advertising Package Required");
          }
        } else {
          //no selected subcategory
          setErrorBox("subCategorySlct"); // red mark subcategory selection
          setValidated(false);
          // popup red alert
          toast.error("Subcategory Required");
        }
      } else {
        //no selected category
        setErrorBox("categorySlct"); // red mark category selection
        setValidated(false);
        // popup red alert
        toast.error("Category Required");
      }
    } else {
      setErrorBox("desc");
      setValidated(false);

      if (description.trim().length === 0) {
        toast.error("A description is required");
      } else {
        toast.error("Description is too long");
      }
    }
  };

  const handleProfileUpdate = (event) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    setIsProcessing(true);

    // Manipulaiton of Marquee Products
    var defaultChannels = [];
    selectedPlatform.forEach((e) => {
      defaultChannels.push(e.value);
    });

    const form = event.currentTarget;

    // Payload
    const payload = {
      productName: form.marqueeName.value,
      seller: form.seller.value,
      hasCompany: false,
      companyName: null,
      productLocation: form.location.value ? form.location.value : "Online",
      description: description,
      productPrice: null,
      marqueeCategory: selectedCategory?.value,
      marqueeSubCategory: selectedSubCategory?.value,
      productMetadata: null,
      marqueePackage: selectedPackage,
      expectedStartTime: null,
      marqueeProfileChannels: defaultChannels,
      phone: phone ? phone : null,
      phone1: phone1 ? phone1 : null,
      website: website ? website : null,
      whatsapp: whatsapp ? whatsapp : null,
      facebook: facebook ? facebook : null,
      twitter: twitter ? twitter : null,
      telegram: telegram ? telegram : null,
      instagram: instagram ? instagram : null,
      youtube: youtube ? youtube : null,
      email: form.email.value ? form.email.value : null,
      appStore: appStore ? appStore : null,
      playstore: playstore ? playstore : null,
      tikTok: tikTok ? tikTok : null,
      userId: userId,
      id: adProfile.id,
    };

    // console.log(payload)

    // API CALL
    api
      .post(
        "api/MQCustomerMarqueeProfileManagement/EditMarqueeProfile",
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

        toast.success("Details Submitted Successfully");

        step1Data.push({ state: data.marqueeProfile });
        setIsProcessing(false);
        handleNext();
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response.data?.message);
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
          `${"api/MQCustomerMarqueeProfileManagement/GetMarqueeProfileDetails"}?MarqueeProfileId=${
            adProfile.id
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
          const data = response.data.marqueeProfileDetails;

          setAdvertProfile(data?.marqueeProfile);

          setDescription(data?.marqueeProfile?.description);

          setSelectedCategory({
            label: data?.marqueeProfile?.marqueeCategoryName,
            value: data?.marqueeProfile?.marqueeCategory,
          });

          setSelectedSubCategory({
            label: data?.marqueeProfile?.marqueeSubCategoryName,
            value: data?.marqueeProfile?.marqueeSubCategory,
          });

          setWebsite(data?.marqueeProfile?.website);
          setWhatsapp(data?.marqueeProfile?.whatsapp);
          setTelegram(data?.marqueeProfile?.telegram);
          setInstagram(data?.marqueeProfile?.instagram);
          setFacebook(data?.marqueeProfile?.facebook);
          setYoutube(data?.marqueeProfile?.youtube);
          setTwitter(data?.marqueeProfile?.twitter);
          setPhone(data?.marqueeProfile?.phone);
          setPhone1(data?.marqueeProfile?.phone1);
          setTikTok(data?.marqueeProfile?.tikTok);
          setPlaystore(data?.marqueeProfile?.playstore);
          setAppStore(data?.marqueeProfile?.appStore);

          var channels = [];
          data?.profileChannels.forEach((element) => {
            if (element.default === false) {
              var c = { label: element.channel, value: element.channelCode };
              channels.push(c);
            }
          });

          setSelectedPlatform(channels);

          fetchSubCategories(data?.marqueeProfile?.marqueeCategory);
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
        .get("api/MQLookups/GetMarqueeCategories", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.mqLookups;
          setCategories([
            {
              label: "Categories",
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
          console.log(error.response?.data?.message);
        });

      // API CALL: PC
      const get3 = api
        .get(
          `${"api/MQCustomerMarqueeProfileManagement/GetCurrentPackageByProfile"}?MarqueeProfileId=${
            adProfile.id
          }&CurrentMarqueeProfilePackageRefNo=${
            adProfile.currentMarqueeProfilePackageRefNo
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

          setSelectedPackage(data?.marqueePackage);

          setDataLoaded(true);
        })
        .catch((error) => {
          console.log(error.response?.data?.message);
        });

      await Promise.all([get1, get2, get3]);
    }
  }, [adProfile]);

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
  ];

  return (
    <React.Fragment>
      {dataLoaded ? (
        <Form noValidate validated={validated} onSubmit={handleValidSubmit}>
          <Row
            className="m-0 mb-3"
            style={{ borderBottom: "2px solid #d5d5d5" }}
          >
            <Col md={6} lg={6} className="border-end border-2">
              <Form.Group className="mb-3" as="div" controlId="marqueeName">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  defaultValue={advertProfile?.productName}
                  placeholder="e.g. Photography Services"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Title Required
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="m-0">
                <Col lg="6" xl={12} className="p-0 mb-3 me-lg-2">
                  <Form.Label>Category</Form.Label>
                  <Select
                    value={selectedCategory}
                    onChange={handleSelectCategory}
                    options={categories}
                    className={`${
                      errorBox === "categorySlct" &&
                      "border border-2 border-danger rounded"
                    }`}
                    classNamePrefix="select2-selection"
                  />
                </Col>

                <Col className="p-0 mb-3">
                  <Form.Label>Sub-Category</Form.Label>
                  <Select
                    value={selectedSubCategory}
                    onChange={handleSelectSubCategory}
                    options={subCategories}
                    className={`${
                      errorBox === "subCategorySlct" &&
                      "border border-2 border-danger rounded"
                    } `}
                    classNamePrefix="select2-selection"
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3" as="div" controlId="productDesc">
                <Form.Label className="me-2">Description</Form.Label>
                <Form.Text>(Maximum is 500 characters)</Form.Text>
                <div
                  className={`rounded ${
                    errorBox === "desc" ? "border border-danger" : ""
                  } `}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    config={{
                      placeholder:
                        "Type a brief description about your product",
                      removePlugins: [
                        "link",
                        "blockQuote",
                        "ckfinder",
                        "imageTextAlternative",
                        "imageUpload",
                        "heading",
                        "imageStyle:full",
                        "imageStyle:side",
                        "mediaEmbed",
                        "insertTable",
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "undo",
                        "redo",
                      ],

                      toolbar: [
                        "bold",
                        "italic",
                        "bulletedList",
                        "numberedList",
                      ],
                    }}
                    onChange={(event, editor) =>
                      handleDescriptionEdit(editor.getData())
                    }
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Form.Text
                    className={`${errorBox === "desc" ? "text-danger" : ""} `}
                  >
                    {description.trim().length + " / 500"}
                  </Form.Text>
                  {errorBox === "desc" && (
                    <Form.Text className="ms-2 text-danger">
                      {description.trim().length === 0
                        ? "A description is required"
                        : "Too long"}
                    </Form.Text>
                  )}
                </div>
              </Form.Group>
            </Col>

            <Col>
              <Row>
                <Form.Group className="mb-3" as="div" controlId="seller">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    pattern="(\w.+\s.).+"
                    defaultValue={advertProfile?.seller}
                    placeholder="e.g. John Smith"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Full Name Required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" as="div" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={advertProfile?.email}
                    placeholder="e.g. johndoe@email.com"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Invalid Email
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" as="div" controlId="phone">
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
                </Form.Group>

                {/* ADDITIONAL PHONE NUMBERS */}
                {additionalPhoneNumbers
                  .slice(0, numOfphones)
                  .map((item, key) => (
                    <div key={key} className="mb-3">
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
                              if (item.value?.match(phoneRegex)) {
                                setPhoneError(-1);
                              } else {
                                setValidated(false);
                                setPhoneError(key + 1);
                              }
                            }}
                            // required
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
                    </div>
                  ))}

                <div>
                  <button
                    disabled={numOfphones > 0}
                    type="button"
                    onClick={() => setNumOfphones(numOfphones + 1)}
                    className="btn btn-sm btn-primary shadow-none border border-primary mb-3"
                  >
                    <i className="bx bx-plus" /> Add Other Phone Number
                  </button>
                </div>

                <Form.Group className="mb-3" as="div" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    defaultValue={advertProfile?.productLocation}
                    placeholder="e.g. Nairobi"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Mising Location info
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Col>
          </Row>

          <div
            className="m-0 mb-3"
            style={{ borderBottom: "2px solid #d5d5d5" }}
          >
            <div className="ms-2">
              <Form.Label>Social Media</Form.Label>
              <Row className="justify-content-between">
                {socialMediaInputs.map(
                  (inpt, key) =>
                    shownOptions.find((item) => item === inpt.label) && (
                      <Col md="6" key={key} className="d-flex mb-3 pe-3">
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
              </Row>
            </div>

            <hr className="my-2" />

            {mediaOptions.length > 0 && (
              <div className="d-flex align-items-center mb-3">
                <Form.Group as="div" className="me-2">
                  <Form.Select
                    value={selectedMedia}
                    onChange={(e) => setSelectedMedia(e.target.value)}
                  >
                    {mediaOptions.map((item, key) => (
                      <option className="border-none" key={key} value={item}>
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
          </div>

          <div>
            <h5 className="text-primary">Select Package</h5>
            <Row
              className={`package-container ${
                errorBox === "pkgSelect" &&
                "border border-2 border-danger rounded"
              }`}
            >
              {packages &&
                packages.map((mqPackage, key) => (
                  <Col className="package-item" key={key}>
                    <label className="h-100 d-flex">
                      <input
                        type="radio"
                        name="paymentPackage"
                        id="paymentPackage"
                        value={mqPackage.id}
                        onChange={(e) => handleSelectPackage(e.target.value)}
                        defaultChecked={
                          mqPackage.id === selectedPackage ? true : ""
                        }
                        hidden
                      />

                      <Card
                        className={`package-card ${
                          mqPackage.id === selectedPackage ? "checked" : ""
                        } `}
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

                          <span>
                            Bonus: {mqPackage?.bonusRate.toLocaleString()}%
                          </span>
                        </div>
                      </Card>
                    </label>
                  </Col>
                ))}
            </Row>
          </div>

          <div className="my-1 d-flex justify-content-end">
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
                "Proceed to Images"
              )}
            </button>
          </div>
        </Form>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <SyncLoader color="#de864b " size={20} margin={3} />
          <h5>Loading advert data</h5>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditProfile;
