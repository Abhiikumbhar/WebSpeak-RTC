import React from 'react'; //This line imports the React library.

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
//const StepPhoneEmail = ({ onNext }) => { - This line defines a React component called StepPhoneEmail