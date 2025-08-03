import { getAccessToken } from '../auth/auth-utils';

export async function request<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const host = 'https://devauth.konsoft.top';
  const res = await fetch(host + url, {
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
  data: unknown;
}

export async function queryUsers() {
  return request<ENV_RESULT>('/api/identity/users');
}

interface OBJ_RESULT {
  data: object;
}
// 创建与编辑车房团
export async function createOrUpdateCarRoom(data: object) {
  return request<OBJ_RESULT>('/api/snowClub/groupPurchase/createOrUpdateCarRoom', {
    method: 'POST',
    body: typeof data === 'object' && !(data instanceof FormData) ? JSON.stringify(data) : data, // 自动序列化为 JSON
  });
}
// 车团
export async function createOrUpdateCar(data: object) {
  return request<OBJ_RESULT>('/api/snowClub/groupPurchase/createOrUpdateCar', {
    method: 'POST',
    body: typeof data === 'object' && !(data instanceof FormData) ? JSON.stringify(data) : data, // 自动序列化为 JSON
  });
}
// 房团
export async function createOrUpdateRoom(data: object) {
  return request<OBJ_RESULT>('/api/snowClub/groupPurchase/createOrUpdateRoom', {
    method: 'POST',
    body: typeof data === 'object' && !(data instanceof FormData) ? JSON.stringify(data) : data, // 自动序列化为 JSON
  });
}

// 查询车房团列表
interface GROUP_RESULT {
  data: unknown;
}
export const queryGroupList = async () => {
  return request<GROUP_RESULT>('/api/snowClub/groupPurchase/getGroupPurchasePageResult');
};
