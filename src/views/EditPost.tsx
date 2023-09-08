import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getPostById, editPostById, deletePostById } from '../lib/apiWrapper';
import CategoryType from '../types/category';
import PostType from '../types/post';
import UserType from '../types/auth';

type EditPostProps = {
    flashMessage: (message:string, category: CategoryType) => void,
    currentUser: UserType|null,
}

export default function EditPost({ flashMessage, currentUser }: EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [postToEdit, setPostToEdit] = useState<PostType|null>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

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
    }, [flashMessage, navigate, postId])

    useEffect(() => {
        if (postToEdit){
            if (postToEdit.author.id !== currentUser?.id){
                flashMessage('You do not have permission to edit this post. Who do you think you are?!', 'danger');
                navigate('/')
            }
        }
    })

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

    const handleDeletePost = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deletePostById(token, postId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary');
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
                            <Button variant='danger' className='mt-3 w-50' onClick={openModal}>Delete Post</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {postToEdit?.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {postToEdit?.title}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="danger" onClick={handleDeletePost}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}