import React, { useContext, useReducer } from "react";
import { BookContext } from "./BookContext";
import UserReducer from "./UserReducer";

export const useBook = () => {
  const { state, dispatch } = useContext(BookContext);
  return [state, dispatch];
};

export const BookState = ({ children }) => {
  const initialState = {
    book: {},
    loading: false,
    error: false,
    message: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <BookContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
