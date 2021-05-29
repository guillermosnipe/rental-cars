import React from "react";

const SearchResultsDropdown = ({
  results
}) => {


  const getLocationType = (locationID) => {

    const _locationID = locationID.toLowerCase();
    
    const dictionary = {
      a: 'Airport',
      c: 'City',
      d: 'District'
    }

    return dictionary[_locationID];
  }

  const getCityRegionCountry = ({city, region, country}) => {
    const location = [city, region, country];
    const definedElements = location.filter( el => el );

    return definedElements.join(", ");
  }

  return (
    <div className="car-search__search-results-list">
      <ul>
        {
         results?.map(result => 
          <li
            key={result.bookingId}
            className="search-result-item"
          >
            <div className="cluster is-vcentered">
              <span className="badge">{getLocationType(result.placeType)}</span>
              <div className="location-details is-inline-block">
                <div>{result.name}</div>
                <div>{getCityRegionCountry(result)}</div>
              </div>
            </div>
              
          </li>
         )
        }
      </ul>
    </div>
  )
 
};

export default SearchResultsDropdown;
