// @project
import SvgIcon from '@/components/SvgIcon';
import { DOCS_URL } from '@/path';

export const integration = {
  headLine: 'Soluciones para cada sector',
  captionLine:
    'Desde la construcción hasta la tecnología, impulsamos el crecimiento de empresas en diversas industrias con financiamiento a la medida.',
  primaryBtn: {
    children: 'Ver requisitos',
    startIcon: <SvgIcon name="tabler-file-check" color="background.default" />,
    href: '/auth/registro',
    target: '_self'
  },
  tagList: [
    { label: 'Construcción e Inmobiliario' },
    { label: 'Manufactura e Industria' },
    { label: 'Comercio y Retail' },
    { label: 'Logística y Transporte' },
    { label: 'Servicios Profesionales' },
    { label: 'Tecnología y Software' },
    { label: 'Salud y Farmacéutica' },
    { label: 'Agroindustria' },
    { label: 'Turismo y Hospitalidad' },
    { label: 'Energía y Sustentabilidad' },
    { label: 'Educación' },
    { label: 'Automotriz' }
  ]
};
