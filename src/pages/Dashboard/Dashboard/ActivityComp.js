import React from "react";
import { Button, Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";

const ActivityComp = () => {
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="py-4">
          <CardTitle className="mb-3">Lessons</CardTitle>

          <div>
            <div>Operators</div>
            <div>
              <b>6:00 pm EAT, Wed, 22 Oct, 2023</b>
            </div>

            <div className="flex-row">
              <Button
                type="button"
                color="danger"
                className="btn-sm my-2 me-2"
                // onClick={handleJoinClass}
              >
                Join class
              </Button>
              <Button
                type="button"
                color="transparent"
                className="btn-sm text-danger my-2 me-2"
                // onClick={handleRescheduleClass}
              >
                Reschedule class
              </Button>
            </div>
          </div>

          <div className="my-3 border border-1 border-secondary"></div>

          <div>
            <Row>
              <Col className="h4">41</Col>
              <Col className="">Upcoming</Col>
            </Row>
            <div className="small text-muted my-2">
              Attend classes on time to earn 820 points
            </div>
          </div>

          <div className="my-3 border border-1 border-secondary"></div>

          <div>
            <div>Free doubt session</div>
            <div className="small text-muted my-2">
              If you have any question related to coding lessons, project, or
              anything else, you can join a doubt session with an expert
              Computer Science teacher. <br /> It comes free with your course.
            </div>
            <Button
              type="button"
              color="danger"
              outline
              className="btn-sm my-1 me-2"
              // onClick={handleJoinDoubtSession}
            >
              Join doubt session
            </Button>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
// ActivityComp.propTypes = {
//   t: PropTypes.any,
// }
export default ActivityComp;
