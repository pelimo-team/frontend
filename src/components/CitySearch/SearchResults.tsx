import React from 'react';
import { City } from './types';

interface SearchResultsProps {
  results: City[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <>
      <hr />
      <h3>Results:</h3>
      <ul>
        {results.map((city) => (
          <li key={city.id}>
            {city.name} ({city.province})
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults; 