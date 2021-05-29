import React from 'react';

const Header = ({
  title,
  cssClasses
}) => {
  return (
    <header className={cssClasses}>
      <h1 className="is-sr-only">{title}</h1>
      <a href="/" className="column is-two-thirds-desktop pt-5">
        <img alt="RentalCars.com brand logo" src="https://cdn.rcstatic.com/images/site_graphics/newsite/mobile/logos/rc-logo-small--white.svg" />
      </a>
    </header>
  )
}

export default Header;