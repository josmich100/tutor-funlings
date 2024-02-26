import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { withRouter } from "react-router-dom"

//Import Breadcrumb

//Import Cards

import { getProjects as onGetProjects } from "store/actions";

//redux
import { useDispatch, useSelector } from "react-redux";
import QuizModule from "./QuizModule";
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
      {" "}
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
