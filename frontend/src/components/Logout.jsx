
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
//   logout();
//   navigate("/login");
  useEffect(() => {
      logout();
      navigate("/login", { replace: true });
  }, [logout, navigate]);

   return null; // No UI needed
};

export default Logout;
