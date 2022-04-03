import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import tmdbApi from '../api/tmdpApi';
import { FilterForm, MovieList, Title } from '../components';
import Pagination from '../components/Pagination';
import { filterForm } from '../constants';
import { useTitle } from '../utils';

const Filter = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();

  const hashSearchParams = useMemo(() => {
    if (location.search) {
      return queryString.parse(location.search);
    }
    return null;
  }, [location.search]);

  useTitle('filter', null);
  useEffect(() => {
    (async () => {
      if (hashSearchParams) {
        const params = { params: { ...hashSearchParams } };
        delete params[filterForm.type.paramKey];
        const res = await tmdbApi.getDiscover(hashSearchParams.type, params);

        setMovies(res.results);
        setTotalPages(res.total_pages);
      }
    })();
  }, [hashSearchParams]);

  return (
    <div className="container section" style={{ minHeight: '50vh' }}>
      <Title>Filter Movies</Title>
      <FilterForm />
      {movies.length > 0 && (
        <MovieList movies={movies} genre={hashSearchParams.type} />
      )}

      {!!totalPages && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default Filter;