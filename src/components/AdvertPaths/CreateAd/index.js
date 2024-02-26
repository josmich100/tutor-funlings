import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import CreateNew from "./CreateNew";
import AdSummary from "../AdSummary";
import Payments from "../Payments";


const CreateAd = props => {

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Create New');

  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState([]);
  const [step, setStep] = useState(0);

  const getInitialStates = () => {
    setStep1Data([]);
    setStep2Data([]);
    setModalTitle('Create New');
    setShowModal(false);
    setStep(0);
  };

  const handleNext = () => {
    if (step + 1 === 1) {
      setModalTitle('Advert Summary & Estimate Preview');
    }
    else if (step + 1 === 2) {
      setModalTitle('Payment');
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setModalTitle('Advert Summary & Estimate Preview');
    setStep(step - 1);
  };


  return (
    <React.Fragment>
      <button
        className="btn btn-primary w-sm rounded-pill d-flex align-items-center justify-content-center me-1"
        onClick={() => setShowModal(true)}
      >
        <i className="bx bxs-file-plus fs-5 me-1" />
        Create Advert
      </button>

      <Modal
        backdrop='static'
        size="lg"
        centered
        enforceFocus={false}
        animation
        show={showModal}
        onHide={() => {
          setShowModal(false);
          getInitialStates();
        }}
        restoreFocus={false}
        fullscreen='lg-down'
      >
        <div className="modal-content">
          <Modal.Header closeButton>
            <span className='h3 text-dark'>{modalTitle}</span>
          </Modal.Header>
          <Modal.Body as="div" className="px-3 h-100 position-relative">
            {step === 0 &&
              <CreateNew
                step1Data={step1Data}
                closeModal={() => {
                  setShowModal(false);
                  getInitialStates();
                }}
                handleNext={() => handleNext()}
              />
            }
            {step === 1 &&
              <AdSummary
                adProfile={step1Data[0].state}
                step2Data={step2Data}
                handleNext={() => handleNext()}
              />
            }
            {step === 2 &&
              <Payments
                closeModal={() => {
                  setShowModal(false);
                  getInitialStates();
                }}
                step2Data={step2Data}
                handleBack={() => handleBack()}
              />
            }
          </Modal.Body>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(CreateAd);
