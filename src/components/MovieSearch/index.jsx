import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Title from '../Title';
import tmdbApi from '../../api/tmdpApi';
import MovieList from '../MovieList';
import Preloader from '../Preloader';
import LoadMoreBtn from '../LoadMoreBtn';

const MovieSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [preloader, setPreloader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const urlSearchParams = useMemo(
    () => ({
      keyword: searchParams.get('keyword'),
      currentPage: parseInt(searchParams.get('page')) || 1,
    }),
    [searchParams]
  );

  useEffect(() => {
    if (urlSearchParams.keyword) {
      (async () => {
        setLoadMoreBtn(true);
        const params = {
          query: urlSearchParams.keyword,
          page: urlSearchParams.currentPage,
        };
        const res = await tmdbApi.searchMultiByKeyword({ params });

        const resFilter = res.results.filter((item) => {
          return ['movie', 'tv'].some((type) => type === item?.media_type);
        });
        setMovies((prev) => {
          if (urlSearchParams.currentPage !== 1) {
            const results = resFilter.filter((item) => {
              return !prev.some(({ id }) => item.id === id);
            });
            return [...prev, ...results];
          }

          return resFilter;
        });
        setTotalPage(res.total_pages);
        setLoadMoreBtn(false);
        setPreloader(false);
      })();
    } else {
      return navigate('/');
    }
  }, [navigate, urlSearchParams.currentPage, urlSearchParams.keyword]);

  const handleLoadMoreBtn = () => {
    if (!loadMoreBtn.hidden) {
      searchParams.set('page', urlSearchParams.currentPage + 1);
      return setSearchParams(searchParams);
    }
    return null;
  };

  return (
    <div className="search-movie section container">
      {preloader && <Preloader />}
      <Title>{`Result for: ${urlSearchParams.keyword}`}</Title>

      {movies.length > 0 && <MovieList movies={movies} />}
      {totalPage > urlSearchParams.currentPage && (
        <LoadMoreBtn
          loading={loadMoreBtn.loading}
          onClick={handleLoadMoreBtn}
        />
      )}
    </div>
  );
};

export default React.memo(MovieSearch);
