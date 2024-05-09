import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import BookingsContent from "./pages/Dashboard/DashComponents/BookingsContent/BookingsContent";
import AppartementsContent from "./pages/Dashboard/DashComponents/AppartementsContent/AppartementsContent";
import CustomersContent from "./pages/Dashboard/DashComponents/CustomersContent/CustomersContent";
import HelpContent from "./pages/Dashboard/DashComponents/HelpContent/HelpContent";
import InvoiceContent from "./pages/Dashboard/DashComponents/InvoiceContent/InvoiceContent";
import { getAllApartments } from "./redux/apartmentSlice";
import { useDispatch } from "react-redux";
import Checkout from "./pages/CheckOut/checkout";
import AcceptContent from "./pages/Dashboard/DashComponents/AcceptContent/AcceptContent";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getAllApartments());
  }, [dispatch]);

  const Layout = ({ children }) => {
    return (
      <div>
        <Navbar />
        <div>{children}</div>
        {/* <Footer /> */}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/details/:id"
                element={
                  <Layout>
                    <Details />
                  </Layout>
                }
              />
              <Route
                path="/checkout/:id"
                element={
                  <Layout>
                    <Checkout />
                  </Layout>
                }
              />
              <Route
                path="/dashboard"
                element={
                  // <PrivateRoute>
                  <Dashboard />
                  // </PrivateRoute>
                }
              >
                <Route path="bookings" element={<BookingsContent />} />
                <Route path="apartments" element={<AppartementsContent />} />
                <Route path="customers" element={<CustomersContent />} />
                <Route path="help" element={<HelpContent />} />
                <Route path="invoice" element={<InvoiceContent />} />
                <Route path="accept" element={<AcceptContent />} />
              </Route>
              <Route
                path="/profil"
                element={
                  <Layout>
                    {/* <PrivateRoute> */}
                    <Profile />
                    {/* </PrivateRoute> */}
                  </Layout>
                }
              />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
