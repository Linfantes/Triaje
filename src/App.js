import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registro from './components/Registro';
import InicioSesion from './components/Login';
import Admision from './components/Admision';
import Dashboard from './components/Dashboard';
import Paciente from './components/Paciente';
import SignosVitales from './components/SignosVitales';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/admision" element={<Admision />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/SignosVitales" element={<SignosVitales />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;