import axios from "axios";

const SEARCH_API_URL = process.env.REACT_APP_SEARCH_API_URL;

const callSearchAPI = async (searchTerm = '', numberOfResults = 6) => {
  
  const requestConfig = {
    baseURL: SEARCH_API_URL,
    url: 'FTSAutocomplete.do'
  };

  requestConfig.params = {
    solrIndex: 'fts_en',
    solrRows: numberOfResults,
    solrTerm: searchTerm
  };

  try {
    return await axios(requestConfig);
  } catch (err) {
    console.error(`ERROR: The request can not be completed: ${err}`);
  }
};

export default callSearchAPI;