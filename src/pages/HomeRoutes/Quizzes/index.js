import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { withRouter } from "react-router-dom"

//Import Breadcrumb

//Import Cards

import QuizModule from "./QuizModule";

const Quizzes = (props) => {
  //meta title
  document.title = "Quizzes | Funlings Entertainment";

  // const dispatch = useDispatch();

  // const { projects } = useSelector((state) => ({
  //   projects: state.projects.projects,
  // }));

  // const [page, setPage] = useState(1);
  // const [totalPage] = useState(5);

  // useEffect(() => {
  //   dispatch(onGetProjects());
  // }, [dispatch]);

  // const handlePageClick = (page) => {
  //   setPage(page);
  // };

  return (
    <React.Fragment>
 
      <div className="page-content">
        <Container fluid>
          <QuizModule />
        </Container>
      </div>
    </React.Fragment>
  );
};

Quizzes.propTypes = {};

export default Quizzes;
