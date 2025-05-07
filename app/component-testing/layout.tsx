import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Component Testing | Windows Doors Website',
  description: 'Testing page for UI components',
};

export default function ComponentTestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="component-testing-layout">
      {children}
    </div>
  );
}
