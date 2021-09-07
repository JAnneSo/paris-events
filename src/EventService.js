import axios from "axios";
// npm install axios

const API_URL =
  "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records";

const EventService = {
  // Get the last 15 events
  fetchLastUpdatedEvents() {
    return axios
      .get(`${API_URL}/?sort=-updated_at&limit=4`)
      .then((response) => response.data.records)
      .catch(errorHandler);
  },

  // Get event with special criterion
  fetchByCriterion(criterion, criterionValue) {
    return axios
      .get(`${API_URL}/?refine=${criterion}:${criterionValue}&limit=4`)
      .then((response) => response.data.records)
      .catch(errorHandler);
  },

  // Get search result
  fetchResult(searchInput) {
    return axios
      .get(`${API_URL}?search=${searchInput}&sort=title`)
      .then((response) => response.data.records)
      .catch(errorHandler);
  },

  // Get an event with id
  fetchEvent(id) {
    return axios
      .get(`${API_URL}/${id}`)
      .then((response) => response.data.record)
      .catch(errorHandler);
  }
};

const errorHandler = (err) => {
  console.log(err);
};

export default EventService;
