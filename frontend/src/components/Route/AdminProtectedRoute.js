import { useSelector } from "react-redux";
import { useNavigate, } from "react-router-dom";

const AdminProtectedRoute = ({ isAdmin, children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
  if(!isAuthenticated){
    navigate("/login");
  }
  if(isAdmin === true && user?.role !=="admin"){
    navigate("/login")
  }
  return children;
};

export default AdminProtectedRoute;