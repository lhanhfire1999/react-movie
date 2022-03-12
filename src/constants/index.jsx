import tmdbApi, { category, movieType, tvType } from '../api/tmdpApi';

export const headerNav = [
  { display: 'home', path: '/' },
  { display: 'movies', path: '/movie' },
  { display: 'tv series', path: '/tv' },
];

export const movieSections = [
  {
    title: 'Recommended',
    defaultApi() {
      return tmdbApi.getTrendingList(category.all);
    },
    get filters() {
      const that = this;

      return {
        all: () => that.defaultApi(),
        movie: () => tmdbApi.getTrendingList(category.movie),
        tv: () => tmdbApi.getTrendingList(category.tv),
      };
    },
  },

  {
    title: 'Popular Movies',
    path: '/movie',
    defaultApi() {
      return tmdbApi.getMovieList(movieType.popular);
    },
  },

  {
    title: 'Popular Tv Series',
    path: '/tv',
    defaultApi() {
      return tmdbApi.getTvList(tvType.popular);
    },
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

export const videoUrl = 'https://www.youtube-nocookie.com/embed/';
