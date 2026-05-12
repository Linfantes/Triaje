import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import Admision from './components/Admision';
import Paciente from './components/Paciente';
import SignosVitales from './components/SignosVitales';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/dashboard-medico" element={<Dashboard />} />

        <Route path="/admision" element={<Admision />} />

        <Route path="/paciente" element={<Paciente />} />

        <Route path="/signos" element={<SignosVitales />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;