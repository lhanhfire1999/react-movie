import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import './MovieSection.scss';
import MovieCard from '../MovieCard';

const MovieSection = ({ content, viewAllBtn, filterMode }) => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleFilter = (key) => {
    setFilter(key);
  };

  useEffect(() => {
    (async () => {
      const response = await (content?.filters?.[filter]() ??
        content?.defaultApi());
      setMovies(response.results);
    })();
  }, [content, filter]);

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

        {filterMode && (
          <div className="movie-section__filters">
            {Object.keys(content?.filters).map((name, i) => (
              <Button
                key={i}
                onClick={() => handleFilter(name)}
                sizeS
                icon={
                  name === 'all'
                    ? 'bx-trending-up'
                    : name === 'tv'
                    ? 'bx-tv'
                    : 'bx-movie'
                }
                color={filter === name ? 'primary' : 'sliver'}
              >
                {name === 'all'
                  ? 'Trending'
                  : name === 'tv'
                  ? 'Tv Series'
                  : name.slice(0, 1).toUpperCase() + name.slice(1)}
              </Button>
            ))}
          </div>
        )}
      </header>

      <div className="row">
        {movies.map((movie) => (
          <MovieCard
            key={movie?.id}
            id={movie?.id}
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
  content: PropTypes.object.isRequired,
  viewAllBtn: PropTypes.bool,
  filterMode: PropTypes.bool,
};

export default React.memo(MovieSection);
