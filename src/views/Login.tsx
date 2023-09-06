import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';

type LoginProps = {
    isLoggedIn: boolean,
    logUserIn: (user:Partial<UserType>) => void
}

export default function Login({ isLoggedIn, logUserIn }: LoginProps) {
    const navigate = useNavigate();
    
    if (isLoggedIn){
        navigate('/');
    }

    const [user, setUser] = useState<Partial<UserType>>({username: '', password: ''})


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent):void => {
        e.preventDefault();
        logUserIn(user);
        navigate('/');
    }

    const validPassword = (password:string):boolean => password.length > 7
    return (
        <>
            <h1 className='text-center'>Log In</h1>
            <Card className='mt-3'>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' value={user.username} onChange={handleInputChange} />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' value={user.password} onChange={handleInputChange} />
                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={!validPassword(user.password!)}>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}