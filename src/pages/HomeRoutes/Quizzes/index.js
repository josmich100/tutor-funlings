import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  PaginationItem,
  PaginationLink,
  Row,
} from "react-bootstrap";
// import { withRouter } from "react-router-dom"
import { map } from "lodash";

//Import Breadcrumb
// import Breadcrumbs from "components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";

import { getProjects as onGetProjects } from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
const projector = [
  {
    id: 0,
    img: "img1",
    name: "Scratch",
    description: "Scratch program basics",
    status: "Completed",
    color: "success",
    dueDate: "15 Oct, 23",
    commentsCount: 214,
    team: [
      // {
      //   id: 1,
      //   img: "avatar4",
      //   fullname: "Janice Cole",
      //   skills: [
      //     { id: 1, name: "Frontend" },
      //     { id: 2, name: "UI" },
      //   ],
      // },
      // {
      //   id: 2,
      //   img: "avatar5",
      //   fullname: "Steve Foster",
      //   skills: [{ id: 1, name: "UI/UX" }],
      // },
      // {
      //   id: 3,
      //   img: "Null",
      //   name: "A",
      //   color: "success",
      //   fullname: "Aeffrey Walker",
      //   skills: [{ id: 1, name: "Backend" }],
      // },
      // {
      //   id: 4,
      //   img: "avatar2",
      //   fullname: "Daniel Candles",
      //   skills: [
      //     { id: 1, name: "Frontend" },
      //     { id: 2, name: "UI" },
      //   ],
      // },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      {
        name: "Funlings Entertainment Landing.Zip",
        size: "3.25 MB",
        link: "#",
      },
      { name: "Funlings Entertainment Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Funlings Entertainment Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 1,
    img: "img2",
    name: "Javascript",
    description: "Funlings Landing page",
    status: "Pending",
    color: "warning",
    dueDate: "22 Oct, 23",
    commentsCount: 183,
    team: [
      // { id: 1, img: "avatar8" },
      // { id: 2, img: "avatar2", fullname: "Daniel Candles" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      {
        name: "Funlings Entertainment Landing.Zip",
        size: "3.25 MB",
        link: "#",
      },
      { name: "Funlings Entertainment Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Funlings Entertainment Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
];

const Quizzes = (props) => {
  //meta title
  document.title = "Quizzes | Funlings Entertainment";

  const dispatch = useDispatch();

  const { projects } = useSelector((state) => ({
    projects: state.projects.projects,
  }));

  const [page, setPage] = useState(1);
  const [totalPage] = useState(5);

  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  const handlePageClick = (page) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Quizzes" breadcrumbItem="Quizzes Grid" /> */}

          <Row>
            {/* Import Cards */}
            <CardProject projects={projector} />
          </Row>

          <Row>
            <Col lg="12">
              <ul className="pagination pagination-rounded justify-content-center mt-2 mb-5">
                <PaginationItem disabled={page === 1}>
                  <PaginationLink
                    previous
                    href="#"
                    onClick={() => handlePageClick(page - 1)}
                  />
                </PaginationItem>
                {map(Array(totalPage), (item, i) => (
                  <PaginationItem active={i + 1 === page} key={i}>
                    <PaginationLink
                      onClick={() => handlePageClick(i + 1)}
                      href="#"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={page === totalPage}>
                  <PaginationLink
                    next
                    href="#"
                    onClick={() => handlePageClick(page + 1)}
                  />
                </PaginationItem>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Quizzes.propTypes = {};

export default Quizzes;
