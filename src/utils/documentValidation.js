/**
 * Document Validation Utilities
 * Handles client-side validation for file uploads
 */

// Allowed file types for document uploads
export const ALLOWED_FILE_TYPES = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

// Max file size in bytes (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Document types required
export const DOCUMENT_TYPES = {
  identity: 'identity', // INE/Pasaporte
  address: 'address', // Comprobante de domicilio
  income: 'income', // Nóminas / RFC
  bankStatements: 'bankStatements' // Estados de cuenta
};

export const DOCUMENT_LABELS = {
  identity: 'INE/Pasaporte',
  address: 'Comprobante de Domicilio',
  income: 'Nóminas/RFC',
  bankStatements: 'Estados de Cuenta'
};

/**
 * Validate a file before upload
 * @param {File} file - File object to validate
 * @param {Array<string>} allowedExtensions - Allowed file extensions (optional)
 * @returns {Object} - { valid: boolean, error: string|null }
 */
export function validateFile(file, allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']) {
  if (!file) {
    return { valid: false, error: 'No se seleccionó archivo' };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Archivo muy grande. Máximo ${formatFileSize(MAX_FILE_SIZE)}`
    };
  }

  // Check file type
  const extension = getFileExtension(file.name).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Tipo de archivo no permitido. Tipos válidos: ${allowedExtensions.join(', ').toUpperCase()}`
    };
  }

  // Additional MIME type check
  const mimeType = file.type.toLowerCase();
  const validMimes = Object.values(ALLOWED_FILE_TYPES);
  if (!validMimes.includes(mimeType) && !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: 'Tipo de archivo inválido. Por favor sube PDF o imagen'
    };
  }

  return { valid: true, error: null };
}

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} - File extension without dot
 */
export function getFileExtension(filename) {
  if (!filename) return '';
  return filename.split('.').pop();
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size (e.g., "2.5 MB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate multiple files at once
 * @param {FileList|Array<File>} files - Files to validate
 * @param {Array<string>} allowedExtensions - Allowed extensions
 * @returns {Array<Object>} - Array of validation results
 */
export function validateFiles(files, allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']) {
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const validation = validateFile(files[i], allowedExtensions);
    results.push({
      file: files[i],
      ...validation
    });
  }

  return results;
}

/**
 * Check if file is an image
 * @param {File} file - File to check
 * @returns {boolean}
 */
export function isImageFile(file) {
  if (!file) return false;
  return file.type.startsWith('image/');
}

/**
 * Check if file is PDF
 * @param {File} file - File to check
 * @returns {boolean}
 */
export function isPdfFile(file) {
  if (!file) return false;
  return file.type === 'application/pdf';
}

/**
 * Create preview URL for file
 * @param {File} file - File to create preview for
 * @returns {string} - Object URL
 */
export function createFilePreview(file) {
  if (!file) return null;
  return URL.createObjectURL(file);
}

/**
 * Revoke preview URL to free memory
 * @param {string} previewUrl - Preview URL to revoke
 */
export function revokeFilePreview(previewUrl) {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
}
