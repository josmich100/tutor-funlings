import React, { createRef, useEffect, useState } from "react";

import { Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import Plyr from "plyr-react";

// Alerts
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Importing Custom Components
import api from "helpers/API/BaseApi";

import error from "assets/images/error-img.png";

const EdtImages = ({ adProfile, handleNext }) => {
  const dropzoneRef = createRef();
  const vidRef = createRef();

  const [profileId, setProfileId] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Globals
  const [isVideoTaken, setIsVideoTaken] = useState(false);
  const [showImgs, setShowImgs] = useState(false);
  const [addImgs, setAddImgs] = useState(false);
  const [viewImgs, setViewImgs] = useState(true);
  const [updateImgs, setUpdateImgs] = useState(false);
  const [profileImages, setProfileImages] = useState([]);

  // Processing
  const [showPreviews, setShowPreviews] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const goToIndex = (newIndex) => setActiveIndex(newIndex);

  const setDisplayImg = (selectedIndex, e) => setActiveIndex(selectedIndex);

  const handleFileRejection = (rejectedFiles) => {
    switch (rejectedFiles[0].errors[0].code) {
      case "file-too-large":
        toast.error("File size is larger than accepted size");
        break;
      case "file-invalid-type":
        toast.error("Unaccepted File Type");
        break;
      case "too-many-files":
        toast.error("Select only ONE file");
        break;
      default:
        toast.error("File size is larger than accepted size");
        break;
    }
  };

  const handleAcceptedFiles = (acceptedFiles) => {
    acceptedFiles.map((file) => {
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
              setIsVideo(true);

              setSelectedFile(null);
              setImgPreview(null);
              setShowPreviews(false);

              // display error message
              toast.error("Video duration cannot be longer than one minute");
            } else {
              setIsVideo(true);

              setSelectedFile(file);
              setImgPreview(URL.createObjectURL(file));
              setShowPreviews(true);
            }
          } catch (error) {
            console.log(error);
          }
        };
      } else {
        setSelectedFile(file);
        setImgPreview(URL.createObjectURL(file));
        setShowPreviews(true);
      }
    });
  };

  const handleAddNewImg = (add) => {
    if (add) {
      setViewImgs(false);
      setUpdateImgs(false);
      setAddImgs(true);
    } else {
      setViewImgs(true);
      setUpdateImgs(false);
      setAddImgs(false);
    }
  };

  const handleUpdateImg = (add) => {
    if (add) {
      setViewImgs(false);
      setUpdateImgs(true);
      setAddImgs(true);
    } else {
      setViewImgs(true);
      setUpdateImgs(false);
      setAddImgs(false);
    }
  };

  const setAsFeatured = (bool) => {
    Swal.fire({
      title: "Set featured property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          title: "Processing",
          icon: "info",
        });
        Swal.showLoading();
        handleSubmitRequest(
          "api/MQCustomerMarqueeProfileManagement/MarkedFeaturedFile",
          {
            fileId: currentImg?.id,
            featuredFile: bool,
          },
          "Updated",
          (data) => {
            fetchData(profileId);
          }
        );
      }
    });
  };

  const deleteImage = () => {
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
        handleSubmitRequest(
          "api/DocumentsManagement/DeleteFile",
          {
            mpSales: false,
            onboarding: false,
            marquee: true,
            docId: currentImg?.id,
          },
          "Deleted",
          (data) => {
            fetchData(profileId);
          }
        );
      }
    });
  };

  const handleSubmitRequest = (url, payload, title, finalCall) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // API CALL:
    api
      .post(url, payload, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        Swal.fire({
          title: title,
          icon: "success",
          text: data.message,
        }).then(() => {
          finalCall(data);
        });
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
          Swal.close();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: error.response?.data?.message || "Request Failed",
          });
        }
      });
  };

  // Updating Image
  const updateImage = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    setIsProcessing(true);

    // Forming Form Data
    const formData = new FormData();
    formData.append("DocId", currentImg?.id);
    formData.append("GetFormFile", selectedFile);
    formData.append("Owner", userId);
    formData.append("RefNumber", profileId);
    formData.append("Marquee", true);

    // API CALL
    api
      .post("api/DocumentsManagement/UpdateFile", formData, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setIsProcessing(false);
        fetchData(profileId);

        toast.success("Updated Successfully");

        if (isVideo) {
          setIsVideoTaken(true);
        }

        // setTimeout(() => {
        handleUpdateImg(false);
        setSelectedFile(null);
        setImgPreview(null);
        setShowPreviews(false);
        setIsVideo(false);
        // }, 3000)
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
          setTimeout(() => {
            setSelectedFile(null);
            setImgPreview(null);
            setShowPreviews(false);
          }, 3000);
        }
      });
  };

  // Adding Product/Service Image
  const addImage = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    setIsProcessing(true);

    // Forming Form Data
    const formData = new FormData();
    formData.append("GetFormFiles", selectedFile);
    formData.append("FeaturedFile", isVideo ? true : false);
    formData.append("Owner", userId);
    formData.append("RefNumber", profileId);
    formData.append("Marquee", true);

    // API CALL
    api
      .post("api/DocumentsManagement/UploadFiles", formData, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setIsProcessing(false);
        fetchData(profileId);

        toast.success("Added Successfully");
        setIsAdded(true);

        if (isVideo) {
          setIsVideoTaken(true);
        }

        // setTimeout(() => {
        handleAddNewImg(false);
        setSelectedFile(null);
        setImgPreview(null);
        setShowPreviews(false);
        setIsVideo(false);
        // }, 3000)
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
          setTimeout(() => {
            setSelectedFile(null);
            setImgPreview(null);
            setShowPreviews(false);
          }, 3000);
        }
      });
  };

  // Fetching Data
  const fetchData = (id) => {
    setShowImgs(false);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    api
      .get(
        `${"api/MQCustomerMarqueeProfileManagement/GetMarqueeProfileDetails"}?MarqueeProfileId=${id}`,
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
        setProfileImages(data?.files);
        // console.log(data?.files)
        if (data?.files.length > 0) {
          const images = data?.files[0];
          setCurrentImg(images);

          setShowImgs(true);
        }

        data?.files.map((item) => {
          if (!item?.isImage) {
            setIsVideoTaken(true);
          }
        });
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
    if (adProfile) {
      fetchData(adProfile.id);
      setProfileId(adProfile.id);
    }
  }, [adProfile]);

  // <-----------------UI--------------------->
  const thumbnail = (sizeH, sizeW) => {
    return profileImages?.map((data, key) => (
      <div
        key={key}
        className="d-flex justify-content-center align-items-center m-1 p-1 flex-fill bg-warning bg-soft"
        onClick={() => {
          setCurrentImg(data);
          goToIndex(key);
        }}
        style={{
          borderRadius: 10,
          cursor: "pointer",
          maxHeight: sizeH,
          maxWidth: sizeW,
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor:
              key === activeIndex ? "transparent" : "rgba(255, 255, 255, 0.4)",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: key === activeIndex ? 1 : 10,
            position: "absolute",
          }}
        ></div>

        {data.isImage ? (
          <img
            src={data.filePath}
            alt=""
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              zIndex: key === activeIndex ? 10 : 1,
            }}
            className="img-fluid m-auto d-block thumbnail"
          />
        ) : (
          <img
            src={`${data.filePath.slice(0, -3)}jpg`}
            alt=""
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              zIndex: key === activeIndex ? 10 : 1,
            }}
            className="img-fluid m-auto d-block thumbnail"
          />
        )}
      </div>
    ));
  };

  const mainFile = (item, size) => {
    return item.isImage ? (
      <div
        className="d-flex justify-content-center align-items-center p-2"
        style={{ height: size }}
      >
        <img
          src={item.filePath}
          alt=""
          className="img-fluid mx-auto"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ) : (
      <div
        className="d-flex flex-column justify-content-center w-100"
        style={{ height: size }}
      >
        <Plyr
          ref={vidRef}
          source={{
            type: "video",
            sources: [
              {
                src: item.filePath,
                provider: "html5",
              },
            ],
          }}
          options={{
            controls: [
              "play-large",
              "mute",
              "progress",
              "volume",
              "current-time",
            ],
            muted: true,
            disableContextMenu: true,
            settings: [],
            resetOnEnd: true,
            loop: { active: true },
          }}
        />
      </div>
    );
  };

  const imagePicker = (
    <Col lg="6" className="m-0 p-1">
      <Dropzone
        onDropAccepted={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
        onDropRejected={(rejectedFiles) => handleFileRejection(rejectedFiles)}
        maxFiles={1}
        multiple={false}
        maxSize={isVideoTaken ? 6291456 : 22020096}
        accept={
          isVideoTaken
            ? ".png, .jpg, .jpeg, .svg, .gif"
            : ".png, .jpg, .jpeg, .svg, .gif, .mp4, .avi"
        }
        ref={dropzoneRef}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`dropzone position-relative border-${
              isAdded ? "success" : "warning"
            } bg-${isAdded ? "success" : "warning"} bg-soft mt-2 p-1`}
            style={{ height: 180 }}
          >
            <input {...getInputProps()} />
            <div className="d-flex flex-column align-items-center p-1 m-0 px-1">
              <i className="display-4 text-warning bx bx-image-add" />

              <h5 className="text-warning mt-2">
                Choose an image {isVideoTaken ? "" : "or video"}
              </h5>
            </div>

            {showPreviews && (
              <div
                className="dropzone-previews position-absolute"
                style={{
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                {isVideo ? (
                  <video
                    autoPlay={false}
                    height="100%"
                    width="100%"
                    className="bg-primary bg-soft"
                    controls
                    controlsList="nodownload noplaybackrate"
                    disableRemotePlayback
                    muted
                  >
                    <source src={imgPreview} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={imgPreview}
                    alt=""
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </Dropzone>
    </Col>
  );

  return (
    <React.Fragment>
      <Container className="mt-0" style={{ minHeight: 330 }}>
        {viewImgs && (
          <div>
            <p className="mb-1">
              Ensure you have at least 1 Featured Image/Video and 4 Gallery
              Images.
            </p>

            <Row className="m-0">
              {/* Product Images */}
              {showImgs ? (
                <>
                  {/* Image Thumbnails */}
                  <Col md={{ span: 2, order: 1 }} className="p-0">
                    {/* Image Thumbnails */}
                    <div className="d-none d-md-flex flex-column justify-content-start h-100">
                      {thumbnail(60, "auto")}
                    </div>
                    <div className="d-flex justify-content-start d-md-none h-100">
                      {thumbnail(60, "20%")}
                    </div>
                  </Col>

                  <Col
                    lg={{ span: 7, order: 2 }}
                    md={{ span: 9, order: 2 }}
                    className="border-end border-start border-2"
                  >
                    <div className="text-center mb-2">
                      <span className="rounded-pill fs-5 badge badge-soft-primary font-weight-bolder">
                        {currentImg?.featuredFile === true
                          ? "Featured Image"
                          : "Gallery Image"}
                      </span>
                    </div>

                    <Carousel
                      controls={false}
                      indicators={false}
                      interval={null}
                      activeIndex={activeIndex}
                      onSelect={setDisplayImg}
                    >
                      {profileImages.map((item, key) => (
                        <Carousel.Item key={key} className="h-100 w-100">
                          <div className="align-self-center d-flex d-md-none justify-content-center align-items-center h-100">
                            {mainFile(item, 200)}
                          </div>
                          <div className="align-self-center d-none d-md-flex justify-content-center align-items-center h-100">
                            {mainFile(item, 300)}
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Col>
                </>
              ) : (
                <Col
                  lg={{ span: 9, order: 2 }}
                  md={{ span: 12, order: 2 }}
                  className="d-flex flex-column align-items-center py-5 px-1 mb-5"
                >
                  <h5 className="text-danger">No Images Found Yet</h5>
                  <img
                    src={error}
                    alt=""
                    className="img-fluid"
                    style={{
                      height: 150,
                      width: "auto",
                    }}
                  />
                </Col>
              )}

              {/* control buttons */}
              <Col
                lg={{ span: 3, order: 3 }}
                xs={{ span: 12, order: 3 }}
                className="d-flex flex-lg-column flex-sm-row flex-column"
              >
                {/* Add new Images*/}
                <button
                  disabled={profileImages.length < 5 ? false : true}
                  onClick={() => handleAddNewImg(true)}
                  className="btn btn-primary mt-3 ms-2"
                >
                  <i className="fas fa-plus me-2" />
                  Add
                </button>

                {profileImages.length > 0 && (
                  <>
                    {/* Mark as Featured */}
                    {currentImg?.featuredFile ? (
                      <button
                        onClick={() => setAsFeatured(false)}
                        className="btn btn-warning mt-3 ms-2"
                      >
                        <i className="fas fa-star me-2" />
                        Remove as Featured
                      </button>
                    ) : (
                      <button
                        onClick={() => setAsFeatured(true)}
                        className="btn btn-warning mt-3 ms-2"
                      >
                        <i className="fas fa-star me-2" />
                        Set as Featured
                      </button>
                    )}

                    {/* Updating Image */}
                    <button
                      onClick={() => handleUpdateImg(true)}
                      className="btn btn-dark mt-3 ms-2"
                    >
                      <i className="bx bx-edit fs-5 me-2" />
                      Update
                    </button>

                    {/* Deleting Image */}
                    <button
                      onClick={() => deleteImage()}
                      className="btn btn-danger mt-3 ms-2"
                    >
                      <i className="bx bx-trash me-2" />
                      Remove
                    </button>
                  </>
                )}

                {/* Finish & Proceed */}
                <button
                  disabled={profileImages.length < 2}
                  onClick={() => handleNext()}
                  className="btn btn-success mt-3 ms-2"
                >
                  <i className="bx bx-check-double fs-5 me-2" />
                  Finish & Proceed
                </button>
              </Col>
            </Row>
          </div>
        )}

        {addImgs && (
          <div>
            <h5 className="text-center">
              {updateImgs ? "Change" : "Add New"} Image{" "}
              {isVideoTaken ? "" : "or Video"}
            </h5>
            <Row className="justify-content-center">
              {/* Image Upload */}
              {imagePicker}

              <Col
                lg={7}
                className={`d-flex flex-wrap ${
                  isProcessing
                    ? "justify-content-center"
                    : "justify-content-between"
                }`}
              >
                {isProcessing ? (
                  <span className="text-success text-center w-100 fs-3">
                    <Spinner
                      as="span"
                      animation="border"
                      size="md"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Loading...
                  </span>
                ) : (
                  <>
                    <button
                      disabled={selectedFile ? false : true}
                      onClick={() => {
                        if (updateImgs) {
                          updateImage();
                        } else {
                          addImage();
                        }
                      }}
                      className="btn btn-success mt-3 mx-2 shadow-sm"
                    >
                      {updateImgs ? (
                        <>
                          <i className="bx bx-images me-2" /> Update
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2" /> Add
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (updateImgs) {
                          handleAddNewImg(false);
                        } else {
                          handleUpdateImg(false);
                        }
                      }}
                      className="btn btn-danger mt-3 mx-2 shadow-sm"
                    >
                      <i className="bx bx-images me-2" /> Cancel
                    </button>
                  </>
                )}
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default EdtImages;
