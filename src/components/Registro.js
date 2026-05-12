import React, { useState, useEffect } from 'react';

const Registro = () => {
  const [rol, setRol] = useState('Doctor');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [esMobil, setEsMobil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMobil(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const manejarEnvio = async (e) => {

    e.preventDefault();

    try {

      const respuesta = await fetch(
        "http://localhost/Triaje-main/api/registrar_usuario.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            rol,
            dni,
            password: contraseña,
            nombre,
            apellido,
            especialidad
          })
        }
      );

      const data = await respuesta.json();

      console.log(data);

      if (data.success) {
        setTimeout(() => {
          setMensaje("Usuario registrado correctamente");
          setTipoMensaje("success");
        }, 3000);

        setDni('');
        setContraseña('');

      } else {
        setTimeout(() => {
          setMensaje(data.mensaje);
          setTipoMensaje("error");
        }, 3000);
      }

    } catch (error) {

      console.error(error);
      setTimeout(() => {
        setMensaje("Error del servidor");
        setTipoMensaje("error");
      }, 3000);

    }

  };
  const roles = [
    { id: 'Doctor', label: 'Doctor', icono: '👨‍⚕️' },
    { id: 'Admision', label: 'Admisión', icono: '🗂️' },
    { id: 'Admin', label: 'Admin', icono: '⚙️' },
  ];

  return (
    <div style={{ ...estilos.pagina, flexDirection: esMobil ? 'column' : 'row' }}>

      {/* Panel izquierdo */}
      <div style={{
        ...estilos.panelIzquierdo,
        minHeight: esMobil ? '220px' : '100vh',
        padding: esMobil ? '32px 24px' : '48px 44px',
      }}>
        <div style={estilos.overlayIzquierdo}>
          <div style={estilos.logoHeader}>
            <span style={estilos.logoIcono}>⚕️</span>
            <span style={estilos.logoTexto}>VitalScan</span>
          </div>

          {!esMobil && (
            <>
              <div style={estilos.heroTexto}>
                <h2 style={estilos.heroTitulo}>Sistema de Triaje Inteligente</h2>
                <p style={estilos.heroSubtitulo}>
                  Gestione pacientes, monitoree signos vitales y coordine el equipo médico en tiempo real.
                </p>
              </div>

              <div style={estilos.tarjetaFlotante1}>
                <span style={{ fontSize: '20px' }}>❤️</span>
                <div>
                  <div style={estilos.floatLabel}>Pulso promedio</div>
                  <div style={estilos.floatValor}>78 bpm</div>
                </div>
              </div>
              <div style={estilos.tarjetaFlotante2}>
                <span style={{ fontSize: '20px' }}>🌡️</span>
                <div>
                  <div style={estilos.floatLabel}>Temperatura</div>
                  <div style={estilos.floatValor}>36.5 °C</div>
                </div>
              </div>
              <div style={estilos.tarjetaFlotante3}>
                <span style={{ fontSize: '20px' }}>💧</span>
                <div>
                  <div style={estilos.floatLabel}>Oxigenación</div>
                  <div style={estilos.floatValor}>98%</div>
                </div>
              </div>
            </>
          )}

          {esMobil && (
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: '10px 0 0' }}>
              Sistema de Triaje Inteligente
            </p>
          )}
        </div>

        <div style={estilos.circulo1} />
        <div style={estilos.circulo2} />
      </div>

      {/* Panel derecho */}
      <div style={{
        ...estilos.panelDerecho,
        width: esMobil ? '100%' : '480px',
        padding: esMobil ? '32px 20px' : '48px 40px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
          <div style={estilos.encabezado}>
            <h2 style={{ ...estilos.titulo, fontSize: esMobil ? '24px' : '28px' }}>Crear cuenta</h2>
            <p style={estilos.subtitulo}>Registra tus datos para acceder al sistema</p>
            {
              mensaje && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    marginTop: '15px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background:
                      tipoMensaje === 'success'
                        ? '#dcfce7'
                        : '#fee2e2',
                    color:
                      tipoMensaje === 'success'
                        ? '#166534'
                        : '#991b1b',
                    border:
                      tipoMensaje === 'success'
                        ? '1px solid #86efac'
                        : '1px solid #fca5a5',
                  }}
                >
                  {mensaje}
                </div>
              )
            }
          </div>

          <form onSubmit={manejarEnvio} style={estilos.formulario}>

            <div style={estilos.grupo}>
              <label style={estilos.etiqueta}>Selecciona tu rol</label>
              <div style={estilos.rolesGrid}>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRol(r.id)}
                    style={{
                      ...estilos.botonRol,
                      ...(rol === r.id ? estilos.botonRolActivo : {}),
                    }}
                  >
                    <span style={{ fontSize: '22px' }}>{r.icono}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={estilos.grupo}>
              <label style={estilos.etiqueta}>Nombre</label>
              <input
                type="text"
                placeholder="Ingrese nombres"
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
                placeholder="Ingrese apellidos"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                style={estilos.input}
              />
            </div>
            {rol === 'Doctor' && (
              <div style={estilos.grupo}>
                <label style={estilos.etiqueta}>Especialidad</label>

                <select
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  required
                  style={estilos.select}
                >
                  <option value="">Seleccione</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Neurología">Neurología</option>
                  <option value="Traumatología">Traumatología</option>
                  <option value="Medicina General">Medicina General</option>
                </select>
              </div>
            )}
            <div style={estilos.grupo}>
              <label style={estilos.etiqueta}>DNI</label>
              <input
                type="text"
                placeholder="Ingresa tu DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
                maxLength={8}
                style={estilos.input}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div style={estilos.grupo}>
              <label style={estilos.etiqueta}>Contraseña</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                minLength={6}
                style={estilos.input}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <button
              type="submit"
              style={estilos.boton}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Completar Registro
            </button>
          </form>

          <p style={estilos.pie}>
            ¿Ya tienes cuenta?{' '}
            <a href="/" style={estilos.enlace}>
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const estilos = {
  pagina: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  panelIzquierdo: {
    flex: 1,
    background: 'linear-gradient(145deg, #1e3a5f 0%, #1a5276 40%, #1a6b8a 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'stretch',
  },
  overlayIzquierdo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  logoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcono: { fontSize: '28px' },
  logoTexto: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  heroTexto: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '40px',
  },
  heroTitulo: {
    fontSize: '34px',
    fontWeight: '900',
    color: '#fff',
    lineHeight: 1.25,
    margin: '0 0 16px',
    letterSpacing: '-0.5px',
  },
  heroSubtitulo: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.7,
    margin: 0,
    maxWidth: '340px',
  },
  tarjetaFlotante1: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '14px',
    padding: '14px 18px',
    marginBottom: '10px',
    width: 'fit-content',
  },
  tarjetaFlotante2: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(245,158,11,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(245,158,11,0.4)',
    borderRadius: '14px',
    padding: '14px 18px',
    marginBottom: '10px',
    width: 'fit-content',
    marginLeft: '30px',
  },
  tarjetaFlotante3: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '14px',
    padding: '14px 18px',
    width: 'fit-content',
    marginLeft: '10px',
  },
  floatLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
  },
  floatValor: {
    fontSize: '16px',
    color: '#fff',
    fontWeight: '800',
  },
  circulo1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.08)',
    top: '-80px',
    right: '-80px',
    zIndex: 1,
  },
  circulo2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '1px solid rgba(245,158,11,0.15)',
    bottom: '60px',
    right: '-40px',
    zIndex: 1,
  },
  panelDerecho: {
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  encabezado: {
    marginBottom: '32px',
  },
  titulo: {
    fontWeight: '800',
    color: '#0f2944',
    margin: '0 0 6px',
    letterSpacing: '-0.5px',
  },
  subtitulo: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  etiqueta: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#334155',
    letterSpacing: '0.3px',
  },
  rolesGrid: {
    display: 'flex',
    gap: '10px',
  },
  botonRol: {
    flex: 1,
    padding: '12px 8px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    background: '#fff',
    color: '#64748b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  botonRolActivo: {
    border: '2px solid #f59e0b',
    background: '#fffbeb',
    color: '#b45309',
  },
  input: {
    padding: '13px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
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
    fontSize: '15px',
    color: '#0f2944',
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  boton: {
    marginTop: '4px',
    padding: '15px',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.3px',
    boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
    transition: 'opacity 0.2s',
    width: '100%',
  },
  pie: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '13px',
    color: '#94a3b8',
  },
  enlace: {
    color: '#1a6b8a',
    textDecoration: 'none',
    fontWeight: '700',
  },
};

export default Registro;