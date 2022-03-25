import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { filterForm } from '../../constants';
import Button from '../Button';
import './FilterForm.scss';
import FilterFormControl from './FilterFormControl';

const FilterForm = () => {
  const [formStates, setformStates] = useState({
    type: filterForm.type.defaultChild,
    genre: [],
    country: [],
    releaseYear: [],
    sort: filterForm.sort.defaultChild,
  });

  const [apiGenres, setApiGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await filterForm.genre.children(formStates.type);
      setApiGenres(res.genres);
      setformStates((prev) => ({ ...prev, genre: [] }));
    })();
  }, [formStates.type]);

  const handleChangeRadio = useCallback((key, value) => {
    return setformStates((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleChangeCheckbox = useCallback((key, value) => {
    setformStates((prev) => {
      const isExistedValue = prev[key].includes(value);
      if (isExistedValue) {
        const cleanResults = prev[key].filter((item) => item !== value);
        return { ...prev, [key]: cleanResults };
      }
      return { ...prev, [key]: [...prev[key], value] };
    });
  }, []);

  const selectedTypeName = useMemo(() => {
    const selectedType = filterForm.type.children.find(
      (item) => item.id === formStates.type
    );
    return selectedType.name;
  }, [formStates.type]);

  const selectedSortName = useMemo(() => {
    const selectedSort = filterForm.sort.children.find(
      (item) => item.id === formStates.sort
    );
    return selectedSort.name;
  }, [formStates.sort]);

  const countGenre = useMemo(() => {
    return formStates.genre.length > 0
      ? `${formStates.genre.length} selected`
      : '';
  }, [formStates.genre]);

  const countCountry = useMemo(() => {
    return formStates.country.length > 0
      ? `${formStates.country.length} selected`
      : '';
  }, [formStates.country]);

  const countReleaseYear = useMemo(() => {
    return formStates.releaseYear.length > 0
      ? `${formStates.releaseYear.length} selected`
      : '';
  }, [formStates.releaseYear]);

  const handleClickFilterGroup = (e) => {
    const filterGroupNode = e.target.closest('.filter-form__group');
    filterGroupNode.classList.toggle('active');
  };

  const handleBlur = (e) => {
    const filterGroupNode = e.target.closest('.filter-form__group');
    if (filterGroupNode.classList.contains('active')) {
      filterGroupNode.classList.remove('active');
    }
  };

  return (
    <div className="filter-form">
      <div
        className="filter-form__group"
        onClick={handleClickFilterGroup}
        onBlur={handleBlur}
      >
        <Button sizeS color="sliver" icon={filterForm.type.icon}>
          {`${filterForm.type.title} ${selectedTypeName}`}
        </Button>
        <FilterFormControl
          stateKey="type"
          type="radio"
          data={filterForm.type.children}
          checkedData={formStates.type}
          onClick={handleChangeRadio}
        />
      </div>

      <div
        className="filter-form__group"
        onClick={handleClickFilterGroup}
        onBlur={handleBlur}
      >
        <Button sizeS color="sliver" icon={filterForm.genre.icon}>
          {`${filterForm.genre.title} ${countGenre}`}
        </Button>
        <FilterFormControl
          stateKey="genre"
          type="checkbox"
          data={apiGenres}
          checkedData={formStates.genre}
          onClick={handleChangeCheckbox}
        />
      </div>

      <div
        className="filter-form__group"
        onClick={handleClickFilterGroup}
        onBlur={handleBlur}
      >
        <Button sizeS color="sliver" icon={filterForm.country.icon}>
          {`${filterForm.country.title} ${countCountry}`}
        </Button>
        <FilterFormControl
          stateKey="country"
          type="checkbox"
          data={filterForm.country.children}
          checkedData={formStates.country}
          onClick={handleChangeCheckbox}
        />
      </div>

      <div
        className="filter-form__group"
        onClick={handleClickFilterGroup}
        onBlur={handleBlur}
      >
        <Button sizeS color="sliver" icon={filterForm.releaseYear.icon}>
          {`${filterForm.releaseYear.title}  ${countReleaseYear}`}
        </Button>
        <FilterFormControl
          stateKey="releaseYear"
          type="checkbox"
          data={filterForm.releaseYear.children}
          checkedData={formStates.releaseYear}
          onClick={handleChangeCheckbox}
        />
      </div>

      <div
        className="filter-form__group"
        onClick={handleClickFilterGroup}
        onBlur={handleBlur}
      >
        <Button sizeS color="sliver" icon={filterForm.sort.icon}>
          {`${filterForm.sort.title}  ${selectedSortName}`}
        </Button>
        <FilterFormControl
          stateKey="sort"
          data={filterForm.sort.children}
          type="radio"
          onClick={handleChangeRadio}
          checkedData={formStates.sort}
        />
      </div>

      <div className="filter-form__group">
        <Button sizeS color="primary" icon={filterForm.submit.icon}>
          {filterForm.submit.title}
        </Button>
      </div>
    </div>
  );
};

export default FilterForm;
