import { getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Format } from './Format';

export interface Posts {
    id:string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const Home = () => {
    const [postsList, setPostsList] = useState<Posts[] | null>(null)
    const postRef = collection(db, "posts")
    const [user] = useAuthState(auth);

    const getPosts = async () => {
        const data = await getDocs(postRef)
        setPostsList(
            data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Posts[]
        );
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className="home-container">
            {user ? (
                postsList?.map((post) => (
                    <Format key={post.id} post={post} />
                ))
            ) : (
                <div className="welcome-message">
                    <h1>Welcome to Dubik</h1>
                    <p>Please login in to view and create posts.</p>
                </div>
            )}
        </div>
    );
}