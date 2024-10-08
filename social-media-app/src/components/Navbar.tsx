import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className='navbar'>
            <div className='links'>
                <Link to="/">Home</Link>
                {user && <Link to="/create-post">Create post</Link>}
                {user ? (
                    <button onClick={signUserOut} className="link-button">Log out</button>
                ) : (
                    <Link to="/login">Login</Link> 
                )}
            </div>
            <div className='user'>
                {user && (
                    <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ""} width="50" height="50" alt="profile-picture"/>
                    </>
                )}
            </div>
        </div>
    );
}
