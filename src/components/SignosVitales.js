import React, { useState, useEffect } from 'react';

const SignosVitales = () => {
  const [progreso, setProgreso] = useState(0);
  const [listo, setListo] = useState(false);
  const [esMobil, setEsMobil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMobil(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) { clearInterval(intervalo); setListo(true); return 100; }
        return prev + 2;
      });
    }, 60);
    return () => clearInterval(intervalo);
  }, []);

  const vitales = [
    { icono: '🌡️', valor: '36.5', unidad: '°C', etiqueta: 'Temperatura corporal', color: '#d97706', bg: '#fffbeb', borde: '#fde68a' },
    { icono: '❤️', valor: '78', unidad: 'bpm', etiqueta: 'Pulso', color: '#dc2626', bg: '#fef2f2', borde: '#fca5a5' },
    { icono: '💧', valor: '98', unidad: '%', etiqueta: 'Oxigenación', color: '#1a6b8a', bg: '#f0f9ff', borde: '#7dd3fc' },
  ];

  const radio = 54;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (progreso / 100) * circunferencia;

  return (
    <div style={estilos.pagina}>
      {/* Header */}
      <div style={estilos.header}>
        <div style={estilos.headerIzq}>
          <span style={{ fontSize: '24px' }}>⚕️</span>
          <span style={estilos.logoTexto}>VitalScan</span>
          {!esMobil && (
            <>
            </>
          )}
        </div>
      
      </div>

      <div style={{ ...estilos.cuerpo, flexDirection: esMobil ? 'column' : 'row' }}>

        {/* Panel izquierdo instrucciones */}
        <div style={{
          ...estilos.panelIzquierdo,
          padding: esMobil ? '28px 20px' : '48px 44px',
          minHeight: esMobil ? 'auto' : 'calc(100vh - 56px)',
        }}>
          <div style={estilos.panelIzqInner}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🫳</div>
            <h2 style={estilos.panelTitulo}>Mida sus signos vitales</h2>
            <p style={estilos.panelDesc}>Coloque su dedo en el sensor y espere unos segundos.</p>

            <div style={estilos.instrucciones}>
              <div style={estilos.instruccionItem}>
                <div style={estilos.instruccionIcono}>🖐️</div>
                <div>
                  <div style={estilos.instruccionTitulo}>Mantenga el dedo quieto</div>
                  <div style={estilos.instruccionDesc}>Evite mover la mano durante la medición</div>
                </div>
              </div>
              <div style={estilos.instruccionItem}>
                <div style={estilos.instruccionIcono}>🕐</div>
                <div>
                  <div style={estilos.instruccionTitulo}>Espere unos segundos</div>
                  <div style={estilos.instruccionDesc}>La lectura demora entre 5 y 10 segundos</div>
                </div>
              </div>
              <div style={estilos.instruccionItem}>
                <div style={{ ...estilos.instruccionIcono, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)' }}>✅</div>
                <div>
                  <div style={estilos.instruccionTitulo}>Resultados automáticos</div>
                  <div style={estilos.instruccionDesc}>Los valores se guardan en el sistema</div>
                </div>
              </div>
            </div>
          </div>
          <div style={estilos.circulo1} />
          <div style={estilos.circulo2} />
        </div>

        {/* Panel derecho resultados */}
        <div style={{
          ...estilos.panelDerecho,
          padding: esMobil ? '28px 16px' : '48px 40px',
        }}>
          {/* Círculo progreso */}
          <div style={estilos.circuloContenedor}>
            <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r={radio} fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle cx="70" cy="70" r={radio} fill="none"
                stroke={listo ? '#d97706' : '#1a6b8a'}
                strokeWidth="10"
                strokeDasharray={circunferencia}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s' }}
              />
            </svg>
            <div style={estilos.circuloTexto}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: listo ? '#d97706' : '#1a6b8a' }}>
                {listo ? '✓ Listo' : `${progreso}%`}
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>
                {listo ? 'Completado' : 'Midiendo'}
              </span>
            </div>
          </div>

          {/* Tarjetas vitales */}
          <div style={{ ...estilos.tarjetasFila, flexDirection: esMobil ? 'column' : 'row' }}>
            {vitales.map((v, i) => (
              <div key={i} style={{ ...estilos.tarjeta, background: v.bg, border: `1.5px solid ${v.borde}` }}>
                <span style={{ fontSize: '28px', marginBottom: '10px', display: 'block' }}>{v.icono}</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '900', color: v.color, lineHeight: 1 }}>{v.valor}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: v.color, marginBottom: '4px' }}>{v.unidad}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: '600' }}>{v.etiqueta}</p>
              </div>
            ))}
          </div>

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
  },

  cuerpo: {
    display: 'flex',
  },

  // Header
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

  // Paneles Laterales
  panelIzquierdo: {
    width: '380px',
    flexShrink: 0,
    background: 'linear-gradient(145deg, #1e3a5f, #1a6b8a)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
  },

  panelIzqInner: {
    color: '#fff',
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },

  panelTitulo: {
    fontSize: '22px',
    fontWeight: '800',
    margin: '0 0 10px',
    letterSpacing: '-0.3px',
  },

  panelDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.6,
    margin: '0 0 28px',
  },

  instrucciones: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  instruccionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },

  instruccionIcono: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },

  instruccionTitulo: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '2px',
  },

  instruccionDesc: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.4,
  },

  circulo1: {
    position: 'absolute',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.07)',
    top: '-60px',
    right: '-60px',
    zIndex: 1,
  },

  circulo2: {
    position: 'absolute',
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    border: '1px solid rgba(245,158,11,0.15)',
    bottom: '40px',
    right: '-30px',
    zIndex: 1,
  },

  // Panel Derecho
  panelDerecho: {
    flex: 1,
    background: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '28px',
  },

  circuloContenedor: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circuloTexto: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Tarjetas y Fila
  tarjetasFila: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    maxWidth: '520px',
  },

  tarjeta: {
    flex: 1,
    borderRadius: '16px',
    padding: '20px 14px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },

  // Botón de ver
  botonVer: {
    display: 'inline-block',
    padding: '13px 28px',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
  },
};

export default SignosVitales;