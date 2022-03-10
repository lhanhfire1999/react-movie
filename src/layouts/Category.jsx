import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from '../components';

const Category = () => {
  const { category } = useParams();
  const title = useMemo(() => {
    if (category === 'movie') {
      return 'Movie';
    } else if (category === 'tv') {
      return 'Tv Series';
    }
    return null;
  }, [category]);

  return (
    <>
      {!title && <NotFound />}
      {title && <h1>{title}</h1>}
    </>
  );
};

export default Category;
