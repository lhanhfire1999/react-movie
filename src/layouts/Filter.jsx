import React, { useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import tmdbApi from '../api/tmdpApi';
import { FilterForm, MovieList, Title } from '../components';
import { filterForm } from '../constants';

const Filter = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  const searchLocation = useMemo(() => {
    if (location.search) {
      return queryString.parse(location.search);
    }
    return null;
  }, [location.search]);

  useEffect(() => {
    (async () => {
      if (searchLocation) {
        const params = { params: { ...searchLocation } };
        delete params[filterForm.type.paramKey];
        const res = await tmdbApi.getFilterMovies(searchLocation.type, params);
        setMovies(res.results);
      }
    })();
  }, [searchLocation]);
  return (
    <div className="container section" style={{ minHeight: '100vh' }}>
      <Title>Filter Movies</Title>
      <FilterForm />
      {movies.length > 0 && (
        <MovieList movies={movies} genre={searchLocation.type} />
      )}
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
