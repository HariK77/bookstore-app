import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 200);
  });

  return <p>Logging Out ...</p>;
};

export default LogOut;
