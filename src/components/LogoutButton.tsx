import React from 'react';
import { Button } from 'antd-mobile';
import { useAuth } from 'react-oidc-context';

const LogoutButton: React.FC = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.removeUser();
    auth.signoutRedirect();
  };

  return (
    <Button color="danger" size="small" onClick={handleLogout}>
      退出登录
    </Button>
  );
};

export default LogoutButton;
