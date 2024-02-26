import ProgressComp from "paths/Dashboard/ProgressComp";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import OngoingModule from "./OngoingModule";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { get, ref } from "firebase/database";
import { getFirebaseBackend } from "helpers/firebase_helper";

const Lessons = (props) => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalcategory, setModalcategory] = useState(false);

  const [selectedDay, setSelectedDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const onDrag = (event) => {
    event.preventDefault();
  };
  const handleEventClick = (arg) => {
    const event = arg.event;
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    });
    setIsEdit(true);
    toggle();
  };
  const dispatch = useDispatch();
  const { events, categories } = useSelector((state) => ({
    events: state.calendar.events,
    categories: state.calendar.categories,
  }));
  const onDrop = (event) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const draggedElclass = draggedEl.className;
    if (
      draggedEl.classList.contains("external-event") &&
      draggedElclass.indexOf("fc-event-draggable") == -1
    ) {
      const modifiedData = {
        id: Math.floor(Math.random() * 100),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
      dispatch(onAddNewEvent(modifiedData));
    }
  };
  const handleDateClick = (arg) => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    toggle();
  };
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const checkProfile = async () => {
    const firebaseBackend = getFirebaseBackend();

    // Access the auth property
    const authInstance = firebaseBackend.auth;
    const dbInstance = firebaseBackend.db;
    const currUser = authInstance.currentUser;

    console.log(currUser);

    if (currUser) {
      const profileRef = ref(dbInstance, `student/profiles/${currUser.uid}`);
      const snapshot = await get(profileRef);
      const profile = snapshot.val();
      console.log(profile);
      if (profile) {
        setHasProfile(true);
        setUserProfile(profile);
      } else {
        //setHasProfile(false)

        return <Redirect to="/profile" />;
      }
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <div className="page-content">
        <Container fluid={true}>
          <ProgressComp user={userProfile} />
          <OngoingModule />
        </Container>
      </div>
    </React.Fragment>
  );
};

Lessons.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
};

export default Lessons;
