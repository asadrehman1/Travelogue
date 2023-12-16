import React, { Fragment, useEffect, useState } from "react";
import "./Vehicles.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearError, getVehicles } from "../../actions/vehicleActions";
import VehicleCard from "../Home/VehicleCard"; // Assuming you have a VehicleCard component
import { useAlert } from 'react-alert';
import MetaData from "../layout/Header/MetaData";


import image1 from '../../assets/imageM.jpg'
import image2 from '../../assets/imageN.jpg'
import image3 from '../../assets/imageO.jpg'
import image4 from '../../assets/vehiclepkg.jpg'
import image5 from '../../assets/cargo1.png'
import image6 from '../../assets/cargo2.png'
import image7 from '../../assets/cargo3.png'
import image8 from '../../assets/cargo4.jpg'
import image9 from '../../assets/vehicleview.jpg'
import image10 from '../../assets/vehicleview2.jpg'
import image11 from '../../assets/drivingman.jpg'
import image12 from '../../assets/driver1.jpg'

import PinDropIcon from '@mui/icons-material/PinDrop';
import SettingsIcon from '@mui/icons-material/Settings';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarIcon from '@mui/icons-material/Star';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LuggageIcon from '@mui/icons-material/Luggage';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';


import Lottie from "lottie-react"
import walkingcar from '../../assets/walkingcar.json'
import drive from '../../assets/drive.json'
import driving from '../../assets/driving.json'
import ourcargosanimation from '../../assets/h3.json'
import vansanimation from '../../assets/vh2.json'

const Vehicles = () => {
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [price, setPrice] = useState([0, 25000]);
  //   const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error,
    vehicles,
    vehicleCount,
    resultsPerPage,
  } = useSelector(state => state.vehicles);



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getVehicles());
  }, [dispatch, alert, error]);

  //   const setCurrentPageNo = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  //   const priceHandler = (event, newPrice) => {
  //     setPrice(newPrice);
  //     setCurrentPageNo(1); // Reset page number when price filter changes
  //   };



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          {/*Carousel*/}
          <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000" data-bs-wrap="true" data-bs-pause="false">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>

            </div>
            <div className="carousel-inner">

              <div className="carousel-item active">
                <div className="image-overlay"></div>
                <img src={image1} className="d-block w-100" alt="car-rent" />
                <div className="carousel-caption" >
                  <h5 className='caption-heading white-clr'>Drive in Style, Drive in Comfort!
                    <br />-Rental Cars
                  </h5>
                </div>
              </div>

              <div className="carousel-item">
                <div className="image-overlay"></div>
                <img src={image2} class="d-block w-100" alt="bus-rent" />
                <div className="carousel-caption">
                  <h5 className='caption-heading white-clr'>Travel Together, Explore Together!
                    <br />-Rental Bus Service
                  </h5>
                </div>
              </div>

              <div className="carousel-item">
                <div className="image-overlay"></div>
                <img src={image3} className="d-block w-100" alt="jeep-rent" />
                <div className="carousel-caption">
                  <h5 className='caption-heading white-clr'>Off-Road Adventures Awaiting!
                    <br />-Rental Jeeps
                  </h5>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>



          {/*About our vehicle packages*/}
          <div className="max-width about-vehiclepackage-section">
            <div className="row">

              <div className="col-md-6 col-sm-12 py-5">
                <h2 className='about-vehiclepackages-heading'>
                  <b>About Our Vehicle Packages</b></h2>
                <p className='about-vehiclepackages-para'>
                  Embark on a journey of comfort and convenience with our unparalleled fleet of vehicles offered by esteemed transport rental companies on our platform. Our registered partners bring you a seamless travel experience, providing alot of services to elevate your journey. Enjoy the luxury of stress-free pick and drop services. Our vehicles are equipped with top-notch amenities, offering climate control features such as AC and heaters to ensure your comfort in every season. Choose from Rental Cars, Jeeps, or Buses from our diverse range to suit your travel preferences.
                </p>
                <p className="vehicles-service-icons"><PinDropIcon /> Pick & Drops&nbsp;&nbsp;&nbsp; <SettingsIcon />AC/ Heater Service&nbsp;&nbsp;&nbsp; <DirectionsCarIcon /> Rental Cars&nbsp;&nbsp;&nbsp;<AirportShuttleIcon />Rental Jeeps&nbsp;&nbsp;&nbsp; <DirectionsBusIcon /> Rental Busses&nbsp;&nbsp;&nbsp;</p>
                <Lottie className="cars-animation" loop={true} animationData={walkingcar} />
              </div>

              <div className="col-md-6 col-sm-12 py-5">
                <img className='section-img' src={image4} alt='VehiclePackage' width="100%" />
              </div>

            </div>
          </div>



          {/*Our cargos*/}
          <br />
          <div class="d-flex cargos-section">
          <div class="p-2"><Lottie className="cargos-animation" loop={true} animationData={ourcargosanimation} /></div>
          <div class="p-2"><h2 className="cargos-heading"><b>Our Cargos!</b></h2></div>
        </div>
          <br />

          <div className="container text-center">
            <div className="row">

              <div className="col">
                <img className="cargo-image" src={image5} alt="Cargo1" width="90%" />
                <br />
                <br />
                <p className="cargo-para"><b>Cars</b></p>
              </div>

              <div className="col">
                <img className="cargo-image" src={image6} alt="Cargo2" width="90%" />
                <br />
                <br />
                <p className="cargo-para"><b>Vans</b></p>
              </div>

              <div className="col">
                <img className="cargo-image" src={image7} alt="Cargo3" width="90%" />
                <br />
                <br />
                <p className="cargo-para"><b>Jeeps</b></p>
              </div>

              <div className="col">
                <img className="cargo-image" src={image8} alt="Cargo4" width="90%" />
                <br />
                <br />
                <p className="cargo-para"><b>Busses</b></p>
              </div>

            </div>
          </div>


          {/* Vehicle cards */}
          <div class="d-flex Vcards-section">
          <div class="p-2"><Lottie className="Vcards-animation" loop={true} animationData={vansanimation} /></div>
          <div class="p-2"><h3 className="Vcards-heading"><b>Travel Vehicles</b></h3></div>
        </div>

          <MetaData title="VEHICLES TRAVELOGUE" />
          <div className="vehicles">
            {vehicles &&
              vehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
          </div>


          {/* We  offer Best Vehicles */}

          <div className="max-width offer-vehicle-section">
            <div className="row">

              <div className="col-md-6 col-sm-12 py-5">
                <h5 className="offervehicle-mini-heading">key features</h5>
                <br />
                <h2 className='offervehicle-main-heading'><b>We offer Best Vehicles!</b></h2>
                <div className="container">
                  <div className="row row-cols-2">

                    <div className="col">
                      <h5 className='key-points-headings'><DirectionsBusIcon /> Diverse Vehicle Selection:</h5>
                      <p className="key-points-texts">Rental cars, buses, vans, and jeeps, ranging from 4-seaters to spacious options.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><SettingsIcon /> Luxurious Amenities:</h5>
                      <p className="key-points-texts">AC and heater facilities for climate control.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><MonetizationOnIcon /> Affordable Pricing:</h5>
                      <p className="key-points-texts">Flexible vehicle packages to suit various budgets.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><PersonIcon /> Professional Drivers:</h5>
                      <p className="key-points-texts">Well-mannered and skilled drivers.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><LuggageIcon /> Capacity Information:</h5>
                      <p className="key-points-texts">Clearly defined passengers & luggage capacity specifications.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><StarIcon /> Review & Rating System:</h5>
                      <p className="key-points-texts">Ratings to guide users in making choices.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><ControlPointIcon /> Customizable Packages</h5>
                      <p className="key-points-texts">Options for long-term and short-term rentals.</p>
                    </div>

                    <div className="col">
                      <h5 className='key-points-headings'><TaskAltIcon /> Instant Bookings:</h5>
                      <p className="key-points-texts">Quick and hassle-free booking process.</p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12 py-5">
                <div className="row">
                  <div className="col">
                    <img className='offersvehicle-img1' src={image9} alt='jeep1' width="100%" />
                    <Lottie className="drive-animation" loop={true} animationData={driving} />
                  </div>
                  <div className="col">
                    <img className='offersvehicle-img2' src={image10} alt='van' width="100%" />
                  </div>
                </div>
              </div>

            </div>
          </div>




          {/* Trust our drivers? */}

          <div className="max-width trust-section">
            <div className="row">

              <div className="col-md-6 col-sm-12 py-5">
                <h5 className="trust-mini-heading">Your Trust</h5>
                <br />
                <h2 className='trust-main-heading'><b>Trust Our Drivers?</b></h2>

                <div class="d-flex flex-row mb-3">
                  <div class="p-2 set-icons"><PersonIcon /></div>
                  <div class="p-2"><h5 className='key-points-heading'><b>Vetted Professionals:</b></h5>
                    <p className="key-points-text">Licensed and experienced drivers.<br />Your comfortness is their top choice.</p></div>
                </div>

                <div className="d-flex flex-row mb-3">
                  <div className="p-2 set-icons"><HealthAndSafetyIcon /></div>
                  <div className="p-2"><h5 className='key-pints-heading'><b>Safety First Approach:</b></h5>
                    <p className="key-points-text">Strict adherence to safety regulations.</p></div>
                </div>

                <div className="d-flex flex-row mb-3">
                  <div className="p-2 set-icons"> <SafetyCheckIcon /></div>
                  <div className="p-2"><h5 className='key-pints-heading'><b>Punctuality and Reliability:</b></h5>
                    <p className="key-points-text">Timely arrivals and departures.</p>
                    <Lottie className="trust-animation" loop={true} animationData={drive} />
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12 py-5">
                <div className="image-container">
                  <img className='driver-img1' src={image11} alt='drivers' width="100%" />
                  <img className='driver-img2' src={image12} alt='drivers' width="100%" />
                </div>
              </div>

            </div>
          </div>


          {/* <div className="filterBox">
            <Typography>Price</Typography>
            {price !== null && price !== undefined && (
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
            )}
            <fieldset>
              <Typography component="legend">Ratings above</Typography>
              {rating !== null && rating !== undefined && (
                <Slider
                  value={rating}
                  onChange={(event, newRating) => setRating(newRating)}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              )}
            </fieldset>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Vehicles;
