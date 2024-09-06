import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirect }) => {
  const { isAuthenticated } = useSelector((state) => state.persisted.user);
  const abc = useSelector(state => state.persisted)
  console.log(abc);
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={redirect} replace />;
  }
};

export default ProtectedRoute;
