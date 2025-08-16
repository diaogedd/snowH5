import { getAccessToken } from '../auth/auth-utils';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { GROUP_STATUS } from '../const';
import { Toast } from 'antd-mobile';

/**
 * 通用请求函数 - 使用 axios
 * @param url 请求路径
 * @param options 请求配置
 * @returns Promise<T> 返回数据
 */
export async function request<T = any>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  const token = getAccessToken();
  const host = 'https://devapi.konsoft.top';

  // 创建 axios 实例
  const instance = axios.create({
    baseURL: host,
    timeout: 10000, // 10秒超时
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  try {
    const response: AxiosResponse<T> = await instance.request({
      url,
      method: options.method || 'GET',
      data: options.data,
      params: options.params,
      ...options,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // axios 错误处理
      console.log(error);

      if (error.response) {
        Toast.show({
          icon: 'fail',
          content: error.response?.data?.error?.code,
        });
        // 服务器返回错误状态码
        throw new Error(
          `请求失败: ${error.response.status} - ${error.response.data?.message || error.message}`,
        );
      } else if (error.request) {
        // 请求已发出但没有收到响应
        throw new Error('网络连接失败，请检查网络设置');
      } else {
        // 请求配置错误
        throw new Error(`请求配置错误: ${error.message}`);
      }
    } else {
      // 其他错误
      throw new Error(`未知错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }
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
    data: data, // axios 会自动处理 JSON 序列化
  });
}
// 车团
export async function createOrUpdateCar(data: object) {
  return request<OBJ_RESULT>('/api/snowClub/groupPurchase/createOrUpdateCar', {
    method: 'POST',
    data: data, // axios 会自动处理 JSON 序列化
  });
}
// 房团
export async function createOrUpdateRoom(data: object) {
  return request<OBJ_RESULT>('/api/snowClub/groupPurchase/createOrUpdateRoom', {
    method: 'POST',
    data: data, // axios 会自动处理 JSON 序列化
  });
}

// 查询车房团列表
export interface GroupPurchaseItem {
  [x: string]: string | number;
  carDescription: string;
  carPrice: number;
  checkInTime: string;
  checkOutTime: string;
  currentNumber: number;
  departureTime: string;
  description: string;
  endLocation: string;
  groupType: 'CarAndRoom' | 'Car' | 'Room';

  remarks: string;
  returnTime: string;
  roomDescription: string;
  roomLocation: string;
  roomName: string;
  roomPrice: number;
  startLocation: string;
  status: keyof typeof GROUP_STATUS;
  targetNumber: number;
  title: string;
  vehicleType: string;
}

/** 团购列表查询结果 */
export interface GROUP_RESULT {
  /** 团购项目列表 */
  items: GroupPurchaseItem[];
  /** 总数量 */
  totalCount?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 当前页码 */
  pageIndex?: number;
}

// 获取所有发团
export const queryGroupList = async (params?: any): Promise<GROUP_RESULT> => {
  return request<GROUP_RESULT>('/api/snowClub/groupPurchase/getGroupPurchasePageResult', {
    params: params, // 使用 params 而不是 body，因为是 GET 请求
  });
};
// 获取我发布的团
export const queryMeGroupList = async (params?: any): Promise<GROUP_RESULT> => {
  return request<GROUP_RESULT>('/api/snowClub/groupPurchase/getMyGroupPurchase', {
    params: params, // 使用 params 而不是 body，因为是 GET 请求
  });
};
// 获取团详情
export const queryGroupByID = async (params: { id: string }): Promise<GroupPurchaseItem> => {
  return request('/api/snowClub/groupPurchase/getGroupPurchase/' + params.id, {
    params: params, // 使用 params 而不是 body，因为是 GET 请求
  });
};
// 删除团
export const deleteSkiResort = async (params: { id: string | number }): Promise<void> => {
  return request('/api/snowClub/skiResort/' + params.id + '/delete', {
    method: 'DELETE',
  });
};
// 加入拼团
export const joinGroupPurchase = async (params: { id: string | number }): Promise<void> => {
  return request('/api/snowClub/groupPurchase/join/' + params.id, {
    method: 'POST',
  });
};
//获取我加入的团
export const queryMyGroupPurchase = async (): Promise<void> => {
  return request('/api/snowClub/groupPurchase/getMyGroupPurchase', {
    method: 'GET',
  });
};
