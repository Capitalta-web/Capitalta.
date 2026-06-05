# Prompt para Trae IDE: Corregir Autenticación en Proyecto CapitalTa

**Objetivo**: Diagnosticar y solucionar todos los problemas de autenticación en el proyecto CapitalTa, que utiliza Next.js, Supabase y Vercel.

---

## Contexto del Proyecto

- **Framework**: Next.js (App Router)
- **Autenticación**: Supabase Auth
- **Base de Datos**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Dominio**: `https://capitalta.mx`
- **Repositorio**: `https://github.com/abalderas10/ui_capitalta`

## Problemas Actuales

El sistema de registro y login está fallando con los siguientes síntomas:

1.  **Error `Failed to fetch`**: Ocurre en el cliente (navegador) al intentar cualquier operación con Supabase, a pesar de que la conexión desde el servidor funciona.
2.  **Código OTP Inválido**: Al intentar verificar una cuenta con el código de 6 dígitos, el sistema responde "código inválido o expirado".
3.  **Redirección Incorrecta de Magic Link**: Al hacer clic en el enlace de confirmación (magic link), el usuario es redirigido a la página de login (`/auth/login`) en lugar de al dashboard (`/dashboard`).

---

## Tareas a Realizar

### Tarea 1: Solucionar Error `Failed to fetch` (Problema de Variables de Entorno)

**Hipótesis**: Las variables de entorno `NEXT_PUBLIC_` no están siendo correctamente inyectadas en el bundle del cliente durante el build de Vercel.

**Acciones**:

1.  **Verificar el Cliente de Supabase**: Revisa el archivo `src/utils/supabaseClient.js`. Asegúrate de que la función `createSupabaseBrowserClient` esté leyendo `process.env.NEXT_PUBLIC_SUPABASE_URL` y `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`.

2.  **Revisar `next.config.js`**: Confirma que no haya ninguna configuración en `next.config.js` que pueda estar interfiriendo con la exposición de las variables de entorno públicas.

3.  **Forzar Rebuild en Vercel (Instrucción para el usuario)**: El problema principal es probablemente el caché de Vercel. La solución es forzar un rebuild completo. Aunque no puedes hacerlo directamente, el usuario debe ser instruido para:
    *   Ir al proyecto en Vercel.
    *   Ir a la pestaña **Deployments**.
    *   Seleccionar el último deployment y hacer clic en **Redeploy**.
    *   **Importante**: Desmarcar la opción "Use existing Build Cache".

### Tarea 2: Corregir Flujo de Verificación (OTP y Magic Link)

**Hipótesis**: La URL de redirección (`emailRedirectTo`) es incorrecta o no se está manejando adecuadamente en el callback, y la verificación del OTP tiene un error lógico.

**Acciones**:

1.  **Corregir `signUp` en `actions.js`**: 
    *   Localiza la llamada a `supabase.auth.signUp` en `src/app/auth/registro/actions.js`.
    *   Asegúrate de que el objeto `options` contenga la propiedad `emailRedirectTo`.
    *   El valor de `emailRedirectTo` **debe ser una URL absoluta** que apunte a la página de callback. Debe usar la variable de entorno `NEXT_PUBLIC_SITE_URL` para construirla. Ejemplo:
        ```javascript
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            data: { ... }
          }
        });
        ```

2.  **Implementar la Página de Callback (`/auth/callback`)**:
    *   Crea o revisa la página en `src/app/auth/callback/page.jsx`.
    *   Esta página debe ser un **componente de servidor** que se ejecute al cargar.
    *   Debe extraer el `code` de los parámetros de búsqueda de la URL.
    *   Si el `code` existe, debe intercambiarlo por una sesión usando `supabase.auth.exchangeCodeForSession(code)`.
    *   Una vez obtenida la sesión, debe redirigir al usuario al dashboard (`/dashboard`).
    *   Si no hay `code`, debe redirigir a una página de error o al login.

3.  **Corregir Verificación de OTP (`verifyOtp`)**:
    *   Revisa la función que maneja la verificación del OTP en `src/app/auth/registro/actions.js`.
    *   La llamada a `supabase.auth.verifyOtp` debe incluir el `type: 'signup'`. El error "inválido o expirado" a menudo ocurre porque el tipo de token no coincide.
        ```javascript
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'signup'
        });
        ```

### Tarea 3: Solucionar Vulnerabilidades de Seguridad RLS (Opcional pero Recomendado)

**Hipótesis**: Las políticas de Row Level Security (RLS) usan `user_metadata`, que es inseguro.

**Acciones**:

1.  **Crear una Columna `role` Segura**:
    *   En la tabla `profiles`, asegúrate de que exista una columna `role` de tipo `TEXT`.
    *   Crea una función de base de datos y un trigger que se ejecute después de crear un nuevo usuario en `auth.users`. Este trigger debe insertar una nueva fila en `profiles` con el `id` del nuevo usuario y un rol por defecto (ej: `'cliente'`). Esto asegura que el rol no pueda ser manipulado por el usuario.

2.  **Refactorizar Políticas RLS**:
    *   Modifica todas las políticas RLS que usan `auth.user_metadata()`.
    *   En su lugar, deben leer el rol de la tabla `profiles`. Para esto, crea una función auxiliar segura en PostgreSQL.
        ```sql
        -- Helper function to get a user's role from the profiles table
        CREATE OR REPLACE FUNCTION get_user_role(user_id UUID) RETURNS TEXT AS $$
        DECLARE
          user_role TEXT;
        BEGIN
          SELECT role INTO user_role FROM public.profiles WHERE id = user_id;
          RETURN user_role;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
        ```
    *   Luego, en tus políticas RLS, usa esta función:
        ```sql
        -- Example RLS policy
        ALTER POLICY "Staff ve todos los perfiles" ON public.profiles
        USING (get_user_role(auth.uid()) = 'staff');
        ```

3.  **Habilitar Protección de Contraseñas Filtradas**:
    *   En el dashboard de Supabase, ve a **Authentication** -> **Settings** y habilita "Leaked password protection".

---

## Resumen del Prompt para Trae

"Trae, por favor, soluciona los problemas de autenticación en este proyecto Next.js/Supabase. Primero, arregla el error 'Failed to fetch' asegurando que las variables de entorno públicas se inyecten correctamente en el build de Vercel. Segundo, corrige el flujo de registro: asegúrate de que `emailRedirectTo` apunte a una página de callback funcional que cree la sesión y redirija al dashboard, y arregla la verificación del OTP para que use el `type: 'signup'`. Finalmente, como tarea de seguridad, refactoriza todas las políticas RLS para que dejen de usar `user_metadata` y en su lugar lean un rol desde una columna segura en la tabla `profiles`."
