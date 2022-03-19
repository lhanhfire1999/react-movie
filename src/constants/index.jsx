import tmdbApi, { category, movieType, tvType } from '../api/tmdpApi';
import { convertFilterName } from '../utils';

export const mobileWidth = 740;

export const limitPage = 500;

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const headerNav = [
  { display: 'home', path: '/' },
  { display: 'movies', path: '/movie' },
  { display: 'tv series', path: '/tv' },
  { display: 'filter', path: '/search' },
];

export const footerLinks = [
  {
    title: 'Browse',
    childrens: [
      { title: 'Home', path: '/' },
      { title: 'Movies', path: '/movie' },
      { title: 'TV Series', path: '/tv' },
      { title: 'Filter', path: '/search' },
    ],
  },

  {
    title: 'Support',
    childrens: [
      { title: 'FAQs', path: '/' },
      { title: 'Contact Us', path: '/' },
      { title: 'Terms of Use', path: '/' },
    ],
  },
];

// Category page
export const movieGenres = {
  movie: {
    display: 'Movies',
    defaultFilter: movieType.popular,
    filters: {
      [movieType.popular]: (params) =>
        tmdbApi.getMovieList(movieType.popular, params),
      [movieType.top_rated]: (params) =>
        tmdbApi.getMovieList(movieType.top_rated, params),
      [movieType.trending]: (params) =>
        tmdbApi.getTrendingList(category.movie, params),
    },
    path: '/movie',
  },

  tv: {
    display: 'Tv Series',
    defaultFilter: tvType.popular,
    filters: {
      [tvType.popular]: (params) => tmdbApi.getTvList(tvType.popular, params),
      [tvType.top_rated]: (params) =>
        tmdbApi.getTvList(tvType.top_rated, params),
      [tvType.trending]: (params) =>
        tmdbApi.getTrendingList(category.tv, params),
    },
    path: '/tv',
  },
};

// Home Page
export const movieSections = [
  {
    display: 'Recommended',
    defaultFilter: 'movies',
    filters: {
      movies: (params) => tmdbApi.getTrendingList(category.movie, params),
      tv_series: (params) => tmdbApi.getTrendingList(category.tv, params),
      trending: (params) => tmdbApi.getTrendingList(category.all, params),
    },
    filterIcons: {
      movies: 'bx-trending-up',
      tv_series: 'bx-tv',
      trending: 'bx-movie',
    },
    horizontalFilter: true,
  },

  {
    ...movieGenres.movie,
    display: `${convertFilterName(movieGenres.movie.defaultFilter)} ${
      movieGenres.movie.display
    }`,
  },

  {
    ...movieGenres.tv,
    display: `${convertFilterName(movieGenres.tv.defaultFilter)} ${
      movieGenres.tv.display
    }`,
  },
];

// contentModal and singleContent
export const unavailablePoster =
  'https://www.movienewz.com/img/films/poster-holder.jpg';

// contentModal
export const unavailableLandscape =
  'https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg';

// For Carousel
export const noPicture =
  'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

export const noVideoUrl =
  'https://www.youtube-nocookie/embed/watch?v=039nv45oth8';
