import React, { useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import './Button.scss';
import { Link } from 'react-router-dom';

const Button = ({ children, onClick, linkTo, color, sizeS, icon }) => {
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
  onClick: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.string,
};

export default React.memo(Button);
