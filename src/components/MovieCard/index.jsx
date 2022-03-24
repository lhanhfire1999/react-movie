import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { handleScrollTop, usePosterPath, useReleaseYear } from '../../utils';
import './MovieCard.scss';

const MovieCard = ({ id, posterUrl, title, releaseDate, genre, path }) => {
  const navigate = useNavigate();

  const movieType = useMemo(() => {
    if (genre || path) {
      if (genre) {
        return genre === 'tv' ? 'TV' : 'Movie';
      }
      return path?.slice(1) === 'tv' ? 'TV' : 'Movie';
    }
    return null;
  }, [genre, path]);

  const handleNavigate = () => {
    handleScrollTop();
    if (path) {
      return navigate(`${path}/${id}`);
    }
    return navigate(`/${genre}/${id}`);
  };

  return (
    <div onClick={handleNavigate} className="movie-card mb-2">
      <div className="movie-card__wrapper-poster">
        <div
          className="movie-card__poster"
          style={{ backgroundImage: `url(${usePosterPath(posterUrl)})` }}
        />
        <span className="movie-card__play-icon">
          <i className="bx bx-play-circle"></i>
        </span>
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__content__name" title={title}>
          {title}
        </h3>
        <ul className="movie-card__content__infos">
          <li>{useReleaseYear(releaseDate)}</li>
          <li>{movieType}</li>
        </ul>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  posterUrl: PropTypes.string,
  releaseDate: PropTypes.string,
  genre: PropTypes.string,
  path: PropTypes.string,
};

export default React.memo(MovieCard);
