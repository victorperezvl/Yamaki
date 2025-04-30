import { useEffect, useState, useContext } from "react";
import { fetchUsers, fetchUpdateProfile } from "../services/api"; 
import AuthContext from "../components/AuthContext.jsx";
import "../styles/profile.css";
import { FaEdit } from "react-icons/fa"; 

// My profile page
const MiPerfil = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const token = user?.token;

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        try {
          const dataProfile = await fetchUsers(token);
          setProfile(dataProfile[0]); 
          setEditedProfile(dataProfile[0]); 
        } catch (error) {
          console.error("Error al cargar los datos del perfil:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  if (!profile) {
    return <p>Inicia sesión o regístrate para ver tu perfil</p>;
  }

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await fetchUpdateProfile({
        name: editedProfile.name,
        email: editedProfile.email,
        phone: editedProfile.phone,
        instagram: editedProfile.instagram,
        token: token,  
      });
  
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profile.photo_url || "/default-profile.png"}
          alt="Foto de perfil"
          className="profile-img"
        />
        <div className="profile-info">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <h2 className="profile-name">{profile.name}</h2>
          )}
          <p className="profile-email">{profile.email}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-detail">
          <p><strong>Teléfono:</strong></p>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedProfile.phone || ""}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p>{profile.phone || "No especificado"}</p>
          )}
          <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
        </div>

        <div className="profile-detail">
          <p><strong>Instagram:</strong></p>
          {isEditing ? (
            <input
              type="text"
              name="instagram"
              value={editedProfile.instagram || ""}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p>@{profile.instagram || "No especificado"}</p>
          )}
          <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
        </div>

        <p><strong>Puntos:</strong> {profile.points}</p>
        <p><strong>Usuario desde:</strong> {new Date(profile.created_on).toLocaleDateString()}</p>
      </div>

      {isEditing && (
        <button onClick={handleSave} className="save-button">
          Guardar cambios
        </button>
      )}
    </div>
  );
};

export default MiPerfil;
