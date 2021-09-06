import axios from "axios";
// npm install axios

const API_URL =
  "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records";

const EventService = {
  // Get the last 15 events
  fetchAll() {
    return axios
      .get(`${API_URL}/?limit=15`)
      .then((response) => response.data.records)
      .catch(errorHandler);
  },

  // Get search result
  fetchResult(searchInput) {
    return axios
      .get(`${API_URL}?search=${searchInput}`)
      .then((response) => response.data.records)
      .catch(errorHandler);
  }
};

const errorHandler = (err) => {
  console.log(err);
};

export default EventService;
