import React, { useEffect } from 'react';
import { SpinLoading } from 'antd-mobile';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

const IndexLogin: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading) {
      return; // 还在加载中，等待
    }

    if (auth.isAuthenticated) {
      // 已认证，跳转到首页
      navigate('/home');
    } else {
      // 未认证，开始登录流程
      auth.signinRedirect();
    }
  }, [auth.isLoading, auth.isAuthenticated, auth, navigate]);

  // 处理登录回调
  useEffect(() => {
    if (window.location.search.includes('code=')) {
      auth
        .signinRedirectCallback()
        .then(() => {
          navigate('/home');
        })
        .catch((error) => {
          console.error('登录回调处理失败:', error);
          navigate('/');
        });
    }
  }, [auth, navigate]);

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
      <div style={{ marginTop: 16, fontSize: 18, color: '#888' }}>
        {auth.isLoading ? '登录校验中…' : '正在跳转到登录页面…'}
      </div>
    </div>
  );
};

export default IndexLogin;
