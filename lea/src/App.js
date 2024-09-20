import "./App.css";
import Navbar from "./components/Homepage/Navbar.jsx";
import Hero from "./components/Homepage/Hero.jsx";
import Services from "./components/Homepage/Services.jsx";
import Govsites from "./components/Homepage/Govsites.jsx";
import Footer from "./components/Homepage/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Hero />
        <Services />
        <Govsites />
        <Footer />
      </div>
    </>
  );
}

export default App;
