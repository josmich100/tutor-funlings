import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

// Importing Custom Components
import api from "helpers/API/BaseApi";

const StoreFiles = () => {
  const logoUpload = useRef(null);
  const bannerUpload = useRef(null);

  const [storeId, setStoreId] = useState(null);
  const [storeFiles, setStoreFiles] = useState([]);
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const handleUploadLogo = (e) => {
    const file = e.target.files[0];

    if (file.size <= 6291456) {
      if (logo === null) {
        handleAddLogo(file);
      } else {
        handleUpdateLogo(file);
      }
    } else {
      toast.error("Image size should not exceed 5MBs");
    }
  };

  const handleUploadBanner = (e) => {
    const file = e.target.files[0];

    if (file.size <= 6291456) {
      if (banner === null) {
        handleAddBanner(file);
      } else {
        handleUpdateBanner(file);
      }
    } else {
      toast.error("Image size should not exceed 5MBs");
    }
  };

  const handleAddLogo = (file) => {
    setIsLogoUploading(true);
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const userId = profile.userId;

    // Forming Form Data
    const formData = new FormData();
    formData.append("GetFormFile", file);
    formData.append("DocumentType", "Logo");
    formData.append("Owner", userId);
    formData.append("StoreId", storeId);
    formData.append("Marquee", true);

    // API CALL
    uploadNewFile(formData, profile, "Logo");
  };

  const handleAddBanner = (file) => {
    setIsBannerUploading(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const userId = profile.userId;

    // Forming Form Data
    const formData = new FormData();
    formData.append("GetFormFile", file);
    formData.append("DocumentType", "Banner");
    formData.append("Owner", userId);
    formData.append("StoreId", storeId);
    formData.append("Marquee", true);

    // API CALL
    uploadNewFile(formData, profile, "Banner");
  };

  const uploadNewFile = (formData, profile, type) => {
    api
      .post("api/MQCustomerStoresManagement/UploadFile", formData, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${profile.token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        setStoreFiles([]);

        profile["storeFiles"] = null;
        localStorage.setItem("authFunStudnt", JSON.stringify(profile));

        getStoreFiles(profile);

        toast.success(data?.message);
      })
      .catch((error) => {
        if (type === "Logo") {
          setIsLogoUploading(false);
        } else if (type === "Banner") {
          setIsBannerUploading(false);
        }

        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
      });
  };

  const handleUpdateLogo = (file) => {
    setIsLogoUploading(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const userId = profile.userId;

    // Forming Form Data
    const formData = new FormData();
    formData.append("GetFormFile", file);
    formData.append("StoreId", storeId);
    formData.append("DocId", logo?.id);
    formData.append("DocumentType", "Logo");
    formData.append("Owner", userId);
    formData.append("Marquee", true);

    // API CALL
    updateStoreFile(formData, profile, "Logo");
  };

  const handleUpdateBanner = (file) => {
    setIsBannerUploading(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    // Forming Form Data
    const formData = new FormData();
    formData.append("GetFormFile", file);
    formData.append("StoreId", storeId);
    formData.append("DocId", banner?.id);
    formData.append("DocumentType", "Banner");
    formData.append("Owner", userId);
    formData.append("Marquee", true);

    // API CALL
    updateStoreFile(formData, profile, "Banner");
  };

  const updateStoreFile = (formData, profile, type) => {
    api
      .post("api/MQCustomerStoresManagement/UpdateFile", formData, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${profile.token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        // console.log(data)
        const newFileList = storeFiles.filter((item) => {
          if (item.documentType !== type) {
            return item;
          }
        });

        newFileList.push(data.docsRef);

        profile["storeFiles"] = null;
        localStorage.setItem("authFunStudnt", JSON.stringify(profile));

        setStoreFiles([]);

        toast.success(data?.message);

        if (type === "Logo") {
          setLogo(data.docsRef);
          setIsLogoUploading(false);
        } else if (type === "Banner") {
          setBanner(data.docsRef);
          setIsBannerUploading(false);
        }
      })
      .catch((error) => {
        if (type === "Logo") {
          setIsLogoUploading(false);
        } else if (type === "Banner") {
          setIsBannerUploading(false);
        }

        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          toast.error(error.response?.data?.message);
        }
      });
  };

  const getStoreFiles = (profile) => {
    api
      .get(
        `${"api/MQCustomerStoresManagement/GetStoreFiles"}?StoreId=${
          profile.store.id
        }`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        if (data[0]) {
          profile["storeFiles"] = data;

          localStorage.setItem("authFunStudnt", JSON.stringify(profile));

          setStoreFiles(data);

          data.forEach((file) => {
            if (file.documentType === "Logo") {
              setLogo(file);
              setIsLogoUploading(false);
            }

            if (file.documentType === "Banner") {
              setBanner(file);
              setIsBannerUploading(false);
            }
          });
        }
      })
      .catch((error) => {
        // setIsLoading(false)
        console.log(error.response?.data?.message);
      });
  };

  // useEffect for banner and logo
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const store = profile.store;
    const storeFiles = profile.storeFiles;

    setStoreId(store.id);

    if (storeFiles !== null) {
      setStoreFiles(storeFiles);

      storeFiles.forEach((file) => {
        if (file.documentType === "Logo") {
          setLogo(file);
        }

        if (file.documentType === "Banner") {
          setBanner(file);
        }
      });
    } else {
      getStoreFiles(profile);
    }
  }, []);

  return (
    <React.Fragment>
      {/* BANNER */}
      <div className="banner-container">
        <input
          disabled={isBannerUploading}
          name="newBanner"
          id="newBanner"
          type="file"
          accept="image/*"
          multiple={false}
          required
          onChange={handleUploadBanner}
          ref={bannerUpload}
          hidden
        />

        {isBannerUploading ? (
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated upload-progress"></div>
          </div>
        ) : (
          <>
            {/* overlay */}
            <label htmlFor="newBanner" className="edit-container"></label>

            {/* floating edit icon */}
            <label className="edit-icon-label" htmlFor="newBanner">
              <i className="bx bx-edit-alt" />
            </label>
          </>
        )}

        {banner && (
          <div className="img-container">
            <img src={banner?.filePath} alt="" />
          </div>
        )}
      </div>

      {/* LOGO */}
      <div className="logo-container">
        <input
          disabled={isLogoUploading}
          name="newLogo"
          id="newLogo"
          type="file"
          accept="image/*"
          multiple={false}
          required
          onChange={handleUploadLogo}
          ref={logoUpload}
          hidden
        />

        <div className="img-container">
          {isLogoUploading ? (
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated upload-progress"></div>
            </div>
          ) : (
            // {/* overlay */}
            <label htmlFor="newLogo" className="edit-container"></label>
          )}

          {logo && <img src={logo?.filePath} alt="" />}
        </div>

        {/* floating edit icon */}
        <label className="edit-icon-label" htmlFor="newLogo">
          <i className="bx bx-edit-alt" />
        </label>
      </div>
    </React.Fragment>
  );
};

export default StoreFiles;
