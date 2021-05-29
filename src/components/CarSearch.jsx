import React from "react";

const CarSearch = ({ title, subtitle, cssClasses, placeholder }) => {
  return (
    <section className={cssClasses ? 'car-search ' + cssClasses : 'car-search'}>
      <h2 className="has-text-centered column is-full">{title}</h2>
      <div className="car-search__search-box column is-two-thirds-desktop">
        <h3>{subtitle || "Let’s find your ideal car"}</h3>
        <div className="mt-2">
          <input type="text" placeholder={placeholder || "Pick-up Location"} className="mr-2"/>
          <button className="primary is-clickable">Search</button>
        </div>
      </div>
    </section>
  );
};

export default CarSearch;
