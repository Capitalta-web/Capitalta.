# 📋 PLAN DE EJECUCIÓN DETALLADO - REPLANTEO CAPITALTA

## 🎯 OBJETIVO
Replantear el proyecto desde cero de forma limpia en 3-4 días.

---

## FASE 1: NUEVA BASE DE DATOS (4 HORAS)

### 1.1 Crear Proyecto Supabase Nuevo (O Limpiar Actual)

**Opción A: Proyecto NUEVO (Recomendado)**
1. Ir a https://app.supabase.com
2. Crear nuevo proyecto
3. Esperar a que esté listo (~5 min)
4. Copiar las nuevas credenciales:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

**Opción B: Limpiar Proyecto Actual**
1. Supabase Dashboard > SQL Editor
2. Ejecutar: DROP SCHEMA public CASCADE;
3. Ejecutar: CREATE SCHEMA public;
4. Actualizar RLS policies

### 1.2 Schema SQL Consolidado

```sql
-- CREAR TABLES

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'cliente' CHECK (role IN ('admin', 'analista', 'cliente')),
  status TEXT DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.solicitudes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewing', 'approved', 'rejected')),
  monto_solicitado DECIMAL(15, 2),
  plazo_meses INTEGER,
  tipo TEXT CHECK (tipo IN ('simple', 'empresarial')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes(id) ON DELETE CASCADE,
  analista_id UUID REFERENCES auth.users(id),
  fecha_hora TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  nombre TEXT,
  tipo_interes TEXT,
  status TEXT DEFAULT 'nuevo',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitudes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- BASIC RLS POLICIES (Simplificado para empezar)

-- Profiles
CREATE POLICY "Users see own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins see all profiles" ON public.profiles
FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Solicitudes
CREATE POLICY "Clients see own solicitudes" ON public.solicitudes
FOR SELECT USING (
  (auth.jwt() ->> 'role' = 'cliente' AND cliente_id = auth.uid())
  OR (auth.jwt() ->> 'role' IN ('admin', 'analista'))
);

-- Leads
CREATE POLICY "Admins see leads" ON public.leads
FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'analista'));

CREATE POLICY "Anyone can create lead" ON public.leads
FOR INSERT WITH CHECK (true);
```

### 1.3 Datos de Prueba

Crear 3 usuarios:
- admin@example.com / [REDACTADO] → role: admin
- analista@example.com / [REDACTADO] → role: analista
- cliente@example.com / [REDACTADO] → role: cliente

**SQL para crear profiles (después de que se registren):**
```sql
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, email, 'admin'
FROM auth.users WHERE email = 'admin@example.com';
```

---

## FASE 2: NUEVO FLUJO DE AUTH (6 HORAS)

### 2.1 Mantener Estas Rutas

- ✅ `/auth/login` - Supabase signInWithPassword
- ✅ `/auth/registro` - Supabase signUp + callback
- ✅ `/auth/forgot-password`
- ✅ `/auth/update-password`

### 2.2 Eliminar Estas Rutas

```bash
# Archivos a ELIMINAR:
rm src/app/auth/signup/
rm src/app/auth/registro-simple/
rm src/app/api/auth/signup/route.js
rm src/app/api/auth/verify-otp/route.js

# Tabla a eliminar en Supabase:
DROP TABLE public.otp_codes;
```

### 2.3 Nuevo AuthContext (Simplificado)

```jsx
// src/contexts/AuthContext.jsx
'use client';
import { createContext, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const supabase = createSupabaseBrowserClient();

  const refreshUser = async () => {
    setIsProcessing(true);
    try {
      if (!supabase) {
        setUser(null);
        return;
      }

      // Get authenticated user
      const { data: { session } } = await supabase.auth.getSession();
      const authUser = session?.user;

      if (!authUser) {
        setUser(null);
        return;
      }

      // Get profile (with role)
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      // Build user data
      const userData = {
        ...authUser,
        ...profile,
        role: profile?.role || 'cliente'
      };

      setUser(userData);
    } catch (err) {
      console.error('Auth error:', err);
      setUser(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // On mount, refresh user
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isProcessing, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside AuthProvider');
  return context;
};
```

### 2.4 Nuevo /auth/callback

```jsx
// src/app/auth/callback/page.jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createSupabaseBrowserClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        router.replace('/auth/login');
        return;
      }

      // Create profile if doesn't exist
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile) {
        const newProfile = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || 'Usuario',
          role: 'cliente'
        };

        await supabase
          .from('profiles')
          .insert([newProfile]);
      }

      // Redirect to dashboard
      router.replace('/dashboard');
    };

    handleCallback();
  }, [router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
      <CircularProgress />
      <Typography>Confirmando tu registro...</Typography>
    </Box>
  );
}
```

---

## FASE 3: NUEVO DASHBOARD (8 HORAS)

### 3.1 Nueva Estructura

```
src/app/dashboard/
├── layout.jsx                   (sin guard, solo wrapper)
├── page.jsx                     (redirect por rol)
└── (auth-guard)/                (NUEVO: grupo con guard)
    ├── layout.jsx               (AuthGuard aquí)
    ├── admin/
    │   ├── page.jsx
    │   ├── usuarios/page.jsx
    │   └── solicitudes/page.jsx
    ├── analista/
    │   ├── page.jsx
    │   └── solicitudes/page.jsx
    └── cliente/
        ├── page.jsx
        ├── solicitud/[id]/page.jsx
        └── documentos/page.jsx
```

### 3.2 dashboard/layout.jsx (SIN GUARD)

```jsx
'use client';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {children}
    </Box>
  );
}

DashboardLayout.propTypes = { children: PropTypes.node };
```

### 3.3 dashboard/page.jsx (SIMPLE REDIRECT)

```jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

export default function DashboardIndex() {
  const router = useRouter();
  const { user, isProcessing } = useAuth();

  useEffect(() => {
    if (isProcessing) return;

    if (!user) {
      router.replace('/auth/login');
      return;
    }

    const role = user.role || 'cliente';
    const routes = {
      admin: '/dashboard/admin',
      analista: '/dashboard/analista',
      cliente: '/dashboard/cliente'
    };

    router.replace(routes[role] || routes.cliente);
  }, [user, isProcessing, router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}
```

### 3.4 dashboard/(auth-guard)/layout.jsx (CON GUARD)

```jsx
'use client';
import PropTypes from 'prop-types';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import AdminLayout from '@/layouts/AdminLayout';

export default function AuthGuardLayout({ children }) {
  return (
    <AuthGuard>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AuthGuard>
  );
}

AuthGuardLayout.propTypes = { children: PropTypes.node };
```

### 3.5 Dashboards por Rol (Simples)

```jsx
// dashboard/(auth-guard)/admin/page.jsx
'use client';
import { Box, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">
        Dashboard Admin - {user?.full_name}
      </Typography>
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Bienvenido al panel administrativo
      </Typography>
    </Box>
  );
}

// dashboard/(auth-guard)/analista/page.jsx
'use client';
import { Box, Typography } from '@mui/material';

export default function AnalistaDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">
        Dashboard Analista
      </Typography>
    </Box>
  );
}

// dashboard/(auth-guard)/cliente/page.jsx
'use client';
import { Box, Typography } from '@mui/material';

export default function ClienteDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">
        Tu Panel de Control
      </Typography>
    </Box>
  );
}
```

---

## FASE 4: ACTUALIZAR VARIABLES DE ENTORNO

### 4.1 Nuevo .env

```
NEXT_PUBLIC_VERSION=v2.0.0
NEXT_PUBLIC_METADATA_BASE=https://www.capitalta.mx

# Supabase (NUEVAS)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Email (mantener)
SMTP_USER=contacto@capitalta.mx
SMTP_PASS=[nueva contraseña]

# Otros (mantener/regenerar)
SENDGRID_API_KEY=[nuevo]
TWILIO_ACCOUNT_SID=[nuevo]
TWILIO_AUTH_TOKEN=[nuevo]
```

---

## FASE 5: TESTING (4 HORAS)

### 5.1 Test Checklist

```
REGISTRO:
  ☐ Registrar usuario nuevo
  ☐ Email de confirmación llega
  ☐ Click en enlace funciona
  ☐ Redirige a login/dashboard
  ☐ Profile se creó en BD

LOGIN:
  ☐ Admin login → /dashboard/admin ✓
  ☐ Analista login → /dashboard/analista ✓
  ☐ Cliente login → /dashboard/cliente ✓
  ☐ Password incorrecto → error claro

SEGURIDAD (RLS):
  ☐ Cliente no ve solicitudes de otro
  ☐ Analista sí ve todas
  ☐ Admin sí ve todo
  ☐ Logout funciona

NAVEGACION:
  ☐ Sin sesión → redirige a login
  ☐ Con sesión → dashboard correcto
  ☐ Botón logout → /auth/login
```

### 5.2 Comandos de Test

```bash
# 1. Compilar sin errores
yarn build

# 2. Correr dev
yarn dev

# 3. Abrir en navegador
# http://localhost:3000

# 4. Test flujo:
# - /auth/registro → registrar
# - email → click
# - /dashboard → debería funcionar
```

---

## 🚀 CHECKLIST DE EJECUCIÓN

### DÍA 1 (4h)
- [ ] Crear/limpiar Supabase
- [ ] Aplicar SQL schema
- [ ] Crear 3 usuarios de prueba
- [ ] Verificar conexión

### DÍA 2 (6h)
- [ ] Eliminar rutas viejas
- [ ] Nuevo AuthContext
- [ ] Nuevo /auth/callback
- [ ] Test E2E auth

### DÍA 3 (8h)
- [ ] Nueva estructura dashboard
- [ ] 3 dashboards
- [ ] Actualizar menú
- [ ] Test navegación

### DÍA 4 (4h)
- [ ] Testing E2E completo
- [ ] Deploy staging
- [ ] Deploy producción
- [ ] Monitoreo

---

## 💡 RESUMEN

**Costo:** 3-4 días  
**Beneficio:** Proyecto limpio, escalable, sin bugs  
**Alternativa:** Seguir parcheando = infinitos problemas  

**RECOMENDACIÓN: HAZLO 🚀**

