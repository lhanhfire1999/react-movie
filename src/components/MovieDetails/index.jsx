import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import tmdbApi from '../../api/tmdpApi';
import { $ } from '../../constants';
import Loading from '../Loading';
import Details from './Details';
import './MovieDetails.scss';

const MovieDetails = ({ id, genre }) => {
  const [state, setState] = useState({ movieInfo: {}, cast: [] });

  useEffect(() => {
    (async () => {
      $(`#loading-${genre}-${id}`).classList.add('active');
      try {
        const { credits, getDetails } = tmdbApi;
        const responses = await Promise.all([
          getDetails(genre, id),
          credits(genre, id),
        ]);

        setState((prev) => ({
          ...prev,
          movieInfo: responses[0],
          cast: responses[1]?.cast?.slice(0, 10),
        }));

        $(`#loading-${genre}-${id}`).classList.remove('active');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    })();
  }, [id, genre]);

  return (
    <div className="movie-details">
      <Loading id={`loading-${genre}-${id}`} />
      {Object.keys(state.movieInfo).length > 0 && (
        <Details movieInfo={state.movieInfo} cast={state.cast} />
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  id: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

export default MovieDetails;
