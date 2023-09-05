import { useState } from 'react';
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';

type Post = {
    id: number,
    title: string
}

type HomeProps = {
    isLoggedIn: boolean
}

export default function Home({ isLoggedIn }: HomeProps) {
    const name:string = 'Brian';
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({id: 1, title: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.name);
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setPosts([...posts, newPost])
        setNewPost({id: posts.length + 2, title: ''})
    }


    return (
        <>
            <h1>Hello {isLoggedIn ? name : 'Friend'}</h1>
            <PostForm handleChange={handleInputChange} handleSubmit={handleFormSubmit} newPost={newPost}/>
            {isLoggedIn && posts.map( p => <PostCard post={p}  key={p.id}/> )}
        </>
    )
}