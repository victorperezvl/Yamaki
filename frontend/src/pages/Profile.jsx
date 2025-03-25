import { useEffect, useState } from "react";

const MiPerfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos desde la API
    const fetchUsuario = async () => {
      try {
        const response = await fetch("/api/perfil"); // Reemplazar con la ruta real
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchUsuario();
  }, []);

  if (!usuario) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <img
          src={usuario.foto || "/default-profile.png"}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full border"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">{usuario.nombre}</h2>
          <p className="text-gray-600">{usuario.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Teléfono:</strong> {usuario.telefono || "No especificado"}</p>
        <p><strong>Descripción:</strong> {usuario.descripcion || "Sin descripción"}</p>
        <p><strong>Instagram:</strong> {usuario.instagram ? `@${usuario.instagram}` : "No especificado"}</p>
        <p><strong>Puntos:</strong> {usuario.puntos}</p>
        <p><strong>Usuario desde:</strong> {new Date(usuario.fecha_creacion).toLocaleDateString()}</p>
      </div>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Editar perfil
      </button>
    </div>
  );
};

export default MiPerfil;
