import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../http';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Tooltip = ({ text, children }) => {
    return (
      <div className={styles.tooltipContainer}>
        {children}
        <span className={styles.tooltip}>{text}</span>
      </div>
    );
  };
  
const Navigation = () => {
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };
    const history = useHistory();
    const dispatch = useDispatch();
    const [isUser, setUser]= useState(true);

    useEffect(function(){
        if(!isUser){
            history.push('/')
        }
    },[isUser])

    const { isAuth, user } = useSelector((state) => state.auth);
    async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
            setUser(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        user && <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>WebSpeak</span>
            </Link>
            {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user?.avatar
                                    ? user?.avatar
                                    : '/images/monkey-avatar.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <Tooltip text="Logout">
                        <img src="/images/logout.png" alt="logout" />
                        </Tooltip>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navigation;