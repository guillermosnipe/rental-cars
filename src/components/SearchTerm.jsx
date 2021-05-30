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
