import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

import './NavBar.css';


const NavBar = () => {
    return (
        <nav className='navbar'>
            <Link className='home-link' to="/">
                <Avatar avatar='/assets/images/dark_blog_icon.jpg'/>
                <span className='blog-name'>
                    IKIGAI
                </span>
            </Link>
        </nav>
    );
}

export { NavBar };
