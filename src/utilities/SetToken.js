import axios from "axios";

const SetToken = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export default SetToken;
