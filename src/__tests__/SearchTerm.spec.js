import axios from 'axios';
import callSearchAPI, { testObject } from "../lib/api";
jest.mock('axios', () => jest.fn());

const data = {
  docs: [
    {
      country: "Netherlands",
      city: "Amsterdam",
      searchType: "L",
      alternative: ["NL,Schiphol"],
      index: 1,
      bookingId: "airport-18491",
      placeType: "A",
      placeKey: "1472510",
      iata: "AMS",
      countryIso: "nl",
      locationId: "18491",
      name: "Amsterdam Schiphol Airport",
      ufi: 900038538,
      isPopular: true,
      region: "Noord-Holland",
      lang: "en",
      lat: 52.3113,
    },
    {
      country: "Netherlands",
      lng: 4.893,
      searchType: "L",
      alternative: ["NL"],
      index: 2,
      bookingId: "city-1770968",
      placeType: "C",
      placeKey: "887321",
      countryIso: "nl",
      locationId: "10746",
      name: "Amsterdam",
      ufi: -2140479,
      isPopular: false,
      region: "Noord-Holland",
      lang: "en",
      lat: 52.3729,
    },
    {
      country: "Netherlands",
      lng: 4.90458,
      city: "Amsterdam",
      searchType: "G",
      alternative: ["NL"],
      index: 3,
      bookingId: "district-146",
      placeType: "D",
      placeKey: "1469698",
      countryIso: "nl",
      locationId: "-1",
      name: "Amsterdam Noord",
      ufi: -2140479,
      isPopular: false,
      region: "Noord-Holland",
      lang: "en",
      lat: 52.3887,
    },
    {
      country: "Netherlands",
      lng: 4.8932,
      city: "Amsterdam",
      searchType: "G",
      alternative: ["NL"],
      index: 4,
      bookingId: "district-145",
      placeType: "F",
      placeKey: "1469697",
      countryIso: "nl",
      locationId: "-1",
      name: "Amsterdam City Centre",
      ufi: -2140479,
      isPopular: false,
      region: "Noord-Holland",
      lang: "en",
      lat: 52.3706,
    },
    {
      country: "Netherlands",
      lng: 4.85488,
      city: "Amsterdam",
      searchType: "T",
      alternative: ["NL"],
      index: 5,
      bookingId: "district-148",
      placeType: "T",
      placeKey: "1469709",
      countryIso: "nl",
      locationId: "-1",
      name: "De Baarsjes",
      ufi: -2140479,
      isPopular: false,
      region: "Noord-Holland",
      lang: "en",
      lat: 52.3679,
    },
    {
      country: "Netherlands",
      lng: 4.96802,
      city: "Amsterdam",
      searchType: "G",
      alternative: ["NL"],
      index: 6,
      bookingId: "district-160",
      placeType: "D",
      placeKey: "1469700",
      countryIso: "nl",
      locationId: "-1",
      name: "Bijlmermeer",
      ufi: -2140479,
      isPopular: false,
      region: "Noord-Holland",
      lang: "en",
      lat: 52.3139,
    },
  ],
};

describe('callSearchAPI method', () => {
  test('is called with the right parameters and only once', () => {
    const spySearchAPI = jest.spyOn(testObject, "callSearchAPI");
    testObject.callSearchAPI('ams');
  
    expect(spySearchAPI).toHaveBeenCalledWith('ams');
    expect(spySearchAPI).toHaveBeenCalled();
  });
});


describe('Fetch Data method', () => {
  test('fetches data using the right url and parameters', async () => {
    const searchAPIResponse = { data };
    axios.mockResolvedValueOnce(Promise.resolve(searchAPIResponse));
    const response = await callSearchAPI('ams');
    expect(response).toEqual(searchAPIResponse);
  
    expect(axios).toBeCalledWith({ 
      baseURL: 'https://www.rentalcars.com/',
      url: 'FTSAutocomplete.do',
      params: {
        "solrIndex": "fts_en",
        "solrRows": 6,
        "solrTerm": "ams",
      }
    });
    expect(response.data).toMatchObject(data);
  });
  
  
  test('search API failure is catched accordingly', async () => {
    axios.mockResolvedValueOnce(Promise.reject('error'));
    await expect(callSearchAPI('ams')).rejects.toThrowError('The request can not be completed: error');
  });
}); 
