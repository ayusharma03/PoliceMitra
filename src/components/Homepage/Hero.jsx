import "./hero.css";
import diagram from "../../diagram.png";

const Hero = () => {
  return (
    <>
      <nav className="selections">
        <ul>
          <li>
            <a href="#">Online Services</a>
            <button className="dropdown-btn">▼</button>
          </li>
          <li>
            <a href="#">Informational Services</a>
            <button className="dropdown-btn">▼</button>
          </li>
          <li>
            <a href="#">External Link</a>
            <button className="dropdown-btn">▼</button>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="hero">
        <img src={diagram} alt="" />
      </div>
    </>
  );
};

export default Hero;
