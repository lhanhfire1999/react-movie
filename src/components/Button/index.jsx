import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({ children, onClick, linkTo, color, sizeS, icon, reverse }) => {
  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      return onClick();
    }
    return null;
  };

  return (
    <>
      {onClick && (
        <button
          className={clsx('btn', {
            [`btn--${color}`]: color,
            'btn--size-s': sizeS,
            reverse,
          })}
          onClick={handleClick}
        >
          {icon && <i className={clsx('bx', { [icon]: icon })}></i>}
          {children}
        </button>
      )}

      {linkTo && (
        <Link
          className={clsx('btn', {
            [`btn--${color}`]: color,
            'btn--size-s': sizeS,
            reverse,
          })}
          onClick={handleClick}
          to={linkTo}
        >
          {icon && <i className={clsx('bx', { [icon]: icon })}></i>}
          {children}
        </Link>
      )}
    </>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  linkTo: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  reverse: PropTypes.bool,
};

export default React.memo(Button);
