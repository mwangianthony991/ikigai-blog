import PropTypes from 'prop-types';
import moment from 'moment';


const Date = ({ date }) => {
    return (
        <span className='date'>
            {moment(date).format('MMMM D, YYYY')}
        </span>
    );
};

Date.propTypes = {
    date: PropTypes.string.isRequired
};

export { Date };
