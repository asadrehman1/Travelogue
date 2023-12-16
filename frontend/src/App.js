import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import MetaData from "./components/layout/Header/MetaData";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search.js";
import LoginSignup from "./components/User/LoginSignup";
import UserOptions from "./components/layout/Header/UserOptions";
import { loadUser } from "./actions/userActions";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import OrderDetails from "./components/Order/OrderDetails";
import NewRequests from "./components/Admin/NewRequests.js";
import Dashboard from "./components/Admin/Dashboard";
import ProductsList from "./components/Admin/ProductsList";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrdersList from "./components/Admin/OrdersList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact";
import NewVehicle from "./components/TransportAgency/NewVehicle";
import Layout from "./Layout.js";
import Vehicles from "./components/Vehicles/Vehicles";
import VehicleDetails from "./components/Vehicles/VehicleDetails";
import VehiclesList from "./components/TransportAgency/VehiclesList";
import UpdateVehicle from "./components/TransportAgency/UpdateVehicle";
import TransportAgencyDashboard from "./components/TransportAgency/TransportAgencyDashboard";
import VehicleReviews from "./components/TransportAgency/VehicleReviews";
import TravelAgencyDashboard from "./components/Admin/TravelAgencyDashboard";
import TransportProtectedRoute from "./components/Route/TransportProtectedRoute";
import AdminProtectedRoute from "./components/Route/AdminProtectedRoute";
import UpdateRequest from "./components/Admin/UpdateRequest.js";
import NewBlog from "./components/Home/NewBlog";
import BlogsList from "./components/Home/BlogsList";
import BlogDetails from "./components/Home/BlogDetails";
import MyBlogs from "./components/Home/MyBlogs"

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });

    const loadUserData = () => store.dispatch(loadUser());
    const getStripeApiKeyData = () => getStripeApiKey();

    const fetchStripeKeyAfterLogin = async () => {
      try {
        await loadUserData();
        await getStripeApiKeyData();
      } catch (error) {
        console.error("Error loading user data or Stripe API key:", error);
      }
    };
    
    fetchStripeKeyAfterLogin();
  }, []);

  return (
    <Router>
      <MetaData title="TRAVELOGUE" />
      {/* <Header /> */}
      {isAuthenticated && user?.isApproved && <UserOptions user={user} />}
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/createBlog" element={<NewBlog />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/blog/:id" element={<BlogDetails/>} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/forgot"
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment stripeApiKey={stripeApiKey} />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="/orders" element={<MyOrders />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute isAdmin={true}>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
            <Route
              path="/transportagency/dashboard"
              element={
                <TransportProtectedRoute isTransportAgency={true}>
                  <TransportAgencyDashboard />
                </TransportProtectedRoute>
              }
            />
            <Route
              path="/travelagency/dashboard"
              element={
                <ProtectedRoute  isAdmin={true}>
                  <TravelAgencyDashboard />
                </ProtectedRoute>
              }
            />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transportagency/vehicles"
            element={
              <TransportProtectedRoute isTransportAgency={true}>
                <VehiclesList />
              </TransportProtectedRoute>
            }
          />

          <Route
            path="/admin/product/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transportagency/vehicle/new"
            element={
              <TransportProtectedRoute isTransportAgency={true}>
                <NewVehicle />
              </TransportProtectedRoute>
            }
          />

          <Route
            path="/transportagency/vehicle/:id"
            element={
              <TransportProtectedRoute isTransportAgency={true}>
                <UpdateVehicle />
              </TransportProtectedRoute>
            }
          />

          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute isAdmin={true}>
                <UsersList />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/requests"
            element={
              <AdminProtectedRoute isAdmin={true}>
                <NewRequests />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle/reviews"
            element={
              <TransportProtectedRoute isTransportAgency={true}>
                <VehicleReviews />
              </TransportProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <AdminProtectedRoute isAdmin={true}>
                <UpdateUser />
              </AdminProtectedRoute>
            }
          />
           <Route
            path="/admin/request/:id"
            element={
              <AdminProtectedRoute isAdmin={true}>
                <UpdateRequest />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
