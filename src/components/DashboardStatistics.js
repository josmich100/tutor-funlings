import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

// number formating
import numeral from "numeral";

// Custom Components
import api from "helpers/API/BaseApi";
import useGetAdverts from "services/useGetAdverts";
import useGetLifeTimeImpressions from "services/useGetLifeTimeImpressions";
import useGetClicks from "services/useGetClicks";

import {
  HourglassEmpty,
  TouchAppOutlined,
  TouchAppRounded,
  Visibility,
} from "@mui/icons-material";

function DashboardStatistics() {
  const data = useGetAdverts();
  const impressions = useGetLifeTimeImpressions();
  const clicks = useGetClicks();

  const [exhausted, setExhausted] = useState(0);

  const numFormat = (num) => {
    if (num > 10000) {
      return numeral(num).format("0.0 a");
    }
    return numeral(num).format("0,0");
  };

  // Fetching Data
  const fetchData = () => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `api/MQCustomerMarqueeProfileManagement/GetMarqueeProfilesByUser?MarqueeOwner=${userId}&MarqueeStatus=Exhausted&PageNumber=1&PageSize=1`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setExhausted(response.data.metaData.totalCount);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };

  // API CALL TO FETCH ADVERTS
  useEffect(async () => {
    fetchData();
  }, []);

  const reports = [
    {
      icon: <i className="text-primary fas fa-check-circle fs-4 me-2" />,
      title: "Live Ads",
      value: data?.activeMarquees?.toLocaleString(),
      moreinfo: [
        {
          icon: <TouchAppRounded className="text-primary fs-5 me-2" />,
          title: "Click Balance",
          value: numFormat(data?.allMarqueeBalance),
        },
        {
          icon: <HourglassEmpty className="text-primary fs-5 me-2" />,
          title: "Exhausted Adverts",
          value: numFormat(exhausted),
        },
      ],
    },
    {
      icon: <Visibility className="text-primary fs-4 me-2" />,
      title: "Lifetime Impressions",
      value: impressions?.toLocaleString(),
    },
    {
      icon: <TouchAppOutlined className="text-primary fs-4 me-2" />,
      title: "Lifetime Clicks",
      value: clicks?.toLocaleString(),
    },
  ];

  return (
    <Row>
      {reports.map((report, key) => (
        <Col className="d-flex" sm="4" key={key}>
          <Card className="flex-grow-1">
            <Card.Body className="d-flex flex-column justify-content-center">
              <h4 className="text-dark">{report.value}</h4>
              <div className="d-flex align-items-center mb-2 font-size-14">
                {report.icon}
                <span className="fw-bold">{report.title}</span>
              </div>
              {key === 0 && (
                <div className="mt-2 d-flex justify-content-start text-primary">
                  {report.moreinfo?.map((data2, key2) => (
                    <div className="me-3" key={key2}>
                      <div className="d-flex align-items-center justify-content-start mb-1">
                        {data2.icon}
                        <h6 className="mb-0 text-primary">{data2.value}</h6>
                      </div>
                      <p className="mb-0 text-dark font-size-12 fw-semibold">
                        {data2.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardStatistics;
