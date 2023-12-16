import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Chart as ChartJS, registerables } from 'chart.js';
import { getAdminProducts } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderActions.js";
import MetaData from "../layout/Header/MetaData.js";


const TravelAgencyDashboard = () => {

  ChartJS.register(...registerables);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { user } = useSelector((state) => state.user);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    // console.log(user._id,"user")
    // localStorage.setItem("travelAgencyId", user._id);
  }, [dispatch]);

  let totalAmount = 0;
  const userOrders = orders?.filter((order) => order.travelAgencyId === user._id);
  userOrders &&
  userOrders?.forEach((item) => {
      totalAmount += item.totalPrice;
      console.log(item.travelAgencyId,"agency")
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#0067a5"],
        hoverBackgroundColor: ["#0067a5"],
        data: [0, totalAmount],

      },
    ],
  };

  // const doughnutState = {
  //   labels: ["Out of Stock", "InStock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4","rgba(12, 57, 121, 0.856)"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock, products?.length - outOfStock],
  //     },
  //   ],
  // };


  return (
    <div className="dashboard">
      
      <MetaData title="Travel Agency Dashboard - Panel" />
      <Sidebar />

      <div className="dashboardContainer" style={{ backgroundImage: `url(${require('../../assets/mp2.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
        <Typography component="h1"><b>Dashboard</b></Typography>

        <div className="dashboardSummary">
          <div>
            <p><b>
              Total Amount : <br /> {totalAmount}
            </b></p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p><b>Packages</b></p>
              <p>{products && products?.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p><b>Orders</b></p>
              <p>{userOrders && userOrders?.length}</p>
            </Link>
          </div>
        </div>


        <div className="lineChart">
          <Line data={lineState} />
        </div>

<br/>
        {/* <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
    </div>
  );
};

export default TravelAgencyDashboard;