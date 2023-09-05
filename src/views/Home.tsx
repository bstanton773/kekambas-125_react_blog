import PostCard from "../components/PostCard";

type HomeProps = {
    isLoggedIn: boolean
}

export default function Home({ isLoggedIn }: HomeProps) {
    const name:string = 'Brian';

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Tuesday'},
        {id: 2, title: 'How was your weekend?'},
        {id: 3, title: 'I love React!'}
    ];
    return (
        <>
            <h1>Hello {isLoggedIn ? name : 'Friend'}</h1>
            {posts.map( p => <PostCard post={p}  key={p.id}/> )}
        </>
    )
}