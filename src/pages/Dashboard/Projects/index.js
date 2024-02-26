import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

//Import Images
// import avatar4 from "../../assets/images/users/avatar-4.jpg"
// import avatar5 from "../../assets/images/users/avatar-5.jpg"
// import avatar1 from "../../../assets/images/avatar-1.png"
// import avatar2 from "../../assets/images/users/avatar-2.jpg"
// import avatar6 from "../../assets/images/users/avatar-6.jpg"
// import avatar3 from "../../assets/images/users/avatar-3.jpg"
// import avatar8 from "../../assets/images/users/avatar-8.jpg"
// import avatar7 from "../../assets/images/users/avatar-7.jpg"

import { getTasks as onGetTasks } from "../../store/tasks/actions";

//redux
import { useDispatch, useSelector } from "react-redux";
import ProjectComp from "./ProjectComp";
import ProjectModule from "./ProjectModule";

const projects = [
  {
    age_group: "7 - 10 Years",
    email: "stacie16708@gmail.com",
    language: "scratch",
    name: "Sheena Allison Zahra",
    platform: "scratch",
    project_description:
      "This project is a creation of a calculator aimed at solving mathematical problems of addition,subtraction,multiplication and division.it aims at making the above easier to solve and faster to solve saving time and effort.",
    project_link: "https://scratch.mit.edu/projects/903737651",
    project_name: "calculator project final sheena allison zahra",
  },
  {
    age_group: "7 - 10 Years",
    email: "smochama24@gmail.com",
    language: "Scratch",
    name: "Sammy Davies",
    platform: "Scratch",
    project_description: "Smart piggy bank to help children know how to save ",
    project_link: "https://mail.google.com/mail/u/0/#inbox",
    project_name: "smart piggy bank",
  },
  {
    age_group: "7 - 10 Years",
    email: "mbithejenny22@gmail.com",
    language: "Scratch",
    name: "Rayner Mwaura",
    platform: "Scratch",
    project_description:
      "A superhero (Prince) who protects a child (Ben) from danger, he swoops to save the poor child.\nThe child represents school going children like Ben who need to be protected by good people like the superhero Prince,police,teachers,parents from evil civilians like the witch,thieves,Rapist,Killers,Buglers,Bullies and others.\nDo you think he will be able to defeat the villans? Play to find out\n",
    project_link: "https://scratch.mit.edu/projects/904829035",
    project_name: "Protect the child;Superhero Vr2.0",
  },
  {
    age_group: "7 - 10 Years",
    email: "mbithejenny22@gmail.com",
    language: "Scratch",
    name: "Rayner Mwaura",
    platform: "Scratch",
    project_description:
      "A superhero (Prince) who protects a child (Ben),he swoops into save the poor child from evil villans .Press spacebar to shoot,up and down arrow key to move the superhero.Play to find out the whole story.",
    project_link: "https://scratch.mit.edu/projects/904829035",
    project_name: "Protect the child;Superhero Vr2.0",
  },
  {
    age_group: "7 - 10 Years",
    email: "smochama24@gmail.com",
    language: "Python ",
    name: "Arthur  Mochama ",
    platform: "Vs code",
    project_description: "Hi ",
    project_link: "https://funlings-ent.com/#/submit",
    project_name: "Test",
  },
  {
    age_group: "7 - 10 Years",
    email: "mbithejenny22@gmail.com",
    language: "Scratch",
    name: "Rayner Mwaura",
    platform: "Scratch",
    project_description:
      "A superhero (Prince)  protects a child (Ben) from danger,he swoops in to save the poor scared child from evil villans,use the space bar button to shoot,up and down arrow keys to move the superhero.Do you think the super hero will be able to defeat the villans? Play to find out",
    project_link: "https://scratch.mit.edu/projects/904829035",
    project_name: "Protect the child;Superhero Vr2.0",
  },
  {
    age_group: "11 - 14 Years",
    email: "liam.amit.shah@gmail.com",
    language: "Scratch",
    name: "Liam Shah",
    platform: "Scratch",
    project_description:
      "One of the biggest challenges I have noticed that young children face today is eye development and coordination due to the increase in screen time and gadget use. I and 2 of my close friends have developed myopia and my brother has been having visual tracking and coordination problems for the last year. Since screen time and gadgets are not going anywhere, I thought we could make good use of the time we spend online starting with this exercise game I have developed to help make eye muscles and coordination stronger.",
    project_link: "https://scratch.mit.edu/projects/904889019",
    project_name: "drEYEving",
  },
];

const Projects = (props) => {
  //meta title
  document.title = "Projects | Funlings Entertainment Student Dashoard";

  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => ({
    tasks: state.tasks.tasks,
  }));

  useEffect(() => {
    dispatch(onGetTasks());
  }, [dispatch]);

  const recentTasks = tasks.find((task) => task.title === "Recent Tasks");

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
