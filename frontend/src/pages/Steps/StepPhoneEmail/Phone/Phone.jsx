import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit() {
        if(!phoneNumber){
            alert("Phone field is required");
            return;
        }
        if (phoneNumber.length !== 10) {
            alert("Please enter a 10-digit phone number.");
            return;
        }
        try{
            const { data } = await sendOtp({ phone: phoneNumber });
            console.log("Data from phone.jsx", data);
            dispatch(setOtp({ phone: data.phone, hash: data.hash }));
            onNext();
        }catch(err){
            const message = err.message.split(' ');
            if(message[message.length-1]=== '401')
            {
                alert("Phone field is required! ");
            }
            console.log( err.message);
        }
    }

    return (
        <Card title="Enter you phone number" icon="phone">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    );
};

export default Phone;
