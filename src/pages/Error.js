import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="container">
      <div className="tex-center my-5">
        <h2>404</h2>
        <p>page not found</p>
        <Link className="btn btn-primary" to="/">
          Go To Home Page
        </Link>
      </div>
    </div>
  );
};
export default Error;
