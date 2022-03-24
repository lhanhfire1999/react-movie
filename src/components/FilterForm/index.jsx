import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './FilterForm.scss';
import Button from '../Button';
import tmdbApi, { category } from '../../api/tmdpApi';
import FilterFormControl from './FilterFormControl';

const filterForm = {
  type: {
    title: 'Type',
    icon: 'bxs-copy bx-xs',
    get defaultChild() {
      return this.children[0].id;
    },
    children: [
      { id: category.movie, name: 'Movie' },
      { id: category.tv, name: 'TV Series' },
    ],
  },
  genre: {
    title: 'Genre',
    icon: 'bxs-folder-open bx-xs',
    paramKey: 'with_genres',
    children(type = category.movie) {
      return tmdbApi.getGenres(type);
    },
  },
  country: {
    title: 'Country',
    icon: 'bx-world bx-xs',
    paramKey: 'with_origin_country',
    children: [
      { id: 'AR', name: 'Argentina' },
      { id: 'AT', name: 'Austria' },
      { id: 'AU', name: 'Australia' },
      { id: 'BE', name: 'Belgium' },
      { id: 'BR', name: 'Brazil' },
      { id: 'CA', name: 'Canada' },
      { id: 'CH', name: 'Switzerland' },
      { id: 'CN', name: 'China' },
      { id: 'CZ', name: 'Czech Republic' },
      { id: 'DE', name: 'Germany' },
      { id: 'DK', name: 'Denmark' },
      { id: 'ES', name: 'Spain' },
      { id: 'FI', name: 'Finland' },
      { id: 'FR', name: 'France' },
      { id: 'GB', name: 'United Kingdom' },
      { id: 'HK', name: 'Hong Kong' },
      { id: 'HU', name: 'Hungary' },
      { id: 'IE', name: 'Ireland' },
      { id: 'IL', name: 'Israel' },
      { id: 'IN', name: 'India' },
      { id: 'IT', name: 'Italy' },
      { id: 'JP', name: 'Japan' },
      { id: 'KR', name: 'South Korea' },
      { id: 'LU', name: 'Luxembourg' },
      { id: 'MX', name: 'Mexico' },
      { id: 'NL', name: 'Netherlands' },
      { id: 'NO', name: 'Norway' },
      { id: 'NZ', name: 'New Zealand' },
      { id: 'PH', name: 'Philippines' },
      { id: 'PL', name: 'Poland' },
      { id: 'RO', name: 'Romania' },
      { id: 'RU', name: 'Russia' },
      { id: 'SE', name: 'Sweden' },
      { id: 'TH', name: 'Thailand' },
      { id: 'TW', name: 'Taiwan' },
      { id: 'ZA', name: 'South Africa' },
    ],
  },
  releaseYear: {
    title: 'Year',
    icon: 'bx-calendar bx-xs',
    paramKey: 'primary_release_year',
    children: [
      '2022',
      '2021',
      '2020',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      '2011',
      '2010',
      '2009',
      '2008',
      '2007',
      '2006',
      '2005',
      '2004',
      '2003',
      '2002',
      '2001',
      '2000',
    ],
  },
  sort: {
    title: 'Sort',
    icon: 'bxs-sort-alt bx-xs',
    paramKey: 'primary_release_year',
    get defaultChild() {
      return this.children[0].id;
    },
    children: [
      { id: 'popularity.desc', name: 'Population' },
      { id: 'release_date.desc', name: 'Release Date' },
      { id: 'vote_count.desc', name: 'Vote Count' },
    ],
  },
  submit: {
    title: 'Filter',
    icon: 'bxs-filter-alt bx-xs',
  },
};

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
      : null;
  }, [formStates.genre]);

  const countCountry = useMemo(() => {
    return formStates.country.length > 0
      ? `${formStates.country.length} selected`
      : null;
  }, [formStates.country]);

  const countReleaseYear = useMemo(() => {
    return formStates.releaseYear.length > 0
      ? `${formStates.releaseYear.length} selected`
      : null;
  }, [formStates.releaseYear]);

  const handleClickFilterGroup = (e) => {
    const filterGroupNode = e.target.closest('.filter-form__group');
    const filterControlNode = filterGroupNode.querySelector(
      '.filter-form__control'
    );
    filterControlNode.classList.toggle('active');
  };

  return (
    <div className="filter-form">
      <div className="filter-form__group" onClick={handleClickFilterGroup}>
        <Button
          onClick={() => null}
          sizeS
          color="sliver"
          icon={filterForm.type.icon}
        >
          {filterForm.type.title} {selectedTypeName}
        </Button>
        <FilterFormControl
          stateKey="type"
          type="radio"
          data={filterForm.type.children}
          checked={formStates.type}
          onClick={handleChangeRadio}
        />
      </div>

      <div className="filter-form__group" onClick={handleClickFilterGroup}>
        <Button
          onClick={() => null}
          sizeS
          color="sliver"
          icon={filterForm.genre.icon}
        >
          {filterForm.genre.title} {countGenre}
        </Button>
        <FilterFormControl
          stateKey="genre"
          type="checkbox"
          data={apiGenres}
          checked={formStates.genre}
          onClick={handleChangeCheckbox}
        />
      </div>

      <div className="filter-form__group" onClick={handleClickFilterGroup}>
        <Button
          onClick={() => null}
          sizeS
          color="sliver"
          icon={filterForm.country.icon}
        >
          {filterForm.country.title} {countCountry}
        </Button>
        <FilterFormControl
          stateKey="country"
          type="checkbox"
          data={filterForm.country.children}
          checked={formStates.country}
          onClick={handleChangeCheckbox}
        />
      </div>

      <div className="filter-form__group" onClick={handleClickFilterGroup}>
        <Button
          onClick={() => null}
          sizeS
          color="sliver"
          icon={filterForm.releaseYear.icon}
        >
          {filterForm.releaseYear.title} {countReleaseYear}
        </Button>
        <FilterFormControl
          stateKey="releaseYear"
          type="checkbox"
          data={filterForm.releaseYear.children}
          checked={formStates.releaseYear}
          onClick={handleChangeCheckbox}
        />
      </div>

      <div className="filter-form__group" onClick={handleClickFilterGroup}>
        <Button
          onClick={() => null}
          sizeS
          color="sliver"
          icon={filterForm.sort.icon}
        >
          {filterForm.sort.title} {selectedSortName}
        </Button>
        <FilterFormControl
          stateKey="sort"
          data={filterForm.sort.children}
          type="radio"
          onClick={handleChangeRadio}
          checked={formStates.sort}
        />
      </div>

      <div className="filter-form__group" onClick={handleClickFilterGroup}>
        <Button
          onClick={() => null}
          sizeS
          color="primary"
          icon={filterForm.submit.icon}
        >
          {filterForm.submit.title}
        </Button>
      </div>
    </div>
  );
};

export default FilterForm;
