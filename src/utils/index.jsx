export const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const convertFilterName = (name) => {
  const filterName = name
    .split('_')
    .map((item) => `${item.slice(0, 1).toUpperCase() + item.slice(1)}`)
    .join(' ');
  return filterName;
};

export const getTrailerThumbUrl = (key) => {
  const baseUrl = 'https://i1.ytimg.com/vi';

  return {
    get default() {
      return `${baseUrl}/${key}/default.jpg`;
    },
    get medium() {
      return `${baseUrl}/${key}/mqdefault.jpg`;
    },
    get high() {
      return `${baseUrl}/${key}/hqdefault.jpg`;
    },
    get standard() {
      return `${baseUrl}/${key}/sddefault.jpg`;
    },
    get maxresdefault() {
      return `${baseUrl}/${key}/maxresdefault.jpg`;
    },
  };
};

export const getTrailerUrl = (key) => {
  return `https://www.youtube-nocookie.com/embed/${key}?autoplay=1`;
};
