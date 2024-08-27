import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import googleLogo from '../images/google_logo.png';

export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate('/');
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In to Continue</h2>
                <p>Use your Google account to sign in and access the application.</p>
                <button onClick={signInWithGoogle} className="google-signin-button">
                    <img src={googleLogo} alt="Google Logo" className="google-logo" />
                </button>
            </div>
        </div>
    );
}