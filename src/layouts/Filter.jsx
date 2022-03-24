import React from 'react';
import PropTypes from 'prop-types';
import { FilterForm, Title } from '../components';

const Filter = (props) => {
  return (
    <div className="container section">
      <Title>Filter Movies</Title>
      <FilterForm />
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
