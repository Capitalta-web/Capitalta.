'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function TestSupabase() {
  const [status, setStatus] = useState('Probando...');
  const [error, setError] = useState('');

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) {
          setStatus('Error: Cliente Supabase no inicializado (Faltan variables de entorno)');
          return;
        }

        const { error } = await supabase.from('solicitudes_credito').select('count', { count: 'exact', head: true });

        if (error) {
          setError(error.message);
          setStatus('Error de conexión');
        } else {
          setStatus('Conexión exitosa. Supabase responde correctamente.');
        }
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
    </div>
  );
}
