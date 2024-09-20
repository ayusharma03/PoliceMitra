import "./navbar.css";
import img from "../../emblem-of-india.png";
import g20 from "../../g20.png";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <img src={img} alt="Emblem of India" className="logo" />
          <div className="text-container">
            <div className="title">
              <h2 className="title1">Police</h2>
              <h2 className="title1">Mitra</h2>
            </div>
            <div className="title2">
              <h2 className="subtitle">Government of India</h2>
              <h3 className="description">Law Enforcement Agency</h3>
            </div>
          </div>
        </div>
        <div className="right-section">
          <button className="login-button">Login</button>
          <img src={g20} alt="G20 Logo" className="g20-logo" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
