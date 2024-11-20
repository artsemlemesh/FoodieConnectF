import PropTypes from "prop-types";

const Button = ({ label, onClick, variant, size, disabled }) => {
  const baseStyle =
    'rounded px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeStyle = size === 'large' ? 'text-lg' : 'text-sm';
  const variantStyle =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
      : 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-300';

  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${variantStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.oneOf(['small', 'large']),
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    onClick: () => {},
    variant: 'primary',
    size: 'small',
    disabled: false,
}

export default Button;
