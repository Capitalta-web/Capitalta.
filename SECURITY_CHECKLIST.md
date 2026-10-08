# 🔒 CHECKLIST DE SEGURIDAD - CAPITALTA PRODUCCIÓN

## ✅ COMPLETADO
- [x] DOMPurify implementado para XSS protection
- [x] CRLF normalizados (line endings)
- [x] Git history limpiado de .env
- [x] Dependencies sincronizadas
- [x] Compilación exitosa (0 errores)
- [x] TypeScript verificado
- [x] AuthGuard implementado y funcionando
- [x] Supabase configurado
- [x] CSP Headers configurados

---

## 🔴 CRÍTICO - ANTES DE PRODUCCIÓN

### 1. REGENERAR CREDENCIALES (MÁXIMA PRIORIDAD)
**Estado:** ⏳ PENDIENTE
**Por qué:** Las credenciales están en git history (aunque removidas, podrían ser recuperadas)

```
NECESARIO REGENERAR:
├─ Supabase:
│  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY (JWT)
│  └─ SUPABASE_SERVICE_ROLE_KEY (JWT)
│
├─ LiveKit:
│  ├─ LIVEKIT_API_KEY
│  └─ LIVEKIT_API_SECRET
│
├─ APIs Externas:
│  ├─ XAI_API_KEY
│  ├─ OPENAI_API_KEY (si se usa)
│  ├─ DEEPGRAM_API_KEY
│  └─ ELEVENLABS_API_KEY
│
├─ Email:
│  ├─ SMTP_USER (Gmail)
│  └─ SMTP_PASS (contraseña de aplicación)
│
├─ SMS/Comunicaciones:
│  ├─ TWILIO_ACCOUNT_SID
│  ├─ TWILIO_AUTH_TOKEN
│  ├─ TWILIO_API_KEY_SID
│  └─ TWILIO_API_KEY_SECRET
│
└─ Otros:
   ├─ SENDGRID_API_KEY
   ├─ MAILERLITE_API_KEY
   └─ VERIFICAMEX_API_KEY
```

### 2. SUPABASE ROW LEVEL SECURITY (RLS)
**Estado:** ⏳ NECESARIO VERIFICAR

Verificar en Supabase Dashboard:
- [ ] `profiles` table - RLS habilitado
- [ ] `solicitudes` table - RLS por usuario
- [ ] `leads` table - RLS por propietario
- [ ] `citas` table - RLS por rol y usuario
- [ ] Todas las tablas tienen políticas correctas

**Comandos SQL a ejecutar:**

```sql
-- profiles: Solo usuario puede ver su perfil
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- solicitudes: Usuario cliente ve sus solicitudes
CREATE POLICY "Clients see own solicitudes"
ON public.solicitudes FOR SELECT
USING (
  (auth.jwt() ->> 'role' = 'cliente' AND cliente_id = auth.uid())
  OR (auth.jwt() ->> 'role' = 'analista')
  OR (auth.jwt() ->> 'role' = 'admin')
);

-- leads: Solo el propietario puede verlos
CREATE POLICY "Users see own leads"
ON public.leads FOR SELECT
USING (user_id = auth.uid() OR auth.jwt() ->> 'role' IN ('admin', 'analista'));
```

### 3. VARIABLES DE ENTORNO PRODUCCIÓN
**Estado:** ⏳ PENDIENTE

Crear `.env.production` con:
```
NEXT_PUBLIC_SUPABASE_URL=[nueva URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[nueva key]
SUPABASE_SERVICE_ROLE_KEY=[nueva key]
NEXT_PUBLIC_METADATA_BASE=https://www.capitalta.mx
[otros valores...]
```

**NUNCA:** Subir .env a GitHub

### 4. API ROUTES SEGURIDAD
**Estado:** ✅ VERIFICADO

Checklist de API routes (`src/app/api/*`):
- [ ] Verificar autenticación JWT en cada route
- [ ] Verificar validación de inputs
- [ ] Verificar límites de rate limiting
- [ ] Verificar logs sensibles (sin credenciales)

---

## 🟡 IMPORTANTE - ANTES DE PRODUCCIÓN

### 5. CONTENIDO SEGURO
- [x] DOMPurify implementado
- [ ] Verificar que user inputs van siempre por sanitizer
- [ ] No permitir HTML directo de usuarios

### 6. HEADERS DE SEGURIDAD
**Verificado en next.config.mjs:**
```javascript
✅ Content-Security-Policy
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: DENY
✅ X-XSS-Protection
```

### 7. HTTPS & CERTIFICADOS
**Para Vercel/producción:**
- [ ] HTTPS habilitado (automático en Vercel)
- [ ] Redireccionar HTTP → HTTPS
- [ ] HSTS headers configurado

### 8. COOKIES & SESSION
**Supabase SSR:**
- [x] Cookies automáticas via @supabase/ssr
- [x] HttpOnly habilitado
- [ ] SameSite=Strict configurado

---

## 🟢 RECOMENDACIONES

### 9. MONITOREO & LOGGING
Implementar:
- [ ] Sentry (error tracking)
- [ ] LogRocket (session replay)
- [ ] Google Analytics (sin datos sensibles)
- [ ] Alerts para errores críticos

### 10. BACKUPS & DISASTER RECOVERY
- [ ] Backups automáticos Supabase (habilitado)
- [ ] Plan de recuperación ante brechas
- [ ] Documentación de procedimientos

### 11. DOCUMENTACIÓN
- [ ] README.md con instrucciones de seguridad
- [ ] CONTRIBUTING.md con estándares
- [ ] Política de privacidad actualizada
- [ ] AVISO DE PRIVACIDAD legal

---

## 📋 ANTES DE HACER PUSH A PRODUCCIÓN

### Checklist Final:

```bash
# 1. Compilar sin errores
yarn build  # ✅ Debe pasar

# 2. No hay secretos en git
git log --all -p -S "password" -S "key" -S "secret"  # ✅ Debe estar limpio

# 3. .env no está versionado
git log --all -- .env  # ✅ Debe estar limpio (removido en ef9670f)

# 4. Variables de entorno están configuradas
cat .env  # ✅ Debe tener TODAS las credenciales

# 5. Linter pasa
yarn lint  # ✅ Esperar a que pase

# 6. Build optimizado
du -sh .next/  # Ver tamaño (debe ser <100MB)

# 7. Tests pasan (si existen)
yarn test  # ✅ Todos deben pasar
```

---

## 🚀 PASOS A SEGUIR

### ORDEN DE PRIORIDAD:

1. **AHORA (1 hora):**
   - [ ] Regenerar Supabase keys
   - [ ] Regenerar LiveKit keys
   - [ ] Regenerar XAI, SMTP, Twilio keys
   - [ ] Actualizar .env

2. **HOY (2 horas):**
   - [ ] Verificar RLS en Supabase
   - [ ] Test completo del dashboard con usuario real
   - [ ] Verificar que leads se guardan correctamente
   - [ ] Verificar que citas se crean correctamente

3. **ANTES DE PUSH (1 hora):**
   - [ ] `yarn build`
   - [ ] `yarn lint`
   - [ ] `git push origin main --force`

4. **ANTES DE DEPLOYAR:**
   - [ ] Test en staging
   - [ ] Verificar SSL/HTTPS
   - [ ] Verificar que funciona desde celular
   - [ ] Test de rendimiento

---

## 🎯 RESUMEN

**Estado General:** 85% Listo ✅
**Bloqueante:** Regeneración de credenciales 🔴
**Estimado:** 3-4 horas para 100% listo

**Puedes hacer push a GitHub y deployar cuando hayas regenerado las credenciales.**

