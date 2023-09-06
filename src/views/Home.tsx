import { useState } from 'react';
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';
import CategoryType from '../types/category';
import UserType from '../types/auth';

type Post = {
    id: number,
    title: string
}

type HomeProps = {
    isLoggedIn: boolean,
    user: Partial<UserType>|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Home({ isLoggedIn, user, flashMessage }: HomeProps) {
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({id: 1, title: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setPosts([...posts, newPost]);
        setNewPost({id: posts.length + 2, title: ''});

        flashMessage(`${newPost.title} has been created`, 'primary');
    }


    return (
        <>
            <h1>Hello {isLoggedIn ? user?.username : 'Friend'}</h1>
            <PostForm handleChange={handleInputChange} handleSubmit={handleFormSubmit} newPost={newPost} isLoggedIn={isLoggedIn}/>
            {isLoggedIn && posts.map( p => <PostCard post={p}  key={p.id}/> )}
        </>
    )
}