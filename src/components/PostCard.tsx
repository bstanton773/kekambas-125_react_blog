// import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PostType from '../types/post';
import UserType from '../types/auth';


type PostCardProps = {
    post: PostType,
    currentUser: UserType|null,
}

export default function PostCard({ post, currentUser }: PostCardProps) {
    return (
        // <Card key={post.id}>
        //     <Card.Body>
        //         <Card.Title>{post.title}</Card.Title>
        //     </Card.Body>
        // </Card>
        <div className="post-card text-center">
            <div className="post-card-img">
                <img src={post.imageUrl} alt="" />
            </div>
            <div>
                <h3>{post.title}</h3>
                <h5>By {post.author.firstName}</h5>
                <p>{post.body}</p>
                {currentUser?.id === post.author.id && (
                    <Link to={`/post/${post.id}`}>
                        <Button variant='primary'>Edit Post</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}
