import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
  if(!isAuthenticated){
    navigate("/login");
    return null;
  }
  if(isAdmin === true && user?.role !=="travelAgency"){
    navigate("/login");
    return null;
  }
  if(isAdmin === true && user?.role ==="travelAgency" && !user?.isApproved){
    navigate("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;