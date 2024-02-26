import React, { Fragment, useEffect, useState } from "react";

import {
  Card,
  Form,
  Modal,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from "react-bootstrap";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";

import api from "helpers/API/BaseApi";

const StoreCollections = ({
  setCollectionList,
  activeCollection,
  setActiveCollection,
}) => {
  const [toEdtColctn, setToEdtColctn] = useState(false);
  const [showColctnModal, setShowColctnModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const [collections, setCollections] = useState([]);
  const [isCollectionActive, setIsCollectionActive] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validated, setValidated] = useState(false);

  const toggleCollection = (tab) => {
    if (activeCollection !== tab) {
      setActiveCollection(tab);
    }
  };

  // CLOSING MODAL FUNCTIONS
  const closeCollectionModal = () => {
    setIsProcessing(false);
    setValidated(false);
    setToEdtColctn(false);
    setShowColctnModal(false);
    setModalData([]);

    setIsCollectionActive(false);
  };

  // HANDLE VALID SUBMIT
  const handleCollectionSubmit = (event) => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      if (toEdtColctn) {
        handleEditCollection(form);
      } else {
        handleAddCollection(form);
      }
    } else {
      toast.error("Review all your entries for possible error(s)");
    }
  };

  const handleAddCollection = (form) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    setIsProcessing(true);

    // Payload
    const payload = {
      storeProfile: store.id,
      name: form.collectionhName.value,
      active: isCollectionActive,
    };

    // API CALL
    api
      .post("api/MQCataloguesManagement/AddCatalogueCollection", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        getCatalogueCollections();
        toast.success(data?.message);
        closeCollectionModal();
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

  const handleEditCollection = (form) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    setIsProcessing(true);

    // Payload
    const payload = {
      storeProfile: store.id,
      name: form.collectionhName.value,
      active: isCollectionActive,
      id: modalData?.id,
    };

    // API CALL
    api
      .post("api/MQCataloguesManagement/EditCatalogueCollection", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        getCatalogueCollections();
        toast.success(data?.message);
        closeCollectionModal();
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

  const deleteCollection = (row) => {
    Swal.fire({
      title: "Delete?",
      icon: "question",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          title: "Processing",
          icon: "info",
        });
        Swal.showLoading();
        handleDeleteCollection(row?.id);
      }
    });
  };

  const handleDeleteCollection = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // API CALL: Edit PL
    api
      .post(
        "api/MQCataloguesManagement/RemoveCatalogueCollection",
        JSON.stringify(id),
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

        getCatalogueCollections();
        setActiveCollection("all");
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

  const getCatalogueCollections = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    api
      .get(
        `${"api/MQCataloguesManagement/GetCatalogueCollections"}?StoreProfileId=${
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
        const data = response.data.catalogueCollections;

        setCollections(data);

        setDataLoaded(true);

        setCollectionList([
          {
            label: "Collections",
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
        console.log(error.response?.data?.message);
      });
  };

  useEffect(() => {
    getCatalogueCollections();
  }, []);

  return (
    <Fragment>
      {dataLoaded ? (
        <div className="collections-section">
          <Card className="h-100">
            <Card.Body className="pt-2">
              <div className="d-flex justify-content-between align-items-end">
                <h5 className="mb-0">Collections</h5>

                <span
                  className="btn btn-sm bg-dark bg-soft fw-bold rounded-2 py-0 font-size-13"
                  onClick={() => setShowColctnModal(true)}
                >
                  <i className="bx bx-plus" /> New
                </span>
              </div>

              <hr className="my-1" />

              <div className="selection-div flex-md-column">
                {/* default selection */}
                {collections.length > 0 && (
                  <div className="selection-item">
                    <div className="d-flex align-items-center flex-grow-1 mb-lg-2">
                      <input
                        className="me-1 mt-0 form-check-input"
                        id="all"
                        type="radio"
                        checked={activeCollection === "all"}
                        onChange={() => toggleCollection("all")}
                      />
                      <label className="flex-grow-1 my-0 me-2" htmlFor="all">
                        All
                      </label>
                    </div>
                  </div>
                )}

                {collections.map((item, key) => (
                  <div key={key} className="selection-item">
                    <div className="text-truncate form-check form-check-inline mb-0">
                      <input
                        className="form-check-input"
                        id={item.id}
                        type="radio"
                        checked={item.id === activeCollection}
                        onChange={() => toggleCollection(item.id)}
                      />
                      <label
                        className="text-truncate form-label mb-0"
                        htmlFor={item.id}
                      >
                        {item.name}
                      </label>
                    </div>

                    <div className="d-flex flex-nowrap">
                      <OverlayTrigger
                        transition={false}
                        delay={500}
                        placement="bottom"
                        overlay={<Tooltip>Edit</Tooltip>}
                      >
                        <button
                          onClick={() => {
                            setToEdtColctn(true);
                            setModalData(item);
                            setIsCollectionActive(item.active);
                            setShowColctnModal(true);
                          }}
                          className="btn btn-sm text-secondary p-0 my-0 me-2 fw-bold"
                        >
                          <i className="fas fa-pen fs-6" />
                        </button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        transition={false}
                        delay={500}
                        placement="bottom"
                        overlay={<Tooltip>Delete</Tooltip>}
                      >
                        <button
                          onClick={() => deleteCollection(item)}
                          className="btn btn-sm text-danger p-0 my-0 me-1 fw-bold"
                        >
                          <i className="fas fa-trash fs-6" />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <SyncLoader color="#de864b" size={20} margin={16} />
        </div>
      )}

      {/* create/edit collection */}
      <Modal
        backdrop="static"
        size="md"
        centered
        enforceFocus={false}
        animation
        show={showColctnModal}
        onHide={() => closeCollectionModal(false)}
        restoreFocus={false}
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3 text-dark">
              {toEdtColctn ? "Update" : "Create"} Collection
            </span>
          </Modal.Header>
          <Modal.Body as="div" className="px-3 h-100 position-relative">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleCollectionSubmit}
            >
              <Form.Group className="mb-3" controlId="collectionhName">
                <Form.Label>Collection Name</Form.Label>
                <Form.Control
                  defaultValue={modalData?.name}
                  placeholder="e.g. Electronics, furniture..."
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Name Required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">Is it Active?</Form.Label>
                <input
                  type="checkbox"
                  id="isCollectionActive"
                  switch="bool"
                  checked={isCollectionActive}
                  onChange={() => setIsCollectionActive(!isCollectionActive)}
                />
                <label
                  htmlFor="isCollectionActive"
                  data-on-label="Yes"
                  data-off-label="No"
                />
              </Form.Group>

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

export default StoreCollections;
