import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import RateReviewIcon from "@material-ui/icons/RateReview";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";

import image1 from '../../assets/treelogo.png'

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>

      <div className="sidebar">
        <Link to="/">
        <img className="sidebar-logo" src={image1} alt='logo-img' width="70%" style={{ transform: 'rotate(-15deg)'}} />
        </Link>
        <Link
          to={
            user?.role === "admin"
              ? "/admin/dashboard"
              : user?.role === "transportAgency"
              ? "/transportagency/dashboard"
              : "/travelagency/dashboard"
          }
        >
          <p>
            <DashboardIcon /> Dashboard
          </p>
          
        </Link>
        {user?.role === "admin" && (
           <>
            <Link to="/admin/users">
              <p>
                <PeopleIcon /> Users
              </p>
            </Link>

             <Link to="/admin/requests">
              <p>
                <NotificationsActiveIcon /> Requests
              </p>
            </Link></>
          )}
         <Link to="/account">
            <p>
              <EditIcon /> Profile
            </p>
          </Link>
        {user?.role === "travelAgency" && (
          <Link>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ImportExportIcon />}
            >
              <TreeItem nodeId="1" label="Packages">
                <Link to="/admin/products">
                  <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                </Link>

                <Link to="/admin/product/new">
                  <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                </Link>
              </TreeItem>
            </TreeView>
          </Link>
        )}
        {user?.role === "transportAgency" && (
          <Link>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ImportExportIcon />}
            >
              <TreeItem nodeId="1" label="Vehicles">
                <Link to="/transportagency/vehicles">
                  <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                </Link>

                <Link to="/transportagency/vehicle/new">
                  <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                </Link>
              </TreeItem>
            </TreeView>
          </Link>
        )}
        {user?.role === "travelAgency" && (
          <>
            <Link to="/admin/orders">
              <p>
                <ListAltIcon />
                Bookings
              </p>
            </Link>
          </>
        )}

        {user?.role === "travelAgency" && (
          <Link to="/admin/reviews">
            <p>
              <RateReviewIcon />
              Reviews
            </p>
          </Link>
        )}
        {user?.role === "transportAgency" && (
          <Link to="/vehicle/reviews">
            <p>
              <RateReviewIcon />
              Reviews
            </p>
          </Link>
        )}
      </div>
    </>
  );
};

export default Sidebar;
