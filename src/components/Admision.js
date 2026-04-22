import React, { useState, useEffect } from 'react';

const Admision = () => {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [doctor, setDoctor] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [esMobil, setEsMobil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMobil(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Paciente registrado:', { dni, nombre, apellido, fechaNacimiento, doctor, fechaCita, horaCita });
    setEnviado(true);
    setTimeout(() => {
      setDni(''); setNombre(''); setApellido(''); setFechaNacimiento('');
      setDoctor(''); setFechaCita(''); setHoraCita('');
      setEnviado(false);
    }, 2500);
  };

  const doctores = [
    'Dr. García - Medicina General',
    'Dra. López - Pediatría',
    'Dr. Ramírez - Cardiología',
    'Dra. Torres - Ginecología',
    'Dr. Flores - Traumatología',
    'Dra. Mendoza - Neurología',
    'Dr. Castillo - Dermatología',
  ];

  return (
    <div style={estilos.pagina}>
      {/* Header */}
      <div style={estilos.header}>
        <div style={estilos.headerIzq}>
          <span style={{ fontSize: '24px' }}>⚕️</span>
          <span style={estilos.logoTexto}>VitaScan</span>
        </div>
      </div>

      <div style={{ ...estilos.contenido, flexDirection: esMobil ? 'column' : 'row' }}>
        {/* Panel info izquierdo — solo desktop */}
        {!esMobil && (
          <div style={estilos.panelInfo}>
            <div style={estilos.panelInfoInner}>
              <h3 style={estilos.panelTitulo}>Registro de Admisión</h3>
              <p style={estilos.panelDesc}>Complete los datos del paciente para registrarlo en el sistema de monitoreo hospitalario.</p>
              <div style={estilos.pasos}>
                {[
                  'Ingresa el DNI del paciente',
                  'Completa nombre, apellido y fecha de nacimiento',
                  'Selecciona el tipo de seguro',
                  'Elige doctor, fecha y hora de cita',
                  'Confirma el registro',
                ].map((paso, i) => (
                  <div key={i} style={estilos.paso}>
                    <div style={estilos.pasoBadge}>{i + 1}</div>
                    <span style={estilos.pasoTexto}>{paso}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <div style={{ ...estilos.formularioPanel, width: esMobil ? '100%' : '560px' }}>
          {esMobil && (
            <div style={estilos.movilTitulo}>
              <h2 style={estilos.tituloForm}>Registro de Paciente</h2>
            </div>
          )}
          {!esMobil && <h2 style={estilos.tituloForm}>Registro de Paciente</h2>}
          <p style={estilos.subtituloForm}>Complete todos los campos para registrar al paciente.</p>

          {enviado && (
            <div style={estilos.alerta}>✅ Paciente registrado exitosamente en el sistema</div>
          )}

          <form onSubmit={manejarEnvio} style={estilos.formulario}>

            {/* DNI + Fecha de Nacimiento */}
            <div style={{ ...estilos.fila, flexDirection: esMobil ? 'column' : 'row' }}>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>DNI del Paciente</label>
                <input type="text" placeholder="Ej: 12345678" value={dni}
                  onChange={(e) => setDni(e.target.value)} required maxLength={8}
                  style={estilos.input}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Fecha de Nacimiento</label>
                <input type="date" value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)} required
                  style={estilos.input}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Nombre + Apellido */}
            <div style={{ ...estilos.fila, flexDirection: esMobil ? 'column' : 'row' }}>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Nombre(s)</label>
                <input type="text" placeholder="Nombres" value={nombre}
                  onChange={(e) => setNombre(e.target.value)} required
                  style={estilos.input}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Apellido(s)</label>
                <input type="text" placeholder="Apellidos" value={apellido}
                  onChange={(e) => setApellido(e.target.value)} required
                  style={estilos.input}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Doctor */}
            <div style={estilos.grupo}>
              <label style={estilos.etiqueta}>Doctor Asignado</label>
              <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required style={estilos.select}>
                <option value="">Seleccione un doctor...</option>
                {doctores.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Fecha + Hora de Cita */}
            <div style={{ ...estilos.fila, flexDirection: esMobil ? 'column' : 'row' }}>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Fecha de la Cita</label>
                <input type="date" value={fechaCita}
                  onChange={(e) => setFechaCita(e.target.value)} required
                  style={estilos.input}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Hora de la Cita</label>
                <input type="time" value={horaCita}
                  onChange={(e) => setHoraCita(e.target.value)} required
                  style={estilos.input}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            <button type="submit" style={estilos.boton}>Registrar Paciente</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const estilos = {
  pagina: {
    minHeight: '100vh',
    background: '#f0f4f8',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    background: 'linear-gradient(135deg, #1e3a5f, #1a6b8a)',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerIzq: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  logoTexto: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#fff',
  },

  separadorHeader: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '18px',
  },

  paginaLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },

  linkHeader: {
    color: '#f59e0b',
    fontSize: '13px',
    fontWeight: '700',
    textDecoration: 'none',
  },

  contenido: {
    display: 'flex',
    gap: '0',
    minHeight: 'calc(100vh - 56px)',
    flexDirection: 'column',
  },

  panelInfo: {
    width: '100%',
    maxWidth: '340px',
    background: 'linear-gradient(145deg, #1e3a5f, #1a6b8a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 36px',
  },

  panelInfoInner: {
    color: '#fff',
  },

  iconoGrande: {
    fontSize: '48px',
    marginBottom: '20px',
  },

  panelTitulo: {
    fontSize: '22px',
    fontWeight: '800',
    margin: '0 0 12px',
    letterSpacing: '-0.3px',
  },

  panelDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.7,
    margin: '0 0 28px',
  },

  pasos: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  paso: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  pasoBadge: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  pasoTexto: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },

  formularioPanel: {
    flex: 1,
    background: '#f8fafc',
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  movilTitulo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px',
  },

  tituloForm: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f2944',
    margin: '0 0 6px',
    letterSpacing: '-0.5px',
  },

  subtituloForm: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: '0 0 24px',
  },

  alerta: {
    background: '#fffbeb',
    border: '1.5px solid #f59e0b',
    color: '#92400e',
    padding: '12px 16px',
    borderRadius: '12px',
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
    flexDirection: 'column',
  },

  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },

  etiqueta: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#334155',
  },

  input: {
    padding: '13px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f2944',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },

  select: {
    padding: '13px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f2944',
    background: '#fff',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
  },

  boton: {
    marginTop: '8px',
    padding: '15px',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
    width: '100%',
  },

  '@media (max-width: 768px)': {
    header: { padding: '12px 20px' },
    logoTexto: { fontSize: '16px' },
    paginaLabel: { fontSize: '12px' },
    formularioPanel: { padding: '32px 24px' },
    tituloForm: { fontSize: '22px' },
    subtituloForm: { fontSize: '12px' },
    alerta: { fontSize: '12px' },
    input: { fontSize: '12px' },
    select: { fontSize: '12px' },
    boton: { fontSize: '14px' },
  },
};

export default Admision;