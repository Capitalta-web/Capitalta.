import PropTypes from 'prop-types';
import { requirePageRole } from '@/utils/auth/serverAuth';

// Segunda capa de control (el proxy ya filtra): solo roles permitidos ven esta sección.
export const dynamic = 'force-dynamic';

export default async function RoleLayout({ children }) {
  await requirePageRole(['notario', 'admin']);
  return children;
}

RoleLayout.propTypes = { children: PropTypes.node };
