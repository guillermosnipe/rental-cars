import React, { useRef, useEffect, useState } from "react";
import callSearchAPI from "../lib/api";
import debounce from "debounce-promise-with-cancel";

// components
import SearchResultsDropdown from "./SearchResultsDropdown";
const searchAPI = debounce(callSearchAPI, 500);

const SearchTerm = ({ placeholder }) => {
  const [searchTermValue, setSearchTermValue] = useState("");
  const [returnedSearchResults, setReturnedSearchResults] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

  const handleSearchTermChange = (event) => {
    setSearchTermValue(event.target.value);
  };

  const fetchSearchResults = async (searchTerm) => {
    const searchResults = await searchAPI(searchTerm);
    setReturnedSearchResults(searchResults.data.results.docs);
  };

  // Storing a ref. This is going to tell us if this is the initial render.
  const firstUpdate = useRef(true);

  // Hook to manage the search term length and trigger the call if applies
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (searchTermValue.length > 1) {
      fetchSearchResults(searchTermValue);
    } else {
      searchAPI.cancel();
      setReturnedSearchResults([]);
    }
  }, [searchTermValue]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div ref={wrapperRef} className="search-term is-relative">
      <label htmlFor="searchTermInput" className="is-sr-only">
        Enter the pick-up location
      </label>
      <input
        type="text"
        placeholder={placeholder || "Pick-up Location"}
        className="mr-2"
        onChange={handleSearchTermChange}
        aria-label="Enter the pick-up location"
        autoComplete="off"
      />
      <span
        aria-hidden="true"
        role="presentation"
        className="icon"
      >
        <svg viewBox="0 0 24 24" width="1em" height="1em">
          <path d="M20.75 3.709l-7.377 17.79-1.638-8.187a.75.75 0 0 0-.588-.588L2.96 11.086 20.75 3.709zm-.574-1.386L2.385 9.7a1.5 1.5 0 0 0 .28 2.856l8.188 1.638-.588-.588 1.638 8.188a1.5 1.5 0 0 0 2.856.28l7.377-17.79a1.5 1.5 0 0 0-1.96-1.96z"></path>
        </svg>
      </span>
      <SearchResultsDropdown
        results={returnedSearchResults}
        cssClasses={isHidden ? "is-hidden" : ""}
      />
    </div>
  );
};

export default SearchTerm;
