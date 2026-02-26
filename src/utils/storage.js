import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export async function subirDocumento(file, solicitudId, tipoDocumento, userId) {
  const supabase = createSupabaseBrowserClient();

  const extension = file.name.split('.').pop();
  const fileName = `${solicitudId}/${tipoDocumento}_${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage.from('documentos-credito').upload(fileName, file);

  if (uploadError) {
    throw new Error('Error al subir archivo: ' + uploadError.message);
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from('documentos-credito').getPublicUrl(fileName);

  const { data: docData, error: docError } = await supabase
    .from('documentos')
    .insert({
      solicitud_id: solicitudId,
      tipo_documento: tipoDocumento,
      nombre_archivo: file.name,
      url_archivo: publicUrl,
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
