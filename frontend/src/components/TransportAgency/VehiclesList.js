import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./VehiclesList.css"; 
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAllTransportAgencyVehicles,
  deleteVehicle,
} from "../../actions/vehicleActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Admin/Sidebar";
// import { DELETE_ADMIN_VEHICLES_RESET } from "../../constants/vehicleConstants";
import { DELETE_TRANSPORTAGENCY_VEHICLE_RESET } from "../../constants/vehicleConstants";

const VehicleList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, vehicles } = useSelector((state) => state.vehicles);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.vehicle
  );

  const deleteVehicleHandler = (id) => {
    dispatch(deleteVehicle(id));
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
      alert.success("Vehicle Deleted Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_TRANSPORTAGENCY_VEHICLE_RESET });
    }

    dispatch(getAllTransportAgencyVehicles());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Vehicle ID", minWidth: 200, flex: 1, disableColumnMenu: true },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "model",
      headerName: "Model",
      minWidth: 200,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "capacity",
      headerName: "Capacity",
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
            <Link to={`/transportagency/vehicle/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => deleteVehicleHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  vehicles &&
    vehicles.forEach((item) => {
      rows.push({
        id: item?._id,
        name: item?.name,
        model: item?.model,
        capacity: item?.capacity,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL VEHICLES - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="vehicleListContainer" style={{
            backgroundImage: `url(${require("../../assets/x3.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <h1 id="vehicleListHeading">Your Vehicles</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="vehicleListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default VehicleList;
