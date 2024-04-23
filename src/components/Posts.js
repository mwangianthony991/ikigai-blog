import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar } from './NavBar';
import { usePostsContext } from './App';
import { filterPosts, getPostCategories } from '../utils/filter-posts';
import { convertStringToTitleCase } from '../utils/string-formats';

import './Posts.css'


function Posts() {
    let allPosts = usePostsContext();
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState('All');
    const { pathname } = useLocation();
    const categories = getPostCategories(allPosts);

    useEffect(() => {
        const categorySlug = pathname.toLowerCase().split("/").reverse()[1];

        if (categorySlug === 'all-posts') {
            setPosts(allPosts)
        } else {
            setCategory(convertStringToTitleCase(categorySlug))
            setPosts(filterPosts(allPosts, categorySlug))
        }
    }, [allPosts, pathname])

    const handleFilteredPosts = (e) => {
        let postCategory = e.target.value || '';
        let lowerCasePostCategory = postCategory.toLowerCase()
        lowerCasePostCategory !== 'all'
            ? setPosts(filterPosts(allPosts, lowerCasePostCategory))
            : setPosts(allPosts)
        setCategory(postCategory)
    };

    return (
        <div className='all-posts-page'>
            <NavBar/>
            <nav className='all-post-categories'>
                {categories && categories.map((cat, index) => (
                    <Link
                        className='card-link'
                        to={cat.toLowerCase().includes('all') ? '/blog/all-posts/' : `/blog/${cat.toLowerCase()}/`}>
                            <button
                                key={index}
                                value={cat}
                                onClick={handleFilteredPosts}
                                className={cat === category ? 'active': ''}
                            >
                                {cat}
                            </button>
                    </Link>
                ))}
            </nav>
            <div className='all-posts-heading'>
                <h3>{category.toLowerCase() === 'all' ? 'All Posts': category}</h3>
            </div>
            <div className='post-cards'>
                {posts.map(post => (
                    <div className='single-post-card' key={post.slug}>
                        <Link className='card-link' to={`/blog/${post.slug}/`} state={post}>
                            <img src={post.avatar} alt='Post Avatar'/>
                            <article>
                                <header>
                                    <div className='single-post-card-category'>
                                        {post.category}
                                    </div>
                                    <h5>
                                        {post.title}
                                    </h5>
                                </header>
                            </article>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
