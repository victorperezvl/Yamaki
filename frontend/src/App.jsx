import { useState } from 'react'
import './App.css'

function App() {
  const [mensaje, setMensaje] = useState("Bienvenido a Yamaki");

  const manejarCita = () => {
    setMensaje("¡Tu cita ha sido agendada!");
  };

  return (
    <div style={styles.contenedor}>
      <header style={styles.header}>
        <h1>Yamaki Barber Shop</h1>
      </header>

      <main style={styles.main}>
        <h2>{mensaje}</h2>
        <button style={styles.boton} onClick={manejarCita}>
          Agendar Cita
        </button>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 Yamaki - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

// 🎨 Estilos en línea
const styles = {
  contenedor: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
  },
  main: {
    margin: "20px",
  },
  boton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  footer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
  },
}

export default App
