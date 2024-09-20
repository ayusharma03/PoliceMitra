import React from "react";
import "./services.css";
import image1 from "../../image1.png";
import image2 from "../../image2.png";
import image3 from "../../image3.png";
import image4 from "../../image4.png";
import { Link } from "react-router-dom";

const services = [
  {
    title: "FIR Filing",
    description:
      "Fills details of FIR automatically based on the summary.",
    imgSrc: image1,
  },
  {
    title: "Advocacy",
    description:
      "Ask legal questions, this bot will act as an advocate. ",
    imgSrc: image2,
    link: "http://localhost:3000/chatting",
  },
  {
    title: "IPC / CrPC Sections",
    description:
      "Find the sections applicable for the crime.",
    imgSrc: image3,
  },
  {
    title: "Other Services",
    description:
      "This is a chatbot that can answer any question.",
    imgSrc: image4,
  },
];
const services2 = [
  {
    title: "Weapon Detection",
    description: "Filter images which include weapons.",
    imgSrc: image1,
    link: "http://localhost:3000/detection",
  },
  {
    title: "Live Weapon Monitoring",
    description:
      "Open live camera for weapon detection.",
    imgSrc: image2,
  },
];

const ServiceCard = ({ title, description, imgSrc, link }) => {
  return (
    <div className="service-card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      {link ? (
        <Link to={link}>
          <button>→</button>
        </Link>
      ) : (
        <button>→</button>
      )}
    </div>
  );
};

const Services = () => {
  return (
    <>
      <div className="services-header">
        <h1>FIR Related Services</h1>
        <p>
          Various services related to FIR filing for efficiently documenting
          crime
        </p>
      </div>
      <div className="services-container">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imgSrc={service.imgSrc}
            link={service.link ? service.link : null}
          />
        ))}
      </div>
      <div className="services-header">
        <h1>Evidence Related Services</h1>
        <p>Various services for seamlessly identifying crime scene evidences</p>
      </div>
      <div className="services-container2">
        {services2.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imgSrc={service.imgSrc}
            link={service.link}
          />
        ))}
      </div>
    </>
  );
};

export default Services;