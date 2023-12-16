import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import ProductCard from './ProductCard'
import VehicleCard from './VehicleCard'
import { clearError, getProducts } from "../../actions/productActions"
import { clearError as vehicleClearError, getVehicles } from '../../actions/vehicleActions'
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert"

import image1 from "../../assets/imageA.jpg"
import image2 from "../../assets/imageC.jpg"
import image3 from "../../assets/imageD.jpg"
import image4 from '../../assets/imageE.jpg'
import image5 from '../../assets/imageF.png'
import image6 from '../../assets/imageG.jpg'
import image7 from '../../assets/imageP.jpg'
import image8 from '../../assets/jee.jpg'
import image9 from '../../assets/TM1.jpg'
import image10 from '../../assets/TM2.jpg'
import image11 from '../../assets/TM3.jpg'
import image12 from '../../assets/TM4.jpg'
import image13 from '../../assets/TM5.jpg'
import image14 from '../../assets/TM6.jpg'
import image15 from '../../assets/TM7.jpg'
import image16 from '../../assets/TM8.jpg'
import image17 from '../../assets/TM9.jpg'
import image18 from '../../assets/m1.jpg'
import image19 from '../../assets/m2.jpg'
import image20 from '../../assets/m3.jpg'
import image21 from '../../assets/m4.jpg'
import image22 from '../../assets/m5.jpg'
import image23 from '../../assets/m6.jpg'
import image24 from '../../assets/bonfire.jpg'
import image25 from '../../assets/rotatedjeep.jpg'


import { Link } from 'react-router-dom';
import Lottie from "lottie-react"
import walkingman from '../../assets/walkingman.json'
import walkingcar from '../../assets/walkingcar.json'
import packageanimation from '../../assets/packageanimations.json'
import featuredpackagesanimation from '../../assets/h1.json'
import featuredpackageanimation2 from '../../assets/h4.json'
import testimonialsanimation from '../../assets/R2.json'


const Home = () => {
  const alert = useAlert();
  const { loading, error, products } = useSelector(state => state.products);
  const { error: vehicleError, vehicles } = useSelector(state => state.vehicles);
  const dispatch = useDispatch();

  const containerStyle = {
    width: '300px',
    marginLeft: '10%'
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError())
    }
    if (vehicleError) {
      alert.error(vehicleError);
      dispatch(vehicleClearError())
    }

    dispatch(getProducts());
    dispatch(getVehicles());

  }, [dispatch, alert, error, vehicleError])

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>

        {/*slider */}
        <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000" data-bs-wrap="true" data-bs-pause="false">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
          </div>
          <div className="carousel-inner">

            <div className="carousel-item active">
              <div className="image-overlay"></div>
              <img src={image1} className="d-block w-100" alt="Mountain-area" />
              <div className="carousel-caption" >
                <h5 className='caption-heading white-clr'>Book Your Favourite<br /> Destination With Us!</h5>
              </div>
            </div>

            <div className="carousel-item">
              <div className="image-overlay"></div>
              <img src={image2} class="d-block w-100" alt="Travel-packages" />
              <div className="carousel-caption">
                <h5 className='caption-heading white-clr' >Explore <br /> Exciting Tourism Packages!</h5>
              </div>
            </div>

            <div className="carousel-item">
              <div className="image-overlay"></div>
              <img src={image3} className="d-block w-100" alt="vehicles" />
              <div className="carousel-caption">
                <h5 className='caption-heading white-clr'>Seamless Travel with our Vehicle Packages!</h5>
              </div>
            </div>

            <div className="carousel-item">
              <div className="image-overlay"></div>
              <img src={image4} className="d-block w-100" alt="Payments" />
              <div className="carousel-caption">
                <h5 className='caption-heading white-clr'>Effortless Payments <br />for Hassle-free Bookings!</h5>
              </div>
            </div>

            <div className="carousel-item">
              <div className="image-overlay"></div>
              <img src={image5} className="d-block w-100" alt="Reviews" />
              <div className="carousel-caption">
                <h5 className='caption-heading white-clr' >Real Reviews, Real Experiences!</h5>
              </div>
            </div>

            <div className="carousel-item">
              <div className="image-overlay"></div>
              <img src={image6} className="d-block w-100" alt="vehicles" />
              <div className="carousel-caption">
                <h5 className='caption-heading white-clr'>Connect with Us! <br /> 24/7 Support at Your Fingertips.</h5>
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



        {/*Collage section */}
        <div className="max-width collage-section">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-5">
              <h5 className='collage-heading'><b>Making Travel Easy</b></h5>
              <br />
              <br />
              <h2 className='collage-sub-heading'><b>Discover Beautiful Places<br />with us!</b></h2>
              <p className='collage-para'>Thinking of taking a break from everyday's life?
                <br />Don't worry! we take care of your trip.</p>

              <div style={containerStyle}>
                <Lottie loop={true} animationData={walkingman} />
              </div>
            </div>

            <div className="col-md-6 col-sm-12 py-5">

              <div className="row">
                <div className="col">
                  <img className="collage-img1" src={image18} alt='scenary1' width="100%" />
                </div>
                <div className="col">
                  <img className="collage-img2" src={image19} alt='scenary2' width="100%" />
                </div>
                <div className="col">
                  <img className="collage-img" src={image20} alt='scenary3' width="100%" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <img className="collage-img" src={image21} alt='scenary4' width="100%" />
                </div>
                <div className="col">
                  <img className="collage-img5" src={image22} alt='scenary5' width="100%" />
                </div>

                <div className="col">
                  <img className="collage-img" src={image23} alt='scenary6' width="100%" />
                </div>
              </div>
            </div>

          </div>
        </div>



        {/*Tourism-packages-info */}

        <div className="max-width about-tourpackage-section">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-5">
              <h2 className='section-heading'><b>Looking for Exciting Tourism Packages?</b></h2>
              <p className='section-para'>
                Embark on a journey of discovery with our exclusive tourism packages. Immerse yourself in the rich culture, breathtaking landscapes, and unique experiences that awaits you.
              </p>

              <p className='section-para'>
                Whether you're seeking adventure, relaxation, or cultural enrichment, our curated packages cater to diverse interests. Discover hidden gems, savor local cuisines, and create memories that lasts a lifetime.
              </p>
              <Link to="/products">
                <button className='learn-more-btn'>Book Your Desired Package!</button>
              </Link>
              <Lottie className='package-animation' loop={true} animationData={packageanimation} />
            </div>

            <div className="col-md-6 col-sm-12 py-5">
              <div className="image-container">
                <img className='section-img' src={image7} alt='TravelSide' width="100%" />
                <img className='bonfire-img' src={image24} alt='bonfire' width="100%" />
              </div>
            </div>
          </div>
        </div>



        {/*Featured-packages cards */}

        <div class="d-flex featured-Heading1-section">
          <div class="p-2"><Lottie className="featured-Heading1-animation" loop={true} animationData={featuredpackagesanimation} /></div>
          <div class="p-2"><h2 className="featured-Heading1"><b>Featured Packages:</b></h2></div>
        </div>

        <div className='container' id='container'>
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>




        {/*vehicle-packages-info */}
        <div className="max-width about-vehiclepackage-section">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-5">
              <div className="image-container">
                <img className='section-img' src={image8} alt='TravelSide' width="100%" />
                <img className='rotated-jeep' src={image25} alt='rotated-jeep' width="100%" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12 py-5">
              <h2 className='vehicle-section-heading'><b>Explore the Freedom of <br />Rented Vehicles</b></h2>
              <br /><p className='vehicle-section-para'>
                Discover the convenience and flexibility of our rented vehicle packages. Whether you're planning a road trip, a weekend getaway, or need a reliable vehicle for your daily commute, we have the perfect solution for you.
              </p>

              <p className='vehicle-section-para'>
                Our fleet includes a variety of vehicles, from compact cars to spacious SUVs, ensuring that you find the ideal match for your transportation needs. Enjoy the comfort, safety, and freedom to explore at your own pace.
              </p>
              <Link to="/vehicles">
                <button className='booking-btn'>Book Your Vehicle</button>
              </Link>
              <Lottie className='car-animation' loop={true} animationData={walkingcar} />

            </div>
          </div>
        </div>



        {/*Featured vehicles*/}
        <div class="d-flex featured-Heading2-section">
          <div class="p-2"><Lottie className="featured-Heading2-animation" loop={true} animationData={featuredpackageanimation2}/></div>
          <div class="p-2"><h2 className="featured-Heading2"><b>Featured Vehicles:</b></h2></div>
        </div>

        <div className='container' id='container'>
          {vehicles && vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>


        {/*Testimonials*/}
        <div class="d-flex testimonials-section">
          <div class="p-2"><Lottie className="testimonials-animation" loop={true} animationData={testimonialsanimation} /></div>
          <div class="p-2"><h2 className='testimonials-headiing'><b>Testimonials</b></h2></div>
        </div>
        
        <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center testimonialssection" data-mdb-ride="carousel" data-bs-interval="3000" data-bs-wrap="true" data-bs-pause="false">

          <div className="d-flex justify-content-center mb-4">
            <button className="carousel-control-prev position-relative" type="button"
              data-mdb-target="#carouselMultiItemExample" data-mdb-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next position-relative" type="button"
              data-mdb-target="#carouselMultiItemExample" data-mdb-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>


          <div className="carousel-inner py-4">

            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image9} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Sarah Mushtaq</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Exceptional service and top-notch quality! A five-star experience all the way.
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star "></i></li>
                      <li><i className="fas fa-star "></i></li>
                      <li><i className="fas fa-star "></i></li>
                    </ul>
                  </div>

                  <div className="col-lg-4 d-none d-lg-block">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image10} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Nasir Ahmed</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      I'm really satisfied with their tourism and vehicle packages. I will book my tour plans again in near future
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li>
                        <i className="fas fa-star-half-alt fa-sm"></i>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-4 d-none d-lg-block">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image11} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Raza Ali</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Impressed with the professionalism and reliability. Highly recommend
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="far fa-star fa-sm"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image12} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Kamran Raza</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Outstanding attention to detail and superb customer satisfaction.
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                    </ul>
                  </div>

                  <div className="col-lg-4 d-none d-lg-block">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image13} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Aqsa Ilyaas</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Efficient, friendly staff. Made my experience hassle-free and enjoyable
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li>
                        <i className="fas fa-star-half-alt fa-sm"></i>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-4 d-none d-lg-block">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image14} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Maria Hussain</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Reliable and prompt service. Exceeded my expectations
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="far fa-star fa-sm"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image15} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Sana Rasheed</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Exceptionally skilled team, delivering excellence every time.
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                    </ul>
                  </div>

                  <div className="col-lg-4 d-none d-lg-block">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image16} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Uzair Altaf</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      emarkable service that goes above and beyond. Truly satisfied customer!
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li>
                        <i className="fas fa-star-half-alt fa-sm"></i>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-4 d-none d-lg-block">
                    <img className="rounded-circle shadow-1-strong mb-4"
                      src={image17} alt="avatar"
                      style={{ width: '150px' }} />
                    <h5 className="mb-3">Qasimm Anwar</h5>
                    <p className="text-muted">
                      <i className="fas fa-quote-left pe-2"></i>
                      Fantastic experience! Seamless process, and the results speak for themselves. Highly satisfied!
                    </p>
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="fas fa-star fa-sm"></i></li>
                      <li><i className="far fa-star fa-sm"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>






      </Fragment>}
    </Fragment>
  )
}

export default Home;
