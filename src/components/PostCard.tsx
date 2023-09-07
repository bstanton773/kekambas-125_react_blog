// import Card from 'react-bootstrap/Card';
import PostType from '../types/post';


type PostCardProps = {
    post: PostType
}

export default function PostCard({ post }: PostCardProps) {
    return (
        // <Card key={post.id}>
        //     <Card.Body>
        //         <Card.Title>{post.title}</Card.Title>
        //     </Card.Body>
        // </Card>
        <div className="post-card text-center">
            <div>
                <h3>{post.title}</h3>
                <h5>By {post.author.firstName}</h5>
                <p>{post.body}</p>
            </div>
        </div>
    )
}
