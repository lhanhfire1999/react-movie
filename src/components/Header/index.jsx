import clsx from 'clsx';
import React, { useMemo } from 'react';
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

  const activeIndex = useMemo(() => {
    const index = headerNav.findIndex(({ path }) => path === pathname);
    return index;
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__wrap container">
        <Link className="header__logo" to="/">
          <img src={logo} alt="Logo movies" />
          DMOVIES
        </Link>

        <ul className="header__nav">
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
      </div>
    </header>
  );
};

export default Header;
