import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { CAT, PRODUCTOS, TASA_ANUAL_FIJA } from '@/data/datosNegocio';
import { textoCat, textoTasa } from '@/components/TasaYCat';
import { rangoMonto, rangoPlazo } from '@/utils/formatoProductos';

describe('Contenido de negocio', () => {
  it('usa la tasa fija vigente del 24%', () => {
    expect(TASA_ANUAL_FIJA).toBe(24);
    expect(textoTasa()).toContain('24% anual');
  });

  it('no publica un CAT mientras no esté confirmado', () => {
    if (CAT.valor === null) expect(textoCat()).toBeNull();
    else expect(textoCat()).toContain(`${CAT.valor}%`);
  });

  it('formatea rangos coherentes por producto', () => {
    expect(rangoMonto('revolvente')).toBe('$500,000 - $50,000,000');
    expect(rangoPlazo('empresarial')).toBe(`${PRODUCTOS.empresarial.plazoMin} a ${PRODUCTOS.empresarial.plazoMax} meses`);
  });
});

describe('SEO', () => {
  const urls = sitemap().map((r) => new URL(r.url).pathname);

  it('el sitemap solo lista páginas públicas de Capitalta', () => {
    expect(urls).toContain('/productos');
    for (const privada of ['/dashboard', '/admin', '/auth', '/mi-cuenta', '/api', '/blocks', '/sections', '/pricing']) {
      expect(urls.some((u) => u.startsWith(privada))).toBe(false);
    }
  });

  it('robots bloquea áreas privadas', () => {
    const { rules } = robots();
    expect(rules[0].disallow).toEqual(expect.arrayContaining(['/dashboard', '/admin', '/auth', '/api']));
  });
});
