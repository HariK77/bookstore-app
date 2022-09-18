import React, { useCallback, useEffect, useState } from "react";
import ApiClient from "../utilities/ApiClient";
import debounce from "lodash.debounce";
import BookCard from "../components/BookCard";
import Pagination from "react-js-pagination";

const Home = () => {
  const [books, setBooks] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    ApiClient.get(`/books?search=${searchTerm}&page=${activePage}`)
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [searchTerm, activePage]);

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const delaySearch = useCallback(debounce(handleSearch, 500), []);

  function handleSearch(searchTerm) {
    setActivePage(1);
    setSearchTerm(searchTerm);
  }

  function handleSearchChange(event) {
    delaySearch(event.target.value);
  }

  return (
    <div className="container">
      <h1 className="my-3">Books</h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="search" className="form-label">
          Search Books
        </label>
        <input
          type="text"
          className="form-control"
          id="search"
          onChange={handleSearchChange}
          placeholder="Search for title, author, publication date, isbn or genre"
        />
      </div>
      <div className="row">
        {books?.data.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>
      <Pagination
        activePage={books?.current_page}
        itemsCountPerPage={books?.per_page}
        totalItemsCount={books?.total}
        pageRangeDisplayed={10}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        linkClass="page-link"
        itemClass="page-item"
      />
    </div>
  );
};

export default Home;
