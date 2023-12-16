import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./VehicleReviews.css"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { useNavigate } from "react-router-dom";
import SideBar from "../Admin/Sidebar"
import { DELETE_VEHICLE_REVIEW_RESET } from "../../constants/vehicleConstants";
import { clearError,deleteVehicleReview, getAllVehicleReviews } from "../../actions/vehicleActions";

const VehicleReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteVehicleReview
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.allVehicleReviews
  );
  console.log(reviews,"hello");

  const [vehicleId, setVehicleId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteVehicleReview(reviewId, vehicleId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    console.log(vehicleId);
    dispatch(getAllVehicleReviews(vehicleId));
  };

  useEffect(() => {
    if (vehicleId.length === 24) {
      dispatch(getAllVehicleReviews(vehicleId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/vehicle/reviews");
      dispatch({ type: DELETE_VEHICLE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, vehicleId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  
  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer" style={{
            backgroundImage: `url(${require("../../assets/line.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">Vehicle Reviews</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Vehicle Id"
                required
                value={vehicleId}
                onChange={(e) => {
                  setVehicleId(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || vehicleId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          <br />
          <br/>


          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default VehicleReviews;