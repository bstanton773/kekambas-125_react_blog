import Navigation from "./components/Navigation";

export default function App() {
    const name:string = 'Brian';
    const isLoggedIn:boolean = false;

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Tuesday'},
        {id: 2, title: 'How was your weekend?'},
        {id: 3, title: 'I love React!'}
    ];

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn}/>
            { isLoggedIn ? <h1>Hello {name}!</h1> : <h1>Hello and Welcome</h1>}
            {posts.map(p => <li key={p.id}>{p.title}</li>)}
        </div>
    )
}
