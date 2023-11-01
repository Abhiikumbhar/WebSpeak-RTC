import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

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

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>Codershouse</span>
            </Link>
        </nav>
    );
};

export default Navigation;

//The nav element creates the navigation bar. The container class from the CSS module is applied to the navigation bar to give it a consistent width and padding.

//The Link component creates a link to the home page. The style prop is used to apply the brandStyle styles to the link.

//The img element displays the logo image. The alt prop provides a text alternative for the image for users who cannot see the image.