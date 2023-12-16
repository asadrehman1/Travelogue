import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateUser.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USERS_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  clearError,
  updateUser,
} from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  console.log(user)
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
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
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
      navigate("/admin/users");
      dispatch({ type: UPDATE_USERS_RESET });
    }
  }, [dispatch, error, alert, isUpdated, updateError, navigate, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer" style={{ backgroundImage: `url(${require('../../assets/x4.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          {loading ? (
            <Loader />
          ) : (
            <form
              className="UpdateUserForm"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <div class="d-flex flex-row justify-content-between mb-3">
                <div class="p-2"> <h2 className="update-user-heading"><b>Update User</b></h2></div>
                <div class="p-2"><Link to="/admin/users"><CancelIcon className="cross-icon2" /></Link></div>
              </div>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  name="role"
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <br />
              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
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

export default UpdateUser;
