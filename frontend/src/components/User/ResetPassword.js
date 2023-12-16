import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/Header/MetaData";
import { useNavigate,useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearError, resetPassword } from "../../actions/userActions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {token} = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, success, error } = useSelector((state) => state.forgotPassword);

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password Changed Successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, success, navigate]);


  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token,myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="RESET PASSWORD" />
          <div className="resetPasswordContainer" style={{ backgroundImage: `url(${require('../../assets/edpp.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form className="resetPasswordForm" onSubmit={updateSubmit}>

                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
