import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);


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
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
