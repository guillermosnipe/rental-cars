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

    expect(searchResultsList).toBe(searchResultsList);
    expect(searchResultsListItems.length).toBe(1);
  });
});