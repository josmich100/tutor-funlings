import React, { Fragment, useEffect, useState } from "react";

import {
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";

import Select from "react-select";
import Lightbox from "react-image-lightbox";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import api from "helpers/API/BaseApi";

const CatalogItems = ({
  galleryImgs,
  activeBranches,
  activeCollection,
  branchList,
  collectionList,
}) => {
  const [toEdtCatlgItem, setToEdtCatlgItem] = useState(false);
  const [showCatlgItemModal, setShowCatlgItemModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const [catlgItems, setCatlgItems] = useState([]);

  // values
  const [description, setDescription] = useState("");
  const [isItemActive, setIsItemActive] = useState(false);
  // selection values
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedImgs, setSelectedImgs] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorBox, setErrorBox] = useState("");

  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxFiles, setLightboxFiles] = useState({
    main: null,
    next: null,
    prev: null,
  });

  const [activeImage, setActiveImage] = useState(0);

  const goToIndex = (newIndex) => {
    if (newIndex === galleryImgs.length) {
      setActiveImage(0);
      handleSetLightboxFiles(galleryImgs, 0);
    } else if (newIndex === -1) {
      setActiveImage(galleryImgs.length - 1);
      handleSetLightboxFiles(galleryImgs, galleryImgs.length - 1);
    } else {
      setActiveImage(newIndex);
      handleSetLightboxFiles(galleryImgs, newIndex);
    }
  };

  const contains = (item) => {
    const branchArr = item.branches.map((elmnt) => {
      return elmnt.storeProfileBranch;
    });

    if (activeCollection === "all") {
      if (activeBranches.length === 0) {
        return true;
      } else if (activeBranches.some((i) => branchArr.includes(i))) {
        return true;
      }
    } else if (activeCollection === item.catalogueCollection) {
      if (activeBranches.length === 0) {
        return true;
      } else if (activeBranches.some((i) => branchArr.includes(i))) {
        return true;
      }
    }

    return false;
  };

  const handleSetLightboxFiles = (images, activeImage) => {
    if (activeImage === 0) {
      setLightboxFiles({
        main: images[activeImage]?.filePath,
        next: images[activeImage + 1]?.filePath,
        prev: images[images.length - 1]?.filePath,
      });
    } else if (activeImage === images.length - 1) {
      setLightboxFiles({
        main: images[activeImage]?.filePath,
        next: images[0]?.filePath,
        prev: images[activeImage - 1]?.filePath,
      });
    } else {
      setLightboxFiles({
        main: images[activeImage]?.filePath,
        next: images[activeImage + 1]?.filePath,
        prev: images[activeImage - 1]?.filePath,
      });
    }
  };

  const handleImageSelect = (event) => {
    let newList = [...selectedImgs];

    if (event.target.checked) {
      if (newList.length > 4) {
        toast.error("Maximum of 5 images allowed");
        return;
      }
      newList = [...selectedImgs, event.target.value];
      setErrorBox("");
    } else {
      newList.splice(selectedImgs.indexOf(event.target.value), 1);
    }

    setSelectedImgs(newList);
  };

  const handleSelectedBranches = (selectedBranches) => {
    setErrorBox("");

    setSelectedBranches(selectedBranches);
  };

  const handleSelectedCollection = (selectedCollection) => {
    setErrorBox("");

    setSelectedCollection(selectedCollection);
  };

  const handleSetEdtCatlgItem = (item) => {
    const imagesSelected = item.files.map((el) => {
      return el.galleryProfileFile;
    });
    const branchesSelected = item.branches.map((el) => {
      return {
        label: el.storeProfileBranchName,
        value: el.storeProfileBranch,
      };
    });

    setToEdtCatlgItem(true);
    setModalData(item);
    setIsItemActive(item.active);
    setSelectedImgs(imagesSelected);
    setSelectedCollection({
      label: item.catalogueCollectionName,
      value: item.catalogueCollection,
    });
    setSelectedBranches(branchesSelected);
    setDescription(item.description);
    setShowCatlgItemModal(true);
  };

  // CLOSING MODAL FUNCTIONS
  const closeCatalogueItemModal = () => {
    setIsProcessing(false);
    setValidated(false);
    setToEdtCatlgItem(false);
    setShowCatlgItemModal(false);
    setModalData([]);

    setIsItemActive(false);
    setSelectedImgs([]);
    setSelectedCollection("");
    setSelectedBranches([]);
    setDescription("");
  };

  // HANDLE VALID SUBMIT
  const handleCatlgItemsubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (!(selectedCollection && selectedCollection.value)) {
      toast.error("Select the collection the item belongs to");
      setErrorBox("collection");
      return;
    }

    if (selectedImgs.length === 0) {
      toast.error("Select at least one image");
      setErrorBox("images");
      return;
    }

    if (Number(form.regularPrice.value) < Number(form.sellingPrice.value)) {
      toast.error("Discounted price must be less than regular price");
      return;
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      if (toEdtCatlgItem) {
        handleEditCatalogueItem(form);
      } else {
        handleAddCatalogueItem(form);
      }
    } else {
      toast.error("Review all your entries for possible error(s)");
    }
  };

  const handleAddCatalogueItem = (form) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    setIsProcessing(true);

    // Payload
    const payload = {
      name: form.itemName.value,
      description: form.description.value,
      regularPrice: form.regularPrice.value,
      sellingPrice: form.sellingPrice.value,
      catalogueCollection: selectedCollection?.value,
      storeProfile: store.id,
      active: isItemActive,
      storeBranchIds: selectedBranches
        ? selectedBranches.map((item) => {
            return item?.value;
          })
        : [],
      galleryFileIds: selectedImgs,
    };

    // API CALL
    api
      .post("api/MQCataloguesManagement/AddCatalogueItem", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        getCatalogItems();
        toast.success(data?.message);
        closeCatalogueItemModal();
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

  const handleEditCatalogueItem = (form) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    setIsProcessing(true);

    // Payload
    const payload = {
      name: form.itemName.value,
      description: form.description.value,
      regularPrice: form.regularPrice.value,
      sellingPrice: form.sellingPrice.value,
      catalogueCollection: selectedCollection?.value,
      storeProfile: store.id,
      active: isItemActive,
      storeBranchIds: selectedBranches
        ? selectedBranches.map((item) => {
            return item?.value;
          })
        : [],
      galleryFileIds: selectedImgs,
      id: modalData?.id,
    };

    // API CALL
    api
      .post("api/MQCataloguesManagement/EditCatalogueItem", payload, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        getCatalogItems();
        toast.success(data?.message);
        closeCatalogueItemModal();
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

  const deleteCatalogItem = (row) => {
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
        handleDeleteCatalogItem(row?.id);
      }
    });
  };

  const handleDeleteCatalogItem = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // API CALL:
    api
      .post(
        "api/MQCataloguesManagement/RemoveCatalogueItem",
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

        getCatalogItems();
        let newList = [...activeBranches];
        newList.splice(activeBranches.indexOf(modalData?.id), 1);
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

  // GET DATA FUNCTIONS
  const getCatalogItems = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    api
      .get(
        `${"api/MQCataloguesManagement/GetCatalogueItems"}?StoreId=${store.id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.catalogueItems;
        // console.log(data)

        setCatlgItems(data);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };

  useEffect(() => {
    getCatalogItems();
  }, []);

  useEffect(() => {
    if (galleryImgs.length > 0 && galleryImgs[activeImage]?.filePath) {
      handleSetLightboxFiles(galleryImgs, activeImage);
    }
  }, [galleryImgs]);

  return (
    <Fragment>
      <div className="catalog-list">
        {catlgItems
          .filter((item) => {
            return contains(item);
          })
          .map((item, key) => (
            <div className="catalog-item" key={key}>
              <div className="item-container">
                <div className="img-section">
                  <div className="rotated-bg"></div>

                  <div className="img-container">
                    <div className="text-end">
                      <OverlayTrigger
                        transition={false}
                        delay={500}
                        placement="bottom"
                        overlay={<Tooltip>Edit</Tooltip>}
                      >
                        <button
                          onClick={() => handleSetEdtCatlgItem(item)}
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
                          onClick={() => deleteCatalogItem(item)}
                          className="btn btn-sm text-danger p-0 my-0 me-1 fw-bold"
                        >
                          <i className="fas fa-trash fs-6" />
                        </button>
                      </OverlayTrigger>
                    </div>

                    <div className="h-100">
                      <img
                        src={item.files[0].filePath}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          objectPosition: "25% 10%",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-2 pt-1">
                  <p className="my-0 fw-bold">{item.name}</p>
                  {item?.sellingPrice !== item?.regularPrice && (
                    <p className="text-secondary fw-bold font-size-11 text-decoration-line-through my-0">
                      Ksh {item?.regularPrice.toLocaleString()}.00
                    </p>
                  )}

                  <p className="text-primary me-1 fw-bold font-size-11 my-0">
                    Ksh {item?.sellingPrice.toLocaleString()}.00
                  </p>
                </div>
              </div>
            </div>
          ))}

        {/* ADD NEW ITEM CARD */}
        <div className="catalog-item add-item">
          <div className="item-container">
            <div className="img-section">
              <div className="rotated-bg"></div>

              <div
                className="img-container"
                onClick={() => setShowCatlgItemModal(true)}
              >
                <div className="add-container">
                  <i className="bx bxs-folder-plus display-4" />
                  <strong>New Item</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* create/edit catalogue item */}
      <Modal
        backdrop="static"
        size="lg"
        centered
        enforceFocus={false}
        animation
        show={showCatlgItemModal}
        onHide={() => closeCatalogueItemModal(false)}
        restoreFocus={false}
        fullscreen="lg-down"
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3 text-dark">
              {toEdtCatlgItem ? "Update" : "Create"} Catalogue Item
            </span>
          </Modal.Header>
          <Modal.Body as="div" className="px-3 h-100 position-relative">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleCatlgItemsubmit}
            >
              <Row>
                <Col lg={5} className="border-end">
                  <Form.Group className="mb-2" controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      defaultValue={modalData?.name}
                      placeholder="Product / Service name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Name Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Collection</Form.Label>
                    <Select
                      value={selectedCollection}
                      onChange={handleSelectedCollection}
                      options={collectionList}
                      className={`${
                        errorBox === "collection" &&
                        "border border-2 border-danger rounded"
                      }`}
                      classNamePrefix="select2-selection"
                      placeholder="Select collection..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Branches</Form.Label>
                    <Form.Text> (zero or more)</Form.Text>
                    <Select
                      value={selectedBranches}
                      onChange={handleSelectedBranches}
                      options={branchList}
                      className={`${
                        errorBox === "branches" &&
                        "border border-2 border-danger rounded"
                      }`}
                      isMulti
                      classNamePrefix="select2-selection"
                      placeholder="Select branch..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="regularPrice">
                    <Form.Label>Regular Price</Form.Label>
                    <Form.Control
                      defaultValue={modalData?.regularPrice}
                      type="number"
                      step=".01"
                      placeholder="e.g. 1000"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="sellingPrice">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control
                      defaultValue={modalData?.sellingPrice}
                      type="number"
                      step=".01"
                      placeholder="e.g. 1000"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Price Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label className="w-100">Is it Active?</Form.Label>
                    <input
                      type="checkbox"
                      id="isItemActive"
                      switch="bool"
                      checked={isItemActive}
                      onChange={() => setIsItemActive(!isItemActive)}
                    />
                    <label
                      htmlFor="isItemActive"
                      data-on-label="Yes"
                      data-off-label="No"
                    />
                  </Form.Group>
                </Col>

                <Col lg={7} className="d-flex flex-column">
                  <Form.Group className="mb-2" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Text> {description.length}/500</Form.Text>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      maxLength={500}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed description of the product or service"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Description Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div
                    className={`flex-grow-1 w-100 border ${
                      errorBox === "images" ? "border-danger" : ""
                    } rounded-2 p-1`}
                  >
                    <Form.Label>Select Images from Gallery</Form.Label>
                    <Form.Text> (maximum of 5)</Form.Text>
                    <div
                      className="h-100 border-top d-flex flex-wrap align-content-start overflow-auto"
                      style={{ maxHeight: 280 }}
                    >
                      {galleryImgs.map((image, key) => (
                        <div
                          style={{
                            height: 70,
                            width: 70,
                          }}
                          key={key}
                          className="position-relative m-1"
                        >
                          <input
                            id={image.id}
                            type="checkbox"
                            value={image.id}
                            onChange={handleImageSelect}
                            checked={selectedImgs.includes(image.id)}
                            className="m-1 position-absolute top-0 end-0 p-0 form-check-input"
                          />

                          <div
                            className="bg-dark bg-soft bg- rounded overflow-hidden px-1"
                            onClick={() => {
                              goToIndex(key);
                              setShowLightbox(true);
                            }}
                            style={{
                              right: 5,
                              bottom: 5,
                              zIndex: 10,
                              position: "absolute",
                              cursor: "pointer",
                            }}
                          >
                            <i className="bx bx-expand text-white" />
                          </div>

                          <label
                            htmlFor={image.id}
                            className="h-100 w-100 border rounded-2"
                          >
                            <img
                              src={image?.filePath}
                              className="img-fluid rounded-2 p-0"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                objectPosition: "25% 10%",
                              }}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {showLightbox && (
                    <Lightbox
                      onCloseRequest={() => setShowLightbox(false)}
                      mainSrc={lightboxFiles.main}
                      nextSrc={lightboxFiles.next}
                      prevSrc={lightboxFiles.prev}
                      onMovePrevRequest={() => goToIndex(activeImage - 1)}
                      onMoveNextRequest={() => goToIndex(activeImage + 1)}
                    />
                  )}
                </Col>
              </Row>

              <div className="mt-2 mb-2 d-flex justify-content-center">
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

export default CatalogItems;
