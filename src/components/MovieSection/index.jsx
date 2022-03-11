import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import './MovieSection.scss';
import MovieCard from '../MovieCard';

const MovieSection = ({ content, viewAllBtn }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await content?.getApi();
      setMovies(response.results);
    })();
  }, [content]);

  return (
    <div className="movie-section mt-3">
      <header className="movie-section__header mb-2">
        <h1 className="movie-section__title ">{content?.title}</h1>
        {viewAllBtn && (
          <Button
            icon="bxs-chevron-right"
            color="transparent"
            sizeS
            reverse
            linkTo={content?.path}
          >
            View All
          </Button>
        )}
      </header>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard
            key={movie?.id}
            posterUrl={movie?.poster_path}
            title={movie?.title ?? movie?.name}
            releaseDate={movie?.release_date ?? movie?.first_air_date}
            type={movie?.media_type ?? content?.path}
          />
        ))}
      </div>
    </div>
  );
};

MovieSection.propTypes = {
  content: PropTypes.object,
  viewAllBtn: PropTypes.bool,
};

export default MovieSection;
