import React from 'react';
import { FilterForm, Title } from '../components';

const Filter = () => {
  return (
    <div className="container section" style={{ minHeight: '100vh' }}>
      <Title>Filter Movies</Title>
      <FilterForm />
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
