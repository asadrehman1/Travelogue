import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_ADMIN_PRODUCTS_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_ADMIN_PRODUCTS_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError,isDeleted ,navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 1,disableColumnMenu: true, },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      minWidth: 200,
      flex: 1, // Adjust flex value
      disableColumnMenu: true,
    },
    {
      field: "destination",
      headerName: "Destination",
      minWidth: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        duration: item.duration,
        destination:item.destination,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer" style={{ backgroundImage: `url(${require('../../assets/bk4.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
          <h1 id="productListHeading">YOUR PACKAGES:</h1>

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

export default ProductList;