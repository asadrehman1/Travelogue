import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid"; 
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, myOrders } from "../../actions/orderActions";
import Loader from "../layout/Loader/Loader";
import { Link , useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/Header/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error,orders,loading} = useSelector(state=>state.myOrders);
    const {user} = useSelector(state=>state.user);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(myOrders());
    },[error,alert,dispatch])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 200,
          flex: 1,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 200,
          flex: 1,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 200,
          flex: 1,
        },
    
        {
          field: "actions",
          flex: 1,
          headerName: "Actions",
          minWidth: 200,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`/order/${params.getValue(params.id, "id")}`}>
                <LaunchIcon />
              </Link>
            );
          },
        },
      ];

    const rows = [];

    orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    return (
        <Fragment>
          <MetaData title={`${user?.name} - Orders`} />
    
          {loading ? (
            <Loader />
          ) : (
            <div style={{ backgroundImage: `url(${require('../../assets/edp.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <h1 className="orders-heading">Orders:</h1>
            <div className="myOrdersPage">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
              />
    
              <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
            </div>
            </div>
          )}
        </Fragment>
      );
    };
    
    export default MyOrders;