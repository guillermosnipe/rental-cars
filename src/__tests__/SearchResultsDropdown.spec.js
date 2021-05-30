import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SearchResultsDropdown from "../components/SearchResultsDropdown";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Search Results Dropdown", () => {
  test("The list is not rendered if no results were passed to it", () => {
    const results = [];
    act(() => {
      render(<SearchResultsDropdown results={results}/>, container);
    });
    const searchResultsItems = container.querySelector(".car-search__search-results-list");
    expect(searchResultsItems).toBe(null);
  });

  test("The list is rendered if at least one result is passed to it", () => {
    const results = [{ name: 'Amsterdam Schipol (AMS)', placeKey: 111, country: 'Netherlands'}];
    act(() => {
      render(<SearchResultsDropdown results={results}/>, container);
    });
    const searchResultsList = container.querySelector(".car-search__search-results-list");
    const searchResultsListItems = searchResultsList.querySelectorAll('.search-result-item');

    expect(searchResultsList).toBeDefined();
    expect(searchResultsListItems.length).toBe(1);
  });


  test("The search result item tags are rendered properly", () => {

    const results = {
      "docs":[
        {
           "country":"Netherlands",
           "city":"Amsterdam",
           "searchType":"L",
           "alternative":[
              "NL,Schiphol"
           ],
           "index":1,
           "bookingId":"airport-18491",
           "placeType":"A",
           "placeKey":"1472510",
           "iata":"AMS",
           "countryIso":"nl",
           "locationId":"18491",
           "name":"Amsterdam Schiphol Airport",
           "ufi":900038538,
           "isPopular":true,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3113
        },
        {
           "country":"Netherlands",
           "lng":4.893,
           "searchType":"L",
           "alternative":[
              "NL"
           ],
           "index":2,
           "bookingId":"city-1770968",
           "placeType":"C",
           "placeKey":"887321",
           "countryIso":"nl",
           "locationId":"10746",
           "name":"Amsterdam",
           "ufi":-2140479,
           "isPopular":false,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3729
        },
        {
           "country":"Netherlands",
           "lng":4.90458,
           "city":"Amsterdam",
           "searchType":"G",
           "alternative":[
              "NL"
           ],
           "index":3,
           "bookingId":"district-146",
           "placeType":"D",
           "placeKey":"1469698",
           "countryIso":"nl",
           "locationId":"-1",
           "name":"Amsterdam Noord",
           "ufi":-2140479,
           "isPopular":false,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3887
        },
        {
           "country":"Netherlands",
           "lng":4.8932,
           "city":"Amsterdam",
           "searchType":"G",
           "alternative":[
              "NL"
           ],
           "index":4,
           "bookingId":"district-145",
           "placeType":"F",
           "placeKey":"1469697",
           "countryIso":"nl",
           "locationId":"-1",
           "name":"Amsterdam City Centre",
           "ufi":-2140479,
           "isPopular":false,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3706
        },
        {
           "country":"Netherlands",
           "lng":4.85488,
           "city":"Amsterdam",
           "searchType":"T",
           "alternative":[
              "NL"
           ],
           "index":5,
           "bookingId":"district-148",
           "placeType":"T",
           "placeKey":"1469709",
           "countryIso":"nl",
           "locationId":"-1",
           "name":"De Baarsjes",
           "ufi":-2140479,
           "isPopular":false,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3679
        },
        {
           "country":"Netherlands",
           "lng":4.96802,
           "city":"Amsterdam",
           "searchType":"G",
           "alternative":[
              "NL"
           ],
           "index":6,
           "bookingId":"district-160",
           "placeType":"D",
           "placeKey":"1469700",
           "countryIso":"nl",
           "locationId":"-1",
           "name":"Bijlmermeer",
           "ufi":-2140479,
           "isPopular":false,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3139
        }
     ],
    }

    act(() => {
      render(<SearchResultsDropdown results={results.docs}/>, container);
    })

    const searchResultsList = container.querySelector(".car-search__search-results-list");
    const searchResultsListItems = searchResultsList.querySelectorAll('.search-result-item')

    expect(searchResultsListItems[0].querySelector('.badge').textContent).toBe('airport');
    expect(searchResultsListItems[1].querySelector('.badge').textContent).toBe('city');
    expect(searchResultsListItems[2].querySelector('.badge').textContent).toBe('district');
    expect(searchResultsListItems[3].querySelector('.badge').textContent).toBe('region');
    expect(searchResultsListItems[4].querySelector('.badge').textContent).toBe('station');
  });

  test("The search result adds the IATA code to the name if exists", () => {

    const results = {
      "docs":[
        {
           "country":"Netherlands",
           "city":"Amsterdam",
           "searchType":"L",
           "alternative":[
              "NL,Schiphol"
           ],
           "index":1,
           "bookingId":"airport-18491",
           "placeType":"A",
           "placeKey":"1472510",
           "iata":"AMS",
           "countryIso":"nl",
           "locationId":"18491",
           "name":"Amsterdam Schiphol Airport",
           "ufi":900038538,
           "isPopular":true,
           "region":"Noord-Holland",
           "lang":"en",
           "lat":52.3113
        }
     ],
    }

    act(() => {
      render(<SearchResultsDropdown results={results.docs}/>, container);
    })

    const searchResultsList = container.querySelector(".car-search__search-results-list");
    const searchResultsListItems = searchResultsList.querySelector('.search-result-item')

    expect(searchResultsListItems.querySelector('strong').textContent).toContain('(AMS)');
  });

  test("The search result renders the location properly", () => {

    const results = {
      "docs":[
        {
          "country":"Netherlands",
          "lng":4.893,
          "searchType":"L",
          "alternative":[
             "NL"
          ],
          "index":2,
          "bookingId":"city-1770968",
          "placeType":"C",
          "placeKey":"887321",
          "countryIso":"nl",
          "locationId":"10746",
          "name":"Amsterdam",
          "ufi":-2140479,
          "isPopular":false,
          "region":"Noord-Holland",
          "lang":"en",
          "lat":52.3729
       },
     ],
    }

    act(() => {
      render(<SearchResultsDropdown results={results.docs}/>, container);
    })

    const searchResultsList = container.querySelector(".car-search__search-results-list");
    const searchResultsListItems = searchResultsList.querySelector('.search-result-item')

    expect(searchResultsListItems.querySelector('.location-details div:last-child').textContent).toBe('Noord-Holland, Netherlands');
  });

});