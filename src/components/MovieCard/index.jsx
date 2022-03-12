import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import apiConfig from '../../api/apiConfig';
import { unavailablePoster } from '../../constants';
import './MovieCard.scss';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, posterUrl, title, releaseDate, type }) => {
  const bgImgUrl = useMemo(() => {
    return posterUrl ? apiConfig.w200Image(posterUrl) : unavailablePoster;
  }, [posterUrl]);

  const yearRelease = releaseDate.slice(0, 4);
  type = type.includes('/') ? type.slice(1) : type;

  return (
    <div className="col-lg-2 col-md-3 col-6 mb-2">
      <Link to={`/${type}/${id}`} className="movie-card">
        <div className="movie-card__wrapper-poster">
          <div
            className="movie-card__poster"
            style={{ backgroundImage: `url(${bgImgUrl})` }}
          />
          <span className="movie-card__play-icon">
            <i className="bx bx-play-circle"></i>
          </span>
        </div>

        <h3 className="movie-card__name">{title}</h3>
        <ul className="movie-card__infos">
          <li>{yearRelease}</li>
          <li>{type === 'tv' ? 'TV' : 'Movie'}</li>
        </ul>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  posterUrl: PropTypes.string,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  type: PropTypes.string,
};

export default React.memo(MovieCard);
