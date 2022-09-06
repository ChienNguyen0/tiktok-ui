import Button from '~/components/Button';
import PropTypes from 'prop-types';

function MenuItem({ data, onClick }) {
    return (
        <Button menuItem leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
