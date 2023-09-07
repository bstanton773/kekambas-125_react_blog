import { useState, useEffect } from 'react';
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';
import CategoryType from '../types/category';
import PostType from '../types/post';
import UserType from '../types/auth';
import { getAllPosts } from '../lib/apiWrapper';


type HomeProps = {
    isLoggedIn: boolean,
    user: Partial<UserType>|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Home({ isLoggedIn, user, flashMessage }: HomeProps) {
    
    const [posts, setPosts] = useState<PostType[]>([]);
    const [newPost, setNewPost] = useState<Partial<PostType>>({id: 1, title: ''})

    useEffect(() => {
        async function fetchData(){
            const response = await getAllPosts();
            console.log(response);
            if (response.data){
                setPosts(response.data);
            }
        };

        fetchData();
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // setPosts([...posts, newPost]);
        setNewPost({id: posts.length + 2, title: ''});

        flashMessage(`${newPost.title} has been created`, 'primary');
    }


    return (
        <>
            <h1>Hello {isLoggedIn ? user?.firstName + ' ' + user?.lastName : 'Friend'}</h1>
            <PostForm handleChange={handleInputChange} handleSubmit={handleFormSubmit} newPost={newPost} isLoggedIn={isLoggedIn}/>
            {posts.map( p => <PostCard post={p}  key={p.id}/> )}
        </>
    )
}