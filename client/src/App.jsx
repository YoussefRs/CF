import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Loader from "./components/Loader/Loader";
import { useEffect, useRef, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 120 && scrollPosition.current < 120) {
        setScrolled(true);
      } else if (currentScrollY < 120 && scrollPosition.current >= 120) {
        setScrolled(false);
      }
      scrollPosition.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(scrolled);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Router>
            <Navbar scrolled={scrolled} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
