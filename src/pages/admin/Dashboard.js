import React, { useCallback, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import ApiClient from "../../utilities/ApiClient";

const Dashboard = () => {
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

  function handleDelete(bookId) {
    if (window.confirm("Are You Sure ?")) {
      ApiClient.delete(`/books/${bookId}`)
        .then(() => {
          let booksFiltered = books.data.filter((book) => book.id !== bookId);
          // window.alert("Book has been deleted successfully");
          setBooks((prev) => ({ ...prev, data: booksFiltered }));
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
    }
  }

  return (
    <div className="container">
      <section className="section">
        <h4>Books</h4>
      </section>
      <div className="mb-3">
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="search"
              onChange={handleSearchChange}
              placeholder="Search for title, author, publication date, isbn or genre"
            />
          </div>
          <div className="col-6">
            <div className="float-end">
              <Link className="btn btn-primary" to={"/dashboard/books/create"}>
                Add Book
              </Link>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Cover Photo</th>
            <th>ISBN</th>
            <th>Published By</th>
            <th>Published At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.data.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <img height={100} src={book.image} alt="" />
                </td>
                <td>{book.isbn}</td>
                <td>{book.published}</td>
                <td>{book.publisher}</td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/dashboard/books/edit/${book.id}`}
                  >
                    Edit
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => {
                      handleDelete(book.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {!books?.data.length && (
            <tr>
              <td colSpan={9}>No books found.</td>
            </tr>
          )}
        </tbody>
      </table>
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
export default Dashboard;
