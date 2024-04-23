import PropTypes from 'prop-types';
import moment from 'moment';


const Time = ({ time }) => {
    return (
        <>
            {moment(time).fromNow()}
        </>
    );
};

Time.propTypes = {
    time: PropTypes.string.isRequired
};

export { Time };
