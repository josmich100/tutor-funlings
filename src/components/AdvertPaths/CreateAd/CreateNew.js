import React, { createRef, useEffect, useState } from "react";

import { Card, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

// Toast Alert
import toast from "react-hot-toast";

import { IMaskInput } from "react-imask";
import Dropzone from "react-dropzone";
import Select from "react-select";

// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import useGetPackages from "services/useGetPackages";

const CreateNew = ({ step1Data, handleNext, closeModal }) => {
  const dropzoneRef = createRef();
  const phoneRegex =
    "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$";

  // select options
  const packages = useGetPackages();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([
    { label: "Select Category First" },
  ]);

  const [previews, setPreviews] = useState([]);
  const [showPreviews, setShowPreviews] = useState(false);
  const [tempProfile, setTempProfile] = useState(null);

  // selected values
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [videoTaken, setVideoTaken] = useState(false);
  const [shownOptions, setShownOptions] = useState(["WhatsApp"]);
  const [mediaOptions, setMediaOptions] = useState([
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

  const [description, setDescription] = useState("");
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
  const [numOfphones, setNumOfphones] = useState(0);
  const [tikTok, setTikTok] = useState("");
  const [playstore, setPlaystore] = useState("");
  const [appStore, setAppStore] = useState("");

  // Processing variables
  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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

  const handleSelectPackage = (selectedPackage) => {
    setErrorBox("");

    setSelectedPackage(selectedPackage);
  };

  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);

    setErrorBox("");

    fetchSubCategories(selectedCategory?.value);
    setSubCategories([{ label: "Loading..." }]);
    setSelectedSubCategory("");
  };

  const handleSelectSubCategory = (selectedSubCategory) => {
    setErrorBox("");

    setSelectedSubCategory(selectedSubCategory);
  };

  // Fetching PS-C
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

  const handleFileRejection = (rejectedFiles) => {
    switch (rejectedFiles[0].errors[0].code) {
      case "file-too-large":
        toast.error("File size is larger than accepted size");
        break;
      case "file-invalid-type":
        toast.error("Unaccepted File Type");
        break;
      case "too-many-files":
        toast.error("Select ONE file at a time");
        break;
      default:
        toast.error("File size is larger than accepted size");
        break;
    }
  };

  const handleAcceptedFiles = (selectedFiles) => {
    selectedFiles.map((file) => {
      setShowPreviews(false);

      if (file.type.includes("video")) {
        // create video element to tell duration
        var video = document.createElement("video");
        // initialize video element
        video.preload = "metadata";
        video.src = URL.createObjectURL(file);

        video.ondurationchange = function () {
          try {
            // if video is longer than 1 minute
            if (video.duration > 61) {
              // display error message
              toast.error("Video duration cannot be longer than one minute");
            } else {
              setVideoTaken(true);

              // if files are five or more remove the first one
              if (acceptedFiles.length > 4) {
                // display error message
                toast.error("Limit of media files reached");
              } else {
                // set video to first position as featured
                acceptedFiles.unshift(file);

                //change file name to display as thumbnail
                previews.unshift(URL.createObjectURL(file));
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
      } else {
        if (acceptedFiles.length > 4) {
          // display error message
          toast.error("Limit of media files reached");
        } else {
          // add file to list
          acceptedFiles.push(file);
          previews.push(URL.createObjectURL(file));
        }
      }

      setTimeout(() => {
        setShowPreviews(true);
      }, 100);
    });

    if (acceptedFiles.length > 0) {
      setErrorBox("");
    }
  };

  const removeFile = (indexToDlt) => {
    setShowPreviews(false);

    if (videoTaken && indexToDlt === 0) {
      //remove video file: file in firsst index
      previews.shift();
      acceptedFiles.shift();
      setVideoTaken(false);
    } else {
      // get new list without indexToDlt
      const newFileList = acceptedFiles.filter((item, key) => {
        if (indexToDlt !== key) {
          return item;
        }
      });

      const newPreviewList = previews.filter((item, key) => {
        if (indexToDlt !== key) {
          return item;
        }
      });

      setPreviews(newPreviewList);
      setAcceptedFiles(newFileList);
    }

    setShowPreviews(true);
  };

  const validatePhone = (value, num) => {
    if (value === "") {
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

    // if there two or more images
    if (acceptedFiles.length > 1) {
      // console.log(acceptedFiles.length)

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
                  handleProfileSubmit(event);
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
    } else {
      //less than two images selected
      setErrorBox("imgError"); // red mark category selection
      setValidated(false);
      // popup red alert
      toast.error("At least two images are required.");
    }
  };

  const handleProfileSubmit = (event) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    setIsProcessing(true);

    if (tempProfile) {
      handleImageUpload(tempProfile);
    } else {
      // Manipulation of Marquee Products
      var defaultChannels = [
        "NgamiaCustomerApp",
        "NgamiaDriverApp",
        "NgamiaPay",
        "NgamiaMarketPlace",
        "NgamiaTransporterApp",
      ];

      const form = event.currentTarget;

      // Payload
      const payload = {
        productName: form.marqueeName.value.trim(),
        seller: form.seller.value.trim(),
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
        email: email ? email : null,
        appStore: appStore ? appStore : null,
        playstore: playstore ? playstore : null,
        tikTok: tikTok ? tikTok : null,
        userId: userId,
      };

      // console.log(payload)

      // API CALL
      api
        .post(
          "api/MQCustomerMarqueeProfileManagement/AddMarqueeProfile",
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
          // upload images
          setTempProfile(data.marqueeProfile);
          handleImageUpload(data.marqueeProfile);
        })
        .catch((error) => {
          setIsProcessing(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response?.data?.message);
          }
        });
    }
  };

  const handleImageUpload = async (advertProfile) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    setIsUploading(true);

    for (const [key, file] of acceptedFiles.entries()) {
      // Forming Form Data
      const formData = new FormData();
      formData.append("GetFormFiles", file);
      if (key === 0) {
        formData.append("FeaturedFile", true);
      }
      formData.append("Owner", userId);
      formData.append("RefNumber", advertProfile?.id);
      formData.append("Marquee", true);

      await uploadEachImage(formData, token);

      if (key === acceptedFiles.length - 1) {
        toast.success("Details Submitted Successfully");

        step1Data.push({ state: advertProfile });
        setIsProcessing(false);
        handleNext();
      }
    }
  };

  const uploadEachImage = async (formData, token) => {
    // API CALL
    await api
      .post("api/DocumentsManagement/UploadFiles", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setIsUploading(false);
      })
      .catch((error) => {
        setIsUploading(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
        closeModal();
      });
  };

  // API CALL:
  useEffect(async () => {
    if (localStorage.getItem("authFunStudnt")) {
      const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
      const token = profile.token;

      setEmail(profile.email);
      setPhone(profile.phoneNumber);
      setWhatsapp(profile.phoneNumber);

      // API CALL: PC
      const get1 = api
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
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            console.log(error.response?.data?.message);
          }
        });

      await Promise.all([get1]);
    }

    // set selected medias
    if (mediaOptions.length === 0) {
      setSelectedMedia("");
    } else {
      setSelectedMedia(mediaOptions[0]);
    }
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
  ];

  const MediaUpld = (
    <Row
      className={`mb-2 ${
        errorBox === "imgError" && "border border-2 border-danger rounded"
      }`}
    >
      <Col xs="auto" md="12">
        <Form.Text>
          Maximum size for video is 20MBs and for image is 5MBs.<br></br>Maximum
          video length is 1 minute
        </Form.Text>
        <Dropzone
          onDropAccepted={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
          onDropRejected={(rejectedFiles) => handleFileRejection(rejectedFiles)}
          maxFiles={1}
          multiple={false}
          maxSize={videoTaken ? 6291456 : 22020096}
          // accept="image/*"
          accept={
            videoTaken
              ? ".png, .jpg, .jpeg, .svg, .gif"
              : ".png, .jpg, .jpeg, .svg, .gif, .mp4, .avi"
          }
          ref={dropzoneRef}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="dropzone border-primary mt-2"
              style={{ maxWidth: 300 }}
            >
              <div className="dz-message p-1" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="dz-message p-2">
                  <div className="mb-3">
                    {isUploading ? (
                      <i className="display-1 text-success bx bx-check-circle" />
                    ) : (
                      <i className="display-1 text-light bx bx-image-add" />
                    )}
                  </div>
                  <h5 className="text-primary">Choose Product Media</h5>
                  <p className="fs-6 mb-0">
                    The first image/video will be by default the featured one.
                    Minimum is 2 files
                  </p>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </Col>

      {/* selected image preview */}
      <Col className="dropzone-previews my-2">
        {showPreviews ? (
          <div className="d-flex flex-wrap">
            {previews.map((preview, key) => {
              return (
                <div
                  className={`p-1 position-relative ${
                    key === 0 ? "border-end border-dark border-2 me-2 pe-2" : ""
                  }`}
                  key={key + "-file"}
                >
                  <div
                    style={{
                      right: 3,
                      top: 3,
                      zIndex: 10,
                      position: "absolute",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      onClick={() => removeFile(key)}
                      className="bx bx-x fs-4 rounded-circle bg-primary text-white"
                    />
                  </div>
                  {videoTaken && key === 0 ? (
                    <video
                      className="avatar-preview rounded border border-primary"
                      alt="Video 1"
                      src={preview}
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                  ) : (
                    <img
                      className="avatar-preview rounded border border-primary"
                      alt={`Pic ${key + 1}`}
                      src={preview}
                      style={{
                        height: 60,
                        width: 60,
                        objectFit: "cover",
                        objectPosition: "40% 10%",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </Col>
    </Row>
  );

  return (
    <React.Fragment>
      <Form noValidate validated={validated} onSubmit={handleValidSubmit}>
        <Row className="m-0 mb-3" style={{ borderBottom: "2px solid #d5d5d5" }}>
          <Col md="5">{MediaUpld}</Col>
          <Col md="7">
            <Form.Group className="mb-3" as="div" controlId="marqueeName">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="e.g. Photography Services" required />
              <Form.Control.Feedback type="invalid">
                Title Required
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="m-0">
              <Col lg="" className="p-0 mb-3 me-lg-2">
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
                  }`}
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
                    placeholder: "Type a brief description about your product",
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

                    toolbar: ["bold", "italic", "bulletedList", "numberedList"],
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
        </Row>

        <Row className="m-0 my-3" style={{ borderBottom: "2px solid #d5d5d5" }}>
          <Col md="5">
            <h5 className="text-primary">Advertiser Contact Info</h5>

            <Form.Group className="mb-3 ms-2" as="div" controlId="seller">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                pattern="(\w.+\s.).+"
                placeholder="e.g. John Smith"
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter Full Name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 ms-2" as="div" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. johndoe@email.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Mising Location info
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 ms-2" as="div" controlId="phone">
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
                  // setWhatsapp(value);
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
            {additionalPhoneNumbers.slice(0, numOfphones).map((item, key) => (
              <div key={key} className="mb-3 ms-2">
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
              </div>
            ))}

            <button
              disabled={numOfphones > 0}
              type="button"
              onClick={() => setNumOfphones(numOfphones + 1)}
              className="btn btn-sm btn-primary shadow-none border border-primary mb-3"
            >
              <i className="bx bx-plus" /> Add Other Phone Number
            </button>

            <Form.Group className="mb-3 ms-2" as="div" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control placeholder="e.g. Nairobi" required />
              <Form.Control.Feedback type="invalid">
                Mising Location info
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <div className="mt-3 ms-2">
              <Form.Label>Social Media</Form.Label>

              {socialMediaInputs.map(
                (inpt, key) =>
                  shownOptions.find((item) => item === inpt.label) && (
                    <div key={key} className="d-flex mb-3">
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
                            required
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
                    </div>
                  )
              )}
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
          </Col>
        </Row>

        <div>
          <h5 className="text-primary">Select Package</h5>
          <Row
            className={`package-container  ${
              errorBox === "pkgSelect" &&
              "border border-2 border-danger rounded"
            }`}
          >
            {packages &&
              packages.map((mqPkg, key) => (
                <Col className="package-item" key={key}>
                  <label className="h-100 d-flex">
                    <input
                      type="radio"
                      name="paymentPackage"
                      id="paymentPackage"
                      value={mqPkg.id}
                      onChange={(e) => handleSelectPackage(e.target.value)}
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

                        <span>Bonus: {mqPkg?.bonusRate.toLocaleString()}%</span>
                      </div>
                    </Card>
                  </label>
                </Col>
              ))}
          </Row>
        </div>

        <div className="mt-1 mb-2 d-flex justify-content-end">
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
              "Proceed"
            )}
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default CreateNew;
