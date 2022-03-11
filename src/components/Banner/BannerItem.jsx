import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';

import apiConfig from '../../api/apiConfig';
import tmdbApi, { category } from '../../api/tmdpApi';
import { noVideoUrl, videoUrl } from '../../constants';

import Button from '../Button';

const BannerItem = ({ movies, active }) => {
  const {
    id,
    title,
    overview,
    genre_names,
    release_date,
    vote_average,
    backdrop_path,
    poster_path,
  } = movies;

  const imgUrl = useMemo(() => {
    const original = apiConfig.originalImage(
      backdrop_path ? backdrop_path : poster_path
    );
    const w500 = apiConfig.w500Image(poster_path ? poster_path : backdrop_path);
    return { original, w500 };
  }, [backdrop_path, poster_path]);

  const releaseDate = useMemo(() => release_date.slice(0, 4), [release_date]);
  const genreNames = useMemo(() => genre_names.join(', '), [genre_names]);

  const handleOpenTrailerModal = useCallback(async () => {
    const trailerModal = document.querySelector(`#trailer-modal-${id}`);
    const iframe = trailerModal.querySelector(`iframe`);
    const trailerVideos = await tmdbApi.getVideos(category.movie, id);

    if (trailerVideos.results.length > 0) {
      iframe.setAttribute(
        'src',
        videoUrl + trailerVideos.results[0].key + '?autoplay=1'
      );
    } else {
      iframe.setAttribute('src', noVideoUrl);
    }
    trailerModal.classList.add('active');
  }, [id]);

  return (
    <div
      className={clsx('banner__item', { active })}
      style={{ backgroundImage: `url(${imgUrl.original})` }}
    >
      <div className="container item-wraper">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="item-content">
              <h1 className="item-content__title">{title}</h1>
              <ul className="item-content__infos">
                <li>{vote_average}/10</li>
                <li>{releaseDate}</li>
                <li>{genreNames}</li>
              </ul>
              <p className="item-content__description">{overview}</p>
              <div className="item-content__actions">
                <Button
                  color="primary"
                  icon="bx-play"
                  onClick={handleOpenTrailerModal}
                >
                  Watch Trailer
                </Button>
                <Button
                  color="info"
                  icon="bx-info-circle"
                  linkTo={`movie/${id}`}
                >
                  More Info
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-0">
            <div className="item-poster">
              <img src={imgUrl.w500} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  movies: PropTypes.object.isRequired,
  active: PropTypes.bool,
};

export default BannerItem;
