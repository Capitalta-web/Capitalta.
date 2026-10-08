'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function TestSupabase() {
  const [status, setStatus] = useState('Probando...');
  const [error, setError] = useState('');
  const [authInfo, setAuthInfo] = useState(null);
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) {
          setStatus('Error: Cliente Supabase no inicializado (Faltan variables de entorno)');
          return;
        }

        const [sessionRes, userRes] = await Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]);
        const session = sessionRes?.data?.session || null;
        const user = userRes?.data?.user || null;

        setAuthInfo({
          hasSession: Boolean(session),
          userId: user?.id || null,
          email: user?.email || null,
          roleFromJwt: user?.user_metadata?.role || null
        });

        const tablesToCheck = ['profiles', 'solicitudes_credito', 'documentos', 'citas', 'avaluos'];

        const results = await Promise.all(
          tablesToCheck.map(async (table) => {
            const start = Date.now();
            try {
              const { error } = await supabase.from(table).select('*', { count: 'exact', head: true });
              if (error) {
                return { table, ok: false, code: error.code || null, message: error.message, ms: Date.now() - start };
              }
              return { table, ok: true, code: null, message: 'OK (select head)', ms: Date.now() - start };
            } catch (e) {
              return { table, ok: false, code: null, message: e?.message || String(e), ms: Date.now() - start };
            }
          })
        );

        setChecks(results);
        setStatus('Conexión verificada. Revisa el detalle por tabla.');
      } catch (err) {
        setError(err.message);
        setStatus('Error inesperado');
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Prueba de Conexión Supabase</h1>
      <p>Estado: {status}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <hr />
      <h2>Auth</h2>
      {!authInfo ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          <li>Sesión activa: {authInfo.hasSession ? 'Sí' : 'No'}</li>
          <li>User ID: {authInfo.userId || '—'}</li>
          <li>Email: {authInfo.email || '—'}</li>
          <li>Role (JWT): {authInfo.roleFromJwt || '—'}</li>
        </ul>
      )}
      <hr />
      <h2>Tablas (select head)</h2>
      {checks.length === 0 ? (
        <p>—</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Tabla</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Resultado</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Código</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Detalle</th>
              <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>ms</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c) => (
              <tr key={c.table}>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: 8 }}>{c.table}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: 8, color: c.ok ? 'green' : 'crimson' }}>
                  {c.ok ? 'OK' : 'ERROR'}
                </td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: 8 }}>{c.code || '—'}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: 8, fontFamily: 'monospace', fontSize: 12 }}>{c.message}</td>
                <td style={{ borderBottom: '1px solid #f2f2f2', padding: 8, textAlign: 'right' }}>{c.ms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
