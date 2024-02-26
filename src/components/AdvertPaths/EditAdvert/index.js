import React, { useState } from 'react';
import EditProfile from './EditProfile';
import AdSummary from '../AdSummary';
import Payments from '../Payments';
import EdtImages from './EdtImages';


const EditAdvert = ({ setTitle, adProfile, closeModal }) => {

  const [step, setstep] = useState(0);
  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState([]);

  const handleNext = () => {
    if (step + 1 === 1) {
      setTitle(`Edit Images for '${adProfile.productName}'`);
    }
    if (step + 1 === 2) {
      setTitle('Advert Summary & Estimate Preview');
    }
    else if (step + 1 === 3) {
      setTitle('Payment');
    }
    setstep(step + 1);
  };

  const handleBack = () => {
    setTitle('Advert Summary & Estimate Preview');
    setstep(step - 1);
  };


  return (
    <div className="pt-3 h-100 position-relative">
      {step === 0 &&
        <EditProfile
          adProfile={adProfile}
          step1Data={step1Data}
          handleNext={() => handleNext()}
        />
      }
      {step === 1 &&
        <EdtImages
          adProfile={step1Data[0].state}
          handleNext={() => handleNext()}
        />
      }
      {step === 2 &&
        <AdSummary
          adProfile={step1Data[0].state}
          step2Data={step2Data}
          handleNext={() => handleNext()}
        />
      }
      {step === 3 &&
        <Payments
          closeModal={() => closeModal()}
          step2Data={step2Data}
          handleBack={() => handleBack()}
        />
      }
    </div>
  );
};

export default EditAdvert;
