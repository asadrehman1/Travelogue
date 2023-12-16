import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewVehicle.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, newVehicle } from "../../actions/vehicleActions";
import { useAlert } from "react-alert";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/Header/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../Admin/Sidebar";
import { CREATE_VEHICLE_RESET } from "../../constants/vehicleConstants";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const NewVehicle = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [city, setCity] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const [customNotInclude, setCustomNotInclude] = useState(""); // Custom notInclude
  const [dynamicFeatures, setDynamicFeatures] = useState([]);
  const [dynamicNotIncludes, setDynamicNotIncludes] = useState([]); // Array to store dynamic notIncludes

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newVehicle);

  const handleIncludeDelete = (index) => {
    const newDynamicFeatures = [...dynamicFeatures];
    newDynamicFeatures.splice(index, 1);
    setDynamicFeatures(newDynamicFeatures);
  };

  const handleNotIncludeDelete = (index) => {
    const newDynamicNotIncludes = [...dynamicNotIncludes];
    newDynamicNotIncludes.splice(index, 1);
    setDynamicNotIncludes(newDynamicNotIncludes);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Vehicle Created Successfully");
      navigate("/transportagency/dashboard");
      dispatch({ type: CREATE_VEHICLE_RESET });
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

    myForm.set("vehicleType", vehicleType);
    myForm.set("model", model);
    myForm.set("capacity", capacity);
    myForm.set("name", name);
    myForm.set("city", city);
    myForm.set("quantity", quantity);
    myForm.set("price", price);
    myForm.set("features", JSON.stringify(dynamicFeatures));
    myForm.set("notIncludes", JSON.stringify(dynamicNotIncludes));

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(newVehicle(myForm));
  };

  const addCustomFeature = () => {
    if (customFeature.trim() !== "") {
      setDynamicFeatures([...dynamicFeatures, customFeature]);
      setCustomFeature("");
    }
  };

  const addCustomNotInclude = () => {
    if (customNotInclude.trim() !== "") {
      setDynamicNotIncludes([...dynamicNotIncludes, customNotInclude]);
      setCustomNotInclude("");
    }
  };

  return (
    <Fragment>
      <MetaData title="Create Vehicle" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer myCont"
          style={{
            backgroundImage: `url(${require("../../assets/bkng.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Vehicle</h1>
            <div>
              <DirectionsCarIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <FmdGoodIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setVehicleType(e.target.value)}
                value={vehicleType}
                name="vehicleType"
              >
                <option value="">Choose Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
                <option value="SUV">Suv</option>
              </select>
            </div>
            <div>
              <FormatListNumberedIcon />
              <input
                type="number"
                placeholder="Quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price/Day"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DirectionsCarIcon />
              <input
                type="text"
                placeholder="Model"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
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

            <br />
            {/*includes*/}

            <div className="row">
              <p className="include-para2">Includes:</p>
            </div>


            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1px' }}>

              {dynamicFeatures.map((feature, index) => (
                <div key={index} className="col-auto includeLabel" style={{ marginRight: '0px', marginBottom: '10px' }}>
                  <IconButton
                    onClick={() => handleIncludeDelete(index)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <ListItem>
                    <ListItemText primary={feature} />
                  </ListItem>
                </div>
              ))}

            </div>


            <div className="row custom-feature-container" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

              <input className="cutsom-text-field" style={{ marginLeft: '5%', width: '94%' }}
                type="text"
                placeholder="Add Custom Features"
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
              />
              <Button style={{ marginLeft: '5%', width: '94%' }}
                variant="outlined"
                color="primary"
                type="button"
                onClick={addCustomFeature}
              >
                Add
              </Button>
            </div>



            <br />
            {/*Not includes*/}
            <div className="row">   
                <p className="include-para2">Not Includes:</p>     
            </div>

            <div className="row"  style={{ display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
              
                {dynamicNotIncludes.map((notInclude, index) => (
                  <div key={index} className="col-auto includeLabel" style={{ marginRight: '0px', marginBottom: '10px' }}>
                    <IconButton
                      onClick={() => handleNotIncludeDelete(index)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <ListItem>
                      <ListItemText primary={notInclude} />
                    </ListItem>
                  </div>
                ))}
            </div>

            <div className="row custom-feature-container" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                         
                  <input className="cutsom-text-field" style={{ marginLeft: '5%', width: '94%' }}
                    type="text"
                    placeholder="Not Included Features"
                    value={customNotInclude}
                    onChange={(e) => setCustomNotInclude(e.target.value)}
                  />
                  <Button style={{ marginLeft: '5%', width: '94%' }}
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={addCustomNotInclude}
                  >
                    Add
                  </Button>
            
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

export default NewVehicle;
