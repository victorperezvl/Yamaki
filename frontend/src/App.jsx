import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import Nav from "./components/Nav.jsx"

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cita" element={<Appointment />} />
      </Routes>
    </Router>
      
  );
}

export default App;