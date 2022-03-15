import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MovieSection, NotFound } from '../components';
import { movieGenres } from '../constants';

const Category = () => {
  const { category } = useParams();

  const movieGenre = useMemo(() => movieGenres?.[category], [category]);

  return (
    <>
      {!movieGenre && <NotFound />}
      {movieGenre && (
        <div className="container">
          <MovieSection content={movieGenre} verticalFilter loadMoreBtn />
        </div>
      )}
    </>
  );
};

export default Category;
