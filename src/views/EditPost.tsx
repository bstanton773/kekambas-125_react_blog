import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { getPostById, editPostById } from '../lib/apiWrapper';
import CategoryType from '../types/category';
import PostType from '../types/post';

type EditPostProps = {
    flashMessage: (message:string, category: CategoryType) => void
}

export default function EditPost({ flashMessage }: EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [postToEdit, setPostToEdit] = useState<PostType|null>(null)

    useEffect(() => {
        async function getPost(){
            let response = await getPostById(postId!);
            if (response.error){
                flashMessage(response.error, 'danger');
                navigate('/');
            } else {
                setPostToEdit(response.data!);
            }
        }
        getPost();
    }, [])

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPostToEdit({...postToEdit, [e.target.name]: e.target.value} as PostType)
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Something is happening')
        const token = localStorage.getItem('token') || ''
        const response = await editPostById(token, postId!, postToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.title} has been updated`, 'success')
            navigate('/')
        }
    }

    return (
        <>
            <h1 className="text-center">Edit {postToEdit?.title}</h1>
            {postToEdit && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Edit Post Title</Form.Label>
                            <Form.Control name='title' value={postToEdit?.title} onChange={handleInputChange} />
                            <Form.Label>Edit Post Body</Form.Label>
                            <Form.Control name='body' as='textarea' value={postToEdit?.body} onChange={handleInputChange} />
                            <Button variant='success' className='mt-3 w-50' type='submit'>Edit Post</Button>
                            <Button variant='danger' className='mt-3 w-50'>Delete Post</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}