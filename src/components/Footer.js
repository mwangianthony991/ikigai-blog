import React from 'react';

import './Footer.css';


function Footer() {
    return (
        <footer className='blog-footer'>
            <p className='footer-copyright'>
                &copy; Copyright 2024. Anthony Mwangi
            </p>
            <div className='social-links'>
                <a href='https://github.com/mwangianthony991' target="_blank" rel="noopener noreferrer"><i className='fa-brands fa-square-github'/></a>
                <a href='https://www.linkedin.com/in/anthony-mwangi-a67610223/' target="_blank" rel="noopener noreferrer"><i className='fa-brands fa-linkedin'/></a>
                <a href='mailto: weruproject7@gmail.com' target="_blank" rel="noopener noreferrer"><i className='fa-solid fa-envelope'/></a>
                <p>
                    Powered by: <i className="fa-brands fa-react"/>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
