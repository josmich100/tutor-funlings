import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { Card, Form, InputGroup, Modal, Nav } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";

// Importing Custom Components
import api from "helpers/API/BaseApi";
import EditAdvert from "components/AdvertPaths/EditAdvert";
import CreateAd from "components/AdvertPaths/CreateAd";
import TopUpAdMain from "./AdvertPaths/TopUpAdvert";
import RenewAdMain from "./AdvertPaths/RenewAdvert";
import ShareableUrl from "helpers/API/ShareableUrl";

const AdvertList = (props) => {
  const [showEditAd, setShowEditAd] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [editTitle, setEditTitle] = useState("Edit Advert");
  const [renewModalTitle, setRenewModalTitle] = useState("Renew Advert");

  const [adverts, setAdverts] = useState([]);
  const [modalData, setModalData] = useState([]);

  // processing states
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // tabs
  const [activeTab, setActiveTab] = useState("Approved");
  const [pageSize, setPageSize] = useState(5);
  const [pgNumber, setPgNumber] = useState(1);

  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [totalRows, setTotalRows] = useState(0);

  const [searchText, setSearchText] = useState("");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);

      setDataLoaded(false);
      setAdverts([]);
    }
  };

  const handlePageChange = async (page) => {
    setDataLoaded(false);
    setPgNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setDataLoaded(false);
    setPageSize(newPerPage);
    setPgNumber(page);
  };

  const handleSort = async (column, sortDirection) => {
    setSortColumn(column.sortField);
    setSortDirection(sortDirection);
  };

  const onFilter = (e) => {
    setSearchText(e.target.value);
  };

  const generateShortURL = (row) => {
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
            refId: row?.id,
            urlSource: "Web",
            urlValue: `${ShareableUrl}details/${row?.id}`,
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

  const publishAdvert = (row) => {
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
          { marqueeProfileId: row.id },
          "Success",
          (data) => fetchData()
        );
      }
    });
  };

  // Deleting Advert Profile
  const deleteAdvert = (row) => {
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
          JSON.stringify(row?.id),
          "Deleted",
          (data) => fetchData()
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
  const fetchData = () => {
    setIsRefreshing(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `api/MQCustomerMarqueeProfileManagement/GetMarqueeProfilesByUser?MarqueeOwner=${userId}&MarqueeStatus=${activeTab}&PageNumber=${pgNumber}&PageSize=${pageSize}${
          sortColumn
            ? "&SortColumn=" +
              sortColumn +
              "&SortColumnDirection=" +
              sortDirection
            : ""
        }${searchText.length > 0 ? "&SearchTerm=" + searchText : ""}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        setAdverts(data.marqueeProfiles);
        setTotalRows(data.metaData.totalCount);

        setDataLoaded(true);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error.response?.data.message);
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
      });
  };

  // API CALL TO FETCH ADVERTS
  useEffect(async () => {
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
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeTab, pageSize, pgNumber, sortColumn, searchText]);

  const tabData = [
    {
      title: "Live",
      status: "Approved",
    },
    {
      title: "Drafts",
      status: "Draft",
    },
    {
      title: "Submitted",
      status: "Submitted",
    },
    {
      title: "Exhausted",
      status: "Exhausted",
    },
  ];

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

  const headers = [
    {
      name: "Actions",
      reorder: true,
      compact: true,
      cell: (row, i, col, id) => {
        return (
          <div className="d-flex flex-nowrap align-items-center">
            <Link
              to={{
                pathname: `/details/${row.id}`,
                state: row,
              }}
              className="btn btn-sm badge-soft-info my-0 py-0 d-flex align-items-center me-1 text-nowrap fw-bold"
            >
              <i className="fas fa-eye my-1 fs-6 me-1" />
              View
            </Link>

            {row.marqueeStatus === "Approved" && (
              <>
                <button
                  onClick={() => {
                    setModalData(row);
                    setShowTopUpModal(true);
                  }}
                  className="btn btn-sm badge-soft-primary py-0 my-0 me-1 text-nowrap fw-bold"
                >
                  <i className="fas fa-file-pen fs-6 my-1 me-1" />
                  Renew
                </button>

                {/* Get Shareable Link */}
                <button
                  onClick={() => generateShortURL(row)}
                  className="btn btn-sm badge-soft-secondary py-0 my-0 me-1 text-nowrap fw-bold"
                >
                  <i className="mdi mdi-share-variant-outline fs-6 me-1" />
                  Share
                </button>
              </>
            )}

            {/* Renew Advert Button */}
            {row.marqueeStatus === "Exhausted" && (
              <button
                onClick={() => {
                  setModalData(row);
                  setShowRenewalModal(true);
                }}
                className="btn btn-sm badge-soft-primary py-0 my-0 me-1 text-nowrap fw-bold"
              >
                <i className="fas fa-file-pen fs-6 my-1 me-1" />
                Renew
              </button>
            )}

            {row.marqueeStatus === "Draft" && (
              <>
                <button
                  onClick={() => {
                    setModalData(row);
                    setShowEditAd(true);
                  }}
                  className="btn btn-sm badge-soft-primary py-0 my-0 me-1 text-nowrap fw-bold"
                >
                  <i className="fas fa-pen my-1 fs-6 me-1" />
                  Edit
                </button>

                {/* Publish Advert Buttons */}
                {row.marqueeProfilePackageStatus === "Paid" ? (
                  // if advert has been paid for, Publish Immediately
                  <button
                    onClick={() => publishAdvert(row)}
                    className="btn btn-sm badge-soft-success py-0 my-0 me-1 text-nowrap fw-bold"
                  >
                    <i className="bx bx-file me-1" />
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => deleteAdvert(row)}
                    className="btn btn-sm badge-soft-danger my-0 py-0 me-1 text-nowrap fw-bold"
                  >
                    <i className="mdi mdi-delete fs-6 me-1" />
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        );
      },
      width:
        activeTab === "Approved" || activeTab === "Draft"
          ? "210px"
          : activeTab === "Exhausted"
          ? "130px"
          : "70px",
    },
    {
      name: "Name",
      selector: (row) => row.productName,
      sortField: "ProductName",
      reorder: true,
      sortable: true,
      wrap: true,
    },
    {
      name: "Category",
      selector: (row) => row.marqueeCategoryName,
      sortField: "MarqueeCategoryName",
      reorder: true,
      sortable: true,
      wrap: true,
      hide: "sm",
    },
    {
      name: "SubCategory",
      selector: (row) => row.marqueeSubCategoryName,
      sortField: "MarqueeSubCategoryName",
      reorder: true,
      sortable: true,
      wrap: true,
      compact: true,
      hide: "md",
    },
    {
      name: "Location",
      selector: (row) => row.productLocation,
      sortField: "ProductLocation",
      reorder: true,
      sortable: true,
      wrap: true,
      maxWidth: "180px",
    },
    {
      name: "Ref No",
      selector: (row) => row.marqueeProfilePackageRefNo,
      sortField: "AttachedRefNumber",
      reorder: true,
      sortable: true,
      compact: true,
      width: "90px",
    },
    {
      name: "Created",
      selector: (row) => row.dateCreated,
      sortField: "DateCreated",
      reorder: true,
      sortable: true,
      compact: true,
      format: (row, i) => moment(row.dateCreated).format("D MMM YYYY hh:mm A"),
      width: "150px",
    },
  ];

  const subHeader = (
    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between w-100 mb-3">
      <Nav
        activeKey={activeTab}
        variant="pills"
        className="flex-nowrap overflow-auto px-0 my-2 mb-md-1 bg-white rounded-pill"
      >
        {tabData.map((ttl, key) => (
          <Nav.Item key={key}>
            <Nav.Link
              eventKey={ttl.status}
              onClick={() => toggleTab(ttl.status)}
              className="d-flex justify-content-center w-sm py-1 fw-bold rounded-pill font-size-14"
            >
              <span>{ttl.title}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <div className="d-flex justify-content-end flex-grow-1 mt-3 mt-md-0">
        <div className="w-50">
          <InputGroup className="border border-secondary rounded">
            <Form.Control
              value={searchText}
              onChange={onFilter}
              placeholder="Type to search..."
              className="border-0 shadow-none rounded"
            />
            <button
              type="button"
              onClick={() => {
                setSearchText("");
                fetchData();
              }}
              className={`btn bg-transparent text-secondary fw-bold py-1 rounded ${
                searchText.length > 0 ? "" : "d-none"
              }`}
            >
              X
            </button>
          </InputGroup>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="text-black fw-bold mb-0 d-none d-md-block">
              My Adverts
            </h3>
            <h5 className="text-black fw-bold mb-0 d-md-none">My Adverts</h5>

            <div className="d-flex align-items-center">
              <CreateAd />

              <button
                disabled={isRefreshing}
                className="btn btn-white text-primary border-0"
                onClick={() => fetchData()}
              >
                <i
                  className={`fas fa-sync fs-5 fw-bold ${
                    isRefreshing ? "bx-spin" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* <hr className="mt-1 mb-2 bg-dark" /> */}

          <DataTable
            columns={headers}
            data={adverts}
            striped
            dense
            responsive
            progressPending={!dataLoaded}
            progressComponent={
              <div className="py-3 text-center">
                <div className="custom-spinner-2"></div>
                <h2>Loading...</h2>
              </div>
            }
            fixedHeader
            fixedHeaderScrollHeight="400px"
            subHeader
            subHeaderComponent={subHeader}
            // sort
            sortServer
            onSort={handleSort}
            // pagination
            pagination
            paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
            paginationTotalRows={totalRows}
            paginationComponentOptions={{
              selectAllRowsItem: true,
              selectAllRowsItemText: "View All",
            }}
            paginationIconFirstPage={<span className="fw-bold">First</span>}
            paginationIconNext={<span className="fw-bold">Next</span>}
            paginationIconLastPage={<span className="fw-bold">Last</span>}
            paginationIconPrevious={<span className="fw-bold">Prev</span>}
            paginationPerPage={pageSize}
            paginationServer
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
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
              subHeader: {
                style: {
                  paddingRight: 0,
                  paddingLeft: 0,
                },
              },
            }}
          />
        </Card.Body>
      </Card>

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
          setEditTitle("Edit Advert");
          fetchData();
        }}
        restoreFocus={false}
        style={{ minHeight: 450 }}
      >
        <div className="modal-content">
          <Modal.Header className="py-2" closeButton>
            <span className="h3">{editTitle}</span>
          </Modal.Header>
          <Modal.Body className="pt-0 pb-2">
            <EditAdvert
              closeModal={() => {
                setShowEditAd(false);
                setEditTitle("Edit Advert");
                fetchData();
              }}
              setTitle={setEditTitle}
              adProfile={modalData}
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
          fetchData();
          setEditTitle("Renew Advert");
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
              closeModal={() => {
                fetchData();
                setEditTitle("Renew Advert");
                setShowTopUpModal(false);
              }}
              setModalTitle={setRenewModalTitle}
              adProfile={modalData}
            />
          </Modal.Body>
        </div>
      </Modal>

      {/* Modal for Renewing An Advert */}
      <Modal
        backdrop="static"
        className="p-4"
        size="lg"
        centered
        animation
        show={showRenewalModal}
        onHide={() => {
          fetchData();
          setEditTitle("Renew Advert");
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
              closeModal={() => {
                fetchData();
                setEditTitle("Renew Advert");
                setShowRenewalModal(false);
              }}
              setModalTitle={setRenewModalTitle}
              adProfile={modalData}
            />
          </Modal.Body>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AdvertList;
