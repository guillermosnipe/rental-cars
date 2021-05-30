import React from "react";

const SearchResultsDropdown = ({
  results
}) => {


  const getLocationType = (locationID) => {

    const _locationID = locationID?.toLowerCase();
    
    const dictionary = {
      a: 'airport',
      c: 'city',
      d: 'district',
      f: 'region',
      t: 'station'
    }

    const locationType = dictionary[_locationID];

    return locationType ? locationType : undefined;
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
            key={result.placeKey}
            className="search-result-item is-clickable"
          >
            <div className="cluster is-vcentered">
              <span className={getLocationType(result.placeType) ? "badge is-" + getLocationType(result.placeType) + ' is-capitalized': '' }>{getLocationType(result.placeType)}</span>
              <div className="location-details is-inline-block">
                <div><strong>{result.name} {result.placeType === "A" && `(${result.iata})`}</strong></div>
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
