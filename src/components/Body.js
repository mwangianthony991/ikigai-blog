import PropTypes from 'prop-types';
import './Body.css';


function Body({ post }) {
    return (
        <div className='post-body'>
            <div className='post-avatar'>
                <img src={post.avatar} className='post-avatar-img' alt='Post Avatar'/>
            </div>
            <p className='post-content'>
                {post.content}
            </p>
        </div>
    );
}

Body.propTypes = {
    post: PropTypes.object.isRequired
};

export default Body;
