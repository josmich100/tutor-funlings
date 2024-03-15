import React from "react";
import { Card, CardBody, Col, Row, Table } from "react-bootstrap";

//Import Images

function VideosCard(props) {
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card className="p-1">
            <CardBody>
              <h5 className="mb-4">Pending class videos</h5>

              <Row>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Lesson</th>
                      <th>Class time</th>
                      <th>Student name</th>
                      <th>Grade</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Building and working of applications</td>
                      <td>07:00 PM EAT, Sun Dec 17</td>
                      <td>Seby</td>
                      <td>Grade 5</td>
                      <td>
                        <a href="#" className="text-danger h6">
                          Upload video
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Building and working of applications</td>
                      <td>08:30 PM EAT, Sat Dec 16</td>
                      <td>Seby</td>
                      <td>Grade 5</td>
                      <td>
                        <a href="#" className="text-danger h6">
                          Upload video
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* <Col lg="4" className="d-none d-lg-block">
                  <div className="clearfix mt-4 mt-lg-0">
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu)
                      }}
                      className="float-end"
                    >
                      <DropdownToggle tag="button" className="btn btn-primary">
                        <i className="bx bxs-cog align-middle me-1" /> Setting
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Action</DropdownItem>
                        <DropdownItem href="#">Another action</DropdownItem>
                        <DropdownItem href="#">Something else</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col> */}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default VideosCard;
