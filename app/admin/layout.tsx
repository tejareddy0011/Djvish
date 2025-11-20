import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Media Gallery | DJ Vish',
  description: 'Admin panel for managing media gallery',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

