import React from 'react';

const StepPhoneEmail = ({ onNext }) => {
    return (
        <>
            <div>Phone or Email component</div>
            <button onClick={onNext}>Next</button>
        </>
    );
};

export default StepPhoneEmail;

// in this code <>  </> it is called single parent
//onNext is one function which is pass in to StepPhoneEmail.