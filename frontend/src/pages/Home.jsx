import "../styles/Home.css";
import homeImg from "../assets/peluqueria.png";

const Home = () => {
 return (
    <div>
        <div className="home-container">
          <h1 className="homeTxt">Bienvenido a Yamaki</h1>
          <img src={homeImg} alt="Imagenportada" className="homeImg" />
        </div>
    </div>
  );
};

export default Home;
