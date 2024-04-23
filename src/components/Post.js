import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Author from './Author';
import Body from './Body';
import CommentList from './CommentList';
import Footer from './Footer';
import Title from './Title';
import { NavBar } from './NavBar';
import { collection, doc, query, where, getDocs, setDoc, limit } from "firebase/firestore";
import { db } from '../utils/firebase';

import './Post.css';


function Post() {
    const [post, setPost] = useState();
    const { slug } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const querySnapshot = await(
                getDocs(query(collection(db, "blog-posts"), where("slug", "==", slug), limit(1))));
            const doc = querySnapshot.docs.find((doc) => doc.data().slug === slug);
            setPost(doc.data())
        }
        fetchPost()
    }, [slug])

    const handleCommentListUpdate = (commentList) => {
        const updatedPost = {
            ...post,
            comments: commentList
        };
        const updateFirebasePost = async () => {
            await setDoc(doc(db, "blog-posts", post.id), {
                ...updatedPost
            })
        }

        updateFirebasePost();
        setPost(updatedPost)
    }

    return (
        <div className='post-container'>
            <NavBar/>
            {post &&
                <div className='post'>
                    <div className='post-heading'>
                        <Title title={post.title}/>
                        <Author post={post}/>
                    </div>
                    <Body post={post}/>
                    <CommentList initialComments={post.comments} handleCommentListUpdate={handleCommentListUpdate}/>
                </div>
            }
            <Footer/>
        </div>
    );
}

export default Post;
