import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Term and Policies</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Hyperlink Policy</li>
          <li>Website Policies</li>
          <li>Content Policies</li>
          <li>Contingency Plan</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>About</h4>
        <ul>
          <li>About Us</li>
          <li>Sitemap</li>
          <li>Terms of Use</li>
          <li>MoRTH</li>
          <li>CMVR 1989</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Recources</h4>
        <ul>
          <li>Fees and User Charges</li>
          <li>Act, Rule and Policies</li>
          <li>Permit Fees and Period</li>
          <li>Manual</li>
          <li>Homologation</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Need Help</h4>
        <ul>
          <li>Contact Us</li>
          <li>FAQ's</li>
          <li>Raise a Concern</li>
          <li>Calendar</li>
          <li>Web Information Manager</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
