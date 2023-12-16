import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateRequest.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_APPROVED_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  clearError,
  updateApprovel,
} from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";

const UpdateRequest = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isApproved, setIsApproved] = useState(false);
  
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { loading, error, user } = useSelector((state) => state.userDetails);
  
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profile);
  
    const userId = id;
  
    useEffect(() => {
      if (user && user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setIsApproved(user?.isApproved);
      }
  
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }
      if (updateError) {
        alert.error(updateError);
        dispatch(clearError());
      }
      if (isUpdated) {
        alert.success("User Updated Successfully");
        navigate("/admin/requests");
        dispatch({ type: UPDATE_APPROVED_RESET });
      }
    }, [dispatch, error, alert, isUpdated, updateError, navigate, user, userId]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.set("isApproved", isApproved);
  
      dispatch(updateApprovel(userId, formData));
    };
  
    return (

      <Fragment>
        <MetaData title="Update User" />
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer" style={{ backgroundImage: `url(${require('../../assets/line.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}> 
            {loading ? (
              <Loader />
            ) : (
              <form
                className="UpdateRequestForm"
                encType="multipart/form-data"
                onSubmit={updateUserSubmitHandler}
              >
                <div class="d-flex flex-row justify-content-between mb-3">
                  <div class="p-2">
                    <h2 className="update-user-heading">
                      <b>Update Request</b>
                    </h2>
                  </div>
                  <div class="p-2">
                    <Link to="/admin/requests">
                      <CancelIcon className="cross-icon2" />
                    </Link>
                  </div>
                </div>
  
                {user?.role === "travelAgency" && (
                  <div class="d-flex flex-row justify-content-between">
                    <div class="p-2">
                      <label className="approve-label">Agency Name:</label>
                      <div>{user?.travelAgency?.agencyName}</div>
                    </div>
                    <div class="p-2">
                      <label className="approve-label">Contact Email:</label>
                      <div>{user?.travelAgency?.contactEmail}</div>
                    </div>
                    <div class="p-2">
                      <label className="approve-label">Contact Phone:</label>
                      <div>{user?.travelAgency?.contactPhone}</div>
                    </div>
                    <div class="p-2">
                      <label className="approve-label">Address:</label>
                      <div>{user?.travelAgency?.address}</div>
                    </div>
                  </div>
                )}
  
                {user?.role === "transportAgency" && (
                  <div class="d-flex flex-row justify-content-between">
                    <div class="p-2">
                      <label className="approve-label">Agency Name:</label>
                      <div>{user?.transportAgency?.agencyName}</div>
                    </div>
                    <div class="p-2">
                      <label className="approve-label">Contact Email:</label>
                      <div>{user?.transportAgency?.contactEmail}</div>
                    </div>
                    <div class="p-2">
                      <label className="approve-label">Contact Phone:</label>
                      <div>{user?.transportAgency?.contactPhone}</div>
                    </div>
                    <div class="p-2">
                      <label className="approve-label">Address:</label>
                      <div>{user?.transportAgency?.address}</div>
                    </div>
                  </div>
                )}
  
                <div class="d-flex flex-row justify-content-between">
                  <div class="p-2">
                    <label className="approve-label">Is Approved:</label>
                  </div>
                  <div class="p-2">
                    <input
                      type="checkbox"
                      checked={isApproved}
                      onChange={(e) => setIsApproved(e.target.checked)}
                    />
                  </div>
                </div>
  
                <br />
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={updateLoading ? true : false}
                >
                  Update
                </Button>
              </form>
            )}
          </div>
        </div>
      </Fragment>
    );
  };
  export default UpdateRequest;