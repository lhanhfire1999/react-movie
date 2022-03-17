import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetails, NotFound } from '../components';

const Detail = () => {
  const { category, id } = useParams();

  const isMatchParam = useMemo(() => {
    if ((category === 'movie' || category === 'tv') && !isNaN(id)) {
      return true;
    }
    return null;
  }, [category, id]);

  return (
    <>
      {!isMatchParam && <NotFound />}
      {isMatchParam && <MovieDetails id={id} genre={category} />}
    </>
  );
};

export default Detail;
