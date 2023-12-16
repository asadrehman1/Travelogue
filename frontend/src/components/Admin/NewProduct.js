import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, newProduct } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DeleteIcon from "@material-ui/icons/Delete";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import SideBar from "./Sidebar";
import { CREATE_ADMIN_PRODUCTS_RESET } from "../../constants/productConstants";


const categories = [
  "Adventure",
  "Leisure",
  "Honeymoon",
  "Cultural",
  "Wildlife and Nature",
];

const NewProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState();
  const [vehicleName, setVehicleName] = useState("");
  const [pricePerRoom, setPricePerRoom] = useState();
  const [capacity, setCapacity] = useState();
  const [selectedIncludes, setSelectedIncludes] = useState([]);
  const [selectedNotIncludes, setSelectedNotIncludes] = useState([]);
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [destination, setDestination] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([{ name: "", price: 0 }]);
  const [tourDate, setTourDate] = useState("");
  const [tourDates, setTourDates] = useState([]);
  const [newInclude, setNewInclude] = useState("");
  const [newNotInclude, setNewNotInclude] = useState("");

  const handleAddPickupPoint = () => {
    setPickupPoints([...pickupPoints, { name: "", price: 0 }]);
  };

  const handleRemovePickupPoint = (index) => {
    const updatedPickupPoints = [...pickupPoints];
    updatedPickupPoints.splice(index, 1);
    setPickupPoints(updatedPickupPoints);
  };

  const handleDeleteInclude = (index) => {
    const updatedSelectedIncludes = [...selectedIncludes];
    updatedSelectedIncludes.splice(index, 1);
    setSelectedIncludes(updatedSelectedIncludes);
  };

  const handlePickupPointsChange = (index, field, value) => {
    const updatedPickupPoints = [...pickupPoints];
    updatedPickupPoints[index][field] = value;
    setPickupPoints(updatedPickupPoints);
  };

  const handleAddTourDate = () => {
    if (tourDate) {
      // Parse the input date string to a Date object
      const parsedDate = new Date(tourDate);

      // Create a new Date object with only the date part (year, month, day)
      const dateWithoutTime = new Date(
        parsedDate.getUTCFullYear(),
        parsedDate.getUTCMonth(),
        parsedDate.getUTCDate()
      );

      setTourDates([...tourDates, dateWithoutTime]);
      setTourDate(""); // Reset tourDate
    }
  };

  const handleTourDateChange = (newDate, index) => {
    const updatedTourDates = [...tourDates];
    updatedTourDates[index] = new Date(newDate);
    setTourDates(updatedTourDates);
  };

  const handleRemoveTourDate = (index) => {
    const updatedTourDates = [...tourDates];
    updatedTourDates.splice(index, 1);
    setTourDates(updatedTourDates);
  };

  const handleAddInclude = () => {
    if (newInclude) {
      setSelectedIncludes([...selectedIncludes, newInclude]);
      setNewInclude("");
    }
  };



  const handleDeleteNotInclude = (index) => {
    const updatedSelectedNotIncludes = [...selectedNotIncludes];
    updatedSelectedNotIncludes.splice(index, 1);
    setSelectedNotIncludes(updatedSelectedNotIncludes);
  };

  const handleAddNotInclude = () => {
    if (newNotInclude) {
      setSelectedNotIncludes([...selectedNotIncludes, newNotInclude]);
      setNewNotInclude("");
    }
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/travelagency/dashboard");
      dispatch({ type: CREATE_ADMIN_PRODUCTS_RESET });
    }
  }, [dispatch, error, alert, success, navigate]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setImagesPreview((old) => [...old, fileReader.result]);
          setImages((old) => [...old, fileReader.result]);
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("capacity", capacity);
    myForm.set("vehicleName", vehicleName);
    myForm.set("duration", duration);
    myForm.set("destination", destination);
    myForm.set("includes", JSON.stringify(selectedIncludes));
    myForm.set("notIncludes", JSON.stringify(selectedNotIncludes));
    myForm.set("hotel", hotel);
    myForm.set("numberOfRooms", numberOfRooms);
    myForm.set("pricePerRoom", pricePerRoom);

    // Convert the pickupPoints array to a JSON string
    const pickupPointsString = JSON.stringify(pickupPoints);
    myForm.set("pickupPoints", pickupPointsString);

    const formattedDates = tourDates.map((date) => {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleDateString(); // Format the date as "MM/DD/YYYY"
    });

    myForm.set("dates", JSON.stringify(formattedDates));

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(newProduct(myForm));
  };

  return (
    
    <Fragment>
      <MetaData title="Create Package" />

      <div className="dashboard">
        <SideBar />
        <div
          className="newProductContainer"
          style={{
            backgroundImage: `url(${require("../../assets/td2.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>
              <b>Create Package</b>
            </h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Package Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>



            {pickupPoints.map((point, index) => (
              <div className="pick-up-points" key={index}>
                <FmdGoodIcon />
                <input
                  type="text"
                  placeholder="Pickup Point Name"
                  value={point.name}
                  onChange={(e) =>
                    handlePickupPointsChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Extra Price"
                  value={point.price}
                  onChange={(e) =>
                    handlePickupPointsChange(index, "price", e.target.value)
                  }
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePickupPoint(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button className="pick-up-points-btn" type="button" onClick={handleAddPickupPoint}>
              Add More Pickup Points
            </button>


            <div>
              <DirectionsCarIcon />
              <input
                type="text"
                placeholder="Vehicle Name"
                required
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
              />
            </div>
            <div>
              <PeopleAltIcon />
              <input
                type="number"
                placeholder="Capacity"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>



            <div className="tourDatesSection">
              <div class="row">
                <div class="col">
                  <input
                    type="date"
                    className="calender"
                    placeholder="Tour Date"
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">
                  {tourDates.map((date, index) => (
                    <div key={index} className="tourDate">
                      <input
                        type="date"
                        className="selected-dates"
                        value={date.toISOString().split("T")[0]}
                        onChange={(e) =>
                          handleTourDateChange(e.target.value, index)
                        }
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveTourDate(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <button type="button" onClick={handleAddTourDate}>
                    Add Tour Date
                  </button>
                </div>
              </div>
            </div>


            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Hotel Name"
                required
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price Per Room"
                required
                value={pricePerRoom}
                onChange={(e) => setPricePerRoom(e.target.value)}
              />
            </div>
            <div>
              <PeopleAltIcon />
              <input
                type="number"
                placeholder="Number of Rooms"
                required
                value={numberOfRooms}
                onChange={(e) => setNumberOfRooms(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name="category"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <AccessTimeFilledIcon />
              <input
                type="text"
                placeholder="Duration"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div>
              <FmdGoodIcon />
              <input
                type="text"
                placeholder="Destination"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <br />

            <div className="includesContainer">
              <p>Includes:</p>

              {selectedIncludes.map((include, index) => (
                <div key={index} className="includeLabel">
                  {include}
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteInclude(index)}
                  />
                </div>
              ))}

              <input
                type="text"
                placeholder="Add Include"
                className="include-fields"
                value={newInclude}
                onChange={(e) => setNewInclude(e.target.value)}
              />
              <button type="button" onClick={handleAddInclude}>
                Add Include
              </button>
            </div>


            <br />
            <div className="includesContainer">
              <p>Not Includes:</p>
              {selectedNotIncludes.map((notInclude, index) => (
                <div key={index} className="includeLabel">
                  {notInclude}
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteNotInclude(index)}
                  />
                </div>
              ))}
              <input
                type="text"
                placeholder="Add Not Include"
                className="include-fields"
                value={newNotInclude}
                onChange={(e) => setNewNotInclude(e.target.value)}
              />
              <button type="button" onClick={handleAddNotInclude}>
                Not Include
              </button>
            </div>


            <br />
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
