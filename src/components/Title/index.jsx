import PropTypes from 'prop-types';
import React from 'react';

import './Title.scss';

const Title = ({ children }) => {
  return <div className="header-title">{children}</div>;
};

Title.propTypes = {
  children: PropTypes.element,
};

export default Title;
