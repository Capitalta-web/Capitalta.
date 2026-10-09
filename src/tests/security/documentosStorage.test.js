import { buildDocumentoPath, extractStoragePath, getSignedDocumentUrl } from '@/utils/documentosStorage';

describe('documentos en bucket privado', () => {
  it('extrae la ruta desde una URL pública antigua', () => {
    const url = 'https://abc.supabase.co/storage/v1/object/public/documentos-credito/sol-1/ine_1_2.pdf';
    expect(extractStoragePath(url)).toBe('sol-1/ine_1_2.pdf');
  });

  it('acepta rutas directas y rechaza traversal u otros buckets', () => {
    expect(extractStoragePath('sol-1/ine.pdf')).toBe('sol-1/ine.pdf');
    expect(extractStoragePath('documentos-credito/sol-1/ine.pdf')).toBe('sol-1/ine.pdf');
    expect(extractStoragePath('../secreto')).toBeNull();
    expect(extractStoragePath('https://abc.supabase.co/storage/v1/object/public/avatars/a.png')).toBeNull();
    expect(extractStoragePath('')).toBeNull();
  });

  it('construye rutas dentro de la carpeta de la solicitud', () => {
    const path = buildDocumentoPath('sol-1', 'ine', 'Mi INE.PDF', 123);
    expect(path).toMatch(/^sol-1\/ine_123_\d+\.pdf$/);
  });

  it('pide signed URL (no URL pública) con expiración corta', async () => {
    const createSignedUrl = jest.fn().mockResolvedValue({ data: { signedUrl: 'https://signed' }, error: null });
    const supabase = { storage: { from: jest.fn(() => ({ createSignedUrl })) } };
    const url = await getSignedDocumentUrl(supabase, 'https://abc.supabase.co/storage/v1/object/public/documentos-credito/s/x.pdf');
    expect(url).toBe('https://signed');
    expect(supabase.storage.from).toHaveBeenCalledWith('documentos-credito');
    expect(createSignedUrl).toHaveBeenCalledWith('s/x.pdf', 300);
  });
});
