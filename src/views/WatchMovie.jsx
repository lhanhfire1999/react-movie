import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdpApi';
import { Preloader, TvSeason, VideoIframe } from '../components';
import queryString from 'query-string';
import { isPositiveInteger } from '../utils';

const WatchMovie = () => {
  const navigate = useNavigate();
  const { category, movieId } = useParams();
  const { search } = useLocation();

  const [state, setState] = useState({ preloader: true, movieInfo: {} });

  useEffect(() => {
    if (category === 'movie' && search) {
      return navigate('/error');
    }

    (async () => {
      const res = await tmdbApi.getDetails(category, movieId);

      if (category === 'tv' && search) {
        const hashSearchParams = queryString.parse(search);
        if (!hashSearchParams?.ss || !hashSearchParams?.ep) {
          return navigate('/error');
        }

        if (
          !isPositiveInteger(hashSearchParams?.ss) ||
          !isPositiveInteger(hashSearchParams?.ep)
        ) {
          return navigate('/error');
        }

        if (
          +hashSearchParams?.ss > res?.number_of_seasons ||
          +hashSearchParams?.ep > res?.number_of_episodes
        ) {
          return navigate('/error');
        }

        const isEpisode = res?.seasons.some(
          ({ season_number, episode_count }) => {
            if (season_number === +hashSearchParams?.ss) {
              return +hashSearchParams?.ep <= episode_count;
            }
            return false;
          }
        );

        if (!isEpisode) {
          return navigate('/error');
        }
      }

      setState((prev) => ({ ...prev, movieInfo: res, preloader: false }));
    })();
  }, [category, movieId, navigate, search]);

  return (
    <>
      {console.log('re-render')}
      {state.preloader && <Preloader />}
      {Object.keys(state.movieInfo).length > 0 && (
        <VideoIframe
          category={category}
          id={state.movieInfo?.id}
          backdropPath={
            state.movieInfo?.backdrop_path || state.movieInfo?.poster_path
          }
        />
      )}

      <div className="container">
        {state.movieInfo?.seasons?.length > 0 && (
          <TvSeason seasons={state.movieInfo?.seasons} />
        )}
      </div>
    </>
  );
};

export default WatchMovie;
