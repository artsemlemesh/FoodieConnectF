import PropTypes from "prop-types";

const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  
  InputField.defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    onChange: () => {},
  };

export default InputField;