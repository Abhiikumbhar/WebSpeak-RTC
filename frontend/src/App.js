import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Navigation from './components/shared/Navigation/navigation.jsx';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';

function App() {
    
    const isAuth = false;
    const user = { activated : false};
    // const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <BrowserRouter>
            <Navigation />
            {/* <Routes>                
                <GuestRoute path="/" exact>
                    <Home />
                </GuestRoute>

                <GuestRoute path="/authenticate">
                    <Authenticate />
                </GuestRoute>

                <SemiProtectedRoute path="/activate">
                    <Activate />
                </SemiProtectedRoute>

                <ProtectedRoute path="/rooms">
                    <Rooms />
                </ProtectedRoute>
            </Routes> */}
            {
                isAuth ? (
                    <Routes>
                        <Route path='/rooms' Component={Rooms}></Route>
                        {/* <Route path="*" element={<Navigate to={"/rooms"}/>}/> */}
                    </Routes>
                ) : (
                    <Routes>
                        <Route path='/authenticate' Component={Authenticate}></Route>
                        <Route path='/' Component={<Home />} exact></Route>
                    </Routes>
                )
            }
            {
                !isAuth ?(
                    <Routes>
                        <Route path='/' Component={Home} exact></Route>
                    </Routes>
                ) : isAuth && !user.activated ? (
                    <Routes>
                        <Route path='/activate' Component={Activate}></Route>
                    </Routes>
                ):(
                    <Routes>
                        <Route path='/rooms' Component={Rooms}></Route>
                    </Routes>
                )
            }
            {
                !isAuth ?(
                    <Routes>
                        <Route path='/' Component={Home}></Route>
                    </Routes>
                ):isAuth && !user.activated ? (
                    <Routes>
                        <Route path='/activate' Component={Activate}></Route>
                    </Routes>
                ):(
                    <Routes>
                        <Route path='/rooms' Component={Rooms}></Route>
                    </Routes>
                )
            }
        </BrowserRouter>
    );
};// GuestRoute SemiprotecteRoute this are the components

const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Routes>
            <Route
                {...rest}
                render={({ location }) => {
                    return isAuth ? (
                        <Navigate
                            to={{
                                pathname: '/rooms',
                                state: { from: location },
                            }}
                        />
                    ) : (
                        children
                    );
                }}
            ></Route>
        </Routes>
    );
}; // in this code childrean and rest are the props
//Props in JavaScript are a way to pass data from one component to another.
//render is the one type of the method

const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Navigate
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user.activated ? (
                    children
                ) : (
                    <Navigate
                        to={{
                            pathname: '/rooms',
                            state: { from: location },
                        }}
                    />
                );
            }}
        ></Route>
    );
}; //Redirect Component basically teks the object

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Navigate
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !user.activated ? (
                    <Navigate
                        to={{
                            pathname: '/activate',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

export default App;
