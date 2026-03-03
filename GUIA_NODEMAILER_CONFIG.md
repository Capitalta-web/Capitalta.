# 📧 GUÍA COMPLETA: SISTEMA NODEMAILER - CONFIGURACIÓN DE CORREOS

**Fecha:** Marzo 2026
**Sistema:** Nodemailer + Google Workspace SMTP
**Correo Actual:** capitalta@abdev.click (saliente)
**Correo Nuevo:** contacto@capitalta.mx (será el nuevo)

---

## 🎯 RESUMEN EJECUTIVO

El sistema de correos en Capitalta utiliza **Nodemailer** con **Google Workspace SMTP** para enviar:
- ✉️ Códigos de verificación OTP (6 dígitos)
- ✉️ Emails de bienvenida (después del registro)
- ✉️ Confirmaciones de cita
- ✉️ Notificaciones diversas

La autenticación se hace mediante:
- **Usuario (SMTP_USER):** contacto@capitalta.mx (va a cambiar)
- **Contraseña (SMTP_PASS):** App Password de Google Workspace (va a cambiar)

---

## 🔍 EXPLICACIÓN DEL SISTEMA ACTUAL

### 1. **Flujo de Envío de Correos**

```
Usuario hace acción (Registro, etc.)
        ↓
API endpoint dispara función de correo
        ↓
Función en nodemailer.js (sendEmail, sendVerificationCode, etc.)
        ↓
Lee SMTP_USER y SMTP_PASS de variables de entorno
        ↓
Crea conexión SMTP a smtp.gmail.com:465
        ↓
Autentica con Google Workspace
        ↓
Envía correo desde: capitalta@abdev.click (será contacto@capitalta.mx)
        ↓
Correo llega al usuario
```

### 2. **Archivo Principal: `src/utils/nodemailer.js`**

Este archivo contiene 4 funciones:

#### **Función 1: `sendEmail()` (Línea 11)**
```javascript
export async function sendEmail({ to, subject, html, text })
```
- Función genérica para enviar cualquier correo
- Lee variables de entorno: `process.env.SMTP_USER` y `process.env.SMTP_PASS`
- Crea transporter Nodemailer
- Envía el correo desde: "capitalta@abdev.click" (hardcodeado en línea 35)

**Archivos que llaman a esta función:**
- `src/app/api/email/welcome/route.js` - Email de bienvenida
- Cualquier endpoint API que necesite enviar correos

#### **Función 2: `sendVerificationCode()` (Línea 59)**
- Envía código OTP de 6 dígitos
- Usado en: `/auth/signup` - Verificación de email
- Usado en: `/api/verify-otp/route.js`

#### **Función 3: `sendAppointmentConfirmation()` (Línea 81)**
- Envía confirmación cuando se agenda cita
- Aún no implementada completamente (para futuro)

#### **Función 4: `sendWelcomeEmail()` (Línea 110)**
- Envía email de bienvenida después del registro
- Usado en: `src/app/api/email/welcome/route.js`
- Plantilla profesional con instrucciones

---

## 📍 DÓNDE ESTÁN LAS VARIABLES DE ENTORNO

### **Local (.env.local)**
```
SMTP_USER=contacto@capitalta.mx
SMTP_PASS=xxxx yyyy zzzz wwww
```

### **Producción (Vercel)**
En dashboard de Vercel → Settings → Environment Variables:
```
SMTP_USER = contacto@capitalta.mx
SMTP_PASS = xxxx yyyy zzzz wwww
```

### **Verificar variables actuales:**
- Localmente: Ver archivo `.env.local` (NO en Git)
- En Vercel: Dashboard → Project Settings → Environment Variables

---

## 🔐 PASO A PASO: GENERAR NUEVA APP PASSWORD EN GOOGLE WORKSPACE

### **REQUISITOS:**
- Acceso a Google Workspace Admin de capitalta.mx
- MFA/2FA activado en la cuenta (requerido para App Passwords)

### **INSTRUCCIONES:**

#### **Paso 1: Acceder a Google Account**
```
1. Ir a: https://myaccount.google.com/
2. En la esquina superior derecha, hacer clic en foto/avatar
3. Seleccionar "Manage your Google Account"
```

#### **Paso 2: Ir a Seguridad**
```
1. En el menú superior, hacer clic en "Security" (Seguridad)
2. En el panel izquierdo, buscar: "App passwords" o "Contraseñas de aplicación"
   (Si NO ves esta opción, significa que 2FA no está activo)
```

#### **Paso 3: Activar 2FA (si no está activo)**
```
1. En "How you sign in to Google", hacer clic en "2-Step Verification"
2. Seguir el proceso (puede ser SMS, autenticador, etc.)
3. Una vez completado, volver al paso anterior
```

#### **Paso 4: Generar App Password**
```
1. En "App passwords" (Contraseñas de aplicación), seleccionar:
   - Select app: Mail
   - Select device: Windows PC (o tu dispositivo)

2. Google generará una contraseña de 16 caracteres en formato:
   xxxx yyyy zzzz wwww

3. ⚠️ COPIAR ESTA CONTRASEÑA INMEDIATAMENTE (no se muestra de nuevo)
```

#### **Paso 5: Guardar la contraseña**
```
Formato:
Correo:      contacto@capitalta.mx
Contraseña:  xxxx yyyy zzzz wwww  (16 caracteres, 4 grupos de 4)

GUARDAR EN LUGAR SEGURO (1Password, LastPass, etc.)
```

---

## 📝 ARCHIVOS A MODIFICAR

### **ARCHIVO 1: `src/utils/nodemailer.js` (Línea 35)**

**MODIFICAR ESTO:**
```javascript
// Línea 35 - CAMBIAR:
const fromEmail = "capitalta@abdev.click";

// POR ESTO:
const fromEmail = "contacto@capitalta.mx";
```

**Explicación:**
- Este es el correo "desde" que aparece en todos los emails enviados
- Debe coincidir con el correo usado en SMTP_USER
- Es lo que ven los usuarios como remitente

---

### **ARCHIVO 2: `.env.local` (Tu máquina local)**

**CREAR O MODIFICAR:**
```bash
# Abre/crea el archivo: .env.local en la raíz del proyecto

# Busca estas líneas:
SMTP_USER=capitalta@abdev.click
SMTP_PASS=xxxx yyyy zzzz wwww

# CAMBIAR POR:
SMTP_USER=contacto@capitalta.mx
SMTP_PASS=xxxx yyyy zzzz wwww  # (la nueva password generada)
```

**Ubicación:** `C:\Users\abald\.abm\capitalta\MUI-capitalta\.env.local`

**Notas importantes:**
- ⚠️ Este archivo NO debe estar en Git (ya está en .gitignore)
- Verifica que `.gitignore` contenga: `.env.local`
- Las espacios en la password son importantes (copiar exactamente)

---

### **ARCHIVO 3: Vercel Environment Variables**

**Actualizar en Vercel:**

1. Ir a: https://vercel.com/dashboard
2. Seleccionar proyecto "capitalta"
3. Ir a: Settings → Environment Variables
4. Buscar: `SMTP_USER` y `SMTP_PASS`
5. Modificar:
   ```
   SMTP_USER = contacto@capitalta.mx
   SMTP_PASS = xxxx yyyy zzzz wwww
   ```
6. Click en "Save"
7. **REDEPLOY** del proyecto (necesario para que cambios tomen efecto)

**Cómo redeploy en Vercel:**
- Option A: Push un commit a GitHub (automático)
- Option B: En Vercel, ir a Deployments → Redeploy

---

## 🚀 PROCESO COMPLETO DE ACTUALIZACIÓN

### **Orden de pasos (IMPORTANTE):**

#### **Paso 1: Generar App Password (5 min)**
```
1. Ir a myaccount.google.com
2. Security → App passwords
3. Seleccionar Mail + Windows PC
4. Copiar contraseña: xxxx yyyy zzzz wwww
5. Guardar en lugar seguro
```

#### **Paso 2: Actualizar local (.env.local) (2 min)**
```
1. Abrir: .env.local
2. Modificar SMTP_USER → contacto@capitalta.mx
3. Modificar SMTP_PASS → xxxx yyyy zzzz wwww
4. Guardar archivo
5. NO hacer commit a Git
```

#### **Paso 3: Actualizar código (1 min)**
```
1. Abrir: src/utils/nodemailer.js
2. Línea 35: Cambiar "capitalta@abdev.click" → "contacto@capitalta.mx"
3. Guardar archivo
4. Hacer commit: "Update email sender to contacto@capitalta.mx"
5. Push a GitHub
```

#### **Paso 4: Actualizar Vercel (5 min)**
```
1. Ir a Vercel dashboard
2. Entrar a proyecto capitalta
3. Settings → Environment Variables
4. Actualizar SMTP_USER y SMTP_PASS
5. Click Save
6. Esperar a que se redeploy
```

#### **Paso 5: Testing (10 min)**
```
1. Ir a https://www.capitalta.mx/auth/signup
2. Registrar usuario de prueba
3. Verificar que llega email desde: contacto@capitalta.mx
4. Probar código OTP
5. Verificar que email de bienvenida llega
```

**TIEMPO TOTAL:** ~25 minutos

---

## 📊 COMPARACIÓN ANTES Y DESPUÉS

| Aspecto | ANTES | DESPUÉS |
|---------|-------|---------|
| **Correo Saliente** | capitalta@abdev.click | contacto@capitalta.mx |
| **Usuario SMTP** | capitalta@abdev.click | contacto@capitalta.mx |
| **Password App** | xxxx yyyy zzzz wwww (actual) | xxxx yyyy zzzz wwww (nueva) |
| **Archivo nodemailer.js** | Línea 35 vieja | Línea 35 nueva |
| **Archivo .env.local** | Variables antiguas | Variables nuevas |
| **Vercel** | Variables antiguas | Variables nuevas |

---

## 🔧 DEBUGGING: SI NO FUNCIONA

### **Problema: "SMTP_USER o SMTP_PASS no configurados"**
```
Solución:
1. Verificar que .env.local existe en raíz del proyecto
2. Verificar que contiene SMTP_USER y SMTP_PASS
3. Reiniciar servidor local (npm run dev)
4. Verificar en consola que imprime las variables
```

### **Problema: "Error 535: Authentication failed"**
```
Solución:
1. Verificar que App Password es CORRECTO (copiar nuevamente)
2. Verificar que NO hay espacios extras al inicio/final
3. Verificar que 2FA está ACTIVO en Google Account
4. Si generaste password anterior, generador nuevo (el viejo expira)
```

### **Problema: "Error 530: Must issue a STARTTLS command"**
```
Solución:
- Nuestro código ya tiene configurado secure: true y port: 465
- No debería pasar, pero revisar líneas 22-24 de nodemailer.js
```

### **Problema: Email se envía pero NO llega**
```
Solución:
1. Revisar carpeta SPAM/JUNK del destinatario
2. Verificar que email "from" coincide con usuario SMTP
3. Revisar logs en Vercel (Deployments → Runtime Logs)
4. Revisar Google Workspace Admin → Report → Email Log
```

---

## 📋 CHECKLIST DE ACTUALIZACIÓN

Marcar conforme completes:

- [ ] **Generar nueva App Password en Google**
  - [ ] Acceso a myaccount.google.com
  - [ ] 2FA está activo
  - [ ] App Password generada y copiada
  - [ ] Password guardada en lugar seguro

- [ ] **Actualizar .env.local**
  - [ ] Archivo .env.local existe
  - [ ] SMTP_USER = contacto@capitalta.mx
  - [ ] SMTP_PASS = nueva contraseña (16 caracteres)
  - [ ] Guardado (SIN hacer commit a Git)

- [ ] **Actualizar src/utils/nodemailer.js**
  - [ ] Línea 35 actualizada
  - [ ] Cambio: capitalta@abdev.click → contacto@capitalta.mx
  - [ ] Guardado

- [ ] **Commit y Push a GitHub**
  - [ ] Commit realizado con mensaje descriptivo
  - [ ] Push a main completado

- [ ] **Actualizar Vercel Environment Variables**
  - [ ] Entrar a Vercel dashboard
  - [ ] Proyecto capitalta
  - [ ] Settings → Environment Variables
  - [ ] SMTP_USER actualizado
  - [ ] SMTP_PASS actualizado
  - [ ] Click "Save"
  - [ ] Redeploy completado

- [ ] **Testing en Producción**
  - [ ] Email de prueba enviado
  - [ ] Email llegó desde: contacto@capitalta.mx
  - [ ] Contenido correcto
  - [ ] Sin errores en consola

---

## 💡 NOTAS IMPORTANTES

### **Seguridad:**
1. ⚠️ **NUNCA** hacer commit de .env.local
2. ⚠️ **NUNCA** compartir App Password por Slack/Email
3. ⚠️ **NUNCA** usar contraseña regular (solo App Password)
4. ✅ Guardar password en 1Password, LastPass, o gestor seguro

### **App Password:**
1. Válida SOLO para esa aplicación específica
2. Si se compromete, puede regenerarse sin cambiar contraseña de Google
3. Requiere 2FA habilitado en la cuenta
4. Diferente a la contraseña regular de Google

### **Google Workspace vs Gmail:**
- Nuestro sistema usa **Google Workspace** (capitalta.mx domain)
- Proceso es igual que Gmail para generar App Passwords
- Si cambias dominio, cambias todo el proceso

---

## 📞 CONTACTO Y SOPORTE

Si hay errores:
1. Revisar sección "Debugging: SI NO FUNCIONA"
2. Revisar logs en Vercel (Runtime Logs)
3. Revisar Google Workspace Admin → Reports → Email Log
4. Contactar a soporte técnico de Google Workspace

---

## 🎯 RESUMEN RÁPIDO

**3 archivos a modificar:**

```
1. .env.local
   SMTP_USER=contacto@capitalta.mx
   SMTP_PASS=xxxx yyyy zzzz wwww

2. src/utils/nodemailer.js (línea 35)
   const fromEmail = "contacto@capitalta.mx";

3. Vercel Dashboard
   SMTP_USER = contacto@capitalta.mx
   SMTP_PASS = xxxx yyyy zzzz wwww
```

**Orden:** Generar Password → Actualizar .env.local → Actualizar código → Push GitHub → Actualizar Vercel → Testing

---

**Versión:** 1.0
**Última actualización:** Marzo 2026
**Estado:** Listo para implementación
