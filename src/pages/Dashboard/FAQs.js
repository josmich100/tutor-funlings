import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Card,
  Col,
  Container,
  Nav,
  Row,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";

// Toast Alert
import toast from "react-hot-toast";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumbs";

import api from "helpers/API/BaseApi";

const FAQs = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [FAQs, setFAQs] = useState([]);

  // Check if its mobile loaded
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const fetchData = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;

    api
      .get("api/MQChannelsData/GetFAQs", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.faqs;
        // console.log(data)
        setFAQs(data);
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error.response);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabContent = (
    <TabContainer className="h-100" activeKey={activeTab}>
      <TabContent as="div" className="h-100 w-100">
        {FAQs.map((item, key) => (
          <TabPane className="h-100" eventKey={key} key={key} transition>
            <div>
              <h3 className="mb-1">{item.category}</h3>
              <hr className="my-2" />
            </div>
            <div className="overflow-auto pt-1" style={{ height: "90%" }}>
              {item.faqDetails.map((category, ind) => (
                <div className="d-flex faq-box mt-2" key={ind}>
                  <div className="flex-shrink-1 faq-icon me-3">
                    <i className="bx bx-help-circle font-size-20 text-success" />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="font-size-15 fw-bold">
                      {category.question}
                    </h5>
                    <p className="text-muted font-size-14">{category.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabPane>
        ))}
      </TabContent>
    </TabContainer>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>FAQs | Funlings Entertainment</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Marquee" back="#" breadcrumbItem="FAQs" />

          <div className="checkout-tabs">
            <Row>
              <Col lg="2">
                <Nav
                  className="flex-sm-row flex-lg-column"
                  variant="pills"
                  justify
                >
                  {FAQs.map((item, key) => (
                    <Nav.Link
                      key={key}
                      className="shadow-sm mx-1 mb-3"
                      active={activeTab === key}
                      onClick={() => setActiveTab(key)}
                      style={{
                        backgroundColor: activeTab !== key && "#f9f9f9",
                      }}
                    >
                      <i className="bx bx-question-mark d-block check-nav-icon my-2" />
                      <p className="font-weight-bold mb-2">{item.category}</p>
                    </Nav.Link>
                  ))}
                </Nav>
              </Col>

              <Col className="d-flex" lg="10">
                <Card
                  className="flex-fill"
                  style={{
                    height: isMobile ? "" : "70vh",
                    boxShadow: " -2px 2px 5px 1px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Card.Body className="h-100">{tabContent}</Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FAQs;
