import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import tmdbApi from '../../api/tmdpApi';
import { $ } from '../../constants';
import { handleScrollTop } from '../../utils';
import Loading from '../Loading';
import TrailerModal from '../TrailerModal';
import Details from './Details';
import './MovieDetails.scss';

const MovieDetails = ({ id, genre }) => {
  const [state, setState] = useState({
    movieInfo: {},
    cast: [],
    videos: [],
    similars: [],
  });

  useLayoutEffect(() => {
    $(`#loading-${genre}-${id}`).classList.add('active');
  }, [genre, id]);

  useEffect(() => {
    (async () => {
      try {
        handleScrollTop();
        const { credits, getDetails, getVideos, getSimilarMovies } = tmdbApi;
        const responses = await Promise.all([
          getDetails(genre, id),
          credits(genre, id),
          getVideos(genre, id),
          getSimilarMovies(genre, id),
        ]);

        setState((prev) => ({
          ...prev,
          movieInfo: responses[0],
          cast: responses[1]?.cast?.slice(0, 10),
          videos: responses[2]?.results.slice(0, 5),
          similars: responses[3]?.results,
        }));

        $(`#loading-${genre}-${id}`).classList.remove('active');
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [id, genre]);

  return (
    <div className="movie-details">
      <Loading id={`loading-${genre}-${id}`} />
      {Object.keys(state.movieInfo).length > 0 && (
        <Details
          movieInfo={state.movieInfo}
          cast={state.cast}
          videos={state.videos}
          similars={state.similars}
          genre={genre}
        />
      )}

      {state.videos?.map((video) => (
        <TrailerModal id={video?.id} key={video?.id} />
      ))}
    </div>
  );
};

MovieDetails.propTypes = {
  id: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

export default MovieDetails;
