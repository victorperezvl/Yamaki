import { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../services/api";
import AuthContext from "../components/AuthContext.jsx";
import "../styles/profile.css"

const MiPerfil = () => {
  const [profile, setProfile] = useState(null);
  const {user} = useContext(AuthContext);
  const [loading , setLoading] = useState(true);
  const token = user?.token;
  console.log("Componente Profile montado");
  
  useEffect(() => {
    const loadData = async () => {
        if (token) {
          try {

            const dataProfile = await fetchUsers(token);
            setProfile(dataProfile);

          } catch (error) {
            console.error("Error al cargar los datos del perfil:", error);
          } finally {
            setLoading(false); 
          }
        }
      };
      console.log("Token: ", token);
  
      if (token) {
        loadData(); 
      } else {
        setLoading(false); 
      }
    }, [token]);

    if (loading) {
      return <p>Cargando perfil...</p>;  // Mensaje de carga
    }
  
    if (!profile || Object.keys(profile).length === 0) {
      return <p>No se pudo cargar el perfil.</p>;
    }

    const myProfile = profile[0];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <img
          src={myProfile.photo_url || "/default-profile.png"}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full border"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">{myProfile.name}</h2>
          <p className="text-gray-600">{myProfile.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Teléfono:</strong> {myProfile.phone || "No especificado"}</p>
        <p><strong>Instagram:</strong> {myProfile.instagram ? `@${profile.instagram}` : "No especificado"}</p>
        <p><strong>Puntos:</strong> {myProfile.points}</p>
        <p><strong>Usuario desde:</strong> {new Date(myProfile.created_on).toLocaleDateString()}</p>
      </div>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Editar perfil
      </button>
    </div>
  );
};

export default MiPerfil;
