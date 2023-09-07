import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CategoryType from '../types/category';
import UserType from '../types/auth';
import { register } from '../lib/apiWrapper';

type RegisterProps = {
    logUserIn: (user:Partial<UserType>) => void,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Register({ logUserIn, flashMessage }: RegisterProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>(
        {
            firstName: '', 
            lastName: '', 
            username: '', 
            email: '', 
            password: '',
            confirmPassword: '',
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        let response = await register(userFormData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            logUserIn(response.data!);
            navigate('/')
        }
    }

    const validatePasswords = (password: string, confirmPassword: string) => {
        return(password.length > 7 && password === confirmPassword)
    }

    const validPasswords:boolean = validatePasswords(userFormData.password!, userFormData.confirmPassword!);

    return (
        <>
            <h1 className="text-center">Register</h1>
            <Card className='mt-3'>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name='firstName' value={userFormData.firstName} onChange={handleInputChange} />

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name='lastName' value={userFormData.lastName} onChange={handleInputChange} />

                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type='email' value={userFormData.email} onChange={handleInputChange} />

                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' value={userFormData.username} onChange={handleInputChange} />

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' value={userFormData.password} onChange={handleInputChange} placeholder='Password must be at least 8 characters long'/>
                        
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name='confirmPassword' type='password' value={userFormData.confirmPassword} onChange={handleInputChange} placeholder='Password must match above password'/>


                        <Button type='submit' variant='outline-success' className='w-100 mt-3' disabled={!validPasswords}>Register</Button>
                        {!validPasswords && <Form.Text className='text-danger'>Your password must be at least 8 characters long and must match</Form.Text>}
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}