import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import tmdbApi from '../api/tmdpApi';
import { FilterForm, LoadMoreBtn, MovieList, Title } from '../components';
import { filterForm } from '../constants';
import { handleScrollTop } from '../utils';

const Filter = () => {
  const [movies, setMovies] = useState([]);
  const [loadMoreBtn, setLoadMoreBtn] = useState({
    loading: false,
    hidden: true,
  });

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const hashSearchParams = useMemo(() => {
    if (location.search) {
      return queryString.parse(location.search);
    }
    return null;
  }, [location.search]);

  useEffect(() => {
    (async () => {
      if (hashSearchParams) {
        setLoadMoreBtn((prev) => ({ ...prev, loading: true }));

        const params = { params: { ...hashSearchParams } };
        delete params[filterForm.type.paramKey];
        const res = await tmdbApi.getDiscover(hashSearchParams.type, params);
        setMovies(res.results);
        setLoadMoreBtn((prev) => {
          if (
            !res.total_pages ||
            res.total_pages <= 1 ||
            parseInt(hashSearchParams['page']) >= res.total_pages
          ) {
            return { ...prev, loading: false, hidden: true };
          }

          if (res.total_pages > 1) {
            return { ...prev, loading: false, hidden: false };
          }
        });
      }
    })();
  }, [hashSearchParams]);

  const handleLoadMoreBtn = () => {
    handleScrollTop();
    searchParams.set(
      'page',
      hashSearchParams['page'] ? parseInt(hashSearchParams['page']) + 1 : 2
    );
    setSearchParams(searchParams);
  };

  return (
    <div className="container section" style={{ minHeight: '100vh' }}>
      <Title>Filter Movies</Title>
      <FilterForm />
      {movies.length > 0 && (
        <MovieList movies={movies} genre={hashSearchParams.type} />
      )}

      {!loadMoreBtn.hidden && (
        <LoadMoreBtn
          loading={loadMoreBtn.loading}
          onClick={handleLoadMoreBtn}
        />
      )}
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
