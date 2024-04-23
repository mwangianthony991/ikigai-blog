import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { Date } from './Date';

import './Author.css';


const Author = ({ post }) => {
    const { author } = post;
    return (
        <div className='post-author'>
            <Avatar avatar={author.avatar}/>
            <span className='author-name'>
                Written By {author.name}
            </span>
            <span className='divider'>•</span>
            <Date date={post.date}/>
        </div>
    );
}

Author.propTypes = {
    post: PropTypes.object.isRequired
};

export default Author;
