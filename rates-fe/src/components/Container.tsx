import { Layout } from 'antd';
import React from 'react';

interface CenteredLayoutProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Container({ children, style }: CenteredLayoutProps) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {children}
    </Layout>
  );
}

export default Container;
