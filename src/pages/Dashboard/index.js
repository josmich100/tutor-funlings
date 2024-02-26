import React from "react";
import MetaTags from "react-meta-tags";
import { Container } from "react-bootstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumbs";

// Importing Custom Components
import DashboardStatistics from "components/DashboardStatistics";
import AdvertList from "components/AdvertList";
import ClicksViewsGraph from "components/ClicksViewsGraph";

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Home | Funlings Entertainment</title>
        </MetaTags>

        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs title="Marquee" breadcrumbItem="Dashboard" /> */}

          {/*mimi widgets */}
          {/* <DashboardStatistics /> */}

          {/* Unique Activity Progression */}
          {/* <ClicksViewsGraph /> */}

          {/* Advert Management List */}
          {/* <AdvertList history={props.history} /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
