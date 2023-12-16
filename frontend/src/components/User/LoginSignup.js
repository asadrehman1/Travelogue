import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useAlert } from "react-alert";
import { clearError, login, register } from "../../actions/userActions";

import image1 from '../../assets/box1.jpg'
import image2 from '../../assets/treelogo.png'



const LoginSignup = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [requestPendingAlertShown, setRequestPendingAlertShown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    secretKey: "",
    travelAgency: {
      agencyName: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
    },
    transportAgency: {
      agencyName: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
    },
  });

  const { name, email, password, role, travelAgency, secretKey, transportAgency } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const { loading, error, isAuthenticated, user:newUser } = useSelector(
    (state) => state.user
  );
  console.log(newUser,"newuser");
  console.log(role);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    setIsShow(true);
  }, []);

  useEffect(() => {
    if (error && isShow && formSubmitted) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated && !newUser?.isApproved && !requestPendingAlertShown) {
      alert.success("Your request is pending approval.");
      setRequestPendingAlertShown(true);
    }
    if (isAuthenticated && newUser?.isApproved) {
      navigate(redirect);
    }
  }, [dispatch, alert, error, isAuthenticated, navigate, redirect, isShow, formSubmitted,newUser?.isApproved,requestPendingAlertShown]);

  const resetFormFields = () => {
    setLoginEmail("");
    setLoginPassword("");
    setUser({
      name: "",
      email: "",
      password: "",
      role: "user",
      secretKey: "",
      travelAgency: {
        agencyName: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
      },
      transportAgency: {
        agencyName: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
      },
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    setFormSubmitted(true);
    resetFormFields();
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("avatar", avatar);

    if (role === "admin") {
      formData.append("secretKey", secretKey);
    }
    else if (role === "travelAgency") {
      formData.append("travelAgency.agencyName", travelAgency.agencyName);
      formData.append("travelAgency.contactEmail", travelAgency.contactEmail);
      formData.append("travelAgency.contactPhone", travelAgency.contactPhone);
      formData.append("travelAgency.address", travelAgency.address);
    } else if (role === "transportAgency") {
      formData.append("transportAgency.agencyName", transportAgency.agencyName);
      formData.append("transportAgency.contactEmail", transportAgency.contactEmail);
      formData.append("transportAgency.contactPhone", transportAgency.contactPhone);
      formData.append("transportAgency.address", transportAgency.address);
    }
    // console.log(secretKey);
    dispatch(register(formData));
    setFormSubmitted(true);
    resetFormFields();
    // alert.success('Your request is pending approval.');
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setAvatarPreview(fileReader.result);
          setAvatar(fileReader.result);
        }
      }
      fileReader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "role") {
      setUser({
        ...user,
        role: e.target.value,
      });
    } else if (e.target.name.startsWith("travelAgency")) {
      setUser({
        ...user,
        travelAgency: {
          ...travelAgency,
          [e.target.name.split("[")[1].split("]")[0]]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("transportAgency")) {
      setUser({
        ...user,
        transportAgency: {
          ...transportAgency,
          [e.target.name.split("[")[1].split("]")[0]]: e.target.value,
        },
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };


  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <div className="LoginSignUpContainer " style={{ backgroundImage: `url(${require('../../assets/box6.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
          
          <div className="LoginSignUpBox">

            <div className="cover-img-section">
              <img className="coverImg" src={image1} alt="cover-img" width="100%" />
              <div className="centeredContent">
                <img className="logoImg" src={image2} alt="logo-img" width="42%" />
                <br />
                <h4 className="welcome-heading">Welcome to Travelogue.</h4>
              </div>
            </div>

            <div>
              <div className="login_signUp_toggle">
                <p  onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p  onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon/>
                <input className="field-set"
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
              style={{
                marginTop: role === "travelAgency" ? "160px" : role === "admin" ? "40px" : role === "transportAgency" ?
                  "160px" : role === "user" ? "30px" : ''
              }}
            >
              <br/>
              <br/>
              <br/>
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpSecretKey">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpSecretKey" style={{ marginBottom: "13px" }}>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
             <br/>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpRole">
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={registerDataChange}
                >
                  <option value="user">User</option>
                  <option value="travelAgency">Travel Agency</option>
                  <option value="transportAgency">Transport Agency</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {role === "travelAgency" && (
                <>
                  <h2 style={{ fontSize: "16px", textDecoration: "none", marginTop: "15px" }}>Travel Agency Details:</h2>
                  <div className="signUpSecretKey">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Agency Name"
                      required
                      name="travelAgency[agencyName]"
                      value={travelAgency.agencyName}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpSecretKey">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Contact Email"
                      required
                      name="travelAgency[contactEmail]"
                      value={travelAgency.contactEmail}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpSecretKey">
                    <PhoneIcon />
                    <input
                      type="text"
                      placeholder="Contact Phone"
                      required
                      name="travelAgency[contactPhone]"
                      value={travelAgency.contactPhone}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpSecretKey">
                    <RoomIcon />
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      name="travelAgency[address]"
                      value={travelAgency.address}
                      onChange={registerDataChange}
                    />
                  </div>
                </>
              )}
              {role === "transportAgency" && (
                <>
                  <h2 style={{ fontSize: "16px", textDecoration: "none", marginTop: "15px" }}>Transport Agency Details:</h2>
                  <div className="signUpSecretKey">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Agency Name"
                      required
                      name="transportAgency[agencyName]"
                      value={transportAgency.agencyName}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpSecretKey">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Contact Email"
                      required
                      name="transportAgency[contactEmail]"
                      value={transportAgency.contactEmail}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpSecretKey">
                    <PhoneIcon />
                    <input
                      type="text"
                      placeholder="Contact Phone"
                      required
                      name="transportAgency[contactPhone]"
                      value={transportAgency.contactPhone}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpSecretKey">
                    <RoomIcon />
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      name="transportAgency[address]"
                      value={transportAgency.address}
                      onChange={registerDataChange}
                    />
                  </div>
                </>
              )}
              {role === "admin" && <div className="signUpSecretKey">
                <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="Secret Key (Admin)"
                  name="secretKey"
                  value={secretKey}
                  onChange={registerDataChange}
                />
              </div>}
              <br/>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      </Fragment>
      }
    </Fragment>
  );
};

export default LoginSignup;
