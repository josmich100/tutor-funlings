import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";

import { Card, Container } from "react-bootstrap";

// Importing Custom Components
import Breadcrumbs from "components/Common/Breadcrumbs";
import EditStore from "components/StoreComponents/EditStore";
import StoreFiles from "components/StoreComponents/StoreFiles";
import Branches from "components/StoreComponents/Branches";
import StoreCollections from "components/StoreComponents/StoreCollections";
import GalleryImages from "components/StoreComponents/GalleryImages";
import CatalogItems from "components/StoreComponents/CatalogItems";

const StoreDetails = (props) => {
  // listing arrays
  const [galleryImgs, setGalleryImgs] = useState([]);

  // selection arrays
  const [branchList, setBranchList] = useState([{ label: "Loading..." }]);
  const [collectionList, setCollectionList] = useState([
    { label: "Loading..." },
  ]);

  const [storeProfile, setStoreProfile] = useState(null);

  const [activeBranches, setActiveBranches] = useState([]);
  const [activeCollection, setActiveCollection] = useState("all");

  // useEffect for store details: branches, gallery
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    setStoreProfile(profile.store);
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Store | Funlings Entertainment</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Marquee" back="marquee" breadcrumbItem="Store" />

          <Card className="storedetails-card">
            <StoreFiles />

            <Card.Body className="position-relative px-3">
              <div className="d-flex justify-content-between align-items-end mt-3">
                <h3 className="fw-bolder position-relative">
                  {storeProfile?.businessName}
                  <span
                    className="font-size-10 ms-1 mt-2 text-white fw-bold bg-primary position-absolute top-0 start-100 translate-middle rounded-circle"
                    style={{ padding: 2 }}
                  >
                    <i className="bx bx-check" />
                  </span>
                </h3>

                {/* edit button */}
                <EditStore />
              </div>

              <hr className="my-2 border border-warning" />

              <div className="mt-4">
                {/* BRANCHES */}
                <Branches
                  activeBranches={activeBranches}
                  setActiveBranches={setActiveBranches}
                  setBranchList={setBranchList}
                />

                {/* CATALOGUE */}
                <h4 className="text-primary fw-bold mb-2 mt-3">Catalogue</h4>

                <div className="d-flex flex-column flex-md-row">
                  <StoreCollections
                    activeCollection={activeCollection}
                    setActiveCollection={setActiveCollection}
                    setCollectionList={setCollectionList}
                  />

                  <CatalogItems
                    galleryImgs={galleryImgs}
                    activeBranches={activeBranches}
                    activeCollection={activeCollection}
                    branchList={branchList}
                    collectionList={collectionList}
                  />
                </div>

                {/* GALLERY */}
                <GalleryImages
                  galleryImgs={galleryImgs}
                  setGalleryImgs={setGalleryImgs}
                />
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StoreDetails;
