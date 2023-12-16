import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearError , deleteOrder} from "../../actions/orderActions";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstants";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { user }= useSelector((state) => state.user);

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDERS_RESET });
    }

    dispatch(getAllOrders());
    console.log(user._id,"user")
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

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
      flex: 1
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 1
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
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const filteredOrders = orders?.filter((order) => order.travelAgencyId === user._id);

  const rows = [];

  filteredOrders?.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - TRAVELAGENCY`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer" style={{ backgroundImage: `url(${require('../../assets/bkng.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
          <h1 id="productListHeading">YOUR ORDERS:</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
