import { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../services/api";
import AuthContext from "../components/AuthContext.jsx";
import "../styles/profile.css"

const MiPerfil = () => {
  const [profile, setProfile] = useState(null);
  const {user} = useContext(AuthContext);
  const token = user.token;
  
  useEffect(() => {
    // Simulación de carga de datos desde la API
    const loadData  = async () => {
        const dataProfile = await fetchUsers(token);
        setProfile(dataProfile);
    }  
    
    loadData();
  }, []);

  if (!profile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <img
          src={profile.photo_url || "/default-profile.png"}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full border"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Teléfono:</strong> {profile.phone || "No especificado"}</p>
        <p><strong>Instagram:</strong> {profile.instagram ? `@${profile.instagram}` : "No especificado"}</p>
        <p><strong>Puntos:</strong> {profile.points}</p>
        <p><strong>Usuario desde:</strong> {new Date(profile.created_on).toLocaleDateString()}</p>
      </div>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Editar perfil
      </button>
    </div>
  );
};

export default MiPerfil;
