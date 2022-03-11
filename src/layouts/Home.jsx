import React from 'react';
import tmdbApi, { category, movieType, tvType } from '../api/tmdpApi';
import { Banner, MovieSection } from '../components';

const movieSections = [
  {
    title: 'Recommended',
    getApi() {
      return tmdbApi.getTrendingList(category.all);
    },
  },
  {
    title: 'Popular Movies',
    path: '/movie',
    getApi() {
      return tmdbApi.getMovieList(movieType.popular);
    },
  },
  {
    title: 'Popular Tv Series',
    path: '/tv',
    getApi() {
      return tmdbApi.getTvList(tvType.popular);
    },
  },
];

const Home = () => {
  return (
    <>
      <Banner />
      <div className="main-content ">
        <div className="container">
          {movieSections.map((content, i) => (
            <MovieSection
              key={i}
              content={content}
              viewAllBtn={content.title !== 'Recommended'}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
