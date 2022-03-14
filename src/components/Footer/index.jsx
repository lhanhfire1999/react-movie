import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../constants';
import { handleScrollTop } from '../../utils';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="footer__content">
              <h3 className="footer__content__title">About us</h3>
              <p className="footer__content__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, distinctio quasi, nulla quas dolorem quidem tempora
                minus laborum blanditiis officia magni voluptas rem debitis aut
                quos? Quas exercitationem amet blanditiis.
              </p>
              <div className="footer__content__socials">
                <a
                  href="https://github.com/lhanhfire1999"
                  target="_blank"
                  className="footer__content__socials__item"
                  rel="noreferrer"
                >
                  <i className="bx bxl-github"></i>
                </a>
                <a
                  href="https://www.facebook.com/lhanh1999/"
                  className="footer__content__socials__item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bxl-facebook-circle"></i>
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=email@domain.com`}
                  className="footer__content__socials__item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bx-mail-send"></i>
                </a>
              </div>
            </div>
          </div>
          {footerLinks.map((item, i) => (
            <div className="col-lg-3 col-md-6 col-6" key={i}>
              <div className="footer__content flex">
                <h3 className="footer__content__title">{item.title}</h3>
                <ul className="footer__content__list">
                  {item.childrens.map((child, i) => (
                    <li key={i} onClick={handleScrollTop}>
                      <Link to={child?.path}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="footer__copyright section">
        <span>&copy; 2022 &bull; DMOVIES</span>
      </p>
    </div>
  );
};

export default Footer;
