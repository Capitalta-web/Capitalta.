'use client';
import PropTypes from 'prop-types';

import AuthGuard from '@/utils/route-guard/AuthGuard';
import AdminLayout from '@/layouts/AdminLayout';

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
