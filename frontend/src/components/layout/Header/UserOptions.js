import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useAlert } from "react-alert";
import { Backdrop } from "@material-ui/core";
import { resetCartItems } from "../../../actions/cartActions";
import DescriptionIcon from "@material-ui/icons/Description";
import { logout } from "../../../actions/userActions";
import "./Header.css";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const transportAgencyDashboard = () => {
    navigate("/transportagency/dashboard");
  };

  const travelAgencyDashboard = () => {
    navigate("/travelagency/dashboard");
  };

  const orders = () => {
    navigate("/orders");
  };

  const blogs = () => {
    navigate("/myblogs");
  };

  const account = () => {
    navigate("/account");
  };

  const logoutUser = () => {
    if(user?.role === "travelAgency"){
      localStorage.removeItem("userPackageData");
    }
    dispatch(logout());
    dispatch(resetCartItems());
    alert.success("Logout Successfully");
    navigate("/login");
  };

  const cart = () => {
    navigate("/cart");
  };

  const options = [];
  if(user?.isApproved){
    options.unshift({ icon: <ExitToAppIcon />, name: "Logout", func: logoutUser});
    options.unshift({ icon: <PersonIcon />, name: "Profile", func: account });
  }
  if (user?.role === "user") {
    options.unshift({
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#0067a5" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    });
    options.unshift({ icon: <ListAltIcon />, name: "Bookings", func: orders });
    options.unshift({ icon: <DescriptionIcon />, name: "Blogs", func: blogs });
  }
  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user?.role === "transportAgency" && user?.isApproved) {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Transport Agency Dashboard",
      func: transportAgencyDashboard,
    });
  }
  if (user?.role === "travelAgency" && user?.isApproved) {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Travel Agency Dashboard",
      func: travelAgencyDashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options &&
          options.map((option) => {
            return (
              <SpeedDialAction
                key={option.name} // Add a unique key prop to the SpeedDialAction
                icon={option.icon}
                tooltipTitle={option.name}
                onClick={option.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            );
          })}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
