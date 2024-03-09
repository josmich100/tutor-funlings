import React, { useState } from "react";

import { Button, Card, CardBody } from "react-bootstrap";

// react-circular-progressbar

const ProjectComp = () => {
  const [activeTab, setactiveTab] = useState("1");

  return (
    <React.Fragment>
      {" "}
      <Card className="text-center">
        <CardBody>
          <h4>
            Congratulations! Your project "Adventures World!" has been reviewed
            by the teacher.
          </h4>
          <Button
            type="button"
            color="danger"
            className="btn-sm my-2 me-2"
            // onClick={handleViewProject}
          >
            View project detail
          </Button>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ProjectComp;
