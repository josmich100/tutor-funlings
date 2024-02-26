import React, { Fragment, useEffect, useState } from "react";

import { Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { IMaskInput } from "react-imask";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";

import api from "helpers/API/BaseApi";

const Branches = ({ setBranchList, activeBranches, setActiveBranches }) => {
  const phoneRegex =
    "^(?:254|\\+254|0|\\+2540)?((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$";

  const [toEditBranches, setToEditBranches] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const [branches, setBranches] = useState([]);
  const [phone, setPhone] = useState("");
  const [isBranchActive, setIsBranchActive] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState(-1);

  const handleActiveBranchSelect = (event) => {
    let newList = [...activeBranches];

    if (event.target.checked) {
      newList = [...activeBranches, event.target.value];
    } else {
      newList.splice(activeBranches.indexOf(event.target.value), 1);
    }

    setActiveBranches(newList);
  };

  const closeBranchModal = () => {
    setIsProcessing(false);
    setValidated(false);
    setToEditBranches(false);
    setShowBranchModal(false);
    setModalData([]);

    setIsBranchActive(false);
    setPhone("");
  };

  const handleBranchSubmit = (event) => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      if (phone.match(phoneRegex)) {
        setPhoneError(-1);

        if (toEditBranches) {
          handleEditBranch(form);
        } else {
          handleCreateBranch(form);
        }
      } else {
        setValidated(false);
        setPhoneError(0);
      }
    } else {
      toast.error("Review all your entries for possible error(s)");
    }
  };

  const handleCreateBranch = (form) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    setIsProcessing(true);

    // Payload
    const payload = {
      storeProfile: store.id,
      storeBranchName: form.storeBranchName.value,
      physicalLocation: form.physicalLocation.value,
      postalAddress: form.postalAddress.value,
      postalCode: null,
      phone: phone,
      active: isBranchActive,
    };

    // API CALL
    api
      .post("api/MQCustomerStoresManagement/AddStoreProfileBranch", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        getBranches();
        toast.success(data?.message);
        closeBranchModal();
      })
      .catch((error) => {
        setValidated(false);
        setIsProcessing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
      });
  };

  const handleEditBranch = (form) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    setIsProcessing(true);

    // Payload
    const payload = {
      storeProfile: store.id,
      storeBranchName: form.storeBranchName.value,
      physicalLocation: form.physicalLocation.value,
      postalAddress: form.postalAddress.value,
      postalCode: null,
      phone: phone,
      active: isBranchActive,
      id: modalData?.id,
    };

    // API CALL
    api
      .post("api/MQCustomerStoresManagement/EditStoreProfileBranch", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        getBranches();
        toast.success(data?.message);
        closeBranchModal();
      })
      .catch((error) => {
        setValidated(false);
        setIsProcessing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
      });
  };

  const deleteBranch = (row) => {
    Swal.fire({
      title: "Delete?",
      icon: "question",
      text: "This branch and all its data will be deleted instantly!",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          title: "Processing",
          icon: "info",
        });
        Swal.showLoading();
        handleDeleteBranch(row?.id);
      }
    });
  };

  const handleDeleteBranch = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // API CALL:
    api
      .post(
        "api/MQCustomerStoresManagement/RemoveStoreProfileBranch",
        SON.stringify(id),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        Swal.fire({
          title: "Deleted",
          icon: "success",
          text: data.message,
        });

        getBranches();
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
          Swal.close();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: error.response?.data?.message || "Failed to delete",
          });
        }
      });
  };

  const getBranches = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    api
      .get(
        `${"api/MQCustomerStoresManagement/GetStoreProfileBranches"}?StoreProfile=${
          store.id
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
        const data = response.data.storeProfileBranches;

        setBranches(data);
        setDataLoaded(true);

        setBranchList([
          {
            label: "Branches",
            options: data.map((item) => {
              return {
                label: item.storeBranchName,
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

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4 className="text-primary fw-bold mb-0">Branches</h4>

        {branches.length > 0 && (
          <span
            className="btn btn-sm bg-dark bg-soft fw-bold w-md rounded-2"
            onClick={() => setShowBranchModal(true)}
          >
            <i className="bx bx-plus" /> New Branch
          </span>
        )}
      </div>

      {dataLoaded ? (
        <Row className="branchlist-container">
          {branches.length > 0 ? (
            <>
              {branches.map((item, key) => (
                <Col
                  key={key}
                  className={`branch-col ${
                    activeBranches.includes(item.id) && "selected"
                  }`}
                >
                  <Card
                    className="branch-card"
                    as={Form.Label}
                    htmlFor={item.id}
                  >
                    <Card.Body className="position-relative">
                      <input
                        id={item.id}
                        type="checkbox"
                        value={item.id}
                        onChange={handleActiveBranchSelect}
                        checked={activeBranches.includes(item.id)}
                        className="m-1 position-absolute top-0 end-0 p-0 form-check-input"
                      />

                      <h6 className="fw-bold text-truncate mb-2">
                        {item.storeBranchName}
                      </h6>
                      <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div>
                          <span
                            className={`badge-soft-${
                              item.active ? "success" : "danger"
                            } font-size-11 fw-bold px-1 rounded-pill`}
                          >
                            {item.active ? "Enabled" : "Disabled"}
                          </span>
                        </div>

                        <div className="d-flex mt-1 justify-content-between justify-md-content-end ">
                          <button
                            className="btn py-0 px-1 text-secondary me-2"
                            onClick={() => {
                              setToEditBranches(true);
                              setModalData(item);
                              setPhone(item.phone);
                              setIsBranchActive(item.active);
                              setShowBranchModal(true);
                            }}
                          >
                            <i className="fas fa-pen" />
                          </button>

                          <button
                            className="btn py-0 px-1 text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteBranch(item)}
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            <Col className="branch-col add-new">
              <Card
                className="branch-card"
                style={{ cursor: "pointer" }}
                onClick={() => setShowBranchModal(true)}
              >
                <Card.Body>
                  <i
                    className="bx bxs-folder-plus fs-1 text-primary"
                    style={{ opacity: 0.45 }}
                  />
                  <span className="text-center">New Branch</span>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      ) : (
        <div className="d-flex justify-content-center">
          <SyncLoader color="#de864b" size={20} margin={16} />
        </div>
      )}

      {/* create/edit branch */}
      <Modal
        backdrop="static"
        size="lg"
        centered
        enforceFocus={false}
        animation
        show={showBranchModal}
        onHide={() => closeBranchModal(false)}
        restoreFocus={false}
        fullscreen="lg-down"
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3 text-dark">
              {toEditBranches ? "Update Branch Data" : "Create Branch"}
            </span>
          </Modal.Header>
          <Modal.Body as="div" className="px-3 h-100 position-relative">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleBranchSubmit}
            >
              <Row>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="storeBranchName"
                >
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.storeBranchName}
                    placeholder="e.g. Nakuru, Ngara, kilimani..."
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Name Required
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

                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="physicalLocation"
                >
                  <Form.Label>Physical Location</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.physicalLocation}
                    as="textarea"
                    rows={3}
                    placeholder="Enter a brief decription about physical location of business..."
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Location Required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="postalAddress"
                >
                  <Form.Label>Postal Address</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.postalAddress}
                    as="textarea"
                    rows={3}
                    placeholder="e.g. PO. Box 0001-00100, Nairobi"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Location Required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={3}>
                  <Form.Label className="w-100">Is it Active?</Form.Label>
                  <input
                    type="checkbox"
                    id="isBranchActive"
                    switch="bool"
                    checked={isBranchActive}
                    onChange={() => setIsBranchActive(!isBranchActive)}
                  />
                  <label
                    htmlFor="isBranchActive"
                    data-on-label="Yes"
                    data-off-label="No"
                  />
                </Form.Group>
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
    </Fragment>
  );
};

export default Branches;
