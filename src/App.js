import { Routes, Route } from 'react-router-dom';
import SignupType from './SignupType';
import Signup from './Signup';
import Login from './Login';
// import Dashboard from './pages/Dashboard'; // Exemple de page après connexion
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupType />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} /> Page 404 */}
    </Routes>
  );
}

export default App;
