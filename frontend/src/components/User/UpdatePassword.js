import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Loader from "../layout/Loader/Loader";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MetaData from "../layout/Header/MetaData";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearError, updatePassword } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import CancelIcon from '@mui/icons-material/Cancel';
import {Link} from 'react-router-dom';

const UpdatePassword = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Password Changed Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, alert, error, isUpdated, navigate]);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="UPDATE PASSWORD" />
          <div className="updatePasswordContainer" style={{ backgroundImage: `url(${require('../../assets/edpp.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            <div className="updatePasswordBox">
              <div class="d-flex flex-row justify-content-between mb-3">
              <div class="p-2"> <h2 className="updatePasswordHeading"><b>Update Password</b></h2></div>
              <div class="p-2"><Link to="/account"><CancelIcon className="cross-icon2"/></Link></div>
            </div>
              <form
                className="updatePasswordForm"

                onSubmit={updateSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
