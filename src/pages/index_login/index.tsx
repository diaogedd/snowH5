import React, { useEffect } from 'react';
import { SpinLoading } from 'antd-mobile';
import { ensureLogin, userManager } from '../../auth/oidc'
const IndexLogin: React.FC = () => {


  useEffect(() => {
    if (window.location.search.includes('code=')) {
      // 只在回调时处理
      userManager.signinRedirectCallback().then(() => {
        window.location.replace('/');
      });
    } else {
      // 只在非回调时检测登录
      ensureLogin().then(res => {
        if (res.access_token) {
          window.location.replace('/home');
        }
      })
    }
  }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <SpinLoading style={{ '--size': '48px' }} />
      <div style={{ marginTop: 16, fontSize: 18, color: '#888' }}>登录校验中…</div>
    </div>
  );
};

export default IndexLogin;



