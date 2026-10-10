# 📋 TESTING CHECKLIST - REPLANTEO CAPITALTA

## Environment Setup
- [ ] npm run dev (on port 3000 or 3001)
- [ ] Check .env has correct Supabase credentials
- [ ] Check Supabase console shows profiles table with 3 users

---

## 1. AUTHENTICATION FLOW

### 1.1 Registration (Nuevo Usuario)
```
URL: http://localhost:3000/auth/register
Action: Registrar nuevo usuario
```
- [ ] Página /auth/register carga correctamente
- [ ] Formulario tiene campos: First Name, Last Name, Email, Password, Confirm Password
- [ ] Validación funciona (emails inválidos mostran error)
- [ ] "Sign Up" button funciona
- [ ] Mensaje de éxito: "¡Registro exitoso! Verifica tu email para confirmar tu cuenta."
- [ ] Redirige a /auth/login después de 2 segundos
- [ ] Email de confirmación llega a la bandeja
- [ ] Click en enlace de confirmación abre /auth/callback
- [ ] /auth/callback muestra "Confirmando tu cuenta..." con spinner
- [ ] Profile se crea automáticamente en Supabase
- [ ] Redirige a /dashboard

### 1.2 Login (Usuario Existente)
```
Test con los 3 usuarios de prueba
```
- [ ] **Admin Login:**
  - Email: admin@capitalta.mx
  - Password: [contraseña REDACTADA]
  - Esperado: /dashboard/admin
  - Muestra: "Dashboard Admin - admin@capitalta.mx"

- [ ] **Analista Login:**
  - Email: analista@capitalta.mx  
  - Password: [contraseña REDACTADA]
  - Esperado: /dashboard/analista
  - Muestra: "Dashboard Analista"

- [ ] **Cliente Login:**
  - Email: cliente@capitalta.mx
  - Password: [contraseña REDACTADA]
  - Esperado: /dashboard/cliente
  - Muestra: "Tu Panel de Control"

- [ ] Email incorrecto → Error: "Invalid login credentials"
- [ ] Password incorrecto → Error: "Invalid login credentials"
- [ ] Botón logout (si existe) → Redirige a /auth/login

---

## 2. DASHBOARD ROUTING

### 2.1 Sin Sesión
- [ ] Acceso a /dashboard → Redirige a /auth/login
- [ ] Acceso a /dashboard/admin → Redirige a /auth/login
- [ ] Acceso a /dashboard/cliente → Redirige a /auth/login

### 2.2 Con Sesión
- [ ] /dashboard → Redirige automáticamente a dashboard del rol
- [ ] /dashboard/admin (admin) → Carga admin dashboard
- [ ] /dashboard/analista (analista) → Carga analista dashboard
- [ ] /dashboard/cliente (cliente) → Carga cliente dashboard

### 2.3 Protección de Rutas
- [ ] Client NO puede acceder a /dashboard/admin → Redirige
- [ ] Analista NO puede acceder a /dashboard/admin → Redirige
- [ ] Admin NO puede acceder a /dashboard/cliente → Debería funcionar (es admin)

---

## 3. AUTHGUARD FUNCTIONALITY

- [ ] AuthGuard muestra spinner mientras isProcessing = true
- [ ] AuthGuard muestra contenido cuando isProcessing = false && user existe
- [ ] AuthGuard redirige a login cuando userData está vacío
- [ ] Mensaje "Estamos preparando tu panel..." aparece después de 6.5 seg (si lento)

---

## 4. DATABASE (RLS POLICIES)

### 4.1 Row Level Security
```
Prerequisito: 2 usuarios clients logueados en incógnitas diferentes
```
- [ ] Cliente A no puede ver datos de Cliente B
- [ ] Analista puede ver solicitudes de todos los clientes
- [ ] Admin puede ver todo

### 4.2 Database Integrity
- [ ] Cada nuevo usuario crea un profile automáticamente
- [ ] Profile tiene role = 'cliente' por defecto
- [ ] Profile tiene email guardado correctamente
- [ ] Profile tiene full_name guardado correctamente

---

## 5. USER EXPERIENCE

### 5.1 Loading States
- [ ] Spinner muestra en /auth/callback
- [ ] Spinner muestra en dashboard redirect (/dashboard/page.jsx)
- [ ] Spinner muestra en AuthGuard layout

### 5.2 Error Handling
- [ ] Email verification error → mensaje claro
- [ ] Network error en login → mensaje claro
- [ ] Profile fetch error → AuthGuard maneja gracefully

### 5.3 Navigation
- [ ] Menú navega correctamente
- [ ] Botones están funcionales
- [ ] Links no rompidos

---

## 6. VISUAL VERIFICATION (cada dashboard)

### 6.1 Admin Dashboard
- [ ] Título: "Dashboard Admin - [nombre]"
- [ ] 4 tarjetas: Total Solicitudes, En Revisión, Usuarios, Analistas
- [ ] Mensaje de bienvenida

### 6.2 Analista Dashboard  
- [ ] Título: "Dashboard Analista - [nombre]"
- [ ] 4 tarjetas: Mis Solicitudes, Por Revisar, Aprobadas, Rechazadas
- [ ] Mensaje de bienvenida

### 6.3 Cliente Dashboard
- [ ] Título: "Tu Panel de Control"
- [ ] Saludo personalizado: "Bienvenido, [nombre]"
- [ ] 4 tarjetas: Mis Solicitudes, En Proceso, Documentos, Citas Programadas
- [ ] Botón "Nueva Solicitud" (no debe rebentar)

---

## 7. BUILD VERIFICATION

Before testing, verify:
- [ ] `npm run build` completa sin errores
- [ ] No hay webpack errors
- [ ] No hay módulos faltantes
- [ ] No hay referencias a archivos eliminados
- [ ] .next/server/app contiene rutas correctas

---

## 8. COMMON ISSUES & SOLUTIONS

### Issue: Pantalla Blanca en /dashboard
- Solución: Verificar localStorage vacío (abrir DevTools, limpiar localStorage)
- Solución: Verificar AuthContext se está ejecutando (ver console logs)
- Solución: Verificar Supabase credenciales en .env

### Issue: "Module not found" en build
- Solución: Limpiar .next: `rm -rf .next`
- Solución: Verificar no hay referencias a rutas eliminadas
- Solución: `npm install` para asegurar dependencias

### Issue: OAuth Email no llega
- Solución: Verificar Supabase SMTP configurado
- Solución: Verificar email en spam
- Solución: Usar preview/test email de Supabase

---

## 9. FINAL CHECKLIST

Marcar como LISTO cuando:
- [ ] Todos los tests 1-7 pasados
- [ ] No hay console errors
- [ ] No hay console warnings relacionados
- [ ] AuthContext funciona correctamente
- [ ] Dashboard routing funciona para todos los roles
- [ ] RLS policies protegen datos correctamente
- [ ] UX es fluida sin pantallas blancas

---

## PRÓXIMO: Deploy

Una vez verificados todos los tests:
```bash
# 1. Commit a Git
git add .
git commit -m "chore: replanteo arquitectura - nuevo Supabase, auth simplificado, dashboard limpio"

# 2. Push a repo
git push origin main

# 3. Deploy a staging
vercel --prod --scope=capitalta

# 4. Final testing en production
# http://capitalta.vercel.app
```

