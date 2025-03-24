import "../styles/services.css";

const services = [
  { name: "Corte", price: 13 },
  { name: "Corte y Barba", price: 15 },
  { name: "Tinte", price: 15 },
  { name: "Barba", price: 5 },
];

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">ESTO SON NUESTROS SERVICIOS</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <span className="service-name">{service.name}</span>
            <span className="service-price">{service.price}€</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
