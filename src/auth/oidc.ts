import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const oidcConfig = {
  authority: "https://devauth.konsoft.top", // 替换为你的 OIDC 服务地址
  client_id: "SnowClub_React", // 替换为你的 client_id
  redirect_uri: "http://localhost:5173/index",
  response_type: "code",
  scope: "offline_access SnowClub",
  post_logout_redirect_uri: "http://localhost:5173",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export const userManager = new UserManager(oidcConfig);

export async function ensureLogin() {
  const user = await userManager.getUser();

  if (!user || user.expired) {
    userManager.signinRedirect();
  }
  return {
    access_token: user?.access_token,
  };
}

export async function apiFetch(url: string, options: RequestInit = {}) {
  const user = await userManager.getUser();
  const token = user?.access_token;
  const host = "https://devapi.konsoft.top";
  return fetch(host + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}
