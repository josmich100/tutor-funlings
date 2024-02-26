import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

import {
  Card,
  Col,
  Container,
  Modal,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tooltip,
} from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";

import { FadeLoader } from "react-spinners";
import { Markup } from "interweave";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Importing Custom Components
import Breadcrumbs from "components/Common/Breadcrumbs";
import api from "helpers/API/BaseApi";
import ShareableUrl from "helpers/API/ShareableUrl";
import EditAdvert from "components/AdvertPaths/EditAdvert";
import PublishAdMain from "components/AdvertPaths/PublishAdvert";
import RenewAdMain from "components/AdvertPaths/RenewAdvert";
import TopUpAdMain from "components/AdvertPaths/TopUpAdvert";
import DetailsCarousel from "components/DetailsCarousel";
import numeral from "numeral";

const AdvertDetails = (props) => {
  const [showEditAd, setShowEditAd] = useState(false);
  const [showPublishAd, setShowPublishAd] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  const [publishModalTitle, setPublishModalTitle] = useState(
    "Advert Summary & Estimate Preview"
  );
  const [editModalTitle, setEditModalTitle] = useState(
    "Update Basic Information"
  );
  const [renewModalTitle, setRenewModalTitle] = useState("Renew Advert");

  // Globals
  const [clicksInfo, setClicksInfo] = useState({
    allocatedClicks: 0,
    balance: 0,
    clicked: 0,
    percentage: 0,
  });
  const [productImages, setProductImages] = useState([]);
  const [advertData, setAdvertData] = useState(null);

  // Publishing Globals
  const [dataLoaded, setDataLoaded] = useState(false);

  const generateShortURL = () => {
    Swal.fire({
      title: "Generate Shareable Link?",
      icon: "question",
      text: "This will take a few seconds!",
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
          "api/MQChannelsData/GetUrl",
          {
            refId: advertData?.marqueeProfile?.id,
            urlSource: "Web",
            urlValue: `${ShareableUrl}details/${advertData?.marqueeProfile?.id}`,
          },
          "Link generated & copied to clipboard.Paste & share it!",
          (data) => {
            const link = data.shortLink;
            navigator.clipboard.writeText(link);
          }
        );
      }
    });
  };

  const publishAdvert = () => {
    Swal.fire({
      title: "Publish?",
      icon: "question",
      text: "Once published, you cannot edit the advert details",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          title: "Processing",
          icon: "info",
        });
        Swal.showLoading();
        handleSubmitRequest(
          "api/MQCustomerMarqueeProfileManagement/SubmitMarqueeApplication",
          { marqueeProfileId: advertData?.marqueeProfile.id },
          "Success",
          (data) => fetchData(advertData?.marqueeProfile.id)
        );
      }
    });
  };

  // Deleting Advert Profile
  const deleteAdvert = () => {
    Swal.fire({
      title: "Delete?",
      icon: "question",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Advert!",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          title: "Processing",
          icon: "info",
        });
        Swal.showLoading();
        handleSubmitRequest(
          "api/MQCustomerMarqueeProfileManagement/RemoveMarqueeProfile",
          JSON.stringify(advertData?.marqueeProfile?.id),
          "Deleted",
          (data) => {
            props.history.push("/dashboard");
          }
        );
      }
    });
  };

  const handleSubmitRequest = (url, payload, title, finalCall) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    // API CALL: Edit PL
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

  // Fetching Data
  const fetchData = (id) => {
    setDataLoaded(false);

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
        setAdvertData(data);
        // console.log(data)

        //make featured image first
        const ftrdImgs = data?.files.filter((img) => {
          return img.featuredFile === true;
        });
        const files = data?.files.filter((img) => {
          return img.featuredFile === false;
        });

        // add featured image to top of array
        ftrdImgs.map((img) => {
          files.unshift(img);
        });

        setProductImages(files);

        const paidPkgs = data?.profilePackages.filter((item) => {
          if (item.marqueeProfilePackageStatus === "Paid") {
            return item;
          }
        });

        const allocatedClicks = paidPkgs.reduce((accumulator, pkg) => {
          return accumulator + pkg.marqueeAllocatedClicks;
        }, 0);

        setClicksInfo({
          allocatedClicks: allocatedClicks,
          clicked: data?.marqueeProfile?.clicked,
          balance: data?.marqueeProfile?.marqueeClicksBalance,
          percentage: (
            (data?.marqueeProfile?.marqueeClicksBalance / allocatedClicks) *
            100
          ).toFixed(),
        });

        setDataLoaded(true);
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response?.message);

          if (error.response?.statusText === "Unauthorized") {
            Swal.fire({
              title: "Unauthorized Session",
              text: "Redirecting you to login in 5 seconds",
              icon: "warning",
              timer: 5000,
            }).then(() => {
              props.history.push("/logout");
            });
            Swal.showLoading();
          }
        }
      });
  };

  const {
    match: { params },
  } = props;

  // UseEffect to getProduct GUID
  useEffect(() => {
    if (localStorage.getItem("authFunStudnt")) {
      // get profile data
      const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
      // check if session is expired
      if (Date.now() > profile.endTime) {
        // alert user of expired session
        Swal.fire({
          title: "Session Expired",
          text: "Redirecting you to login in 5 seconds",
          icon: "warning",
          timer: 5000,
        }).then(() => {
          props.history.push("/logout");
        });
        Swal.showLoading();
      } else if (params && params.id) {
        fetchData(params.id);
      } else {
        console.log("Product GUID: ", params.id);
      }
    }
  }, [params]);

  createTheme(
    "solarized",
    {
      background: {
        default: "transparent",
      },
      divider: {
        default: "#00000009",
      },
    },
    "light"
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Advert Details | Funlings Entertainment</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Marquee"
            back="marquee"
            breadcrumbItem="Advert Details"
          />

          <Card className="shadow-sm position-relative">
            <div
              className="d-none d-lg-inline"
              style={{
                right: 8,
                top: 8,
                zIndex: 10,
                position: "absolute",
                cursor: "pointer",
              }}
            >
              <button
                disabled={!dataLoaded}
                className="btn btn-white text-primary border-0"
                onClick={() => fetchData(params.id)}
              >
                <i
                  className={`fas fa-sync fs-4 fw-bold ${
                    dataLoaded ? "" : "bx-spin"
                  }`}
                />
              </button>
            </div>

            {advertData ? (
              <Card.Body>
                <Row className="mt-2">
                  {/* Images Section */}
                  <Col lg="5" md="7">
                    <DetailsCarousel items={productImages} />
                  </Col>

                  {/* Product Details */}
                  <Col>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb mb-0 pb-1">
                        <li className="breadcrumb-item">
                          {advertData?.marqueeProfile?.marqueeCategoryName}
                        </li>
                        <li className="breadcrumb-item">
                          {advertData?.marqueeProfile?.marqueeSubCategoryName}
                        </li>
                      </ol>
                    </nav>

                    <h4 className="mb-1 text-dark fw-bold">
                      {advertData?.marqueeProfile?.productName}
                    </h4>

                    <p className="mt-1">
                      <i className="mdi mdi-map-marker-outline me-1 fs-5" />
                      {advertData?.marqueeProfile?.productLocation}
                    </p>

                    <Markup content={advertData?.marqueeProfile?.description} />
                  </Col>
                </Row>

                {/* CONTACT INFORMATION */}
                <div className="my-md-4 my-3">
                  <div className="d-flex flex-wrap pt-1">
                    {advertData?.marqueeProfile?.phone && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={<Tooltip>Phone</Tooltip>}
                        >
                          <span className="badge badge-soft-secondary fs-6 mb-2 p-2">
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-phone bg-secondary text-white p-1 me-1 rounded-circle" />
                              {advertData?.marqueeProfile?.phone}
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.phone1 && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={<Tooltip>Phone 2</Tooltip>}
                        >
                          <span className="badge badge-soft-secondary fs-6 mb-2 p-2">
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-phone bg-secondary text-white p-1 me-1 rounded-circle" />
                              {advertData?.marqueeProfile?.phone1}
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.phone2 && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={<Tooltip>Phone 3</Tooltip>}
                        >
                          <span className="badge badge-soft-secondary fs-6 mb-2 p-2">
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-phone bg-secondary text-white p-1 me-1 rounded-circle" />
                              {advertData?.marqueeProfile?.phone2}
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.email && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Email<br></br>
                              {advertData?.marqueeProfile?.email}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-email-send-outline bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.email}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.whatsapp && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={<Tooltip>Whatsapp</Tooltip>}
                        >
                          <span className="badge badge-soft-secondary fs-6 mb-2 p-2">
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-whatsapp bg-secondary text-white p-1 me-1 rounded-circle" />
                              {advertData?.marqueeProfile?.whatsapp}
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.telegram && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Telegram<br></br>
                              {advertData?.marqueeProfile?.telegram}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-telegram bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.telegram}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.twitter && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Twitter<br></br>
                              {advertData?.marqueeProfile?.twitter}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-twitter bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.twitter}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.facebook && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Facebook<br></br>
                              {advertData?.marqueeProfile?.facebook}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="bx bxl-facebook bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.facebook}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.instagram && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Instagram<br></br>
                              {advertData?.marqueeProfile?.instagram}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-instagram bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.instagram}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.youtube && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Youtube<br></br>
                              {advertData?.marqueeProfile?.youtube}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="mdi mdi-youtube bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.youtube}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.website && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              Website<br></br>
                              {advertData?.marqueeProfile?.website}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="bx bx-globe bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.website}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}

                    {advertData?.marqueeProfile?.tikTok && (
                      <div className="d-flex me-2">
                        <OverlayTrigger
                          transition={false}
                          delay={500}
                          placement="bottom"
                          overlay={
                            <Tooltip>
                              TikTok<br></br>
                              {advertData?.marqueeProfile?.tikTok}
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-soft-secondary fs-6 mb-2 p-2"
                            style={{ maxWidth: 200 }}
                          >
                            <span className="d-flex align-items-center">
                              <i className="fa-brands fa-tiktok bg-secondary text-white p-1 me-1 rounded-circle" />
                              <span className="text-truncate py-1">
                                {advertData?.marqueeProfile?.tikTok}
                              </span>
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div>
                  <h4 className="mb-1 fw-bold d-none d-md-inline">
                    Advert Management Panel
                  </h4>
                  <h5 className="mb-1 fw-bold d-md-none">
                    Advert Management Panel
                  </h5>

                  <hr className="mt-1" style={{ height: 2 }} />

                  <div className="mb-2 d-flex">
                    <div className="me-3">
                      <p className="mb-1 text-center">Reference Number</p>
                      <span className="badge badge-soft-secondary fs-5 fw-bold w-md">
                        {
                          advertData?.profilePackages[0]
                            .marqueeProfilePackageRefNo
                        }
                        <i
                          onClick={() => {
                            navigator.clipboard.writeText(
                              advertData?.profilePackages[0]
                                .marqueeProfilePackageRefNo
                            );
                            toast.success("Copied");
                          }}
                          className="bx bx-copy-alt btn btn-secondary ms-2 py-0 px-1 fs-5 "
                        />
                      </span>
                    </div>

                    <div className="me-3">
                      <p className="mb-1 text-center">Status</p>
                      <span
                        className={`badge badge-soft-${
                          advertData?.marqueeProfile?.marqueeStatus ===
                          "Approved"
                            ? "success"
                            : advertData?.marqueeProfile?.marqueeStatus ===
                              "Exhausted"
                            ? "danger"
                            : advertData?.marqueeProfile?.marqueeStatus ===
                              "Draft"
                            ? "secondary"
                            : "primary"
                        } fs-5 fw-bold py-2 w-lg`}
                      >
                        {advertData?.marqueeProfile?.marqueeStatus}
                      </span>
                    </div>

                    {advertData?.marqueeProfile?.marqueeStatus === "Draft" && (
                      <div className="me-3">
                        <p className="mb-1 text-center">Payment</p>
                        <span
                          className={`badge badge-soft-${
                            advertData?.profilePackages[0]
                              .marqueeProfilePackageStatus === "Paid"
                              ? "success"
                              : "secondary"
                          } fs-5 fw-bold py-2 w-lg`}
                        >
                          {
                            advertData?.profilePackages[0]
                              .marqueeProfilePackageStatus
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  <Row className="text-secondary justify-content-center mt-4">
                    <Col>
                      <span className="fs-1 fw-bold">
                        {advertData?.marqueeProfile?.reached.toLocaleString()}
                      </span>
                      {advertData?.marqueeProfile?.reached === 1
                        ? "view"
                        : "views"}
                    </Col>
                    <Col>
                      <span className="fs-1 fw-bold">
                        {advertData?.marqueeProfile?.clicked.toLocaleString()}
                      </span>
                      {advertData?.marqueeProfile?.clicked === 1
                        ? "click"
                        : "clicks"}
                    </Col>
                  </Row>

                  <p className="mb-1 font-size-14">
                    Click Balance:
                    <span className="text-secondary fw-bold">
                      {" "}
                      {clicksInfo?.balance}
                    </span>
                    /
                    <span className="text-dark fw-bold">
                      {clicksInfo?.allocatedClicks}
                    </span>
                  </p>

                  <ProgressBar
                    className="flex-grow-1 bg-dark bg-soft"
                    variant={
                      clicksInfo.percentage < 10
                        ? "danger"
                        : clicksInfo.percentage < 20
                        ? "primary"
                        : "success"
                    }
                    min={0}
                    max={clicksInfo.allocatedClicks}
                    now={clicksInfo.balance}
                  />

                  <p className="text-dark text-end mx-2">
                    <strong>
                      {clicksInfo.percentage === "NaN"
                        ? 0
                        : clicksInfo.percentage}
                      %{" "}
                    </strong>
                    remaining
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mb-3">
                  {advertData?.marqueeProfile?.marqueeStatus === "Approved" && (
                    <>
                      {/* Top/Up Link */}
                      <button
                        onClick={() => setShowTopUpModal(true)}
                        className="btn badge-soft-primary fw-bold mb-2 me-2"
                      >
                        <i className="fas fa file-pen me-2" />
                        Renew Advert
                      </button>

                      {/* View live advert */}
                      <Link
                        to={{
                          pathname: `${ShareableUrl}details/${advertData?.marqueeProfile?.id}`,
                        }}
                        target="_blank"
                        className="btn badge-soft-primary fw-bold mb-2 me-2"
                      >
                        <i className="mdi mdi-book-open me-2" />
                        View Advert
                      </Link>

                      {/* Get Shareable Link */}
                      <button
                        onClick={() => generateShortURL()}
                        className="btn badge-soft-secondary fw-bold mb-2 me-2"
                      >
                        <i className="mdi mdi-share-variant-outline me-2" />
                        Share
                      </button>
                    </>
                  )}

                  {/* Renew Advert Button */}
                  {advertData?.marqueeProfile?.marqueeStatus ===
                    "Exhausted" && (
                    <button
                      onClick={() => setShowRenewalModal(true)}
                      className="btn badge-soft-primary fw-bold mb-2 me-2"
                    >
                      <i className="fas fa file-pen me-2" />
                      Renew Advert
                    </button>
                  )}

                  {advertData?.marqueeProfile?.marqueeStatus === "Draft" && (
                    <>
                      <button
                        onClick={() => setShowEditAd(true)}
                        className="btn badge-soft-primary fw-bold mb-2 me-2"
                      >
                        <i className="fas fa-pen my-1 me-2" />
                        Edit Advert
                      </button>

                      {advertData?.profilePackages[0]
                        .marqueeProfilePackageStatus !== "Paid" && (
                        <button
                          onClick={() => deleteAdvert()}
                          className="btn badge-soft-danger fw-bold mb-2 me-2"
                        >
                          <i className="mdi mdi-delete me-1" />
                          Delete
                        </button>
                      )}

                      {/* Publish Advert Buttons */}
                      {productImages.length > 1 && (
                        <>
                          {advertData?.profilePackages[0]
                            .marqueeProfilePackageStatus === "Paid" ? (
                            // if advert has been paid for, Publish Immediately
                            <button
                              onClick={() => publishAdvert()}
                              className="btn badge-soft-success fw-bold mb-2 me-2"
                            >
                              <i className="bx bx-images" /> Publish Now
                            </button>
                          ) : (
                            <>
                              {/* Proceed to payments before publishing */}
                              <button
                                onClick={() => setShowPublishAd(true)}
                                className="btn badge-soft-success fw-bold mb-2 me-2"
                              >
                                <i className="bx bx-images me-2" />
                                Publish Advert
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* package history */}
                <h4 className="fw-bold d-none d-md-inline">Package History</h4>
                <h5 className="fw-bold d-md-none">Package History</h5>

                <DataTable
                  columns={[
                    {
                      name: "Date Paid",
                      selector: (row) => row.datePaid,
                      sortable: true,
                      format: (row, i) =>
                        row.marqueeProfilePackageStatus === "Paid"
                          ? moment(row.datePaid).format("ll")
                          : "Pending Payment",
                    },
                    {
                      name: "Package",
                      selector: (row) => row.marqueePackageName,
                      sortable: true,
                    },
                    {
                      name: "Clicks",
                      selector: (row) => row.marqueeAllocatedClicks,
                      sortable: true,
                      format: (row, i) =>
                        row.marqueeAllocatedClicks
                          ? row.marqueeAllocatedClicks.toLocaleString()
                          : 0,
                    },
                    {
                      name: "Payment Method",
                      selector: (row) => row.paymentMethod,
                      format: (row, i) =>
                        row?.marqueeProfilePackageStatus === "Paid"
                          ? row?.paymentMethod
                          : "Pending Payment",
                      hide: "sm",
                    },
                    {
                      name: "Amount Paid (KES)",
                      selector: (row) => row.amountPaid,
                      sortable: true,
                      format: (row, i) =>
                        "KES " +
                        (row.amountPaid
                          ? numeral(row.amountPaid).format("0,0.00")
                          : 0),
                    },
                  ]}
                  data={advertData?.profilePackages}
                  dense
                  responsive
                  // style
                  theme="solarized"
                  customStyles={{
                    headRow: {
                      style: {
                        background: "#f9f9f9",
                        fontWeight: "bold",
                        fontSize: 13,
                        borderBottom: "1px solid #444",
                      },
                    },
                    rows: {
                      stripedStyle: {
                        backgroundColor: "#00000009",
                      },
                    },
                  }}
                />
              </Card.Body>
            ) : (
              <div className="my-5 d-flex justify-content-center">
                <FadeLoader
                  color="#de864b "
                  height={30}
                  width={5}
                  margin={30}
                  radius={100}
                />
              </div>
            )}
          </Card>
        </Container>
      </div>

      {/* Modal for Renewing An Advert */}
      <Modal
        backdrop="static"
        className="p-4"
        size="lg"
        centered
        animation
        show={showRenewalModal}
        onHide={() => {
          fetchData(advertData?.marqueeProfile.id);
          setShowRenewalModal(false);
        }}
        restoreFocus={false}
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3">{renewModalTitle}</span>
          </Modal.Header>
          <Modal.Body>
            <RenewAdMain
              closeModal={() => setShowRenewalModal(false)}
              setModalTitle={setRenewModalTitle}
              adProfile={advertData?.marqueeProfile}
            />
          </Modal.Body>
        </div>
      </Modal>

      {/* Modal for TopUp/Upgrade An Advert */}
      <Modal
        backdrop="static"
        className="p-4"
        size="lg"
        centered
        animation
        show={showTopUpModal}
        onHide={() => {
          fetchData(advertData?.marqueeProfile.id);
          setShowTopUpModal(false);
        }}
        restoreFocus={false}
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3">{renewModalTitle}</span>
          </Modal.Header>
          <Modal.Body>
            <TopUpAdMain
              closeModal={() => setShowTopUpModal(false)}
              setModalTitle={setRenewModalTitle}
              adProfile={advertData?.marqueeProfile}
            />
          </Modal.Body>
        </div>
      </Modal>

      {/* Edit Advert Modal */}
      <Modal
        backdrop="static"
        size="lg"
        centered
        animation
        fullscreen="lg-down"
        show={showEditAd}
        onHide={() => {
          setShowEditAd(false);
          fetchData(advertData?.marqueeProfile.id);
        }}
        restoreFocus={false}
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3">{editModalTitle}</span>
          </Modal.Header>
          <Modal.Body className="pt-0 pb-2">
            <EditAdvert
              closeModal={() => {
                setShowEditAd(false);
                fetchData(advertData?.marqueeProfile.id);
              }}
              setTitle={setEditModalTitle}
              adProfile={advertData?.marqueeProfile}
            />
          </Modal.Body>
        </div>
      </Modal>

      {/* Publish Advert Modal */}
      <Modal
        backdrop="static"
        size="lg"
        centered
        animation
        className="p-3"
        show={showPublishAd}
        onHide={() => {
          setShowPublishAd(false);
          fetchData(advertData?.marqueeProfile.id);
        }}
        restoreFocus={false}
      >
        <div className="modal-content flex-grow-1">
          <Modal.Header className="py-2" closeButton>
            <span className="h3">{publishModalTitle}</span>
          </Modal.Header>
          <Modal.Body className="pt-0 pb-2">
            <PublishAdMain
              setModalTitle={setPublishModalTitle}
              closeModal={() => {
                setShowPublishAd(false);
                fetchData(advertData?.marqueeProfile.id);
              }}
              adProfile={advertData?.marqueeProfile}
            />
          </Modal.Body>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default AdvertDetails;
