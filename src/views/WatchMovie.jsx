import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Video } from '../components';

const WatchMovie = () => {
  const { state } = useLocation();
  const [movieInfo, setMovieInfo] = useState([]);

  useEffect(() => {
    setMovieInfo((prev) => {
      if (state && prev?.id !== state?.id) {
        return state;
      }
      return prev;
    });
  }, [state]);

  return (
    <>
      <Video
        id={movieInfo?.id}
        backdropPath={movieInfo?.backdrop_path || movieInfo?.poster_path}
      />
    </>
  );
};

export default WatchMovie;
