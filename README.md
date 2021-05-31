# Booking.com Tech Assignment

## Introduction

Hello, as Booking.com uses React as part of its Tech Stack and I'm an Angular Developer, I did my best to deliver the app using react. I've used Jest for the tests.
I was able to create components tests, but I'm still struggling with jest.spyOn so I was not able to test the data fetching with mocks.

I went for the safe bet, and used `Create React App` for scaffolding it. I also deployed this app into netlify (https://rental-cars.netlify.app/), you can also find it there.

I've used Bulma for the CSS part and Sass, why Sass? Because of the flexibility that it gives you when it comes to building themes, and separating the concerns. I've made use of the `is-sr-only` class which hides the elements properly (It basically removes the element visually, but it doesn't remove it from the markup).

## Considerations

### Issues

* Even when I've implemented a tiny debouncing library it doesn't seem to be working properly.
* I wanted to add the `distinctUntilChanged` functionality (to prevent requests from being triggered if the last searchTerm is exactly the same from the one that will trigger the upcoming request) but I haven't found the "react" way of doing it. After this weekend working on this app, I think that implementing RxJS wouldn't be a bad idea. (Having RxJS already there in Angular is one of the things that I like from Angular).

### Things to improve

* UX: Adding the svg to the imput and a spinner image to the input based on the state `isLoading` property to give visual clues to the user about what the site is doing.
* Hooks and fetching data: It seems that I need to investigate way more, how the hooks and setting model properties inside a hook affect the performance.

## Final words

I just didn't want to deliver this App using Angular. I moved myself out of the comfort zone and investigated, learned and executed a react project. I know it has some issues, but I can learn how to fix them. Don't hesitate to contact me if you have any questions.

## Installing the app

- Prerequisites:
 * Install Node.js (v12 at least).
 * Install [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) 

* Download the repo
* Install the deps using `yarn install`

## Running the app locally

* Executing `yarn install` will start the app using the default settings (`http://localhost:3000`);

## Testing the App

* `yarn test` will run the tests.
