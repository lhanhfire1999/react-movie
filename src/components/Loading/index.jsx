import React from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';

const Loading = ({ id }) => {
  return (
    <div className="loading" id={id}>
      <div className="loading__ball"></div>
      <div className="loading__ball"></div>
      <div className="loading__ball"></div>
    </div>
  );
};
Loading.propTypes = {
  id: PropTypes.string,
};
export default Loading;
