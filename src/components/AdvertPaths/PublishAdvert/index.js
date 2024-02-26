import React, { useState } from 'react';
import AdSummary from '../AdSummary';
import Payments from '../Payments';


const PublishAdMain = ({ setModalTitle, adProfile, closeModal }) => {

  const [step, setstep] = useState(0);
  const [step2Data, setStep2Data] = useState([]);

  const handleNext = () => {
    setModalTitle('Payment');
    setstep(step + 1);
  };

  const handleBack = () => {
    setModalTitle('Advert Summary & Estimate Preview');
    setstep(step - 1);
  };


  return (
    <div className="h-100 position-relative">
      {step === 0 &&
        <AdSummary
          adProfile={adProfile}
          step2Data={step2Data}
          handleNext={() => handleNext()}
        />
      }
      {step === 1 &&
        <Payments
          closeModal={() => closeModal()}
          step2Data={step2Data}
          handleBack={() => handleBack()}
        />
      }
    </div>
  );
};

export default PublishAdMain;
