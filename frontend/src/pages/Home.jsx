import "../styles/Home.css";
import homeImg from "../assets/peluqueria.webp";

// Home page
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="homeTxt">Bienvenido a Yamaki</h1>
        <img src={homeImg} alt="Imagen portada" className="homeImg" />
      </div>
    </div>
  );
};

export default Home;

