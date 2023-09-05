import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
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
                <Home isLoggedIn={isLoggedIn} />
            </Container>
        </div>
    )
}
