import { getAccessToken } from '../auth/auth-utils';

export async function request<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const host = 'https://devapi.konsoft.top';
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
  data: any;
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
export interface GroupPurchaseItem {
  /** 团购项目唯一标识 */
  id: string;
  /** 团购标题 */
  title: string;
  /** 团购描述 */
  description: string;
  /** 目标人数 */
  targetNumber: number;
  /** 当前已加入人数 */
  currentNumber: number;
  /** 团购状态：未开始/进行中/已完成/已取消 */
  status: 'NotStarted' | 'InProgress' | 'Completed' | 'Cancelled';
  /** 团购类型：车/房/车房 */
  groupType: 'Car' | 'Room' | 'CarRoom';
  /** 创建者信息 */
  creator: {
    /** 额外属性 */
    extraProperties: {
      additionalProp1?: string;
      additionalProp2?: string;
      additionalProp3?: string;
    };
    /** 用户ID */
    id: string;
    /** 创建时间 */
    creationTime: string;
    /** 创建者ID */
    creatorId: string;
    /** 最后修改时间 */
    lastModificationTime: string;
    /** 最后修改者ID */
    lastModifierId: string;
    /** 是否已删除 */
    isDeleted: boolean;
    /** 删除者ID */
    deleterId?: string;
    /** 删除时间 */
    deletionTime?: string;
    /** 租户ID */
    tenantId?: string;
    /** 用户名 */
    userName: string;
    /** 名字 */
    name: string;
    /** 姓氏 */
    surname: string;
    /** 邮箱 */
    email: string;
    /** 邮箱是否已确认 */
    emailConfirmed: boolean;
    /** 手机号 */
    phoneNumber: string;
    /** 手机号是否已确认 */
    phoneNumberConfirmed: boolean;
    /** 是否激活 */
    isActive: boolean;
    /** 是否启用锁定 */
    lockoutEnabled: boolean;
    /** 登录失败次数 */
    accessFailedCount: number;
    /** 锁定结束时间 */
    lockoutEnd?: string;
    /** 并发戳 */
    concurrencyStamp: string;
    /** 实体版本 */
    entityVersion: number;
    /** 最后密码修改时间 */
    lastPasswordChangeTime: string;
  };
  /** 创建时间 */
  creationTime: string;
  /** 创建者ID */
  creatorId: string;
  /** 最后修改时间 */
  lastModificationTime: string;
  /** 最后修改者ID */
  lastModifierId: string;
  /** 是否已删除 */
  isDeleted: boolean;
  /** 删除者ID */
  deleterId?: string;
  /** 删除时间 */
  deletionTime?: string;
  /** 租户ID */
  tenantId?: string;
}

/** 团购列表查询结果 */
export interface GROUP_RESULT {
  /** 团购项目列表 */
  data: GroupPurchaseItem[];
  /** 总数量 */
  totalCount?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 当前页码 */
  pageIndex?: number;
}

/**
 * 查询团购列表
 * @returns 返回团购列表数据，包含分页信息
 */
export const queryGroupList = async (): Promise<GROUP_RESULT> => {
  return request<GROUP_RESULT>('/api/snowClub/groupPurchase/getGroupPurchasePageResult');
};
