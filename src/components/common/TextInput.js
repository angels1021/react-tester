import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange = () => {}, placeholder = '', value = '', error = false }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass} >
      <label htmlFor={name} >{label}</label>
      <div className="field" >
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger" >{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string
};

TextInput.defaultProps = {
  onChange: PropTypes.func,
  placeholder: PropTypes.array,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;