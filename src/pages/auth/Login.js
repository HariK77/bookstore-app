import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiClient from "../../utilities/ApiClient";
import Auth from "../../resources/Auth";
import SetToken from "../../utilities/SetToken";

const Login = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const bookSchema = Yup.object().shape({
    email: Yup.string().email().label("Email").required(),
    password: Yup.string().label("Pasword").required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: bookSchema,
    onSubmit: function (values) {
      setIsBtnDisabled(true);
      setErrorMsg("");
      ApiClient.create("login", values)
        .then((response) => {
          setIsBtnDisabled(false);
          SetToken(response.data.token);
          Auth.authenticated(response.data);
          navigate("/");
        })
        .catch((err) => {
          setIsBtnDisabled(false);
          console.log("asasas", err.response.data.error);
          setErrorMsg(err.response.data.error);
          // const errors = err.response.data.errors;
          // let errorsObject = {};
          // for (let error in errors) {
          //   errorsObject[error] = errors[error][0];
          // }

          // formik.setErrors(errorsObject);
        });
    },
  });

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <hr />
      <section className="section">
        <form className="row">
          <div className="col-6 offset-3">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="exampleInputEmail1"
                className={
                  formik.touched.email && formik.errors.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter email"
              />
              <div className="invalid-feedback">{formik.errors.email}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter password"
              />
              <div className="invalid-feedback">{formik.errors.password}</div>
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
export default Login;
