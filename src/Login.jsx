import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/portail/auth/login', {
                email,
                password
            });

            const { token, user } = response.data;

            // Sauvegarde du token dans le localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirection vers la page fournisseur
            navigate('/fournisseur/dashboard');

        } catch (error) {
            console.error('Erreur de connexion:', error.response?.data);
            setError(error.response?.data.message || 'Une erreur est survenue');
        }
    };

    return (
        <div>
            <h2>Connexion Fournisseur</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
