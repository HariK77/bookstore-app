import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import Dashboard from "./pages/admin/Dashboard";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LogOut from "./pages/auth/LogOut";
import AdminLayout from "./pages/AdminLayout";
import AddBook from "./pages/admin/AddBook";
import EditBook from "./pages/admin/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/books/:bookId" element={<SingleBook />} />
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/books/create" element={<AddBook />} />
            <Route
              path="/dashboard/books/edit/:bookId"
              element={<EditBook />}
            />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
