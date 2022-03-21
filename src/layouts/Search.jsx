import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieList, Title } from '../components';
import tmdbApi from '../api/tmdpApi';

const Search = () => {
  const [searchParams] = useSearchParams({});

  const [state, setState] = useState({
    movies: [],
    currentPage: 1,
  });

  const searchKeyword = useMemo(() => {
    return searchParams.get('keyword');
  }, [searchParams]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentPage: searchParams.get('page') ?? 1,
    }));
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      if (searchKeyword) {
        const params = {
          query: searchKeyword,
          page: state.currentPage,
        };
        const res = await tmdbApi.searchMultiByKeyword({ params });

        const resFilter = res.results.filter((item) => {
          return ['movie', 'tv'].find(
            (type) => type === item?.media_type && item
          );
        });
        setState((prev) => ({ ...prev, movies: resFilter }));
      }
    })();
  }, [searchKeyword, state.currentPage]);

  return (
    <div className="search section">
      {searchKeyword && (
        <>
          <Title>
            <h2>Result for: {searchKeyword}</h2>
          </Title>

          {state.movies.length > 0 && <MovieList movies={state.movies} />}
        </>
      )}
    </div>
  );
};

export default Search;
