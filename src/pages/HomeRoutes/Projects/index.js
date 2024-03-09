import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

//Import Images
// import avatar4 from "../../assets/images/users/avatar-4.jpg"
// import avatar5 from "../../assets/images/users/avatar-5.jpg"
// import avatar1 from "../../../assets/images/avatar-1.jpg"
// import avatar2 from "../../assets/images/users/avatar-2.jpg"
// import avatar6 from "../../assets/images/users/avatar-6.jpg"
// import avatar3 from "../../assets/images/users/avatar-3.jpg"
// import avatar8 from "../../assets/images/users/avatar-8.jpg"
// import avatar7 from "../../assets/images/users/avatar-7.jpg"

import ProjectComp from "./ProjectComp";
import ProjectModule from "./ProjectModule";

const Projects = (props) => {
  //meta title
  document.title = "Projects | Funlings Entertainment Teacher Dashoard";

  // const dispatch = useDispatch();

  // const { tasks } = useSelector((state) => ({
  //   tasks: state.tasks.tasks,
  // }));

  // useEffect(() => {
  //   dispatch(onGetTasks());
  // }, [dispatch]);

  // const recentTasks = tasks.find((task) => task.title === "Recent Tasks");

  return (
    <React.Fragment>
      {" "}
      <div className="page-content">
        <Container fluid>
          <ProjectComp />
          <ProjectModule />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Projects);
