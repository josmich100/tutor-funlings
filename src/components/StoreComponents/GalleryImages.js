import React, { createRef, Fragment, useEffect, useState } from "react";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Dropzone from "react-dropzone";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import api from "helpers/API/BaseApi";

const GalleryImages = ({ galleryImgs, setGalleryImgs }) => {
  const dropzoneRef = createRef();

  const [isUploading, setIsUploading] = useState(false);

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

  const handleUploadNewImg = (acceptedFile) => {
    let uploadFile = null;

    acceptedFile.map((file) => {
      uploadFile = file;
    });

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    // Forming Form Data
    const formData = new FormData();
    formData.append("GetFormFiles", uploadFile);
    formData.append("RefNumber", store?.id);
    formData.append("MarqueeGallery", true);

    setIsUploading(true);

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

        setIsUploading(false);

        toast.success("Image added successfully");

        setGalleryImgs(data?.docsRef);
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response?.data);
          setIsUploading(false);
          toast.error(error.response?.data?.message);
        }
      });
  };

  const deleteImage = (row) => {
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
        handleDeleteImage(row?.id);
      }
    });
  };

  const handleDeleteImage = (id) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    const payload = {
      marqueeGallery: true,
      docId: id,
    };

    // API CALL: Edit PL
    api
      .post("api/DocumentsManagement/DeleteFile", payload, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        Swal.fire({
          title: "Deleted",
          icon: "success",
          text: data.message,
        });

        getGalleryImages();
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

  const getGalleryImages = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const store = profile.store;

    api
      .get(
        `${"api/MQCustomerGalleryProfileManagement/GetGalleryFiles"}?StoreId=${
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
        const data = response.data;

        setGalleryImgs(data);
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
    getGalleryImages();
  }, []);

  return (
    <Fragment>
      <h4 className="text-primary fw-bold mt-4">Gallery</h4>

      <div className="gallery-container">
        {galleryImgs.map((image, key) => (
          <div className="gallery-item" key={key}>
            <div className="image-container">
              <img className="gallery-image" src={image?.filePath} />
            </div>

            <OverlayTrigger
              transition={false}
              delay={500}
              placement="bottom"
              overlay={<Tooltip>Delete</Tooltip>}
            >
              <button
                onClick={() => deleteImage(image)}
                className="btn btn-sm badge-soft-danger fw-bold position-absolute top-0 end-0 m-3 py-0"
              >
                <i className="fas fa-trash my-1 fs-6" />
              </button>
            </OverlayTrigger>
          </div>
        ))}

        <div className="gallery-item">
          <Dropzone
            onDropAccepted={(acceptedFiles) =>
              handleUploadNewImg(acceptedFiles)
            }
            onDropRejected={(rejectedFiles) =>
              handleFileRejection(rejectedFiles)
            }
            multiple={false}
            maxSize={6291456}
            accept="image/*"
            ref={dropzoneRef}
            disabled={isUploading}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone image-container p-1">
                <input {...getInputProps()} />

                {isUploading ? (
                  <div className="d-flex flex-column align-items-center justify-content-center h-100 p-1 m-0 px-1">
                    <i className="display-3 text-secondary bx bx-loader-alt bx-spin d-none d-md-inline" />

                    <i className="display-5 text-secondary bx bx-loader-alt bx-spin d-md-none" />
                  </div>
                ) : (
                  <div className="h-100 p-1 m-0">
                    <div className="d-none d-md-flex flex-column align-items-center justify-content-center h-100">
                      <i className="display-4 text-secondary bx bx-image-add" />

                      <h6 className="text-secondary text-center my-1">
                        New image
                      </h6>
                    </div>

                    <div className="d-flex d-md-none flex-column align-items-center justify-content-center h-100">
                      <i className="fs-2 text-secondary bx bx-image-add" />

                      <h6 className="text-secondary text-center font-size-10 my-1">
                        New image
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    </Fragment>
  );
};

export default GalleryImages;
