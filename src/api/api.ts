import { userManager } from '../auth/oidc'


export async function request<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  const user = await userManager.getUser();
  const token = user?.access_token;
  const host = 'https://devauth.konsoft.top'
  const res = await fetch(host+url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('请求失败');
  return res.json() as Promise<T>;
}

interface ENV_RESULT {
  data: any;
}

export async function queryUsers() {
  return request<ENV_RESULT>('/api/identity/users');
}