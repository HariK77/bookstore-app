import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="col-3 mb-3 d-flex align-items-stretch">
      <div className="card h-100">
        <img
          src={book.image}
          height="200px"
          className="card-img-top"
          alt="Book Cover Page"
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.description.substring(0, 100)}...</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Author: {book.author}</li>
          <li className="list-group-item">Genre: {book.genre}</li>
          <li className="list-group-item">ISBN: {book.isbn}</li>
          <li className="list-group-item">Published by: {book.publisher}</li>
          <li className="list-group-item">
            Published on: <Moment format="DD/MM/YYYY" date={book.published} />
          </li>
        </ul>
        <div className="card-body">
          <Link className="btn btn-primary" to={`/books/${book.id}`}>
            More info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
