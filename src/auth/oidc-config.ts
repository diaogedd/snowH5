import type { AuthProviderProps } from 'react-oidc-context';

export const oidcConfig: AuthProviderProps = {
  authority: 'https://devauth.konsoft.top',
  client_id: 'SnowClub_React',
  redirect_uri: 'http://localhost:5173/index',
  response_type: 'code',
  scope: 'offline_access SnowClub',
  post_logout_redirect_uri: 'http://localhost:5173',
  onSigninCallback: () => {
    window.location.replace('/home');
  },
  onSignoutCallback: () => {
    window.location.replace('/');
  },
  loadUserInfo: true,
  monitorSession: true,
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:5173/silent-renew.html',
};
