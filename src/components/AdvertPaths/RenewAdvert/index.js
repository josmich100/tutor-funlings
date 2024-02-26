import React, { useState } from 'react';
import PackageSelect from './PackageSelect';
import AdSummary from '../AdSummary';
import Payments from '../Payments';


const RenewAdMain = ({ setModalTitle, adProfile, closeModal }) => {

  const [step, setstep] = useState(0);
  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState([]);

  const handleNext = () => {
    if (step + 1 === 1) {
      setModalTitle('Advert Summary & Estimate Preview');
    }
    else if (step + 1 === 2) {
      setModalTitle('Payment');
    }
    setstep(step + 1);
  };

  const handleBack = () => {
    setModalTitle('Advert Summary & Estimate Preview');
    setstep(step - 1);
  };


  return (
    <div className="h-100 position-relative">
      {step === 0 &&
        <PackageSelect
          adProfile={adProfile}
          step1Data={step1Data}
          handleNext={() => handleNext()}
        />
      }
      {step === 1 &&
        <AdSummary
          renewalID={step1Data[0]?.renewalID}
          adProfile={step1Data[0]?.state}
          step2Data={step2Data}
          handleNext={() => handleNext()}
        />
      }
      {step === 2 &&
        <Payments
          renewalID={step1Data[0]?.renewalID}
          closeModal={() => closeModal()}
          step2Data={step2Data}
          handleBack={() => handleBack()}
        />
      }
    </div>
  );
};

export default RenewAdMain;
