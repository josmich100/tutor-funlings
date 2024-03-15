import React from "react";
import { Container } from "react-bootstrap";

//Import Breadcrumb
// import Breadcrumbs from "../../../components/Common/Breadcrumbs";

//Import Components
import BadgesCard from "./BadgesCard";
import PerformanceCard from "./PerformanceCard";
import SummaryCard from "./SummaryCard";
import UserCard from "./UserCard";
import VideosCard from "./VideosCard";

const DashboardSaas = (props) => {
  //meta title
  document.title = "Dashboard | Tutor Funlings";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs title="Dashboard" breadcrumbItem="Tutor" /> */}

          <UserCard />
          <SummaryCard />
          <BadgesCard />
          <PerformanceCard />
          <VideosCard />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardSaas;
