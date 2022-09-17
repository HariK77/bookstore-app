import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ApiClient } from "../helpers/ApiClient";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [roleList, setRoleList] = useState([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const serviceRequest = new ApiClient();
    serviceRequest.get("/roles").then((response) => {
      setRoleList(response.data);
    });
  }, []);
  const schema = Yup.object().shape({
    name: Yup.string().label("Name").required(),
    email: Yup.string().email().label("Email").required(),
    roles: Yup.array()
      .min(1, "Please select atleast one role")
      .label("Roles")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      roles: [],
    },
    validationSchema: schema,
    onSubmit: function (values) {
      setIsBtnDisabled(true);
      const serviceRequest = new ApiClient();
      serviceRequest
        .create("users", values)
        .then((response) => navigate("/"))
        .catch((err) => {
          setIsBtnDisabled(false);
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
      <h1>Add User</h1>
      <hr />
      <form className="row">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="nammeInput" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="nammeInput"
              className={
                formik.touched.name && formik.errors.name
                  ? "form-control is-invalid"
                  : "form-control"
              }
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter name"
            />
            <div className="invalid-feedback">{formik.errors.name}</div>
          </div>
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
            <label htmlFor="roleInput" className="form-label">
              Select Roles
            </label>
            <Select
              // defaultValue={[]}
              isMulti
              id="roleInput"
              name="roles"
              options={roleList}
              // className="basic-multi-select"
              className={
                formik.touched.roles && formik.errors.roles
                  ? "basic-multi-select is-invalid"
                  : "basic-multi-select "
              }
              classNamePrefix="select"
              onChange={(opt) => {
                formik.values.roles = opt;
              }}
              onBlur={formik.handleBlur}
              // value={formik.values.roles[0]}
              placeholder="Enter roles"
            />
            <div className="invalid-feedback">{formik.errors.roles}</div>
          </div>
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
    </div>
  );
};

export default AddUser;
