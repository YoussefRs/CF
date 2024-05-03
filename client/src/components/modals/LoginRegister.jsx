import React, { useState } from "react";
import "./LoginRegister.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import validationSchema from "../../validations/validationSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginRegister({ setShow }) {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState("");

  const handleSignUpClick = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };
  const handleSubmit = (values) => {
    dispatch(loginUser(values));
    if (user?.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    setShow(false);
  };

  const handleFileInputChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cityflat");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlspkc0so/image/upload",
        formData
      );

      if (!response) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const imageUrl = response.data.secure_url;

      setImgUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSignUpSubmit = async (values) => {
    try {
      const registrationData = {
        name: values.name,
        gsm: values.gsm,
        email: values.email,
        password: values.password,
        img: imgUrl,
      };

      const response = await axios.post(
        "http://127.0.0.1:3001/user/register",
        registrationData
      );
    } catch (error) {
      console.error("Registration failed", error);
    }

  };

  return (
    <div className="modal_container" id="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="form-container sign-up-container">
            <Formik
              initialValues={{
                name: "",
                gsm: "",
                email: "",
                password: "",
                img: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUpSubmit}
            >
              <Form>
                <h1>Sign Up</h1>
                <div className="input_custom w-100 relative d-flex align-items-center">
                  <Field type="text" name="name" placeholder="Name" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi input_icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <ErrorMessage name="name" component="div" />
                </div>
                <div className="input_custom w-100 relative d-flex align-items-center">
                  <Field type="number" name="gsm" placeholder="Gsm" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi input_icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                    <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2M1.599 4.058a.5.5 0 0 1 .208.676A7 7 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A8 8 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208m12.802 0a.5.5 0 0 1 .676.208A8 8 0 0 1 16 8a8 8 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A7 7 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676M3.057 5.534a.5.5 0 0 1 .284.648A5 5 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A6 6 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284m9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8s-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8s-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648" />
                  </svg>
                  <ErrorMessage name="gsm" component="div" />
                </div>

                <div className="input_custom w-100 relative d-flex align-items-center">
                  <Field type="email" name="email" placeholder="Email" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi input_icon "
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                  </svg>
                  <ErrorMessage name="email" component="div" />
                </div>

                <div className="input_custom w-100 relative d-flex align-items-center">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi input_icon "
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>

                  <ErrorMessage name="password" component="div" />
                </div>

                <input type="file" onChange={handleFileInputChange} />

                <button type="submit">Sign Up</button>
                <span>
                  Already have an account ?{" "}
                  <a id="SignIn" onClick={handleSignInClick}>
                    Login
                  </a>
                </span>
              </Form>
            </Formik>
          </div>
          <div className="form-container sign-in-container">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <h1>Sign In</h1>
                <div className="input_custom w-100 relative d-flex align-items-center">
                  <Field type="email" name="email" placeholder="Email" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi input_icon "
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                  </svg>
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="input_custom w-100 relative d-flex align-items-center">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi input_icon "
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>

                  <ErrorMessage name="password" component="div" />
                </div>

                <a href="#">Forgot your password?</a>
                <button type="submit">Sign In</button>
                <span>
                  You don't have an account ?{" "}
                  <a id="SignUp" onClick={handleSignUpClick}>
                    create an account
                  </a>
                </span>
              </Form>
            </Formik>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <button
                  className="ghost"
                  id="SignIn"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <button
                  className="ghost"
                  id="SignUp"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
