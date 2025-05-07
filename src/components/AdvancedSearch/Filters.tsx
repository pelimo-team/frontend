import React from 'react';
import { FilterType, allFilters } from './types';

interface FiltersProps {
  activeFilters: FilterType[];
  toggleFilter: (filter: FilterType) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeFilters, toggleFilter }) => {
  return (
    <section className="filters-advanced-search">
      {allFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => toggleFilter(filter)}
          className={`filter-button-advanced-search ${
            activeFilters.includes(filter) ? "active-filter" : ""
          }`}
        >
          {activeFilters.includes(filter) && (
            <span className="close-tag-advanced-search">✕</span>
          )}
          {filter}
        </button>
      ))}
    </section>
  );
};

export default Filters; 