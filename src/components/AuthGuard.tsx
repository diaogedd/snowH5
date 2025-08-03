import React from 'react';
import { useAuth } from 'react-oidc-context';
import { SpinLoading } from 'antd-mobile';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SpinLoading style={{ '--size': '48px' }} />
        <div style={{ marginTop: 16, fontSize: 18, color: '#888' }}>加载中…</div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    // 未认证，重定向到登录页面
    auth.signinRedirect();
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SpinLoading style={{ '--size': '48px' }} />
        <div style={{ marginTop: 16, fontSize: 18, color: '#888' }}>正在跳转到登录页面…</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
