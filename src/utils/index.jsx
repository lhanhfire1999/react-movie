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
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
};

export const getTrailerUrl = (key) => {
  return `https://www.youtube-nocookie.com/embed/${key}?autoplay=1`;
};
