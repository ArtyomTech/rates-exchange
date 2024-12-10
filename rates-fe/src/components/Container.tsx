import { Layout } from 'antd';
import React from 'react';

interface CenteredLayoutProps {
  children: React.ReactNode;
}

function Container({ children }: CenteredLayoutProps) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Layout>
  );
}

export default Container;
