import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import { unavailablePoster } from '../../constants';
import './MovieCard.scss';

const MovieCard = ({ id, posterUrl, title, releaseDate, genre, path }) => {
  const { movieId } = useParams();
  let navigate = useNavigate();

  const bgImgUrl = useMemo(() => {
    return posterUrl ? apiConfig.w200Image(posterUrl) : unavailablePoster;
  }, [posterUrl]);

  const yearRelease = useMemo(() => releaseDate?.slice(0, 4), [releaseDate]);

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
    if (movieId) {
      return navigate(`${path}/${id}`);
    }
    return navigate(`${path ?? genre}/${id}`);
  };

  return (
    <div onClick={handleNavigate} className="movie-card mb-2">
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
