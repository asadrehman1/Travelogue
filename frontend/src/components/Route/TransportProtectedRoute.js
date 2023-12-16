import { useSelector } from "react-redux";
import { useNavigate, } from "react-router-dom";

const TransportProtectedRoute = ({ isTransportAgency, children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
  if(!isAuthenticated){
    navigate("/login");
    return null;
  }
  if(isTransportAgency === true && user?.role !=="transportAgency"){
    navigate("/login");
    return null;
  }
  if(isTransportAgency === true  && user?.role ==="transportAgency" && !user?.isApproved){
    navigate("/login");
    return null;
  }
  return children;
};

export default TransportProtectedRoute;