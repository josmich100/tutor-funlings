import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
  Table,
} from "react-bootstrap";

//Simple bar
import SimpleBar from "simplebar-react";

import avatar1 from "../../../assets/images/avatar-1.jpg";

const ClassRanks = ({ user }) => {
  const [activeTab, setactiveTab] = useState("1");

  return (
    <React.Fragment>
      {" "}
      <Col>
        <Card className="p-3">
          <CardBody>
            <h4 className="card-title mb-4">Class Leaderboard</h4>

            <TabContent activeTab={activeTab} className="mt-4">
              <TabPane tabId="1">
                <SimpleBar style={{ maxHeight: "330px" }}>
                  <Row className="align-items-center justify-content-center rounded py-2 m-1 border border-secondary">
                    <Col xs="2">
                      <div className="text-muted small">#1</div>
                    </Col>
                    <Col xs="7">
                      <Row className="align-items-center">
                        <Col>
                          <img
                            src={avatar1}
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </Col>
                        <Col xs="8">
                          <p className="font-size-4 mb-1">
                            <b>{user?.username}</b>
                          </p>
                          <p className="text-muted small mb-0">Grade 5</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="3">
                      <div className="text-end">
                        <p className="text-muted font-size-2 mb-0">4400</p>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                      <tbody>
                        <tr className="border border-secondary rounded my-1">
                          <td style={{ width: "50px" }}>
                            <div className="text-muted">#1</div>
                          </td>
                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">
                                Ahmed Mohammed
                              </h5>
                              <p className="text-muted mb-0">Grade 5</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                4400
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr className="border border-secondary rounded my-1">
                          <td>
                            <div className="text-muted">#2</div>
                          </td>
                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Seth Otieno</h5>
                              <p className="text-muted mb-0">Grade 6</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                2500
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr className="border border-secondary rounded my-1">
                          <td>
                            <div className="text-muted">
                              <div className="text-muted">#3</div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Tana Munene</h5>
                              <p className="text-muted mb-0">Grade 5</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                2200
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr className="border border-secondary rounded my-1">
                          <td>
                            <div className="text-muted">#4</div>
                          </td>
                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">
                                George Ondari
                              </h5>
                              <p className="text-muted mb-0">Grade 4</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                1800
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr className="border border-secondary rounded my-1">
                          <td>
                            <div className="text-muted">#5</div>
                          </td>
                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">
                                Tabitha Njeri
                              </h5>
                              <p className="text-muted mb-0">Grade 6</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                1400
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr className="rounded border border-secondary my-1">
                          <td style={{ width: "50px" }}>
                            <div className="text-muted">#6</div>
                          </td>
                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Ruth Kimani</h5>
                              <p className="text-muted mb-0">Grade 6</p>
                            </div>
                          </td>
                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                1200
                              </h5>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </SimpleBar>
              </TabPane>

              <TabPane tabId="2">
                <SimpleBar style={{ maxHeight: "330px" }}>
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                      <tbody>
                        <tr>
                          <td style={{ width: "50px" }}>
                            <div className="text-muted">
                              <i className="bx bx-up-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Sell ETH</h5>
                              <p className="text-muted mb-0">15 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $112.34
                              </h5>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: "50px" }}>
                            <div className="text-muted">#2</div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy BTC</h5>
                              <p className="text-muted mb-0">14 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $125.20
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">#2</div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy ETH</h5>
                              <p className="text-muted mb-0">17 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.42 ETH</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $84.32
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">
                              <i className="bx bx-down-arrow-circle" />
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy LTC</h5>
                              <p className="text-muted mb-0">16 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">1.88 LTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $94.22
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ width: "50px" }}>
                            <div className="text-muted">
                              <i className="bx bx-down-arrow-circle" />
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy BTC</h5>
                              <p className="text-muted mb-0">14 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $125.20
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">
                              <i className="bx bx-up-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Sell BTC</h5>
                              <p className="text-muted mb-0">18 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.018 BTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $145.80
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">
                              <i className="bx bx-up-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Sell ETH</h5>
                              <p className="text-muted mb-0">15 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $112.34
                              </h5>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </SimpleBar>
              </TabPane>

              <TabPane tabId="3">
                <SimpleBar style={{ maxHeight: "330px" }}>
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                      <tbody>
                        <tr>
                          <td style={{ width: "50px" }}>
                            <div className="text-muted">
                              <i className="bx bx-down-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy BTC</h5>
                              <p className="text-muted mb-0">14 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $125.20
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">
                              <i className="bx bx-down-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy LTC</h5>
                              <p className="text-muted mb-0">16 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">1.88 LTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $94.22
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">
                              <i className="bx bx-down-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy ETH</h5>
                              <p className="text-muted mb-0">17 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.42 ETH</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $84.32
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">#1</div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Sell ETH</h5>
                              <p className="text-muted mb-0">15 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $112.34
                              </h5>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="text-muted">#1</div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Sell BTC</h5>
                              <p className="text-muted mb-0">18 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.018 BTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $145.80
                              </h5>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="text-muted">#1</div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Sell ETH</h5>
                              <p className="text-muted mb-0">15 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $112.34
                              </h5>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div className="text-muted">
                              <i className="bx bx-down-arrow-circle"></i>
                            </div>
                          </td>

                          <td>
                            <div>
                              <h5 className="font-size-14 mb-1">Buy BTC</h5>
                              <p className="text-muted mb-0">14 Mar, 2020</p>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                            </div>
                          </td>

                          <td>
                            <div className="text-end">
                              <h5 className="font-size-14 text-muted mb-0">
                                $125.20
                              </h5>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </SimpleBar>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default ClassRanks;
