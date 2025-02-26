import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const [formData, setFormData] = useState({
    telephone: "",
    email: "",
    role_type: type === "morale" ? "fournisseur_morale" : "fournisseur_physique",
    ...(type === "morale"
      ? { nom_entreprise: "", code_postal: "" }
      : { nom: "", prenom: "", cin: "" }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/portail/auth/register", formData)
      .then((response) => {
        console.log("Inscription réussie :", response.data);

        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erreur d'inscription :", error.response.data);
        } else {
          console.error("Erreur inconnue :", error);
        }
      });

    console.log("Données envoyées :", formData);
  };

  return (
    <div>
      <h2>Inscription {type === "morale" ? "Fournisseur Morale" : "Fournisseur Physique"}</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        {type === "morale" ? (
          <>
            <input
              type="text"
              name="nom_entreprise"
              placeholder="Nom de l'entreprise"
              value={formData.nom_entreprise}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="code_postal"
              placeholder="Code Postal"
              value={formData.code_postal}
              onChange={handleChange}
              required
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cin"
              placeholder="CIN"
              value={formData.cin}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
