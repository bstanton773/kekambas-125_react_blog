// Import Node Modules
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// Import Views
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
// Import Components
import AlertMessage from './components/AlertMessage';
import Navigation from "./components/Navigation";
// Import Types
import CategoryType from './types/category';
import UserType from './types/auth';
// Import apiWrapper functions
import { getMe } from './lib/apiWrapper';


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false);
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null);

    useEffect(() => {
        if (isLoggedIn){
            getMe(localStorage.getItem('token') as string)
                .then(response => {
                    if (response.data){
                        setLoggedInUser(response.data)
                    }
                })
                .catch(err => console.error(err))
        }
    }, [isLoggedIn])

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
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
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
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage} />} />
                    <Route path='/register' element={<Register logUserIn={logUserIn} flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </div>
    )
}
