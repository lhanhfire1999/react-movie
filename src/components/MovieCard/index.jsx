import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import apiConfig from '../../api/apiConfig';
import './MovieCard.scss';

const MovieCard = ({ posterUrl, title, releaseDate, type }) => {
  const bgImgUrl = useMemo(() => {
    return apiConfig.w200Image(posterUrl);
  }, [posterUrl]);

  const yearRelease = releaseDate.slice(0, 4);
  type = type.includes('/') ? type.slice(1) : type;

  return (
    <div className="col-lg-2 col-md-3 col-6 mb-2">
      <div className="movie-card">
        <div
          className="movie-card__poster"
          style={{ backgroundImage: `url(${bgImgUrl})` }}
        ></div>
        <div className="movie-card__wraper">
          <h3 className="movie-card__name">{title}</h3>
          <ul className="movie-card__infos">
            <li>{yearRelease}</li>
            <li>{type === 'tv' ? 'TV' : 'Movie'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  posterUrl: PropTypes.string,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  type: PropTypes.string,
};

export default MovieCard;
