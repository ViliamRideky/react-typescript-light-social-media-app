import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useEffect, useState } from 'react'
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
        <div>
            {postsList?.map((post) => (
                <Format post={post}/>
            ))}
        </div>
    )
}