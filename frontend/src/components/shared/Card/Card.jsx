import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, icon, children }) => {
    return (
        <div className={styles.card}>

            <div className={styles.headingWrapper}>

                <img src={`/images/${icon}.png`} alt="logo" />

                <h1 className={styles.heading}>{title}</h1>

            </div>

            {children} 

        </div>
    );
};

export default Card;


//on this page {childrean} - we can injecting this children in all the other pages and in this code we can passthe title , icon and childrenn as a props for getting the input data ... for passing content of card we use chidren object