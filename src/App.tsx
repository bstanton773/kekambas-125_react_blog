import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import Navigation from "./components/Navigation";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} handleClick={handleLoginClick} />
            <Container>
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} />} />
                </Routes>
            </Container>
        </div>
    )
}
