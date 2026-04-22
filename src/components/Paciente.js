import React, { useState } from 'react';

const Paciente = () => {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Paciente ingresado:', { dni, nombre, apellido, edad });
    setEnviado(true);
    setTimeout(() => {
      setDni(''); setNombre(''); setApellido(''); setEdad('');
      setEnviado(false);
    }, 2500);
  };

  return (
    <div style={estilos.pagina}>
      <div style={estilos.contenedor}>
        <div style={estilos.barra}>
          <span style={estilos.barraTexto}>👤 Datos del Paciente</span>
        </div>

        <div style={estilos.cuerpo}>
          <h2 style={estilos.titulo}>Ficha del Paciente</h2>
          <p style={estilos.descripcion}>Ingrese su información personal.</p>

          {enviado && (
            <div style={estilos.alerta}>
              ✅ Datos enviados al sistema de monitoreo
            </div>
          )}

          <form onSubmit={manejarEnvio} style={estilos.formulario}>
            <div style={estilos.fila}>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombres"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  style={estilos.input}
                />
              </div>

              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Apellido</label>
                <input
                  type="text"
                  placeholder="Apellidos"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  style={estilos.input}
                />
              </div>
            </div>

            <div style={estilos.fila}>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>DNI</label>
                <input
                  type="text"
                  placeholder="Ej: 12345678"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  maxLength={8}
                  style={estilos.input}
                />
              </div>

              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Edad</label>
                <input
                  type="number"
                  placeholder="Años"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                  min={0}
                  max={120}
                  style={estilos.input}
                />
              </div>
            </div>

            <button type="submit" style={estilos.boton}>
              Enviar Datos
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const estilos = {
  pagina: {
    minHeight: '100vh',
    background: '#f0f4f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: '24px',
  },
  contenedor: {
    width: '100%',
    maxWidth: '560px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  barra: {
    background: 'linear-gradient(135deg, #1a2e3b, #2c9abf)',
    padding: '14px 24px',
  },
  barraTexto: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  cuerpo: {
    padding: '36px 40px',
  },
  titulo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a2e3b',
    margin: '0 0 6px',
  },
  descripcion: {
    fontSize: '14px',
    color: '#7a9aaa',
    margin: '0 0 28px',
  },
  alerta: {
    background: '#e8f8f0',
    border: '1px solid #a8e0c0',
    color: '#2a7a50',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fila: {
    display: 'flex',
    gap: '16px',
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  etiqueta: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#344d5c',
  },
  input: {
    padding: '11px 14px',
    border: '1.5px solid #d0dce4',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1a2e3b',
    background: '#f8fbfc',
    outline: 'none',
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
  },
};

export default Paciente;
