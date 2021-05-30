import React, { useRef, useEffect, useState } from "react";
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import callSearchAPI from "../lib/api";

// components
import SearchTerm from "./SearchTerm";

const CarSearch = ({ title, subtitle, cssClasses, placeholder }) => {
  const [searchTermValue, setSearchTermValue] = useState("");
  const [returnedSearchResults, setReturnedSearchResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTermValue(event.target.value);
  };

  const fetchSearchResults = async (searchTerm) => {
    const searchAPI = AwesomeDebouncePromise(callSearchAPI, 500);

    if (searchTerm.length > 1) {
      
      const searchResults = await searchAPI(searchTerm);

      if (searchResults.data.results.numFound > 0) {
        setReturnedSearchResults(searchResults.data.results.docs);
      } else {
        // If no search results were matched, the api returns the "empty" object.
        setReturnedSearchResults(searchResults.data.results.docs);
      }

    } else {
      setReturnedSearchResults([]);
    }
  };

  // Storing a ref. This is going to tell us if this is the initial render.
  const firstUpdate = useRef(true);

  // Hook to manage the search term length and trigger the call if applies
  useEffect(() => {
    // TODO: Understand how this works. Check the ref
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    fetchSearchResults(searchTermValue);
  }, [searchTermValue]);

  return (
    <section className={cssClasses ? "car-search " + cssClasses : "car-search"}>
      <h2 className="has-text-centered column is-full">{title}</h2>
      <div className="car-search__search-box column is-one-third-desktop is-full-mobile">
        <h3>{subtitle || "Let’s find your ideal car"}</h3>
        <div className="columns is-mobile is-multiline mt-1">
          <div
            data-role="search-results-input"
            className="column is-9-desktop is-full-tablet is-full-mobile is-relative"
          >
            <SearchTerm
              handleSearchFn={handleSearchTermChange}
              searchResults={returnedSearchResults}
              placeholder={placeholder}
            />
          </div>
          <div
            data-role="search-results-button"
            className="column is-3-desktop is-full-tablet is-full-mobile"
          >
            <button className="primary is-clickable">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarSearch;
