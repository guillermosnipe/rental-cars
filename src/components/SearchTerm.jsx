import React from "react";

// components
import SearchResultsDropdown from './SearchResultsDropdown';

const SearchTerm = ({
  handleSearchFn,
  searchResults,
  placeholder
}) => {

  return(
    <>
      <label htmlFor="searchTermInput" className="is-sr-only">Enter the pick-up location</label>
      <input 
      type="text"
      placeholder={placeholder || "Pick-up Location"}
      className="mr-2"
      onChange={handleSearchFn}
      />
      <SearchResultsDropdown results={searchResults} />
    </>
  )
}

export default SearchTerm;
