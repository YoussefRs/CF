import React from 'react'
import loader from "../../assets/homepage_mats/logo4.png"
import "./Loader.css"

export default function Loader() {
  return (
    <div className="loader-container">
    <img src={loader} id="img" alt="" />
    </div>
  )
}
