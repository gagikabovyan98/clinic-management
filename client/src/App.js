import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';

function App() {
  const [setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(true)} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;