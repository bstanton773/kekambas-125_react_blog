import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

type NavigationProps = {
    isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }:NavigationProps) {
    
    return (
        <Navbar bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand href='/'>Kekambas Blog</Navbar.Brand>
                <Nav className='me-auto'>
                    { isLoggedIn ? (
                        <>
                            <Nav.Link href='/'>Create Post</Nav.Link>
                            <Nav.Link href='/'>Log Out</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href='/'>Sign Up</Nav.Link>
                            <Nav.Link href='/'>Log In</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}