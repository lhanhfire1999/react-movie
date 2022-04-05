import React from 'react';
import PropTypes from 'prop-types';
import { usePosterPath, useReleaseYear } from '../../utils';
import './WatchMovieDetail.scss';

const WatchMovieDetail = ({ movieInfo }) => {
  const posterPath = usePosterPath(
    movieInfo?.poster_path || movieInfo?.backdrop_path
  );

  const releaseYear = useReleaseYear(
    movieInfo?.release_date ||
      movieInfo?.last_air_date ||
      movieInfo?.first_air_date
  );

  return (
    <div className="section">
      <div className="watch-movie-detail">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-0">
            <div
              className="watch-movie-detail__poster"
              style={{ backgroundImage: `url(${posterPath})` }}
            ></div>
          </div>
          <div className="col-lg-9 col-md-9 col-12">
            <div className="watch-movie-detail__content">
              <h1 className="title">{movieInfo?.title || movieInfo?.name}</h1>
              <div className="vote-average">
                <span className="vote-average__icon">
                  <i className="bx bxs-star bx-sm" />
                </span>
                {`${movieInfo?.vote_average} of ${movieInfo?.vote_count}`}
              </div>
              <div className="overview">{movieInfo?.overview}</div>
              <ul className="meta">
                <li>
                  <b>Country:</b>
                  <span>
                    {movieInfo?.production_countries
                      .map((item) => item?.name)
                      .join(', ')}
                  </span>
                </li>
                <li>
                  <b>Genre:</b>
                  <span>
                    {movieInfo?.genres.map((item) => item?.name).join(', ')}
                  </span>
                </li>
                <li>
                  <b>Release year:</b>
                  <span>{releaseYear}</span>
                </li>
                <li>
                  <b>Tag: </b>
                  <span>{movieInfo?.tagline}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WatchMovieDetail.propTypes = { movieInfo: PropTypes.object.isRequired };

export default WatchMovieDetail;
