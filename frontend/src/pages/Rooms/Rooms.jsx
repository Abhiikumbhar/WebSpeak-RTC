import React, { useState, useEffect } from 'react';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import JoinRoom from '../../components/AddRoomModal/JoinRoom';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './Rooms.module.css';
import { getAllRooms } from '../../http';


const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    const [openJoinModal, setJoinModal] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms();
            // console.log(data);
            const joinable = data.filter(data=>data.roomType === 'open' || data.roomType === "social")
            setRooms(joinable);
        };
        fetchRooms();
    }, []);
    function openModal() {
        setShowModal(true);
    }
    function openJoin() {
        setJoinModal(true);
    }
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        {/* <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" />
                            <input type="text" className={styles.searchInput} />
                        </div> */}
                    </div>
                    <div className={styles.right}>
                        <button className={styles.startRoomButton} onClick={openJoin} >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Join Room</span>
                        </button>
                        <button
                            onClick={openModal}
                            className={styles.startRoomButton}
                        >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
            {openJoinModal && <JoinRoom onClose={() => setJoinModal(false)} />}
        </>
    );
};

export default Rooms;
