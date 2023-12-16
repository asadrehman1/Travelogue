import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./VehicleCard.css"

const VehicleCard = ({ vehicle }) => {
  const options = {
    value: vehicle?.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="card">
      <Link className="vehicleCard" to={`/vehicle/${vehicle?._id}`}>
        <img className="card-img-top" src={vehicle?.images[0]?.url} alt={vehicle?.name} />

        <div class="card-body">
        <p className="vehicle-title">
          <b>{vehicle.name}</b>
          <br/>
          {vehicle.model}</p>


          <Rating {...options} />{" "}
          <p className="vehicle-ratting">
            {" "}
            ({vehicle?.numOfReviews} Reviews)
          </p>

          <p className="vehicle-price"><b>{`Capacity: ${vehicle?.capacity}`}</b></p>
          <button className="read-more-btn">Read More</button>
        </div>
      </Link>
    </div>
  );
};

export default VehicleCard;
