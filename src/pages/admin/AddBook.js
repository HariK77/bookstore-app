import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiClient from "../../utilities/ApiClient";

const AddBook = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const bookSchema = Yup.object().shape({
    title: Yup.string().label("Title").required(),
    author: Yup.string().label("Author").required(),
    genre: Yup.string().label("Genre").required(),
    description: Yup.string().label("Description").required(),
    isbn: Yup.string().label("ISBN").required(),
    image: Yup.string().label("Image Url").required(),
    publisher: Yup.string().label("Publisher").required(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      isbn: "",
      image: "",
      publisher: "",
    },
    validationSchema: bookSchema,
    onSubmit: function (values) {
      setIsBtnDisabled(true);
      setErrorMsg("");
      ApiClient.create("books", values)
        .then((response) => {
          setIsBtnDisabled(false);
          console.log("result", response);
          navigate("/dashboard");
        })
        .catch((err) => {
          setIsBtnDisabled(false);
          console.log("asasas", err.response.data.error);
          setErrorMsg(err.response.data.error);
          const errors = err.response.data.errors;
          let errorsObject = {};
          for (let error in errors) {
            errorsObject[error] = errors[error][0];
          }

          formik.setErrors(errorsObject);
        });
    },
  });

  return (
    <div className="container">
      <h1>Add Book</h1>
      <hr />
      <section className="section">
        <form className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Enter Title
              </label>
              <input
                type="text"
                id="title"
                className={
                  formik.touched.title && formik.errors.title
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="Enter title"
              />
              <div className="invalid-feedback">{formik.errors.title}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Enter Author
              </label>
              <input
                type="author"
                id="author"
                className={
                  formik.touched.author && formik.errors.author
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="author"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
                placeholder="Enter author"
              />
              <div className="invalid-feedback">{formik.errors.author}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Enter Genre
              </label>
              <input
                type="genre"
                id="genre"
                className={
                  formik.touched.genre && formik.errors.genre
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="genre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
                placeholder="Enter genre"
              />
              <div className="invalid-feedback">{formik.errors.genre}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Enter Description
              </label>
              <textarea
                type="description"
                id="description"
                rows={5}
                className={
                  formik.touched.description && formik.errors.description
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter description"
              >
                {formik.values.description}
              </textarea>
              <div className="invalid-feedback">
                {formik.errors.description}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">
                Enter ISBN
              </label>
              <input
                type="isbn"
                id="isbn"
                className={
                  formik.touched.isbn && formik.errors.isbn
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="isbn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isbn}
                placeholder="Enter isbn"
              />
              <div className="invalid-feedback">{formik.errors.isbn}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Enter Image Url
              </label>
              <input
                type="text"
                id="image"
                className={
                  formik.touched.image && formik.errors.image
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="image"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
                placeholder="Enter image url"
              />
              <div className="invalid-feedback">{formik.errors.image}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="publisher" className="form-label">
                Enter Publisher Name
              </label>
              <input
                type="publisher"
                id="publisher"
                className={
                  formik.touched.publisher && formik.errors.publisher
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="publisher"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.publisher}
                placeholder="Enter publisher"
              />
              <div className="invalid-feedback">{formik.errors.publisher}</div>
            </div>

            <div className="text-danger mb-3">{errorMsg}</div>
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="btn btn-primary"
              disabled={isBtnDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddBook;
