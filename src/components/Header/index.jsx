import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.scss';

const headerNav = [
  { display: 'home', path: '/' },
  { display: 'movies', path: '/movie' },
  { display: 'tv series', path: '/tv' },
];

const Header = () => {
  const { pathname } = useLocation();
  const searchBarRef = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  const activeIndex = useMemo(() => {
    const index = headerNav.findIndex(({ path }) => path === pathname);
    return index;
  }, [pathname]);

  const handleMobileSearchBtn = () => {
    searchBarRef.current.classList.toggle('active');
  };

  const handleMenuBtn = () => {
    menuRef.current.classList.toggle('active');

    if (menuRef.current.classList.contains('active')) {
      navRef.current.classList.add('active');
    } else {
      navRef.current.classList.remove('active');
    }
  };

  useEffect(() => {
    searchBarRef.current.classList.remove('active');
    menuRef.current.classList.remove('active');
    navRef.current.classList.remove('active');
  });

  return (
    <header className="header">
      <div className="header__wrap container">
        <div className="mobile-search__btn" onClick={handleMobileSearchBtn}>
          <i className="bx bx-search"></i>
        </div>
        <Link className="header__logo" to="/">
          <img src={logo} alt="Logo movies" />
          DMOVIES
        </Link>
        <ul className="header__nav" ref={navRef}>
          {headerNav.map((item, i) => (
            <li key={i}>
              <Link
                className={clsx({ active: i === activeIndex })}
                to={item.path}
              >
                {item.display}
              </Link>
            </li>
          ))}
        </ul>
        <div className="header__search" ref={searchBarRef}>
          <span className="header__search__btn">
            <i className="bx bx-search"></i>
          </span>
          <input
            type="text"
            className="header__search__input"
            placeholder="Enter your keyword..."
          />
        </div>
        <div className="hamburger-menu" onClick={handleMenuBtn} ref={menuRef}>
          <div className="hamburger"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
