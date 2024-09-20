import React from 'react';
import './govsites.css';
import digitalIndia from "../../digitalIndia.png";
import mygov from "../../mygov.png";
import nic from "../../nic.jpg";
import indiagov from "../../indiagov.png";

const Govsites = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={digitalIndia} alt="NIC Logo" />
      </div>
      <div className="logo-container">
        <img src={mygov} alt="MyGov Logo" />
      </div>
      <div className="logo-container">
        <img src={nic} alt="DataGov Logo" />
      </div>
      <div className="logo-container">
        <img src={indiagov} alt="Digital India Logo" />
      </div>
    </div>
  );
};

export default Govsites;
