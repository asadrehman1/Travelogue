import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../layout/Header/MetaData";
import FaceIcon from "@material-ui/icons/Face";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearError, loadUser, updateProfile } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CancelIcon from '@mui/icons-material/Cancel';
import {Link} from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url || "/Profile.png"
  );
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // Additional state for special users
  const [agencyName, setAgencyName] = useState(
    user?.travelAgency?.agencyName || ""
  );
  const [contactEmail, setContactEmail] = useState(
    user?.travelAgency?.contactEmail || ""
  );
  const [contactPhone, setContactPhone] = useState(
    user?.travelAgency?.contactPhone || ""
  );
  const [address, setAddress] = useState(user?.travelAgency?.address || "");

  const [transportAgencyName, setTransportAgencyName] = useState(
    user?.transportAgency?.agencyName || ""
  );
  const [transportContactEmail, setTransportContactEmail] = useState(
    user?.transportAgency?.contactEmail || ""
  );
  const [transportContactPhone, setTransportContactPhone] = useState(
    user?.transportAgency?.contactPhone || ""
  );
  const [transportAddress, setTransportAddress] = useState(
    user?.transportAgency?.address || ""
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url || "/Profile.png");

      // Update special user fields
      if (user?.role === "travelAgency") {
        setAgencyName(user?.travelAgency?.agencyName || "");
        setContactEmail(user?.travelAgency?.contactEmail || "");
        setContactPhone(user?.travelAgency?.contactPhone || "");
        setAddress(user?.travelAgency?.address || "");
      }
      if (user?.role === "transportAgency") {
        setTransportAgencyName(user?.transportAgency?.agencyName || "");
        setTransportContactEmail(user?.transportAgency?.contactEmail || "");
        setTransportContactPhone(user?.transportAgency?.contactPhone || "");
        setTransportAddress(user?.transportAgency?.address || "");
      }

      // Handle error and success messages
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }
      if (isUpdated) {
        alert.success("Profile Successfully Updated");
        dispatch(loadUser());
        navigate("/account");

        dispatch({ type: UPDATE_PROFILE_RESET });
      }
    }
  }, [dispatch, alert, error, isUpdated, navigate, user]);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    // Additional data for special users
    if (user?.role === "travelAgency") {
      myForm.set("agencyName", agencyName);
      myForm.set("contactEmail", contactEmail);
      myForm.set("contactPhone", contactPhone);
      myForm.set("address", address);
    } else if (user?.role === "transportAgency") {
      myForm.set("agencyName", transportAgencyName);
      myForm.set("contactEmail", transportContactEmail);
      myForm.set("contactPhone", transportContactPhone);
      myForm.set("address", transportAddress);
    }

    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setAvatarPreview(fileReader.result);
        setAvatar(fileReader.result);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <MetaData title="UPDATE PROFILE" />
          <div className="updateProfileContainer" style={{ backgroundImage: `url(${require('../../assets/edpp.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            <div className="updateProfileBox">
            <div class="d-flex flex-row justify-content-between mb-3">
              <div class="p-2"> <h2 className="updateProfileHeading"><b>Update Profile</b></h2></div>
              <div class="p-2"><Link to="/account"><CancelIcon className="cross-icon2"/></Link></div>
            </div>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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
                {/* Special user fields */}
                {user?.role === "travelAgency" && (
                  <Fragment>
                    <div>
                      <FaceIcon />
                      <input
                        type="text"
                        placeholder="Agency Name"
                        required
                        name="agencyName"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Contact Email"
                        required
                        name="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <PhoneIcon />
                      <input
                        type="text"
                        placeholder="Contact Phone"
                        required
                        name="contactPhone"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <RoomIcon />
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </Fragment>
                )}
                {user?.role === "transportAgency" && (
                  <Fragment>
                    <div>
                      <FaceIcon />
                      <input
                        type="text"
                        placeholder="Transport Agency Name"
                        required
                        name="transportAgencyName"
                        value={transportAgencyName}
                        onChange={(e) => setTransportAgencyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Transport Contact Email"
                        required
                        name="transportContactEmail"
                        value={transportContactEmail}
                        onChange={(e) =>
                          setTransportContactEmail(e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <PhoneIcon />
                      <input
                        type="text"
                        placeholder="Transport Contact Phone"
                        required
                        name="transportContactPhone"
                        value={transportContactPhone}
                        onChange={(e) =>
                          setTransportContactPhone(e.target.value)
                        }
                      />
                    </div>
                    <div>
                        <RoomIcon style={{ marginBottom:"38px" }} />
                      <textarea
                        placeholder="Transport Address"
                        required
                        name="transportAddress"
                        value={transportAddress}
                        onChange={(e) => setTransportAddress(e.target.value)}
                        rows={4}
                        style={{
                          resize: "vertical",
                          width: "100%",
                          padding: "8px",
                          fontSize: "12px",
                          paddingLeft:"48px"
                        }}
                      />
                    </div>
                  </Fragment>
                )}
                {/* Avatar input */}
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
