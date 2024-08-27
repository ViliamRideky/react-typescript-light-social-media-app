import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

interface CreateFormData {
    title: string;
    description: string;
}

export const Form = () => {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState<string | null>(null);

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            // ...data
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid
        });

        reset();
        setMessage("Post created successfully!");
        

        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input type="text" placeholder='Title ...' {...register("title")} />
                <p className='error'>{errors.title?.message}</p>
                <textarea placeholder='Description ...' {...register("description")} />
                <p className='error'>{errors.description?.message}</p>
                <input type="submit" value="Create Post" />
            </form>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
}
