/**
 * @jest-environment node
 */
import { canLinkLead, linkLeadToUser, sanitizeDraft } from '@/utils/leads/linkLead';
import { createFakeSupabase } from '../helpers/fakeSupabase';

jest.mock('@/utils/auth/serverAuth', () => ({ getServerAuth: jest.fn() }));

const user = { id: 'u-ana', email: 'Ana@Example.com', user_metadata: { full_name: 'Ana' } };

function db() {
  return createFakeSupabase({
    leads: [
      { id: 'lead-ana', email: 'ana@example.com', notas: '{"origen":"web"}', estado: 'nuevo' },
      { id: 'lead-otro', email: 'otro@example.com', notas: null, estado: 'nuevo' }
    ]
  });
}

describe('/api/leads/link: solo leads del mismo correo', () => {
  it('canLinkLead compara correos normalizados', () => {
    expect(canLinkLead({ email: 'ana@example.com' }, user)).toBe(true);
    expect(canLinkLead({ email: 'otro@example.com' }, user)).toBe(false);
    expect(canLinkLead({ email: null }, user)).toBe(false);
    expect(canLinkLead({ email: 'ana@example.com' }, { email: '' })).toBe(false);
  });

  it('vincula un lead propio', async () => {
    const fake = db();
    const r = await linkLeadToUser(fake, { user, leadId: 'lead-ana', draft: { monto: 100 } });
    expect(r.status).toBe(200);
    const lead = fake.tables.leads.find((l) => l.id === 'lead-ana');
    expect(lead.estado).toBe('en_proceso');
    expect(JSON.parse(lead.notas)).toMatchObject({ origen: 'web', monto: 100, linked_user_id: 'u-ana' });
  });

  it('NO vincula ni modifica un lead de otro correo (responde 404)', async () => {
    const fake = db();
    const r = await linkLeadToUser(fake, { user, leadId: 'lead-otro', draft: {} });
    expect(r.status).toBe(404);
    const lead = fake.tables.leads.find((l) => l.id === 'lead-otro');
    expect(lead).toMatchObject({ estado: 'nuevo', notas: null });
  });

  it('el borrador no puede suplantar linked_user_id ni meter objetos', () => {
    expect(sanitizeDraft({ linked_user_id: 'otro', monto: 5, x: { a: 1 }, 'mal clave': 1, source_path: '/x' })).toEqual({ monto: 5 });
  });

  it('sin lead_id crea uno nuevo con el correo de la sesión', async () => {
    const fake = db();
    const r = await linkLeadToUser(fake, { user, leadId: null, draft: { linked_user_id: 'hack' } });
    expect(r.status).toBe(201);
    expect(r.body.lead.email).toBe('ana@example.com');
    expect(JSON.parse(r.body.lead.notas).linked_user_id).toBe('u-ana');
  });

  it('el endpoint exige sesión', async () => {
    const { getServerAuth } = require('@/utils/auth/serverAuth');
    getServerAuth.mockResolvedValue({ user: null, role: null, configured: true });
    const { POST } = require('@/app/api/leads/link/route');
    const res = await POST(new Request('https://x.test/api/leads/link', { method: 'POST', body: '{"lead_id":"lead-otro"}' }));
    expect(res.status).toBe(401);
  });
});
