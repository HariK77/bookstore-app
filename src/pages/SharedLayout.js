import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const SharedLayout = () => {
  const isLoggedIn = localStorage.getItem("userLoggedIn");
  console.log("logged in value", isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default SharedLayout;
