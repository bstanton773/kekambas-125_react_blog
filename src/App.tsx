import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import Navigation from "./components/Navigation";
import UserType from './types/auth';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null);

    const logUserIn = (user:Partial<UserType>):void => {
        setIsLoggedIn(true);
        setLoggedInUser(user);
    }

    const logUserOut = (): void => {
        setIsLoggedIn(false);
        setLoggedInUser(null)
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} handleClick={logUserOut} />
            <Container>
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} user={loggedInUser} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} />} />
                </Routes>
            </Container>
        </div>
    )
}
