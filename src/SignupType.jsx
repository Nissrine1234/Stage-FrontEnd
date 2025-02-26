import { useNavigate } from 'react-router-dom';

const SignupType = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Choisissez votre type de fournisseur</h2>
      <button onClick={() => navigate('/signup?type=morale')}>Fournisseur Morale</button>
      <button onClick={() => navigate('/signup?type=physique')}>Fournisseur Physique</button>
    </div>
  );
};

export default SignupType;
