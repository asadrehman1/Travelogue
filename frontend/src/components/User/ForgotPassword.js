import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../layout/Header/MetaData";
import { useAlert } from "react-alert"
import { clearError, forgotPassword } from "../../actions/userActions";
import CancelIcon from '@mui/icons-material/Cancel';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector(state => state.forgotPassword)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
    setEmail("")
  };




  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title="FORGOT PASSWORD" />
        <div className="forgotPasswordContainer" style={{ backgroundImage: `url(${require('../../assets/bk4.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
          <div className="forgotPasswordBox">
            <div class="d-flex flex-row justify-content-between mb-3">
              <div class="p-2"> <h2 className="forgotPasswordHeading"><b>Forgot Password</b></h2></div>
              <div class="p-2"><Link to="/login"><CancelIcon className="cross-icon"/></Link></div>
            </div>

            <form
              className="forgotPasswordForm"
              onSubmit={updateSubmit}
            >

              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input type="submit" value="Send" className="forgotPasswordBtn" />
            </form>
          </div>
        </div>
      </Fragment>}
    </Fragment>
  )
}

export default ForgotPassword;