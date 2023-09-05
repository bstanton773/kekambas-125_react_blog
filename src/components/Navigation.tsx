
type NavigationProps = {
    isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }:NavigationProps) {
    console.log(isLoggedIn);
    return (
        <div>
            <h5>Kekambas Blog</h5>
            <ol>
                <li><a href="">Home</a></li>
                { isLoggedIn ? (
                    <>
                        <li><a href="">Create Post</a></li>
                        <li><a href="">Log Out</a></li>
                    </>
                ) : (
                    <>
                        <li><a href="">Sign Up</a></li>
                        <li><a href="">Log In</a></li>
                    </>
                ) }
            </ol>
        </div>
    )
}
