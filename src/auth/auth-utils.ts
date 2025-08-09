import { useAuth } from 'react-oidc-context';

// 获取访问令牌的 hook
export const useAccessToken = () => {
  const auth = useAuth();
  return auth.user?.access_token;
};

// 获取访问令牌的同步函数（用于非 React 组件中）
export const getAccessToken = (): string | undefined => {
  // 从 localStorage 中获取用户信息

  const userStr = sessionStorage.getItem('oidc.user:https://devauth.konsoft.top:SnowClub_React');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user.access_token;
    } catch (error) {
      console.error('解析用户信息失败:', error);
      return undefined;
    }
  }
  return undefined;
};
