import { useMemo } from 'react';
import apiConfig from '../api/apiConfig';
import { unavailableLandscape, unavailablePoster } from '../constants';

const useBackdropPath = (backdrop_path = '') => {
  return useMemo(() => {
    return backdrop_path
      ? apiConfig.originalImage(backdrop_path)
      : unavailableLandscape;
  }, [backdrop_path]);
};

const usePosterPath = (poster_path = '') => {
  return useMemo(() => {
    return poster_path ? apiConfig.w500Image(poster_path) : unavailablePoster;
  }, [poster_path]);
};

const useReleaseYear = (release_date = '') => {
  return useMemo(() => {
    return release_date ? release_date.slice(0, 4) : null;
  }, [release_date]);
};

export { useBackdropPath, usePosterPath, useReleaseYear };
