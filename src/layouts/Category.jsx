import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { headerNav } from '../constants';

const Category = () => {
  const { category } = useParams();
  const title = useMemo(() => {
    return headerNav.reduce((prev, { display, path }) => {
      console.log(path.slice(1) === category);
      if (path.slice(1) === category) {
        return prev + display;
      }
      return prev;
    }, '');
  }, [category]);
  return <h1>{title}</h1>;
};

export default Category;
