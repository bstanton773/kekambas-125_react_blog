import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';
import CategoryType from '../types/category';
import PostType from '../types/post';
import UserType from '../types/auth';
import { getAllPosts, createPost } from '../lib/apiWrapper';


type HomeProps = {
    isLoggedIn: boolean,
    user: Partial<UserType>|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Home({ isLoggedIn, user, flashMessage }: HomeProps) {
    
    const [posts, setPosts] = useState<PostType[]>([]);
    const [newPost, setNewPost] = useState<Partial<PostType>>({id: 1, title: '', body: ''})
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        async function fetchData(){
            const response = await getAllPosts();
            console.log(response);
            if (response.data){
                setPosts(response.data);
            }
        }

        fetchData();
    }, [newPost.id])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // setPosts([...posts, newPost]);
        const token = localStorage.getItem('token') || ''
        const response = await createPost(token, newPost);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            setNewPost({id: posts.length + 2, title: '', body: ''});
            flashMessage(`${newPost.title} has been created`, 'primary');
            setDisplayForm(false);
        }
    }


    return (
        <>
            <h1>Hello {isLoggedIn ? user?.firstName + ' ' + user?.lastName : 'Friend'}</h1>
            {isLoggedIn && <Button variant='success' className='w-100' onClick={() => setDisplayForm(!displayForm)}>Create New Post</Button>}
            { displayForm && (
                <PostForm handleChange={handleInputChange} handleSubmit={handleFormSubmit} newPost={newPost} isLoggedIn={isLoggedIn}/>
            )}
            {posts.map( p => <PostCard post={p}  key={p.id}/> )}
        </>
    )
}