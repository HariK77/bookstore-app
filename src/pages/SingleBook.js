import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiClient from "../utilities/ApiClient";

const SingleBook = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    ApiClient.get(`/books/${bookId}`).then((res) => {
      setBook(res.data);
      console.log("book", res.data);
    });
  }, []);
  return (
    <div className="container">
      <h1>{book?.title}</h1>
    </div>
  );
};

export default SingleBook;
