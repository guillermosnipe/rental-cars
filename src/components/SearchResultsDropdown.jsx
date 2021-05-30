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

    return definedElements.length > 0 ? definedElements.join(", ") : '';
  }

  const SearchResultItem = ({ result }) => {

    const placeType = getLocationType(result.placeType);
     return (
        <li
            className="search-result-item is-clickable"
          >
          <div className="cluster is-vcentered">
            <span className={ placeType ? "badge is-" + placeType + ' is-capitalized': '' }>{placeType}</span>
            <div className="location-details is-inline-block">
              <div><strong>{result.name} {result.placeType === "A" && `(${result.iata})`}</strong></div>
              <div>{getCityRegionCountry(result)}</div>
            </div>
          </div>
        </li>
     )
  }

  return (
    <div className="car-search__search-results-list">
      <ul>
        {
        results?.map(result =>
          <SearchResultItem result={result} key={result.placeKey} />
        )
        }
      </ul>
    </div>
  )

};

export default SearchResultsDropdown;
