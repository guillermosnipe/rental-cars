import React, { useRef, useLayoutEffect, useState } from "react";
import callSearchAPI from '../lib/api';

// components
import SearchResultsDropdown from './SearchResultsDropdown';

const CarSearch = ({
  title,
  subtitle,
  cssClasses,
  placeholder
}) => {

  const [searchTermValue, setSearchTermValue] = useState('');
  const [returnedSearchResults, setReturnedSearchResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTermValue(event.target.value);
  };

  // Storing a ref. This is going to tell us if this is the initial render.
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // TODO: Understand how this works. Check the ref
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (searchTermValue.length) {
      callSearchAPI(searchTermValue).then(
        (searchResults) => {
          if(searchResults.data.results.docs.length > 0) {
            setReturnedSearchResults(searchResults.data.results.docs);
          } else {
            setReturnedSearchResults([]);
          }
        }
      );
    } else {
      setReturnedSearchResults([]);
    }
  }, [searchTermValue]);

  return (
    <section className={cssClasses ? 'car-search ' + cssClasses : 'car-search'}>
      <h2 className="has-text-centered column is-full">{title}</h2>
      <div className="car-search__search-box column is-one-third-desktop">
        <h3>{subtitle || "Let’s find your ideal car"}</h3>
        <div className="columns is-mobile is-multiline mt-1">
          <div data-role="search-results-input" className="column is-9-desktop is-full-tablet is-full-mobile is-relative">
            <input 
              type="text"
              placeholder={placeholder || "Pick-up Location"}
              className="mr-2"
              onChange={handleSearchTermChange}
            />
            {
              returnedSearchResults.length > 0 && <SearchResultsDropdown results={returnedSearchResults} />
            }
          </div>
          <div data-role="search-results-button" className="column is-3-desktop is-full-tablet is-full-mobile">
            <button className="primary is-clickable">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarSearch;
