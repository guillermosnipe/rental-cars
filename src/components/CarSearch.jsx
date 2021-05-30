import React from "react";

// components
import SearchTerm from "./SearchTerm";

const CarSearch = ({ title, subtitle, cssClasses, placeholder }) => {

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
            <SearchTerm placeholder={placeholder} />
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
