import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { limitPage } from '../../constants';
import { convertFilterName } from '../../utils';
import Button from '../Button';
import MovieCard from '../MovieCard';
import './MovieSection.scss';

const MovieSection = ({
  content,
  viewAllBtn,
  horizontalFilter,
  verticalFilter,
  loadMoreBtn,
}) => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState(content?.defaultFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState({ loading: false, hidden: false });

  const dropdownFilterRef = useRef(null);

  const handleVerticalFilter = (key) => {
    setFilter(key);
    handleHideVerticalFilter();
    setCurrentPage(1);
    setLoadMore({ loading: false, hidden: false });
  };

  const handleHideVerticalFilter = () => {
    dropdownFilterRef.current.classList.remove('active');
  };

  useEffect(() => {
    setFilter(content?.defaultFilter);
    setCurrentPage(1);
    setLoadMore({ loading: false, hidden: false });
  }, [content]);

  useEffect(() => {
    (async () => {
      setLoadMore((prev) => {
        if (currentPage > limitPage) {
          return { ...prev, loading: true, hidden: true };
        }
        return { ...prev, loading: true };
      });

      try {
        const response = await content?.filters?.[filter]({
          params: { page: currentPage },
        });

        setMovies((prev) => {
          if (currentPage !== 1 && currentPage <= limitPage) {
            const filters = response.results.filter((item) => {
              return !prev.find(({ id }) => item.id === id) && item;
            });
            return [...prev, ...filters];
          }
          if (currentPage > limitPage) {
            return prev;
          }
          return response.results;
        });

        setLoadMore((prev) => ({ ...prev, loading: false }));
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [content, filter, currentPage]);

  return (
    <div className="movie-section section">
      <header className="movie-section__header mb-2">
        <h1 className="movie-section__title ">
          {content?.title ?? content?.display}
        </h1>
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

        {horizontalFilter && (
          <div className="movie-section__filters">
            {Object.keys(content?.filters).map((name, i) => (
              <Button
                key={i}
                onClick={() => setFilter(name)}
                sizeS
                icon={content?.filterIcons?.[name]}
                color={filter === name ? 'primary' : 'sliver'}
              >
                {convertFilterName(name)}
              </Button>
            ))}
          </div>
        )}

        {verticalFilter && (
          <div
            className="movie-section__dropdown-filter"
            ref={dropdownFilterRef}
            onBlur={handleHideVerticalFilter}
          >
            <Button
              sizeS
              color="sliver"
              icon="bxs-sort-alt bx-xs"
              onClick={() =>
                dropdownFilterRef.current.classList.toggle('active')
              }
            >
              Sort Filter
            </Button>

            <ul className="movie-section__dropdown-filter__list">
              {Object.keys(content?.filters).map((name, i) => (
                <li className="movie-section__dropdown-filter__item" key={i}>
                  <input
                    type="radio"
                    id={name}
                    value={name}
                    checked={name === filter}
                    onChange={(e) => handleVerticalFilter(e.target.value)}
                  />
                  <label htmlFor={name}>{convertFilterName(name)}</label>
                </li>
              ))}
            </ul>
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
            type={movie?.media_type}
            path={content?.path}
          />
        ))}
      </div>

      {loadMoreBtn && !loadMore.hidden && (
        <div className="movie-section__load-more">
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            color="primary"
            sizeS
            icon={loadMore.loading ? 'bx-loader-circle bx-spin bx-sz' : ''}
            disabled={loadMore.loading}
          >
            {loadMore.loading ? 'Loading' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

MovieSection.propTypes = {
  content: PropTypes.object.isRequired,
  viewAllBtn: PropTypes.bool,
  horizontalFilter: PropTypes.bool,
  verticalFilter: PropTypes.bool,
  loadMoreBtn: PropTypes.bool,
};

export default React.memo(MovieSection);
