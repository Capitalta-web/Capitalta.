import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { DOCUMENTOS_BUCKET, buildDocumentoPath } from '@/utils/documentosStorage';

export async function subirDocumento(file, solicitudId, tipoDocumento, userId) {
  const supabase = createSupabaseBrowserClient();

  const fileName = buildDocumentoPath(solicitudId, tipoDocumento, file.name);

  const { error: uploadError } = await supabase.storage.from(DOCUMENTOS_BUCKET).upload(fileName, file);

  if (uploadError) {
    throw new Error('Error al subir archivo: ' + uploadError.message);
  }

  // Bucket privado: se guarda la ruta del objeto (ver src/utils/documentosStorage.js).
  const { data: docData, error: docError } = await supabase
    .from('documentos')
    .insert({
      solicitud_id: solicitudId,
      tipo_documento: tipoDocumento,
      nombre_archivo: file.name,
      url_archivo: fileName,
      estado: 'subido',
      subido_por: userId
    })
    .select()
    .single();

  if (docError) {
    throw new Error('Error al registrar documento: ' + docError.message);
  }

  return docData;
}
