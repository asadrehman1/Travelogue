// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   clearError,
//   updateProduct,
//   getProductDetails,
// } from "../../actions/productActions";
// import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
// import MetaData from "../layout/Header/MetaData";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
// import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import FmdGoodIcon from '@mui/icons-material/FmdGood';
// import SideBar from "./Sidebar";
// import { UPDATE_ADMIN_PRODUCTS_RESET } from "../../constants/productConstants";

// const UpdateProduct = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { error, product } = useSelector((state) => state.productDetails);

//   const {
//     loading,
//     error: updateError,
//     isUpdated,
//   } = useSelector((state) => state.product);

//   const [name, setName] = useState("");
//   const [vehicleName, setVehicleName] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [images, setImages] = useState([]);
//   const [duration, setDuration] = useState(""); // Added duration state
//   const [destination, setDestination] = useState(""); // Added destination state
//   const [oldImages, setOldImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);

//   const productId = id;

//   const categories = [
//     "Adventure",
//     "Leisure",
//     "Honeymoon",
//     "Cultural",
//     "Wildlife and Nature",
//   ];

//   useEffect(() => {
//     if (product && product._id !== productId) {
//       dispatch(getProductDetails(productId));
//     } else {
//       setName(product.name);
//       setVehicleName(product.vehicleName);
//       setCapacity(product.capacity);
//       setDescription(product.description);
//       setPrice(product.price);
//       setCategory(product.category);
//       setOldImages(product.images);
//       setDuration(product.duration);
//       setDestination(product.destination);
//     }
//     if (error) {
//       alert.error(error);
//       dispatch(clearError());
//     }

//     if (updateError) {
//       alert.error(updateError);
//       dispatch(clearError());
//     }

//     if (isUpdated) {
//       alert.success("Product Updated Successfully");
//       navigate("/admin/products");
//       dispatch({ type: UPDATE_ADMIN_PRODUCTS_RESET });
//     }
//   }, [
//     dispatch,
//     alert,
//     error,
//     isUpdated,
//     productId,
//     product,
//     updateError,
//     navigate,
//   ]);

//   const updateProductSubmitHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("price", price);
//     myForm.set("description", description);
//     myForm.set("category", category);
//     myForm.set("vehicleName", vehicleName);
//     myForm.set("capacity", capacity);
//     myForm.set("destination", destination);
//     myForm.set("duration", duration);

//     images.forEach((image) => {
//       myForm.append("images", image);
//     });
//     dispatch(updateProduct(productId, myForm));
//   };

//   const updateProductImagesChange = (e) => {
//     const files = Array.from(e.target.files);

//     setImages([]);
//     setImagesPreview([]);
//     setOldImages([]);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagesPreview((old) => [...old, reader.result]);
//           setImages((old) => [...old, reader.result]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   return (

//     <Fragment>
//       <MetaData title="Update Package" />
//       <div className="dashboard">
//         <SideBar />
//         <div className="newProductContainer" style={{ backgroundImage: `url(${require('../../assets/td1.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
//           <form
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={updateProductSubmitHandler}
//             style={{height:"110vh"}}
//           >
//             <h1 style={{ width: "fit-content", whiteSpace: "nowrap" }}>Update Package</h1>

//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="Package Name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <DirectionsCarIcon  />
//               <input
//                 type="text"
//                 placeholder="Vehicle Name"
//                 required
//                 value={vehicleName}
//                 onChange={(e) => setVehicleName(e.target.value)}
//               />
//             </div>
//             <div>
//               <PeopleAltIcon />
//               <input
//                 type="number"
//                 placeholder="Capacity"
//                 required
//                 value={capacity}
//                 onChange={(e) => setCapacity(e.target.value)}
//               />
//             </div>
//             <div>
//               <AttachMoneyIcon />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 required
//                 onChange={(e) => setPrice(e.target.value)}
//                 value={price}
//               />
//             </div>

//             <div>
//               <DescriptionIcon />

//               <textarea
//                 placeholder="Product Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 cols="30"
//                 rows="1"
//               ></textarea>
//             </div>
//             <div>
//               <AccessTimeFilledIcon />
//               <input
//                 type="text"
//                 placeholder="Product Duration"
//                 required
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//               />
//             </div>
//             <div>
//               <FmdGoodIcon />
//               <input
//                 type="text"
//                 placeholder="Product Destination"
//                 required
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//               />
//             </div>
//             <div>
//               <AccountTreeIcon />
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Choose Category</option>
//                 {categories.map((cate) => (
//                   <option key={cate} value={cate}>
//                     {cate}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div id="createProductFormFile">
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={updateProductImagesChange}
//                 multiple
//               />
//             </div>

//             <div id="createProductFormImage">
//               {oldImages &&
//                 oldImages.map((image, index) => (
//                   <img key={index} src={image.url} alt="Old Product Preview" />
//                 ))}
//             </div>

//             <div id="createProductFormImage">
//               {imagesPreview.map((image, index) => (
//                 <img key={index} src={image} alt="Product Preview" />
//               ))}
//             </div>

// <br/>
//             <Button
//               id="createProductBtn"
//               type="submit"
//               disabled={loading ? true : false}
//             >
//               Update
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateProduct;
import "./NewProduct.css";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  clearError,
  updateProduct,
  getProductDetails,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import SideBar from "./Sidebar";
import { UPDATE_ADMIN_PRODUCTS_RESET } from "../../constants/productConstants";


const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [vehicleName, setVehicleName] = useState("");
  const [pricePerRoom, setPricePerRoom] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [selectedIncludes, setSelectedIncludes] = useState([]);
  const [selectedNotIncludes, setSelectedNotIncludes] = useState([]);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [duration, setDuration] = useState("");
  const [destination, setDestination] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([{ name: "", price: 0 }]);
  const [newInclude, setNewInclude] = useState("");
  const [newNotInclude, setNewNotInclude] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [tourDates, setTourDates] = useState([]);

  const productId = id;

  const categories = [
    "Adventure",
    "Leisure",
    "Honeymoon",
    "Cultural",
    "Wildlife and Nature",
  ];



  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setVehicleName(product.vehicleName);
      setCapacity(product.capacity);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setDuration(product.duration);
      setDestination(product.destination);
      setPickupPoints(product.pickupPoints);
      setPricePerRoom(product.pricePerRoom);
      setHotel(product.hotel);
      setNumberOfRooms(product.numberOfRooms);
      setSelectedIncludes(product.includes);
      setSelectedNotIncludes(product.notIncludes);
      setTourDates(product.dates.map((dateString) => new Date(dateString)));
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
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_ADMIN_PRODUCTS_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    productId,
    product,
    updateError,
    navigate,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("vehicleName", vehicleName);
    myForm.set("capacity", capacity);
    myForm.set("destination", destination);
    myForm.set("duration", duration);

    const formattedDates = tourDates.map((date) => {
      // Convert the date string to a Date object
      const formattedDate = new Date(date);

      // Format the Date object as a string (e.g., "2023-05-09")
      return formattedDate.toISOString().split("T")[0];
    });

    // Set the dates field in myForm as a JSON string
    myForm.set("dates", JSON.stringify(formattedDates));

    images.forEach((image) => {
      myForm.append("images", image);
    });

    pickupPoints.forEach((point, index) => {
      myForm.append(`pickupPoints[${index}][name]`, point.name);
      myForm.append(`pickupPoints[${index}][price]`, point.price);
    });

    myForm.set("pricePerRoom", pricePerRoom);
    myForm.set("hotel", hotel);
    myForm.set("numberOfRooms", numberOfRooms);
    myForm.set("includes", JSON.stringify(selectedIncludes));
    myForm.set("notIncludes", JSON.stringify(selectedNotIncludes));

    dispatch(updateProduct(productId, myForm));
  };
  const handleAddPickupPoint = () => {
    setPickupPoints([...pickupPoints, { name: "", price: 0 }]);
  };
  const handleDeleteInclude = (index) => {
    const updatedSelectedIncludes = [...selectedIncludes];
    updatedSelectedIncludes.splice(index, 1);
    setSelectedIncludes(updatedSelectedIncludes);
  };
  const handleDeleteNotInclude = (index) => {
    const updatedSelectedNotIncludes = [...selectedNotIncludes];
    updatedSelectedNotIncludes.splice(index, 1);
    setSelectedNotIncludes(updatedSelectedNotIncludes);
  };
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemovePickupPoint = (index) => {
    const updatedPickupPoints = [...pickupPoints];
    updatedPickupPoints.splice(index, 1);
    setPickupPoints(updatedPickupPoints);
  };

  const handlePickupPointsChange = (index, field, value) => {
    const updatedPickupPoints = [...pickupPoints];
    updatedPickupPoints[index][field] = value;
    setPickupPoints(updatedPickupPoints);
  };

  const handleAddInclude = () => {
    if (newInclude) {
      setSelectedIncludes([...selectedIncludes, newInclude]);
      setNewInclude("");
    }
  };

  const handleAddNotInclude = () => {
    if (newNotInclude) {
      setSelectedNotIncludes([...selectedNotIncludes, newNotInclude]);
      setNewNotInclude("");
    }
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

  return (
    <Fragment>
      <MetaData title="Update Package" />
      <div className="dashboard">
        <SideBar />
        <div
          className="newProductContainer"
          style={{
            backgroundImage: `url(${require("../../assets/td3.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1 style={{ width: "fit-content", whiteSpace: "nowrap" }}>
              Update Package
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
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
              <AccessTimeFilledIcon />
              <input
                type="text"
                placeholder="Product Duration"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <FmdGoodIcon />
              <input
                type="text"
                placeholder="Product Destination"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>


            {/* Pickup Points */}
            {pickupPoints.map((point, index) => (
              <div className="pick-up-points" key={index}>
                <FmdGoodIcon />
                <input
                  type="text"
                  placeholder="Pickup Point Name"
                  className="update-pickup"
                  value={point.name}
                  onChange={(e) =>
                    handlePickupPointsChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Extra Price"
                  className="update-pickup"
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
              Add Pickup Point
            </button>


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
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Hotel Name"
                required
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
              />
            </div>

            <br />
              {/* Includes */}
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
              {/* Not Includes */}
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
                onChange={updateProductImagesChange}
                multiple
              />
            </div>


            <br />
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
