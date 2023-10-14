import React, { useState } from 'react';
import styles from './Register.module.css';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../Steps/StepOtp/StepOtp';
import StepName from '../Steps/StepName/StepName';
import StepAvatar from '../Steps/StepAvatar/StepAvatar';
import StepUsername from '../Steps/StepUsername/StepUsername';

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUsername,
};

const Register = () => {
    const [step, setStep] = useState(1); // it is local state .... {useState(1) - it shows bydefault first stape}

    const Step = steps[step]; // Step is the variable

    function onNext() {
        setStep(step + 1);
    }

    return (
        <div>
            <Step onNext={onNext} />
        </div>
    );
};

export default Register;


//const [step, setStep] = useState(1); - This line declares a state variable called step. The state variable is used to track the current step
//const Step = steps[step]; - This line declares a variable called Step. The Step variable is set to the React componen
//<Step onNext={onNext} /> - This line renders the Step component. The onNext prop is passed to the Step component from StepPhoneEmail