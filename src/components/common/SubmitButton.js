import React, { PropTypes } from 'react';
import LoadingDots from './LoadingDots';

const SubmitButton = ({ saving }) => (
  <button
    type="submit"
    className="btn btn-success"
    disabled={saving}
  >
    { saving ? <span>Saving<LoadingDots /></span> : <span>Save</span>}
  </button>
);

SubmitButton.propTypes = { 
  saving: PropTypes.bool.isRequired
};

export default SubmitButton;