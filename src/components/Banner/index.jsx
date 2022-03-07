import React, { useEffect, useState } from 'react';

import tmdbApi, { movieType } from '../../api/tmdpApi';
import BannerItem from './BannerItem';
import './Banner.scss';

const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        });
        setMovies(response.results.slice(0, 1));
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="banner">
      {movies.map((movie) => (
        <BannerItem key={movie.id} movies={movie} />
      ))}
    </div>
  );
};

export default Banner;
