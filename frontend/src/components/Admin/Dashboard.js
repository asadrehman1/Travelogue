import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Chart as ChartJS, registerables } from 'chart.js';
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getAllUsers } from "../../actions/userActions.js";
import MetaData from "../layout/Header/MetaData.js";

const Dashboard = () => {
    const alert = useAlert();
    ChartJS.register(...registerables);
  const dispatch = useDispatch();

  const { users,error:userError } = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch,alert,userError]);

  const travelAgenciesCount = users.filter(user => user.role === "travelAgency").length;
  const transportAgenciesCount = users.filter(user => user.role === "transportAgency").length;
  const usersCount = users.filter(user => user.role === "user").length;

  const lineState = {
    labels: ["Old Users", "New Users"],
    datasets: [
      {
        label: "TOTAL Users",
        backgroundColor: ["#0067a5"],
        hoverBackgroundColor: ["#0067a5"],
        data: [0, 4000],
      },
    ],
  };


  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer" style={{ backgroundImage: `url(${require('../../assets/x5.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Users <br /> {users.length}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Travel Agencies</p>
              <p>{travelAgenciesCount}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Users</p>
              <p>{usersCount}</p>
            </Link>
            <Link to="/admin/users">
              <p>Transport Agencies</p>
              <p>{transportAgenciesCount}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;