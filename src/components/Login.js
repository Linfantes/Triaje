import React, { useState } from 'react';

const InicioSesion = () => {
  const [dni, setDni] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarLogin = (e) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => {
      console.log('Usuario logueado con DNI:', dni);
      setCargando(false);
    }, 1000);
  };

  return (
    <div style={estilos.pagina}>
      <div style={estilos.tarjeta}>
        <div style={estilos.encabezado}>
          <div style={estilos.icono}>⚕</div>
          <h2 style={estilos.titulo}>Bienvenido</h2>
          <p style={estilos.subtitulo}>Sistema de triaje inteligente</p>
        </div>

        <form onSubmit={manejarLogin} style={estilos.formulario}>
          <div style={estilos.grupo}>
            <label style={estilos.etiqueta}>DNI</label>
            <input
              type="text"
              placeholder="Ingresa tu DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              style={estilos.input}
            />
          </div>

          <div style={estilos.grupo}>
            <label style={estilos.etiqueta}>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              style={estilos.input}
            />
          </div>

          <button type="submit" style={estilos.boton} disabled={cargando}>
            {cargando ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <p style={estilos.pie}>
          ¿No tienes cuenta?{' '}
          <a href="/" style={estilos.enlace}>Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

const estilos = {
  pagina: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: '20px',
  },
  tarjeta: {
    background: 'rgba(255,255,255,0.97)',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
  },
  encabezado: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  icono: {
    fontSize: '40px',
    marginBottom: '12px',
    display: 'block',
  },
  titulo: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1a2e3b',
    margin: '0 0 6px',
    letterSpacing: '-0.5px',
  },
  subtitulo: {
    fontSize: '13px',
    color: '#6b8a9a',
    margin: 0,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  etiqueta: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#344d5c',
    letterSpacing: '0.3px',
  },
  input: {
    padding: '12px 14px',
    border: '1.5px solid #d0dce4',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#1a2e3b',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#f8fbfc',
  },
  boton: {
    marginTop: '8px',
    padding: '14px',
    background: 'linear-gradient(135deg, #1a6b8a, #2c9abf)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.3px',
    transition: 'opacity 0.2s',
  },
  pie: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '13px',
    color: '#6b8a9a',
  },
  enlace: {
    color: '#1a6b8a',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default InicioSesion;
