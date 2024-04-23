import PropTypes from 'prop-types';


function Avatar({ avatar }) {
    return (
        <img src={avatar} className='avatar' alt='avatar'/>
    );
}

Avatar.propTypes = {
    avatar: PropTypes.string.isRequired
};

export default Avatar;
