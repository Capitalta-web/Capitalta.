# 🏗️ REPLANTEO ARQUITECTURA - CAPITALTA v2.0 LIMPIA

## 📋 DIAGNÓSTICO DEL PROBLEMA ACTUAL

### La Pantalla Blanca: Raíz del Problema
```
/dashboard
  ↓ (usuario accede)
  dashboard/layout.jsx (AuthGuard wrapper)
  ↓
  AuthGuard verifica userData
  ↓
  userData está vacío + isProcessing = false
  ↓
  ❌ Retorna null (pantalla blanca)
```

### Causas Reales
1. **Dos flujos de auth activos** ❌
   - /auth/signup (custom OTP)
   - /auth/registro (Supabase nativo)
   → Crean inconsistencia en cómo se guarda la sesión

2. **Base de datos "sucia"** ❌
   - Muchas migraciones sin consolidar
   - RLS policies inconsistentes
   - Tablas de prueba sin limpiar

3. **Lógica de redirect confusa** ❌
   - dashboard/page.jsx hace query a profiles
   - Pero AuthContext ya hace otra query
   → Race conditions

4. **Cookies/Dominio** ❌
   - capitalta.mx vs www.capitalta.mx
   - Sesión no persiste correctamente

---

## ✅ SOLUCIÓN: REPLANTEO LIMPIO

### Fase 1: NUEVA ARQUITECTURA DE BD

**Eliminar tablas viejas:**
- otp_codes (custom)
- Cualquier tabla de prueba
- Datos inconsistentes

**Crear tablas limpias:**
1. **profiles** - Solo campo role (admin/analista/cliente)
2. **solicitudes** - solicitudes de crédito
3. **documentos** - docs subidos
4. **citas** - video/presencial
5. **leads** - antes de registrarse

### Fase 2: NUEVO FLUJO DE AUTH (3 horas)

**Eliminar:**
- ❌ /auth/signup (custom OTP)
- ❌ /auth/registro-simple
- ❌ api/auth/signup (custom)
- ❌ api/auth/verify-otp
- ❌ tabla otp_codes

**Mantener:**
- ✅ /auth/registro (Supabase signUp + callback)
- ✅ /auth/login (Supabase signInWithPassword)

### Fase 3: NUEVO DASHBOARD (5 horas)

**Estructura Nueva:**
```
src/app/dashboard/
├── layout.jsx (sin guard)
├── page.jsx (redirect simple)
├── (auth-guard)/
│   ├── layout.jsx (AuthGuard aquí)
│   ├── admin/page.jsx
│   ├── analista/page.jsx
│   └── cliente/page.jsx
```

**Ventaja:** Sin guarda anidadas = sin pantallas blancas

---

## 🚀 PLAN DE EJECUCIÓN

### Timeline: 3-4 días

**Día 1:** BD Nueva (4h)
- Supabase proyecto nuevo/limpiado
- Schema aplicado
- RLS policies

**Día 2:** Auth Nueva (6h)
- Eliminar rutas viejas
- Nuevo /auth/callback
- Test E2E

**Día 3:** Dashboard Nueva (8h)
- Nueva estructura
- 3 dashboards (admin/analista/cliente)
- Test todos flujos

**Día 4:** Testing & Deploy (4h)
- E2E completo
- Deploy staging/producción

---

## ✅ BENEFICIOS

### Antes (Actual) ❌
- 2 flujos de auth (confusión)
- BD con pruebas (sucia)
- Guarda anidadas (pantallazos blancos)
- RLS inconsistentes

### Después (Nuevo) ✅
- 1 solo flujo (Supabase nativo)
- BD limpia desde cero
- Estructura clara
- RLS simples y consistentes
- **Pantalla blanca: ELIMINADA** 🎉

---

## 🎯 DECISIÓN FINAL

**¿Hacemos replanteo desde cero?**

**SÍ - Es la opción correcta porque:**
1. Código base es nuevo (solo pruebas)
2. 3-4 días de trabajo
3. Resultado: proyecto limpio y escalable
4. Alternativa: seguir parcheando = bugs infinitos

**Mi recomendación: REPLANTEA DESDE CERO 🚀**

