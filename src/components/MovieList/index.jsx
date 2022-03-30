import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard';

const MovieList = ({ movies, genre, path }) => {
  return (
    <div className="movie-list">
      <div className="row">
        {movies?.map((movie) => (
          <div className="col-lg-2 col-md-3 col-6 " key={movie?.id}>
            <MovieCard
              id={movie?.id}
              posterUrl={movie?.poster_path}
              title={movie?.title ?? movie?.name}
              releaseDate={movie?.release_date ?? movie?.first_air_date}
              genre={movie?.media_type ?? genre}
              path={path}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  genre: PropTypes.string,
  path: PropTypes.string,
};

export default React.memo(MovieList);
