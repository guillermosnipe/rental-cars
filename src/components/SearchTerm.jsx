import React, { useRef, useEffect, useState } from "react";
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import callSearchAPI from "../lib/api";

// components
import SearchResultsDropdown from './SearchResultsDropdown';

const SearchTerm = ({
  placeholder
}) => {

  const [searchTermValue, setSearchTermValue] = useState("");
  const [returnedSearchResults, setReturnedSearchResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTermValue(event.target.value);
  };

  const fetchSearchResults = async (searchTerm) => {
    const searchAPI = AwesomeDebouncePromise(callSearchAPI, 750);

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
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchSearchResults(searchTermValue);

  }, [searchTermValue]);

  return(
    <>
      <label htmlFor="searchTermInput" className="is-sr-only">Enter the pick-up location</label>
      <input 
        type="text"
        placeholder={placeholder || "Pick-up Location"}
        className="mr-2"
        onChange={handleSearchTermChange}
        aria-label="Enter the pick-up location"
        autoComplete="off"
      />
      <SearchResultsDropdown results={returnedSearchResults} />
    </>
  )
}

export default SearchTerm;
