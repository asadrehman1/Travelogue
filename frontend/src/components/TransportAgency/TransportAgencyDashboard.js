import React, { useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import "../Admin/Dashboard.css"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAllTransportAgencyVehicles, clearError } from "../../actions/vehicleActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData.js";
import Sidebar from "../Admin/Sidebar";

const TransportAgencyDashboard = () => {
  const alert = useAlert();
  ChartJS.register(...registerables);
  const dispatch = useDispatch();

  const { vehicles, error: vehicleError } = useSelector((state) => state.vehicles);


  useEffect(() => {
    if (vehicleError) {
      alert.error(vehicleError);
      dispatch(clearError());
    }
    dispatch(getAllTransportAgencyVehicles());

  }, [dispatch, alert, vehicleError]);

  const lineState = {
    labels: ["Old Vehicles", "New Vehicles"],
    datasets: [
      {
        label: "Total Vehicles",
        backgroundColor: ["#0067a5"],
        hoverBackgroundColor: ["#0067a5"],
        data: [0, vehicles?.length],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - TransportAgency Panel" />
      <Sidebar />

      <div className="dashboardContainer" style={{
        backgroundImage: `url(${require("../../assets/vd1.jpg")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link>
              <p>Vehicles</p>
              <p>{vehicles?.length}</p>
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

export default TransportAgencyDashboard;