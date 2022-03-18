import React, { useMemo } from 'react';
import apiConfig from '../../api/apiConfig';
import PropTypes from 'prop-types';
import { unavailableLandscape, unavailablePoster } from '../../constants';
import Button from '../Button';
import Title from '../Title';
import CaseList from './CastList';

const Details = ({ movieInfo, cast }) => {
  const {
    title,
    name,
    overview,
    release_date,
    last_air_date,
    genres,
    backdrop_path,
    poster_path,
  } = movieInfo;

  const getImg = useMemo(() => {
    if (backdrop_path || poster_path) {
      const backdropUrl = apiConfig.originalImage(backdrop_path ?? poster_path);
      const posterUrl = apiConfig.w500Image(poster_path ?? backdrop_path);
      return { backdropUrl, posterUrl };
    }
    return { posterUrl: unavailablePoster, backdropUrl: unavailableLandscape };
  }, [backdrop_path, poster_path]);

  const releaseDate = useMemo(() => {
    if (release_date || last_air_date) {
      return release_date?.slice(0, 4) ?? last_air_date?.slice(0, 4);
    }
    return null;
  }, [release_date, last_air_date]);

  return (
    <>
      <div
        className="banner"
        style={{ backgroundImage: `url(${getImg.backdropUrl})` }}
      ></div>

      <div className="movie__content container">
        <div className="movie__content__poster">
          <div
            className="movie__content__poster__img"
            style={{ backgroundImage: `url(${getImg.posterUrl})` }}
          ></div>
        </div>
        <div className="movie__content__info">
          <h1 className="title">{`${title ?? name} ${
            releaseDate ? `(${releaseDate})` : ''
          }`}</h1>
          <p className="overview">{overview}</p>
          <div className="genres">
            {genres?.map((genre) => (
              <Button key={genre?.id} onClick={() => null} border sizeS>
                {genre?.name}
              </Button>
            ))}
          </div>

          {cast.length > 0 && (
            <div className="cast">
              <Title>
                <h1 className="cast__title">Series Cast</h1>
              </Title>

              <CaseList cast={cast} />
            </div>
          )}

          {/* <Button onClick={() => null} icon="bx-play bx-sm" color="primary">
            Play Now
          </Button> */}
        </div>
      </div>
    </>
  );
};

Details.propTypes = {
  movieInfo: PropTypes.object.isRequired,
  cast: PropTypes.array.isRequired,
};

export default Details;
