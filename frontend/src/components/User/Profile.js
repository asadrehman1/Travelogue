import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link ,useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  
  return (

    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name}'s Profile`} />
          <div className="profileContainer" style={{ backgroundImage: `url(${require('../../assets/edpp.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user?.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              {user?.role === "user" && <>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              </>}
              {user?.role === "admin" && <>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              </>}
              {user?.role === "travelAgency" && <>
              <div>
                <h4>Agency Name</h4>
                <p>{user?.travelAgency?.agencyName}</p>
              </div>
              <div>
                <h4>Contact Email</h4>
                <p>{user?.travelAgency?.contactEmail}</p>
              </div>
              <div>
                <h4>Phone No.</h4>
                <p>{user?.travelAgency?.contactPhone}</p>
              </div>
               <div>
                <h4>Address</h4>
                <p>{user?.travelAgency?.address}</p>
              </div>
              </>
              }
              {user?.role === "transportAgency" && <>
              <div>
                <h4>Agency Name</h4>
                <p>{user?.transportAgency?.agencyName}</p>
              </div>
              <div>
                <h4>Contact Email</h4>
                <p>{user?.transportAgency?.contactEmail}</p>
              </div>
              <div>
                <h4>Phone No.</h4>
                <p>{user?.transportAgency?.contactPhone}</p>
              </div>
               <div>
                <h4>Address</h4>
                <p>{user?.transportAgency?.address}</p>
              </div>
              </>
              }
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                {user?.role ==="user" && <Link to="/orders">My Orders</Link>}
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;