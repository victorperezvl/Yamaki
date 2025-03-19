import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import Nav from "./components/Nav.jsx"
import { AuthProvider } from "./components/AuthContext.jsx";

function App() {
  return (
    <Router>
    <AuthProvider> 
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cita" element={<Appointment />} />
      </Routes>
    </AuthProvider>
  </Router>
      
  );
}

export default App;