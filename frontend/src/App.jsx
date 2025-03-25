import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import Nav from "./components/Nav.jsx"
import { AuthProvider } from "./components/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoginModal from "./components/Login.jsx";
import Register from "./pages/Register.jsx";
import Services from "./pages/Services.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <Router>
    <AuthProvider> 
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cita" element={<Appointment />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/perfil" element={<Profile />} />
        <Route
            path="/dashboard"
            element={
              <PrivateRoute>

              </PrivateRoute>
            }
          />
      </Routes>
      <LoginModal />
    </AuthProvider>
  </Router>
      
  );
}

export default App;