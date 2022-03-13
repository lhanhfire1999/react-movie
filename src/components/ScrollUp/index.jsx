import React, { useEffect } from 'react';
import { handleScrollTop } from '../../utils';
import './ScrollUp.scss';

const ScrollUp = () => {
  const handleScrollUp = () => {
    return handleScrollTop();
  };

  useEffect(() => {
    const showScrollUpBtn = () => {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        document.querySelector('.scroll-up').classList.add('active');
      } else {
        document.querySelector('.scroll-up').classList.remove('active');
      }
    };
    window.addEventListener('scroll', showScrollUpBtn);
    return () => window.removeEventListener('scroll', showScrollUpBtn);
  });

  return (
    <span className="scroll-up" onClick={handleScrollUp}>
      <i className="bx bx-up-arrow-alt bx-sm"></i>
    </span>
  );
};

export default ScrollUp;
