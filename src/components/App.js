import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Post from './Post';
import Posts from './Posts';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase';


const PostsContext = createContext();


const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            await getDocs(collection(db, "blog-posts"))
                .then((querySnapshot)=>{              
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data()}));
                    setPosts(newData);
                })
        }
        fetchPosts();
    }, [])

    return (
        <PostsContext.Provider value={posts}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route exact path='blog/:slug/' element={<Post/>}/>
                    <Route exact path='blog/technology/' element={<Posts/>}/>
                    <Route exact path='blog/anime/' element={<Posts/>}/>
                    <Route exact path='blog/manga/' element={<Posts/>}/>
                    <Route exact path='blog/all-posts/' element={<Posts/>}/>
                </Routes>
            </BrowserRouter>
        </PostsContext.Provider>
    );
}

export const usePostsContext = () => useContext(PostsContext);
export default App;
