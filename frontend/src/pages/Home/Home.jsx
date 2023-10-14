import React from 'react';
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    const navigate = useNavigate();
    function startRegister() {
        navigate('/register');
    }
    return (
        <div className={styles.cardWrapper}>

            <Card title="Welcome to Codershouse!" icon="logo">

                <p className={styles.text}>
                    We’re working hard to get Codershouse ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>

                <div>
                    <Link style={signInLinkStyle} to="/register">
                        <Button onClick={startRegister} text="Get your username" />
                    </Link>
                    
                </div>

                <div className={styles.signinWrapper}>

                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>

                    <Link style={signInLinkStyle} to="/login">
                        Sign in
                    </Link>

                </div>

            </Card>

        </div>
    );
};

export default Home;


// on this page [const signInLinkStyle] this is object for styling link component..

// or in inline css we can pass the parameter as a string... 

//<Button onClick={startRegister} text="Get your username" />- in this sentence sartRegister is the function and it is called in onlick action which is present in button.jsx... and here button is the component

//onClick={startRegister} this function we get as a prop from Button.jsx

//for redirecting history hock is used and it get in the router dom

//const history = useHistory(); --- from this statement history can be redirect into the function