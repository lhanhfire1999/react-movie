import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, color }) => {
  return (
    <button className={clsx('btn', { [`btn--${color}`]: color })}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default Button;
