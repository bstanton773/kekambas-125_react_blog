import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import AlertMessage from './components/AlertMessage';
import Navigation from "./components/Navigation";
import CategoryType from './types/category';
import UserType from './types/auth';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null);

    const [message, setMessage] = useState<string|null>(null);
    const [category, setCategory] = useState<CategoryType|null>(null);

    const logUserIn = (user:Partial<UserType>):void => {
        setIsLoggedIn(true);
        setLoggedInUser(user);
        flashMessage(`${user.username} has logged in`, 'success');
    }

    const logUserOut = (): void => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        flashMessage('You have logged out', 'info');
    }

    const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
        setMessage(newMessage);
        setCategory(newCategory);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} handleClick={logUserOut} />
            <Container>
                {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage} />}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} user={loggedInUser} flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} />} />
                </Routes>
            </Container>
        </div>
    )
}
