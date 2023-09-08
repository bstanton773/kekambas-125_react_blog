import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { getPostById } from '../lib/apiWrapper';
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
    })

    return (
        <>
            <h1 className="text-center">Edit {postToEdit?.title}</h1>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Label>Edit Post Title</Form.Label>
                        <Form.Control name='title' value={postToEdit?.title} />
                        <Form.Label>Edit Post Body</Form.Label>
                        <Form.Control name='body' as='textarea' value={postToEdit?.body} />
                        <Button variant='success' className='mt-3 w-50'>Edit Post</Button>
                        <Button variant='danger' className='mt-3 w-50'>Delete Post</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}