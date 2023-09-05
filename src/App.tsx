import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navigation from "./components/Navigation";

export default function App() {
    const name:string = 'Brian';
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log('State Value:', isLoggedIn);
    // console.log('State Setter:', typeof setIsLoggedIn);

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Tuesday'},
        {id: 2, title: 'How was your weekend?'},
        {id: 3, title: 'I love React!'}
    ];

    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} handleClick={handleLoginClick} />
            <Container>
                { isLoggedIn ? <h1>Hello {name}!</h1> : <h1>Hello and Welcome</h1>}
                {posts.map(p => <li key={p.id}>{p.title}</li>)}
            </Container>
        </div>
    )
}
