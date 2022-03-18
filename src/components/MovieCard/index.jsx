import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import { unavailablePoster } from '../../constants';
import './MovieCard.scss';

const MovieCard = ({ id, posterUrl, title, releaseDate, type, path }) => {
  const bgImgUrl = useMemo(() => {
    return posterUrl ? apiConfig.w200Image(posterUrl) : unavailablePoster;
  }, [posterUrl]);

  const yearRelease = useMemo(() => releaseDate?.slice(0, 4), [releaseDate]);

  const movieType = useMemo(() => {
    if (type) {
      return type === 'tv' ? 'TV' : 'Movie';
    }
    return path?.slice(1) === 'tv' ? 'TV' : 'Movie';
  }, [type, path]);

  return (
    <Link to={`${path ?? type}/${id}`} className="movie-card mb-2">
      <div className="movie-card__wrapper-poster">
        <div
          className="movie-card__poster"
          style={{ backgroundImage: `url(${bgImgUrl})` }}
        />
        <span className="movie-card__play-icon">
          <i className="bx bx-play-circle"></i>
        </span>
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__content__name">{title}</h3>
        <ul className="movie-card__content__infos">
          <li>{yearRelease}</li>
          <li>{movieType}</li>
        </ul>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  posterUrl: PropTypes.string,
  releaseDate: PropTypes.string,
  type: PropTypes.string,
  path: PropTypes.string,
};

export default React.memo(MovieCard);
