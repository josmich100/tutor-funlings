import React, { useEffect, useState } from "react";
import { Card, Col, Form, Nav, Row, Spinner } from "react-bootstrap";

// Toast Alert
import { FadeLoader } from "react-spinners";
import moment from "moment";
import toast from "react-hot-toast";

import ReactApexChart from "react-apexcharts";

import Flatpickr from "react-flatpickr";
import rangePlugin from "flatpickr/dist/plugins/rangePlugin";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/plugins/monthSelect/style.css";
import weekSelectPlugin from "flatpickr/dist/plugins/weekSelect/weekSelect";

// Importing Custom Components
import api from "helpers/API/BaseApi";

const ClicksViewsGraph = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dailyNavOptions = ["Last Week", "Last 7 Days", "Last 30 Days"];
  const oneDayTime = 86400000;
  const oneWeekTime = 604800000;
  const yesterday = new Date(new Date().getTime() - oneDayTime);
  const oneWeekAgo = new Date(new Date().getTime() - oneWeekTime);

  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - (oneWeekTime + oneDayTime)).toDateString()
  );
  const [endDate, setEndDate] = useState(yesterday.toDateString());
  const [dateRange, setDateRange] = useState([
    new Date(oneWeekAgo.getTime()),
    yesterday,
  ]);
  const [monthRange, setMonthRange] = useState([
    new Date(new Date().getFullYear(), 0, 1),
    new Date(),
  ]);

  const [chartTitle, setChartTitle] = useState("");
  const [arrClicks, setArrClicks] = useState([]);
  const [arrReach, setArrReach] = useState([]);

  const [dataType, setDataType] = useState("daily");
  const [selectedType, setSelectedType] = useState("daily");
  const [showFilters, setShowFilters] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);

      let start = startDate;
      let end = endDate;
      let weekDates = [];

      switch (tab) {
        case 0:
          weekDates = getWeekDates(new Date().getTime() - 7 * oneDayTime);
          start = new Date(
            weekDates.first.getTime() - oneDayTime
          ).toDateString();
          end = new Date(weekDates.last.getTime()).toDateString();
          break;

        case 1:
          start = new Date(
            new Date().getTime() - (oneWeekTime + oneDayTime)
          ).toDateString();
          end = yesterday.toDateString();
          break;

        case 2:
          start = new Date(
            new Date().getTime() - 31 * oneDayTime
          ).toDateString();
          end = yesterday.toDateString();
          break;

        default:
          start = new Date(
            new Date().getTime() - (oneWeekTime + oneDayTime)
          ).toDateString();
          end = yesterday.toDateString();
          break;
      }

      setStartDate(start);
      setEndDate(end);

      handleSetChartTitle(start, end);
      fetchDailyClicks(start, end);
      fetchDailyReach(start, end);
    }
  };

  const handleValidSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const dataType = form.dataType.value;

    setActiveTab(-1);

    if (dataType === "daily") {
      if (dateRange.length === 2) {
        let start = new Date(
          dateRange[0].getTime() - oneDayTime
        ).toDateString();
        let end = dateRange[1].toDateString();

        fetchDailyClicks(start, end);
        fetchDailyReach(start, end);

        setStartDate(start);
        setEndDate(end);
        handleSetChartTitle(start, end);
      }
    } else if (dataType === "weekly") {
      if (dateRange.length === 2) {
        // let start be one day before the first day of the week from dateRange[0]
        let start = new Date(
          getWeekDates(dateRange[0].getTime()).first.getTime() - oneDayTime
        ).toDateString();
        // let end be the last day of the week from dateRange[1]
        let end = getWeekDates(dateRange[1].getTime()).last.toDateString();

        fetchWeeklyClicks(start, end);
        fetchWeeklyReach(start, end);

        setStartDate(start);
        setEndDate(end);
        handleSetChartTitle(start, end);
      }
    } else if (dataType === "monthly") {
      if (monthRange.length === 2) {
        // set start to be the last day of the previous month
        let start = new Date(
          monthRange[0].getFullYear(),
          monthRange[0].getMonth(),
          0
        ).toDateString();
        // set end date to be the last day of the month
        let end = new Date(
          monthRange[1].getFullYear(),
          monthRange[1].getMonth() + 1,
          0
        ).toDateString();

        fetchMonthlyClicks(start, end);
        fetchMonthlyReach(start, end);

        setStartDate(start);
        setEndDate(end);
        handleSetChartTitle(start, end);
      }
    }

    setDataType(dataType);
  };

  const fetchDailyClicks = (startDate, endDate) => {
    setIsProcessing(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `${"api/MQCustomerDashboard/GetDailyClicks"}?AdOwner=${userId}&From=${startDate}&To=${endDate}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.dailyClicks;

        setArrClicks(setDailyData(data, startDate, endDate));
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error?.response?.data?.message);
        }
      });
  };

  const fetchDailyReach = (startDate, endDate) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `${"api/MQCustomerDashboard/GetDailyReach"}?AdOwner=${userId}&From=${startDate}&To=${endDate}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.dailyReach;

        setArrReach(setDailyData(data, startDate, endDate));
        setIsProcessing(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
  };

  const setDailyData = (data, startDate, endDate) => {
    const range = (new Date(endDate) - new Date(startDate)) / oneDayTime;
    const endPoint = new Date(
      new Date(endDate).getTime() + oneDayTime
    ).getTime();

    let newArr = [];

    for (let i = 0; i < range; i++) {
      const d = new Date(endPoint - (range - i) * oneDayTime).toDateString();
      let total = 0;

      data.forEach((element) => {
        if (new Date(element.date).toDateString() === d) {
          total = element?.total;
        }
      });

      newArr.push({
        total: total,
        date: d,
      });
    }

    return newArr;
  };

  const fetchWeeklyClicks = (startDate, endDate) => {
    setIsProcessing(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `${"api/MQCustomerDashboard/GetWeeklyClicks"}?AdOwner=${userId}&From=${startDate}&To=${endDate}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.weeklyClicks;

        setArrClicks(setWeeklyData(data, startDate, endDate));
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error?.response?.data?.message);
        }
      });
  };

  const fetchWeeklyReach = (startDate, endDate) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `${"api/MQCustomerDashboard/GetWeeklyReach"}?AdOwner=${userId}&From=${startDate}&To=${endDate}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.weeklyReach;

        setArrReach(setWeeklyData(data, startDate, endDate));
        setIsProcessing(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
  };

  const setWeeklyData = (data, startDate, endDate) => {
    // get first and last day of the week with the start date
    const firstWeekDates = getWeekDates(startDate);
    const lastWeekDates = getWeekDates(endDate);
    let rangeStart = firstWeekDates.first;
    let rangeEnd = lastWeekDates.first;

    const range = (rangeEnd.getTime() - rangeStart.getTime()) / oneWeekTime;

    let newArr = [];

    for (let i = 0; i < range; i++) {
      const d = new Date(rangeEnd.getTime() - (range - i - 1) * oneWeekTime);
      let total = 0;

      data.forEach((element) => {
        if (new Date(element.date).toDateString() === d.toDateString()) {
          total = element?.total;
        }
      });

      d.setDate(d.getDate() + 6);

      newArr.push({
        total: total,
        date: d.toDateString(),
      });
    }

    return newArr;
  };

  const fetchMonthlyClicks = (startDate, endDate) => {
    setIsProcessing(true);

    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `${"api/MQCustomerDashboard/GetMonthlyClicks"}?AdOwner=${userId}&From=${startDate}&To=${endDate}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.monthlyClicks;

        setArrClicks(setMonthlyData(data, startDate, endDate));
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          toast.error("Network Error. Check Internet Connection");
        } else {
          console.log(error?.response?.data?.message);
        }
      });
  };

  const fetchMonthlyReach = (startDate, endDate) => {
    const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
    const token = profile.token;
    const userId = profile.userId;

    api
      .get(
        `${"api/MQCustomerDashboard/GetMonthlyReach"}?AdOwner=${userId}&From=${startDate}&To=${endDate}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.monthlyClicks;

        setArrReach(setMonthlyData(data, startDate, endDate));
        setIsProcessing(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
  };

  const setMonthlyData = (data, startDate, endDate) => {
    // get first and last day of the month with the start date and end date
    const firstMonthDate = new Date(
      new Date(startDate).getFullYear(),
      new Date(startDate).getMonth() + 1,
      1
    );
    const lastMonthDate = new Date(
      new Date(endDate).getFullYear(),
      new Date(endDate).getMonth() + 1,
      0
    );

    // let range be the number of months between the first month and the last month
    const range = Number.parseInt(
      (new Date(lastMonthDate).getTime() - new Date(firstMonthDate).getTime()) /
        (30 * oneDayTime)
    );

    let newArr = [];
    let previousMonthDate = firstMonthDate;

    for (let i = 0; i < range; i++) {
      // let current month be the month after previous month
      const currentMonthDate = new Date(
        previousMonthDate.getFullYear(),
        previousMonthDate.getMonth() + 1,
        1
      );

      previousMonthDate = currentMonthDate;
      let total = 0;

      data.forEach((element) => {
        if (
          new Date(element.date).toDateString() ===
          currentMonthDate.toDateString()
        ) {
          total = element?.total;
        }
      });

      newArr.push({
        total: total,
        date: currentMonthDate.toDateString(),
      });
    }

    return newArr;
  };

  // const getWeekNumber = (weekDate) => {
  //   var firstJan = new Date(new Date(weekDate).getFullYear(), 0, 1);
  //   var dayNumber = Math.ceil((new Date(weekDate).getTime() - firstJan.getTime()) / oneDayTime);
  //   var weekNumber = Math.ceil((dayNumber + firstJan.getDay()) / 7);

  //   return weekNumber;
  // }

  const getWeekDates = (date) => {
    const d = new Date(date);
    // Get current day number, converting Sun. to 7
    const day = d.getDay() || 7;
    // if it is not Monday
    const firstDay = new Date(d.setDate(d.getDate() - day + 1));
    const lastDay = new Date(d.setDate(firstDay.getDate() + 6));

    return { first: firstDay, last: lastDay };
  };

  const handleSetChartTitle = (startDate, endDate) => {
    const start = new Date(startDate).getTime() + oneDayTime;

    if (dataType === "daily" || dataType === "weekly") {
      setChartTitle(
        `${days[new Date(start).getDay()]}, ${new Date(start).getDate()} ${
          months[new Date(start).getMonth()]
        } - ${days[new Date(endDate).getDay()]}, ${new Date(
          endDate
        ).getDate()} ${months[new Date(endDate).getMonth()]}`
      );
    } else if (dataType === "monthly") {
      setChartTitle(
        `${months[new Date(start).getMonth()]}, ${new Date(
          start
        ).getFullYear()} - ${months[new Date(endDate).getMonth()]}, ${new Date(
          start
        ).getFullYear()}`
      );
    }
  };

  const getYMax = () => {
    const maxNum = Math.max(
      ...arrClicks
        .map((item) => {
          return item.total;
        })
        .concat(
          arrReach.map((item) => {
            return item.total;
          })
        )
    );

    return 10 * (parseInt(maxNum / 10) + 1.5);
  };

  useEffect(() => {
    handleSetChartTitle(startDate, endDate);
    fetchDailyClicks(startDate, endDate);
    fetchDailyReach(startDate, endDate);
  }, []);

  return (
    <Card>
      <Card.Body>
        <h3 className="d-none d-md-block fw-bold text-black">Overview</h3>
        <h4 className="d-md-none fw-bold">Overview</h4>

        {arrClicks.length > 0 ? (
          <>
            <div className="border-bottom border-2 border-light mb-2 pb-2">
              <div className="d-flex justify-content-between">
                <Nav
                  activeKey={activeTab}
                  variant="pills"
                  className="flex-nowrap mb-0"
                >
                  {dailyNavOptions.map((item, key) => (
                    <Nav.Item className="pb-1 me-1" key={key}>
                      <Nav.Link
                        eventKey={key}
                        onClick={() => toggleTab(key)}
                        className={`d-flex justify-content-center w-sm fw-bold py-1 rounded-pill text${
                          activeTab === key ? "white" : "primary"
                        } `}
                      >
                        <span>{item}</span>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <div className="d-flex justify-content-between align-items-start align-items-md-center">
                  <span className="me-2 fw-bold text-primary">
                    More Filters
                  </span>

                  <button
                    className="btn btn-primary rounded-pill py-1 fs-5 d-flex justify-content-center align-items-center"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <i className="bx bx-slider-alt pb-0"></i>
                  </button>
                </div>
              </div>

              {showFilters && (
                <Form
                  className="bg-light p-1 mt-2"
                  noValidate
                  onSubmit={handleValidSubmit}
                >
                  <Row className="m-0">
                    <Form.Group
                      className="mb-3 px-2"
                      as={Col}
                      lg="3"
                      controlId="dataType"
                    >
                      <Form.Label>Data Type</Form.Label>
                      <Form.Select
                        value={selectedType}
                        onChange={(e) => {
                          setSelectedType(e.target.value);

                          if (e.target.value === "weekly") {
                            setDateRange([
                              new Date(new Date().getFullYear(), 0, 1),
                              yesterday,
                            ]);
                          }
                        }}
                      >
                        <option className="border-none" value="daily">
                          Daily
                        </option>
                        <option className="border-none" value="weekly">
                          Weekly
                        </option>
                        <option className="border-none" value="monthly">
                          Monthly
                        </option>
                      </Form.Select>
                    </Form.Group>

                    {selectedType === "daily" && (
                      <>
                        <Col className="mb-3 px-2" lg="2">
                          <Form.Label>Start Date</Form.Label>
                          <div className="docs-datepicker">
                            <Flatpickr
                              // value={dateRange}
                              className="form-control bg-white d-block"
                              placeholder="Pick a date"
                              options={{
                                weekNumbers: true,
                                shorthandCurrentMonth: true,
                                altInput: true,
                                mode: "range",
                                maxDate: yesterday,
                                minDate: "01-01-2021",
                                defaultDate: [
                                  new Date(
                                    new Date(startDate).getTime() + oneDayTime
                                  ),
                                  new Date(endDate),
                                ],
                                locale: { firstDayOfWeek: 1 },
                                plugins: [
                                  new rangePlugin({
                                    input: "#secondDateInput",
                                  }),
                                ],
                              }}
                              onChange={(arrDates, one) =>
                                setDateRange(arrDates)
                              }
                            />
                          </div>
                        </Col>
                        <Col className="mb-3 px-2" lg="2">
                          <Form.Label>End Date</Form.Label>
                          <div className="docs-datepicker">
                            <Form.Control
                              className="bg-white"
                              id="secondDateInput"
                            />
                          </div>
                        </Col>
                      </>
                    )}

                    {selectedType === "weekly" && (
                      <>
                        <Col className="mb-3 px-2" lg="2">
                          <Form.Label>Start Date</Form.Label>
                          <div className="docs-datepicker">
                            <Flatpickr
                              // value={dateRange}
                              className="form-control bg-white d-block"
                              placeholder="Pick a date"
                              options={{
                                weekNumbers: true,
                                shorthandCurrentMonth: true,
                                altInput: true,
                                mode: "range",
                                maxDate: yesterday,
                                minDate: "01-01-2021",
                                defaultDate: [
                                  new Date(new Date().getFullYear(), 0, 1),
                                  yesterday,
                                ],
                                locale: { firstDayOfWeek: 1 },
                                plugins: [
                                  new rangePlugin({
                                    input: "#secondWeekInput",
                                  }),
                                  new weekSelectPlugin({}),
                                ],
                              }}
                              onChange={(arrDates, one) =>
                                setDateRange(arrDates)
                              }
                            />
                          </div>
                        </Col>
                        <Col className="mb-3 px-2" lg="2">
                          <Form.Label>End Date</Form.Label>
                          <div className="docs-datepicker">
                            <Form.Control
                              className="bg-white"
                              id="secondWeekInput"
                            />
                          </div>
                        </Col>
                      </>
                    )}

                    {selectedType === "monthly" && (
                      <>
                        <Col className="mb-3 px-2" lg="2">
                          <Form.Label>Start Month</Form.Label>
                          <div className="docs-datepicker">
                            <Flatpickr
                              // value={monthRange}
                              className="form-control bg-white d-block"
                              placeholder="Pick a date"
                              options={{
                                altInput: true,
                                mode: "range",
                                maxDate: new Date(),
                                minDate: "01-01-2021",
                                defaultDate: [
                                  new Date(new Date().getFullYear(), 0, 1),
                                  new Date(),
                                ],
                                locale: { firstDayOfWeek: 1 },
                                plugins: [
                                  new rangePlugin({
                                    input: "#secondMonthInput",
                                  }),
                                  new monthSelectPlugin({
                                    dateFormat: "m.y",
                                    theme: "material_blue",
                                  }),
                                ],
                              }}
                              onChange={(arrDates, one) =>
                                setMonthRange(arrDates)
                              }
                            />
                          </div>
                        </Col>
                        <Col className="mb-3 px-2" lg="2">
                          <Form.Label>End Month</Form.Label>
                          <div className="docs-datepicker">
                            <Form.Control
                              className="bg-white"
                              id="secondMonthInput"
                            />
                          </div>
                        </Col>
                      </>
                    )}

                    <Col className="d-flex align-items-center">
                      <button
                        disabled={isProcessing}
                        type="submit"
                        className="btn btn-primary save-user w-md"
                      >
                        {isProcessing ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Processing...
                          </>
                        ) : (
                          "Search"
                        )}
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>

            <ReactApexChart
              options={{
                xaxis: {
                  title: {
                    text:
                      dataType === "daily"
                        ? "Dates"
                        : dataType === "weekly"
                        ? "Dates (End of the week)"
                        : "Dates (Months)",
                  },
                  type: "datetime",
                  labels: {
                    formatter: (value, timestamp) => {
                      return moment(timestamp).format("DD MMM");
                    },
                  },
                  axisBorder: {
                    show: true,
                    color: "#ccc",
                    height: 3,
                  },
                },
                yaxis: {
                  min: 0,
                  max: getYMax(),
                },
                grid: {
                  borderColor: "#000",
                  xaxis: { lines: { show: true } },
                  yaxis: { lines: { show: true } },
                  row: { colors: ["#f8f8f8", "transparent"] },
                },
                stroke: {
                  curve: "smooth",
                  width: 2,
                },
                chart: {
                  toolbar: {
                    show: true,
                    autoSelected: "selection",
                    tools: {
                      download: `<i class='bx bxs-download fs-3' ></i>`,
                      reset: `<i class='bx bx-collapse fs-3' ></i>`,
                      zoomin: false,
                      zoomout: false,
                    },
                  },
                  zoom: {
                    autoScaleYaxis: true,
                  },
                  type: "area",
                },
                colors: ["#de864b", "#6bbd9f"],
                dataLabels: {
                  enabled: arrClicks.length < 14 ? true : false,
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                },
                title: {
                  text: chartTitle,
                  align: "left",
                },
                legend: {
                  position: "top",
                  horizontalAlign: "center",
                },
                responsive: [
                  {
                    breakpoint: 576,
                    options: {
                      title: {
                        text: "",
                      },
                      legend: {
                        show: false,
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: "Clicks",
                  data: arrClicks.map((item) => {
                    return [item.date, item.total];
                  }),
                },
                {
                  name: "Views",
                  data: arrReach.map((item) => {
                    return [item.date, item.total];
                  }),
                },
              ]}
              type="area"
              height="350"
              className="apex-charts"
            />
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <FadeLoader
              color="#de864b "
              height={30}
              width={5}
              margin={30}
              radius={100}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ClicksViewsGraph;
