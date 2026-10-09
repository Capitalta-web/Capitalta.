export const emailSchema = {
  required: 'El correo electrónico es obligatorio',
  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Correo electrónico no válido' }
};

export const passwordSchema = {
  required: 'La contraseña es obligatoria',
  minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
};

// Acepta acentos, ñ, diéresis, apóstrofos, puntos y guiones (p. ej. "José María", "Núñez", "O'Neill").
const NOMBRE_REGEX = /^[\p{L}\s'.-]+$/u;

export const firstNameSchema = {
  required: 'El nombre es obligatorio',
  pattern: { value: NOMBRE_REGEX, message: 'Nombre no válido' }
};

export const lastNameSchema = {
  required: 'El apellido es obligatorio',
  pattern: { value: NOMBRE_REGEX, message: 'Apellido no válido' }
};

export const phoneSchema = {
  required: 'El teléfono es obligatorio',
  pattern: { value: /^[0-9()-.\s]{7,15}$/, message: 'Teléfono no válido' }
};

export const otpSchema = {
  required: 'El código es obligatorio',
  minLength: { value: 6, message: 'El código debe tener exactamente 6 caracteres' }
};
