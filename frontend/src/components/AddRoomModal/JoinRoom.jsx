import { useEffect, useState } from 'react';
import styles from './JoinRoom.module.css';
import {  getAllRooms } from '../../http';
import { useHistory } from 'react-router-dom';
import TextInput from '../shared/TextInput/TextInput';

function JoinRoom({ onClose }) {
    const history = useHistory();

    const [rooms,setRooms] = useState();
    useEffect(function () {
        async function fetchRooms() {
            const {data} = await getAllRooms();
            setRooms(data);
            
        }
        fetchRooms()
    },[])
    console.log(rooms);
    const [id, setId] = useState('');

    return <div className={styles.modalMask}>
        <div className={styles.modalBody}>
            <button onClick={onClose} className={styles.closeButton}>
            <img src="/images/close.png" alt="close" />
            </button>
            <div className={styles.modalHeader}>
                <h2 >Enter Private Unique Id </h2>
                <TextInput
                    type='text' 
                    placeholder='Enter the unique id' 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                />
            </div>
            <div className={styles.modalFooter}>
                <button
                    onClick={() => {
                        const curId = rooms.find(room=> room.id === id);
                        if(curId){
                            history.push(`/room/${id}`);
                        }    
                    else{
                        alert("Incorrect Id")
                    }
                    }}
                    className={styles.footerButton}
                >
                    <span>Join Room</span>
                </button>
            </div>
            
        </div>
    </div>
}
export default JoinRoom;