import axios from "axios";

// default
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL + "/api";
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error;
    }
    return Promise.reject(message);
  }
);

class ApiClient {
  /**
   * Fetches data from given url
   */

  get = (url) => {
    return axios.get(`${url}`);
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

export default new ApiClient();
