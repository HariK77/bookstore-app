import axios from "axios";

// Set Loading
export const setLoading = (dispatch, status) =>
  dispatch({ type: "SET_LOADING", payload: status });

// Set Error
export const setError = (dispatch, error) =>
  dispatch({
    type: "SET_ERROR",
    payload: { error: error.status, message: error.message },
  });

// Set Book (get book info)
export const getUser = async (dispatch) => {
  setLoading(dispatch, true);

  // do fetch
  await axios
    .get(`https://jsonplaceholder.typicode.com/users/1`)
    .then((res) => {
      const result = res.data;

      // set user info
      dispatch({
        type: "SET_BOOK",
        payload: result,
      });
    })
    .catch((error) => {
      const result = error;

      // set error if has any
      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
          message: result,
        },
      });
    });
};
