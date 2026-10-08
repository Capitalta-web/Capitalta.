import crypto from 'crypto';

// Cifrado AES-256-GCM para credenciales de buró.
// La clave vive en BURO_ENC_KEY (32 bytes en base64) — solo en el servidor.

const ALGO = 'aes-256-gcm';

function getKey() {
  const k = process.env.BURO_ENC_KEY;
  if (!k) throw new Error('BURO_ENC_KEY no configurada');
  const key = Buffer.from(k, 'base64');
  if (key.length !== 32) throw new Error('BURO_ENC_KEY debe ser 32 bytes en base64');
  return key;
}

export function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const enc = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // [iv(12)][tag(16)][ciphertext]
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

export function decrypt(b64) {
  const data = Buffer.from(b64, 'base64');
  const iv = data.subarray(0, 12);
  const tag = data.subarray(12, 28);
  const enc = data.subarray(28);
  const decipher = crypto.createDecipheriv(ALGO, getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString('utf8');
}
