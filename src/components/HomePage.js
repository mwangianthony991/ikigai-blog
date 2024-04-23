import Footer from './Footer';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';
import { usePostsContext } from './App';
import { orderByDatesDesc } from '../utils/dates';

import './HomePage.css';


function HomePage() {
    const posts = usePostsContext();
    const orderedPosts = orderByDatesDesc(posts);
    const latestPost = orderedPosts.length === 0 ? {} : orderedPosts[0];

    return (
        <div className='blog-home-page'>
            <NavBar/>
            <div className='flex-container'>
                <div className='main-heading'>
                    <h3>Most Recent Posts</h3>
                </div>
                <div className='all-posts'>
                    <Link className='all-posts-link' to={'blog/all-posts/'} state={posts}>
                        View All Posts
                    </Link>
                </div>
            </div>
            <div className='grid-container'>
                <div className='main-card'>
                    <Link className='main-card-link' to={`/blog/${latestPost.slug}/`} state={latestPost}>
                        <div className='main-post-avatar'>
                            <img src={latestPost.avatar} alt='Post Avatar'/>
                        </div>
                        <article>
                            <header>
                                <div className='main-post-category'>
                                    {latestPost.category}
                                </div>
                                <h4>
                                    {latestPost.title}
                                </h4>
                                <p className='main-post-description'>
                                    {latestPost.description}
                                </p>
                            </header>
                        </article>
                    </Link>
                </div>
                <div className='side-cards'>
                    {orderedPosts.slice(1, 3).map(orderedPost => (
                        <div className='side-card' key={orderedPost.id}>
                            <Link className='side-card-link' to={`/blog/${orderedPost.slug}/`} state={orderedPost}>
                                <img src={orderedPost.avatar} alt='Post Avatar'/>
                                <article>
                                    <header>
                                        <div className='side-card-category'>
                                            {orderedPost.category}
                                        </div>
                                        <h5>
                                            {orderedPost.title}
                                        </h5>
                                    </header>
                                </article>
                            </Link>
                        </div> 
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;
