import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Navigation from './components/shared/Navigation/navigation.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login';

function App() {
    return (
        <BrowserRouter>

            <Navigation />

            <Routes>

                <Route path="/" element={<Home/>}>
                    {/* <Home /> */}
                </Route>

                <Route path="/register" element={<Register/>}>
                    {/* <Register /> */}
                </Route>

                <Route path="/login" element={<Login/>}>
                    {/* <Login /> */}
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
