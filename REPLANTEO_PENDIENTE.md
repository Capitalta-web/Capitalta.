# ✅ REPLANTEO - CHECKLIST DE CÓDIGO A CAMBIAR

## BD: ✅ LISTA

Tablas creadas:
- profiles
- solicitudes
- documentos
- citas
- leads

Usuarios:
- admin@capitalta.mx (admin)
- analista@capitalta.mx (analista)
- cliente@capitalta.mx (cliente)

---

## CÓDIGO A CAMBIAR (En orden)

### 1. AuthContext.jsx ✅ (Simplificado)
- [x] Remover buildUserData
- [x] Remover attachLeadToUser
- [x] Remover fetchProfile (duplicado)
- [x] Reescribir refreshUser simple
- [x] Agregar auth state subscription

### 2. Crear /auth/callback/page.jsx ✅ (Nuevo)
- [ ] Crear callback página
- [ ] Fetch user
- [ ] Crear profile si no existe
- [ ] Redirect a /dashboard

### 3. Nueva estructura dashboard
- [ ] dashboard/layout.jsx (sin guard)
- [ ] dashboard/page.jsx (simple redirect)
- [ ] dashboard/(auth-guard)/layout.jsx (con guard)
- [ ] dashboard/(auth-guard)/admin/page.jsx
- [ ] dashboard/(auth-guard)/analista/page.jsx
- [ ] dashboard/(auth-guard)/cliente/page.jsx

### 4. Eliminar rutas viejas
- [ ] rm src/app/auth/signup/
- [ ] rm src/app/auth/registro-simple/
- [ ] rm src/app/api/auth/signup/
- [ ] rm src/app/api/auth/verify-otp/

### 5. Actualizar /auth/registro
- [ ] Verificar que usa Supabase nativo
- [ ] Configurar redirect a /auth/callback

---

## COMANDO PARA CONTINUAR

Cuando estés listo, dime y hago TODOS los cambios de código automáticamente.

Voy a:
1. Reescribir AuthContext (limpio)
2. Crear /auth/callback
3. Crear nueva estructura dashboard
4. Eliminar rutas viejas
5. Build y test

TIEMPO: ~20 minutos

