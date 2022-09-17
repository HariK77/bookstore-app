import { Navigate, Outlet } from "react-router-dom";

const SharedLayout = () => {
  const userType = localStorage.getItem("userType");
  if (userType !== "Admin") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};
export default SharedLayout;
