-- =============================================================================
-- 20261009000400_solicitudes_bloqueo_cliente.sql
-- Un cliente NO puede modificar su solicitud una vez enviada.
--
-- Reglas para usuarios finales (JWT 'authenticated'/'anon') que no son staff:
--   * INSERT: solo en estado 'borrador' o 'solicitud_iniciada' (cualquier otro se
--     fuerza a 'solicitud_iniciada'); cliente_id = auth.uid(); analista_id = null.
--   * UPDATE: solo mientras la solicitud está en 'borrador'. Desde borrador solo
--     puede "enviarla" (estado -> 'solicitud_iniciada'). Nunca cambia cliente/analista.
--     Una vez enviada (cualquier estado distinto de 'borrador'), NINGÚN campo
--     (monto, plazo, destino, etc.) se puede cambiar.
--   * DELETE: solo borradores propios.
-- Staff (analista/admin vía profiles.role), service_role y SQL directo no se restringen.
--
-- También en documentos: el cliente sube con estado 'subido' y no puede cambiar
-- el estado (validado/rechazado) ni editar/borrar registros.
--
-- Reemplaza la función creada en 20261009000100 (mismo nombre). Idempotente.
-- Requiere: 20261009000100_roles_seguros.sql (public.is_staff()).
-- =============================================================================

begin;

create or replace function public.solicitudes_proteger_campos()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') not in ('authenticated', 'anon') or public.is_staff() then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  if tg_op = 'INSERT' then
    if new.estado is distinct from 'borrador' then
      new.estado := 'solicitud_iniciada';
    end if;
    new.cliente_id := auth.uid();
    if to_jsonb(new) ? 'analista_id' then
      new := jsonb_populate_record(new, jsonb_build_object('analista_id', null));
    end if;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.estado is distinct from 'borrador' then
      raise exception 'La solicitud ya fue enviada y no puede eliminarse'
        using errcode = '42501';
    end if;
    return old;
  end if;

  -- UPDATE
  if old.estado is distinct from 'borrador' then
    raise exception 'La solicitud ya fue enviada y no puede modificarse'
      using errcode = '42501';
  end if;

  if new.estado not in ('borrador', 'solicitud_iniciada')
     or new.cliente_id is distinct from old.cliente_id
     or (to_jsonb(new) ->> 'analista_id') is distinct from (to_jsonb(old) ->> 'analista_id') then
    raise exception 'No autorizado para modificar estado, cliente o analista de la solicitud'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

do $$
begin
  if to_regclass('public.solicitudes_credito') is not null then
    execute 'drop trigger if exists solicitudes_proteger_campos on public.solicitudes_credito';
    execute 'create trigger solicitudes_proteger_campos
               before insert or update or delete on public.solicitudes_credito
               for each row execute function public.solicitudes_proteger_campos()';

    -- RLS: el cliente solo puede actualizar/borrar sus BORRADORES.
    execute 'drop policy if exists "Users can update their own applications" on public.solicitudes_credito';
    execute 'drop policy if exists "Clientes actualizan solicitudes en borrador" on public.solicitudes_credito';
    execute 'drop policy if exists "Clientes borran solicitudes en borrador" on public.solicitudes_credito';
    execute $p$create policy "Clientes actualizan solicitudes en borrador"
      on public.solicitudes_credito for update to authenticated
      using (auth.uid() = cliente_id and estado = 'borrador')
      with check (auth.uid() = cliente_id and estado in ('borrador', 'solicitud_iniciada'))$p$;
    execute $p$create policy "Clientes borran solicitudes en borrador"
      on public.solicitudes_credito for delete to authenticated
      using (auth.uid() = cliente_id and estado = 'borrador')$p$;
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- documentos: el cliente no valida sus propios documentos
-- -----------------------------------------------------------------------------
create or replace function public.documentos_proteger_campos()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') not in ('authenticated', 'anon') or public.is_staff() then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  if tg_op = 'INSERT' then
    new.estado := 'subido';
    new.subido_por := auth.uid();
    if to_jsonb(new) ? 'comentarios' then
      new := jsonb_populate_record(new, jsonb_build_object('comentarios', null));
    end if;
    return new;
  end if;

  raise exception 'Solo el staff puede modificar o eliminar documentos registrados'
    using errcode = '42501';
end;
$$;

do $$
begin
  if to_regclass('public.documentos') is not null then
    execute 'drop trigger if exists documentos_proteger_campos on public.documentos';
    execute 'create trigger documentos_proteger_campos
               before insert or update or delete on public.documentos
               for each row execute function public.documentos_proteger_campos()';
  end if;
end $$;

commit;

notify pgrst, 'reload schema';
