import MetaTags from "react-meta-tags";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

import Select from "react-select";
// Toast Alert
import toast from "react-hot-toast";

import { withRouter } from "react-router-dom";

import Breadcrumb from "components/Common/Breadcrumbs";
import avatar from "assets/images/user-icon.svg";

// actions
import api from "helpers/API/BaseApi";
import customerBaseUrl from "helpers/API/ActivationUrl";

const UserProfile = (props) => {
  const usrImgUpload = useRef(null);

  const [profile, setProfile] = useState(null);

  const [countries, setCountries] = useState([{ label: "Loading..." }]);
  const [towns, setTowns] = useState([{ label: "Select Country First!" }]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);

  // Processing of Profile Change
  const [validated, setValidated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Processing of ProfilePic
  const [isLoadingProfPic, setIsLoadingProfPic] = useState(false);

  // Processing of Password Change
  const [validatedPword, setValidatedPword] = useState(false);
  const [isProcessingPword, setIsProcessingPword] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [passError, setPassError] = useState(false);

  // Processing of Change Email Request
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [isProcessing1, setIsProcessing1] = useState(false);

  // modal states
  const [changeEmailModal, setChangeEmailModal] = useState(false);
  const [changePwordModal, setChangePwordModal] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPassword1 = () => setShowPassword1(!showPassword1);

  const handleSelectCountry = (selectedCountry) => {
    console.log(selectedCountry);
    setSelectedCountry(selectedCountry);

    if (selectedCountry) {
      setSelectedTown(null);
      setTowns([{ label: "Loading..." }]);
      // Fetch Towns
      fetchTowns(selectedCountry?.value);
    } else {
      setSelectedTown(null);
      setTowns([{ label: "Select Country First" }]);
    }
  };

  const handleSelectTown = (selectedTown) => {
    setSelectedTown(selectedTown);
  };

  // Updating Server Profile
  const handleUpdateProfile = (event) => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      setIsProcessing(true);

      // Payload
      const payload = {
        firstName: form.firstName.value,
        middleName: null,
        lastName: form.lastName.value,
        gender: null,
        phone: form.phone.value,
        country: selectedCountry?.value,
        town: selectedTown?.value,
        userId: profile.userId,
      };

      // Update Server Profile
      api
        .post("api/MQUserAuthentications/UpdateProfile", payload, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setIsProcessing(false);

          toast.success(data?.message);

          setValidated(false);

          // Updating Local Storage
          const currentProfile = JSON.parse(
            localStorage.getItem("authFunStudnt")
          );
          currentProfile.name =
            form.firstName.value + "  " + form.lastName.value;
          currentProfile.phoneNumber = form.phone.value;
          localStorage.setItem("authFunStudnt", JSON.stringify(currentProfile));

          setProfile(currentProfile);
        })
        .catch((error) => {
          setIsProcessing(false);
          setValidated(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response?.data?.message);
          }
        });
    }
  };

  const handleUpdateProfilePic = (e) => {
    const file = e.target?.files[0];

    if (file?.size <= 6291456) {
      setIsLoadingProfPic(true);

      // Forming Form Data
      const formData = new FormData();
      formData.append("GetFormFile", file);
      formData.append("UserId", profile.userId);

      api
        .post("api/MQUserAuthentications/UpdateFile", formData, {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${profile.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          // console.log(data)

          profile["filePath"] = data.docsRef.filePath;
          localStorage.setItem("authFunStudnt", JSON.stringify(profile));

          toast.success(data?.message);

          setTimeout(() => {
            profile["filePath"] = data.docsRef.filePath;
          }, 100);

          setIsLoadingProfPic(false);
        })
        .catch((error) => {
          setIsLoadingProfPic(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response?.data?.message);
          }
        });
    } else {
      toast.error("Image size should not exceed 5MBs");
    }
  };

  // Request Email Change
  const handleRequestEmailChange = (event) => {
    const form = event.currentTarget;

    setValidatedEmail(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      setIsProcessing1(true);

      // Payload
      const payload = {
        userId: profile.userId,
        newEmail: form.newEmail.value,
        changeEmailURL:
          customerBaseUrl +
          `/verifyNewEmail?id=${profile.userId}&email=${form.newEmail.value}&`,
      };

      api
        .post("api/MQUserAuthentications/RequestChangeEmail", payload, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setIsProcessing1(false);
          toast.success(data?.message);

          setValidatedEmail(false);
          setChangeEmailModal(false);
        })
        .catch((error) => {
          setIsProcessing1(false);
          setValidatedEmail(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response?.data?.message);
          }
        });
    }
  };

  const validateData = () => {
    // Validation: Comparing if Password and Password1 matches
    if (password !== password1 || password.trim().length === 0) {
      setIsProcessingPword(false);
      setPassError(true);
      setValidatedPword(false);

      return false;
    }

    setPassError(false);
    return true;
  };

  // Request Email Change
  const handlePasswordChange = (event) => {
    if (!validateData()) {
      return;
    }

    const form = event.currentTarget;

    setValidatedPword(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      setIsProcessingPword(true);

      // Payload
      const payload = {
        userId: profile.userId,
        oldPassword: form.oldPassword.value,
        newPassword: form.newPassword.value,
        confirmPassword: form.confirmPassword.value,
      };

      api
        .post("api/MQUserAuthentications/ChangePassword", payload, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setIsProcessingPword(false);
          toast.success(data?.message);

          setValidatedPword(false);
          setChangePwordModal(false);

          setPassword("");
          setPassword1("");
        })
        .catch((error) => {
          setIsProcessingPword(false);
          setValidatedPword(false);
          if (error.toJSON().message === "Network Error") {
            toast.error("Network Error. Check Internet Connection");
          } else {
            toast.error(error.response?.data?.message);
          }
        });
    }
  };

  // Fetching Towns Based on Country
  const fetchTowns = (id) => {
    api
      .get(`${"api/MQLookups/GetTowns"}?Id=${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
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
          console.log(error.response);
        }
      });
  };

  // Fetch Countries
  const fetchCountries = () => {
    api
      .get("api/MQLookups/GetCountries", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data.mqLookups;
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
        } else {
          console.log(error.response?.data?.message);
        }
      });
  };

  // Common UseEffect
  useEffect(() => {
    if (localStorage.getItem("authFunStudnt")) {
      const obj = JSON.parse(localStorage.getItem("authFunStudnt"));

      setProfile(obj);

      fetchCountries();

      setSelectedCountry({
        label: obj.countryName,
        value: obj.country,
      });

      setSelectedTown({
        label: obj.townName,
        value: obj.town,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>User Profile | Funlings Entertainment</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Marquee" breadcrumbItem="Profile" />

          <Card className="overflow-hidden">
            <Card.Body className="d-flex bg-secondary bg-soft">
              <div className="logo-container m-0">
                <input
                  disabled={isLoadingProfPic}
                  name="newLogo"
                  id="newLogo"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  required
                  onChange={handleUpdateProfilePic}
                  ref={usrImgUpload}
                  hidden
                />

                <div className="img-container p-0 border-0">
                  {isLoadingProfPic ? (
                    <div className="progress">
                      <div className="progress-bar progress-bar-striped progress-bar-animated upload-progress"></div>
                    </div>
                  ) : (
                    // {/* overlay */}
                    <label htmlFor="newLogo" className="edit-container"></label>
                  )}

                  <img
                    src={profile?.filePath ? profile.filePath : avatar}
                    alt=""
                  />
                </div>

                <label className="edit-icon-label" htmlFor="newLogo">
                  <i className="bx bx-edit-alt" />
                </label>
              </div>

              <div className="flex-grow-1 h-100 ps-4 my-auto">
                <h4 className="text-truncate">{profile?.name}</h4>
                <p className=" font-size-14 text-muted text-truncate fw-bold mb-2">
                  {profile?.phoneNumber}
                </p>
                <h5 className="font-size-14">{profile?.email}</h5>
              </div>
            </Card.Body>

            <Card.Body>
              <div className="d-flex">
                <button
                  onClick={() => setChangeEmailModal(true)}
                  className="btn btn-primary btn-md me-4"
                >
                  Request Email Change{" "}
                  <i className="mdi mdi-arrow-right ms-1 d-none d-md-inline"></i>
                </button>
                <button
                  onClick={() => setChangePwordModal(true)}
                  className="btn btn-primary btn-md"
                >
                  Change Password{" "}
                  <i className="bx bx-lock ms-1 d-none d-md-inline"></i>
                </button>
              </div>
            </Card.Body>
          </Card>

          <h4 className="card-title mb-4">Update Account Info</h4>

          <Card>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleUpdateProfile}
              >
                <Row>
                  <Form.Group
                    className="mb-2"
                    as={Col}
                    xs={6}
                    controlId="firstName"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      defaultValue={profile?.name.split(" ")[0]}
                      placeholder="e.g. John"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      First Name Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    as={Col}
                    xs={6}
                    controlId="lastName"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      defaultValue={profile?.name.split(" ")[2]}
                      placeholder="e.g. Smith"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Last Name Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    as={Col}
                    xs={12}
                    md={6}
                    controlId="phone"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      defaultValue={profile?.phoneNumber}
                      placeholder="e.g. +254727569769"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Phone Number Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    as={Col}
                    xs={12}
                    md={6}
                    controlId="country"
                  >
                    <Form.Label>Country</Form.Label>
                    <Select
                      value={selectedCountry}
                      onChange={handleSelectCountry}
                      options={countries}
                      isClearable
                      classNamePrefix="select2-selection"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    as={Col}
                    xs={12}
                    md={6}
                    controlId="town"
                  >
                    <Form.Label>Town</Form.Label>
                    <Select
                      value={selectedTown}
                      onChange={handleSelectTown}
                      options={towns}
                      isClearable
                      classNamePrefix="select2-selection"
                    />
                  </Form.Group>
                </Row>

                <div className="text-center mt-4">
                  <button
                    disabled={isProcessing}
                    className="btn btn-primary btn-block"
                    type="submit"
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
                      "Update Profile Info"
                    )}
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Request Email Change Modal */}
          <Modal
            backdrop="static"
            size="md"
            className="p-3"
            show={changeEmailModal}
            onHide={() => setChangeEmailModal(false)}
            restoreFocus={false}
            fullscreen="md-down"
          >
            <div className="modal-content">
              <Modal.Header closeButton>
                <span className="h4 text-primary">Request Email Change</span>
              </Modal.Header>
              <Modal.Body>
                <Form
                  noValidate
                  validated={validatedEmail}
                  onSubmit={handleRequestEmailChange}
                >
                  <Form.Group className="mb-3" as="div" controlId="newEmail">
                    <Form.Label>New Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="e.g. johnsmith@email.com"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Email Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center mt-4">
                    <button
                      disabled={isProcessing1}
                      className="btn btn-primary btn-block"
                      type="submit"
                    >
                      {isProcessing1 ? (
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
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              </Modal.Body>
            </div>
          </Modal>

          {/* Change Password */}
          <Modal
            backdrop="static"
            size="md"
            className="p-3"
            show={changePwordModal}
            onHide={() => setChangePwordModal(false)}
            restoreFocus={false}
            fullscreen="md-down"
          >
            <div className="modal-content">
              <Modal.Header closeButton>
                <span className="h4 text-primary">Change Password</span>
              </Modal.Header>
              <Modal.Body>
                <Form
                  noValidate
                  validated={validatedPword}
                  onSubmit={handlePasswordChange}
                >
                  <Form.Group className="mb-3" controlId="oldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        placeholder="******"
                        autoComplete="off"
                        required
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Old Password Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        isInvalid={!!passError}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={(e) => toggleShowPassword(e)}
                        className="btn btn-primary shadow-none"
                      >
                        {showPassword ? (
                          <i className="fas fa-eye fs-5" />
                        ) : (
                          <i className="fas fa-eye-slash fs-5" />
                        )}
                      </button>
                    </InputGroup>
                    {passError && (
                      <Form.Text className="text-danger">
                        Passwords do not match
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword1 ? "text" : "password"}
                        placeholder="******"
                        // formNoValidate
                        isInvalid={!!passError}
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        onBlur={() => validateData()}
                        required
                      />
                      <button
                        type="button"
                        onClick={(e) => toggleShowPassword1(e)}
                        className="btn btn-primary shadow-none"
                      >
                        {showPassword1 ? (
                          <i className="fas fa-eye fs-5" />
                        ) : (
                          <i className="fas fa-eye-slash fs-5" />
                        )}
                      </button>
                    </InputGroup>
                    {passError && (
                      <Form.Text className="text-danger">
                        Passwords do not match
                      </Form.Text>
                    )}
                  </Form.Group>
                  <div className="text-center mt-4">
                    <button
                      disabled={isProcessingPword}
                      className="btn btn-primary btn-block"
                      type="submit"
                    >
                      {isProcessingPword ? (
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
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              </Modal.Body>
            </div>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
